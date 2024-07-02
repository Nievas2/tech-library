import { NextFunction, Request, Response } from "express";
import { BaseMiddleware } from "../../shared/middlewares/base.middleware";
import {
  LibraryCreateDTO,
  LibraryCustomQueryDTO,
  LibraryUpdateDTO,
} from "../entities/library.dto";

/**
 * @version 1.0.0
 * @author Emiliano Gonzalez
 * @class LibraryMiddleware
 * @description Clase que se encarga de validar los datos para el controlador de librerías
 * @method libraryCreateValidator - Método que se encarga de validar los datos para crear una librería
 * @method libraryUpdateValidator - Método que se encarga de validar los datos para actualizar una librería
 */
export class LibraryMiddleware extends BaseMiddleware<
  LibraryCreateDTO | LibraryUpdateDTO | LibraryCustomQueryDTO
> {
  constructor() {
    super();
  }

  public libraryCreateValidator(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { name, description, tags, link } = req.body;

    const post = new LibraryCreateDTO();

    post.name = name;
    post.description = description;
    post.tags = tags;
    post.link = link;

    this.validator(post, res, next);
  }

  public libraryUpdateAdminValidator(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { name, description, tags, link, state } = req.body;

    const post = new LibraryUpdateDTO();

    if (name) post.name = name;
    if (description) post.description = description;
    if (tags) post.tags = tags;
    if (link) post.link = link;
    if (state) post.state = state;

    this.validator(post, res, next);
  }

  public libraryUpdateUserValidator(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { name, description, tags, link } = req.body;

    const post = new LibraryUpdateDTO();

    if (name) post.name = name;
    if (description) post.description = description;
    if (tags) post.tags = tags;
    if (link) post.link = link;

    this.validator(post, res, next);
  }

}
