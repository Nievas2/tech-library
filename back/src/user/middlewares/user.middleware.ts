import { NextFunction, Request, Response } from "express";
import { UserDTO, UserUpdateDTO } from "../entities/user.dto";
import { BaseMiddleware } from "../../shared/middlewares/base.middleware";

/**
 * @version 1.0.0
 * @author Emiliano Gonzalez
 * @class UserMiddleware
 * @description Clase que se encarga de validar los datos para el controlador de usuarios
 * @method userValidator - Método que se encarga de validar los datos para crear un usuario
 * @method userUpdateValidator - Método que se encarga de validar los datos para actualizar un usuario
 */
export class UserMiddleware extends BaseMiddleware<UserDTO | UserUpdateDTO> {

  constructor() {
    super();
  }
    
  public userValidator(req: Request, res: Response, next: NextFunction) {
    const {username, password, email} = req.body;

    const post = new UserDTO();

    post.username = username;
    post.password = password;
    post.email = email;

    this.validator(post, res, next);
  }

  public userUpdateValidator(req: Request, res: Response, next: NextFunction) {
    const {username, password, email} = req.body;

    const post = new UserUpdateDTO();

    if (username) post.username = username;
    if (password) post.password = password;
    if (email) post.email = email;

    this.validator(post, res, next);
  }
}
