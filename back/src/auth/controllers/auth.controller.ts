import { Request, Response } from "express";
import { AuthService } from "../services/auth.services";
import { AuthHttpResponse } from "../response/auth.http.response";
import { UserEntity } from "../../user/entities/user.entity";
import { GlobalExceptionHandling } from "../../shared/exception/global.exception.handling";

/**
 * @class AuthController
 * @author Emiliano Gonzalez
 * @version 1.0.0
 * @description Clase que se encarga de manejar las peticiones de login y registro  
 * @method login - Método que se encarga de manejar las peticiones de login
 * @method register - Método que se encarga de manejar las peticiones de registro
 * 
 */
export class AuthController{

    constructor(
        private readonly authService: AuthService = new AuthService(),
        private readonly authHttpResponse: AuthHttpResponse = new AuthHttpResponse(authService.getEnvironment("LENGUAGE")),
        private readonly globalExceptionHandler: GlobalExceptionHandling = new GlobalExceptionHandling(authService.getEnvironment("LENGUAGE"))
    ) {
    }

    /**
     * @method login
     * @param req 
     * @param res 
     * @returns status 200 con {accessToken: token, user: user}
     * @returns status 500 si hay un error en el servidor
     * @returns status 401 si el usuario no existe
     */
    async login (req: Request, res: Response) {
        try {
            const userEncode =req.user as UserEntity;
            const encode = await this.authService.generateToken(userEncode);
            if(!encode) return this.authHttpResponse.Unauthorized(res);

            res.header('Content-Type', 'application/json');
            res.cookie('access_token', encode, {
                maxAge: 1000 * 60 * 60 * 24 * 30, // 30 dias
            })
            res.write(JSON.stringify(encode));
            res.end();
            
        } catch (error) {
            if(error instanceof Error) return this.globalExceptionHandler.handleErrors(error, res);
        }
    }

    /**
     * @method register
     * @param req 
     * @param res 
     * @returns status 200 con {accessToken: token, user: user}
     * @returns status 400 si el usuario ya existe, si el email ya existe
     * @returns status 500 si hay un error en el servidor
     */
    async register (req: Request, res: Response) {
        try {
            const user = await this.authService.createUser(req, res);
            const encode = await this.authService.generateToken(user);

            res.header('Content-Type', 'application/json');
            res.cookie('access_token', encode, {
                maxAge: 1000 * 60 * 60 * 24 * 30, // 30 dias
            })
            res.write(JSON.stringify(encode));
            res.end();
        } catch (error) {
            if(error instanceof Error) return this.globalExceptionHandler.handleErrors(error, res);
        }
    }
}