import { Response, NextFunction } from 'express';
import { validate } from "class-validator";
import { BaseDTO } from '../../config/base.dto';

/**
 * @version 1.0.0
 * @author Emiliano Gonzalez
 * @class BaseMiddleware
 * @description Clase generica que se encarga de validar los datos de las rutas y controladores de la API
 */
export abstract class BaseMiddleware<T extends BaseDTO> {

    constructor() {}

    public validator(post: T , res: Response, next: NextFunction): Response | void {
        validate(post, { validationError: { target: false } }).then((errors) => {
            if (errors.length > 0) {
                return res.status(400).json(errors);
            }
            else {
                next();
            }
        })
    }
}