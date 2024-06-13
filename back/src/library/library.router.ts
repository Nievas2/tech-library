import { BaseRouter } from "../shared/router/router";
import { LibraryController } from "./controllers/library.controller";

/**
 * @version 1.0.0
 * @author Emiliano Gonzalez
 * @class LibraryRouter
 * @description Clase que se encarga de registrar las rutas para el controlador de libros
 * @method routes - Método sobreescripto que se encarga de registrar las rutas
 * @method constructor - Constructor de la clase LibraryRouter para registrar las rutas
 */
export class LibraryRouter extends BaseRouter<LibraryController> {

    constructor() {
        super(LibraryController);
    }

    public routes() : void{
        this.router.get('/library', (req, res) => this.controller.getLibrary( req, res));
    }
}