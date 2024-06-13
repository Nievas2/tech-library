import { Request, Response } from "express";

/**
 * @version 1.0.0
 * @author Emiliano Gonzalez
 * @class UserController
 * @description Clase que se encarga de manejar la logica de los usuarios en el sistema
 * @method getUsers - Método que se encarga de retornar un usuario
 */
export class UserController {

    public getUsers(_req: Request, res: Response) {
        res.status(200).json({ user: "test" });
    }
}