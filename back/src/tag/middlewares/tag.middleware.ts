import { NextFunction, Request, Response } from "express";
import { BaseMiddleware } from "../../shared/middlewares/base.middleware";
import { TagDto, TagUpdateDto } from "../entities/tag.dto";

/**
 * @version 1.0.0
 * @author Emiliano Gonzalez
 * @class TagMiddleware
 * @description Clase que se encarga de validar los datos para el controlador de tags
 * @method tagCreateValidator - Método que se encarga de validar los datos para crear un tag
 * @method tagUpdateValidator - Método que se encarga de validar los datos para actualizar un tag
 */
export class TagMiddleware extends BaseMiddleware<TagDto | TagDto> {
  constructor() {
    super();
  }

  public tagCreateValidator(req: Request, res: Response, next: NextFunction) {
    const { name, color } = req.body;

    const post = new TagDto();

    post.name = name;
    post.color = color;

    this.validator(post, res, next);
  }

  public tagUpdateValidator(req: Request, res: Response, next: NextFunction) {
    const { name, color } = req.body;

    const post = new TagUpdateDto();

    if (name) post.name = name;
    if (color) post.color = color;

    this.validator(post, res, next);
  }
}
