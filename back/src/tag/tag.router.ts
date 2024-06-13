import { BaseRouter } from "./../shared/router/router";
import { TagController } from "./controllers/tag.controller";

/**
 * @version 1.0.0
 * @author Emiliano Gonzalez
 * @class TagRouter
 * @description Clase que se encarga de registrar las rutas para el controlador de tags
 * @method routes - Método sobreescripto que se encarga de registrar las rutas
 * @method constructor - Constructor de la clase TagRouter para registrar las rutas
 */
export class TagRouter extends BaseRouter<TagController> {
    constructor() {
        super(TagController);
    }

    public routes(): void {
        this.router.get('/tag', (req, res) => this.controller.getTags( req, res));
    }
}