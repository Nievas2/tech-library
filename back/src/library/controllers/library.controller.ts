import { Request, Response } from "express";

/**
 * @version 1.0.0
 * @author Emiliano Gonzalez
 * @class LibraryController
 * @description Clase que se encarga de manejar la logica de los libros en el sistema
 * @method getLibrary - Método que se encarga de retornar una libreria
 */
export class LibraryController {

    public getLibrary(_req: Request, res: Response) {
        res.status(200).json({ library: "test" });
    }
}