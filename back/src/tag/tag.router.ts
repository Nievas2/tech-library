import { BaseRouter } from "./../shared/router/router";
import { TagController } from "./controllers/tag.controller";
import { TagMiddleware } from "./middlewares/tag.middleware";

/**
 * @version 1.0.0
 * @author Emiliano Gonzalez
 * @class TagRouter
 * @description Clase que se encarga de registrar las rutas para el controlador de tags
 * @method routes - Método sobreescripto que se encarga de registrar las rutas
 * @method constructor - Constructor de la clase TagRouter para registrar las rutas
 */
export class TagRouter extends BaseRouter<TagController, TagMiddleware> {
    constructor() {
        super(TagController, TagMiddleware);
    }

    public routes(): void {
        this.router.get('/tag/all', (req, res) => this.controller.getTags( req, res))
        this.router.get('/tag/:id', (req, res) => this.controller.getTag( req, res))
        this.router.post('/tag/create', (req, res, next) => [this.middleware.tagCreateValidator( req, res, next)] , (req, res) => this.controller.createTag( req, res))
        this.router.put('/tag/update/:id', (req, res, next) => [this.middleware.tagUpdateValidator( req, res, next)], (req, res) => this.controller.updateTag( req, res))
        this.router.delete('/tag/delete/:id', (req, res) => this.controller.deleteTag( req, res));
    }
}