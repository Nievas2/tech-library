import { Request, Response } from "express";

/**
 * @version 1.0.0
 * @author Emiliano Gonzalez
 * @class TagController
 * @description Clase que se encarga de manejar la logica de los tags en el sistema
 * @method getTags - Método que se encarga de retornar un tag
 */
export class TagController {

    public getTags(_req: Request, res: Response) {
        res.status(200).json({ tag: "test" });
    }
}