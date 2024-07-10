import { Strategy as GoogleStr, Profile, StrategyOptions } from "passport-google-oauth20";
  import { AuthService } from "../services/auth.services";
import { usePassport } from "../utils/passport.use";
import { UserService } from "../../user/services/user.service";
import { UserEntity } from "../../user/entities/user.entity";
import * as bcrypt from "bcrypt";

export class GoogleStrategy extends AuthService {
  private readonly service: UserService;
  constructor() {
    super();
    this.service = new UserService();
    this.validate = this.validate.bind(this);
  }

  async validate(accessToken: string, _refreshToken : string , profile: Profile, done: any) {
    let email = profile.emails?.[0]?.value;
    if (!email || !email.includes("@")) {
      const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      email = data.email;
    }

    
    if (profile.id && profile.displayName && email){
      let usernameSave = profile.displayName + "-" + profile.id;
      let emailSave = email
      const userByEmail = await this.service.findUserByEmail(emailSave); 

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
      GoogleStr,
      StrategyOptions & { passReqToCallback?: false },
      (
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: any
      ) => Promise<Profile>
    >(
      "google",
      GoogleStr,
      {
        clientID: this.getEnvironment("GOOGLE_CLIENT_ID") || "clientId",
        clientSecret: this.getEnvironment("GOOGLE_CLIENT_SECRET") || "clientSecret",
        callbackURL: this.getEnvironment("GOOGLE_CALLBACK_URL") || "url",
        scope: ["email", "profile"],
      },
      this.validate
    );
  }
}