import {
  Strategy as GithubStr,
  Profile,
  StrategyOption,
} from "passport-github2";
import { AuthService } from "../services/auth.services";
import { usePassport } from "../utils/passport.use";
import { UserEntity } from "../../user/entities/user.entity";
import * as bcrypt from "bcrypt";
import { UserService } from "../../user/services/user.service";

/**
 * @class GithubStrategy
 * @author Emiliano Gonzalez
 * @description Estrategia que se encarga de manejar las peticiones de login y registro de Github
 */
export class GithubStrategy extends AuthService {
  private readonly service: UserService;
  constructor(
  ) {
    super();
    this.service = new UserService();
    this.validate = this.validate.bind(this);
  }

  async validate(accessToken: string, _refreshToken: string, profile: Profile, done: any) {
    let email = profile.emails?.[0]?.value;
    
    if (!email) {
      const response = await fetch('https://api.github.com/user/emails', {
        headers: {
          Authorization: `token ${accessToken}`,
        },
      });
      const emails = await response.json();
      if (emails && emails.length > 0) {
        email = emails.find((email: any) => email.primary)?.email || emails[0].email;
      }
    }

    if (profile.username && email){
      let usernameSave = profile.username;
      let emailSave = email
      const userByUsername = await this.service.findUserByUsername(usernameSave);
      const userByEmail = await this.service.findUserByEmail(emailSave); 
      if (userByUsername){
        usernameSave = profile.username + "-" + profile.id;
      }
      if (userByEmail){
        const token = await this.generateToken(userByEmail);
        return done(null, token);
      }

      const random = crypto.randomUUID();
      const randomHash = await bcrypt.hash(random, 10);
      const user = new UserEntity(usernameSave, randomHash, emailSave);

      await this.service.create(user);

      const token = await this.generateToken(user);

      return done(null, token);
    }
    
    return done(null, false);
  }
  get use() {
    return usePassport<
      GithubStr,
      StrategyOption & { passReqToCallback?: false },
      (
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: any
      ) => Promise<Profile>
    >(
      "github",
      GithubStr,
      {
        clientID: this.getEnvironment("GITHUB_CLIENT_ID") || "id",
        clientSecret: this.getEnvironment("GITHUB_CLIENT_SECRET") || "secret",
        callbackURL: this.getEnvironment("GITHUB_CALLBACK_URL") || "url",
        scope: ["user:email"],
      },
      this.validate
    );
  }
}
