import { Router } from "express";
/**
 * @version 1.0.0
 * @author Emiliano Gonzalez
 * @class BaseRouter
 * @description Clase que se encarga de registrar las rutas
 * @param {T} TController - Clase generica del controlador el cual contiene la logica de las rutas
 * @method routes - Método sobreescripto que se encarga de registrar las rutas
 * @method constructor - Constructor de la clase BaseRouter para registrar las rutas
 * @method routes - Método que se encarga de registrar las rutas
 */
export abstract class BaseRouter<T, U> {
    public router: Router;

    public controller: T;

    public middleware: U;

    constructor(TController: {new (): T}, UMiddleware: {new (): U}) {
        this.router = Router();
        this.controller = new TController();
        this.middleware = new UMiddleware();

        this.routes();
    }

    public  routes() : void{
    }
}