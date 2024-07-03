import { Strategy as GoogleStr, Profile, StrategyOptions } from "passport-google-oauth20";
  import { AuthService } from "../services/auth.services";
import { usePassport } from "../utils/passport.use";

export class GoogleStrategy extends AuthService {

  constructor() {
    super();
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

    return done(null, profile);
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