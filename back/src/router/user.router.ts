import { UserController } from "../controllers/user.controller";
import { BaseRouter } from "./router";

/**
 * @version 1.0.0
 * @author Emiliano Gonzalez
 * @class UserRouter
 * @description Clase que se encarga de registrar las rutas para el controlador de usuarios
 * @method routes - Método sobreescripto que se encarga de registrar las rutas
 * @method constructor - Constructor de la clase UserRouter para registrar las rutas
 * 
*/
export class UserRouter extends BaseRouter<UserController>{
    constructor() {
        super(UserController);
    }

    public routes(): void {
        this.router.get('/user', (req, res) => this.controller.getUsers( req, res));
    }
}