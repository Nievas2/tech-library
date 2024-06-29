import { Strategy as LocalStrategy, VerifyFunction } from "passport-local";
import { UserEntity } from "../../user/entities/user.entity";
import { AuthService } from "../services/auth.services";
import { usePassport } from "../utils/passport.use";

const authService: AuthService = new AuthService();

export class LoginLocalStrategy {
    async validate(
        username: string,
        password: string,
        done: any
    ): Promise<UserEntity>{
        const user = await authService.validateUser(username, password);
        
        if (!user) {
            return done(null, false, { message: "Invalid username or password" });
        }

        return done(null, user);
    }

    get use(){
        return usePassport<LocalStrategy, Object, VerifyFunction>(
            "local", 
            LocalStrategy,
            {username: "username", password: "password"}, 
            this.validate
        )
    }
}