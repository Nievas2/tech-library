import { Strategy as LocalStrategy, VerifyFunction } from "passport-local";
import { UserEntity } from "../../user/entities/user.entity";
import { AuthService } from "../services/auth.services";
import { usePassport } from "../utils/passport.use";
import { UserAuthValidate } from "../interfaces/user.auth.validate";

const authService: AuthService = new AuthService();

export class LoginLocalStrategy {
    async validate(
        username: string,
        password: string,
        done: any
    ): Promise<UserEntity>{
        const user: UserAuthValidate = await authService.validateUser(username, password);
        
        if (!user.existUser && !user.passwordOk) {
            return done(null, false, {status: 401, statusMessage: "Invalid user and password"});
        }
        if (!user.existUser) {
            return done(null, false, {status: 401, statusMessage: "Invalid user"});
        }
        if (!user.passwordOk) {
            return done(null, false, {status: 401, statusMessage: "Invalid password"});
        }
        return done(null, user.user);

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