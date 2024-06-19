import { Request, Response } from "express";
import { TagService } from "../services/tag.service";
import { DeleteResult, QueryFailedError, UpdateResult } from "typeorm";
import { TagHttpResponse } from "../response/tag.http.response";
import { GlobalExceptionHandling } from "../../shared/exception/global.exception.handling";

/**
 * @version 1.0.0
 * @author Emiliano Gonzalez
 * @class TagController
 * @description Clase que se encarga de manejar la logica de los tags en el sistema
 * @method getTags - Método que se encarga de retornar todos los tags
 * @method getTag - Método que se encarga de retornar un tag
 * @method createTag - Método que se encarga de crear un tag
 * @method updateTag - Método que se encarga de actualizar un tag
 * @method deleteTag - Método que se encarga de borrar un tag
 */
export class TagController {
  constructor(
    private readonly service: TagService = new TagService(),
    private readonly tagHttpResponse: TagHttpResponse = new TagHttpResponse(
      service.lenguaje
    ),
    private readonly globalExceptionHandler: GlobalExceptionHandling = new GlobalExceptionHandling(service.lenguaje)
  ) {}

  /**
   * @method getTags - Retorna una lista de todos los tags
   * @returns Status 200 con los tags
   * @returns Status 404 si no hay tags
   * @returns Status 500 si hay un error en el servidor
   */
  public async getTags(_req: Request, res: Response) {
    try {
      const data = await this.service.findAll();
      if (data.length === 0)
        return this.tagHttpResponse.BadRequestTagNotFound(res, data);
      return this.tagHttpResponse.Ok(res, data);
    } catch (error) {
      if(error instanceof Error) return this.globalExceptionHandler.handleErrors(error, res);
    }
  }

  /**
   * @method getTag - Retorna un tag
   * @property id - Id del tag
   * @returns Status 200 con el tag
   * @returns Status 404 si el tag no existe
   * @returns Status 500 si hay un error en el servidor
   */

  public async getTag(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = await this.service.findById(id);
      if (!data) return this.tagHttpResponse.BadRequestTagNotFound(res, data);
      this.tagHttpResponse.Ok(res, data);
    } catch (error) {
      console.error(error);
      if(error instanceof Error) return this.globalExceptionHandler.handleErrors(error, res);
    }
  }

  /**
   * @method createTag - Crea un nuevo tag
   * @returns Status 200 con el tag creado
   * @param tag - DTO del tag
   * @returns Status 200 con el tag creado
   * @returns Status 400 si el tag ya existe
   */
  public async createTag(req: Request, res: Response) {
    try {
      const data = await this.service.create(req.body);
      this.tagHttpResponse.Created(res, data);
    } catch (error) {
      console.error(error);
      if (error instanceof QueryFailedError) {
        if (error.driverError.code === "ER_DUP_ENTRY")
          return this.tagHttpResponse.BadRequestTagAlreadyExist(res, error);
      }
      if(error instanceof Error) return this.globalExceptionHandler.handleErrors(error, res);
    }
  }

  /**
   * @method updateTag - Actualiza un tag
   * @param id - Id del tag
   * @returns Status 200 con el tag actualizado
   * @returns Status 404 si el tag no existe
   * @Returns Status 500 si hay un error en el servidor
   */
  public async updateTag(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data: UpdateResult = await this.service.update(id, req.body);
      if (!data.affected)
        return this.tagHttpResponse.BadRequestUpdatedTag(res, data);
      this.tagHttpResponse.Updated(res, data);
    } catch (error) {
      if(error instanceof Error) return this.globalExceptionHandler.handleErrors(error, res);
    }
  }

  /**
   * @method deleteTag - Borra un tag
   * @param id - Id del tag
   * @returns Status 200 con el tag borrado
   * @returns Status 404 si el tag no existe
   * @Returns Status 500 si hay un error en el servidor
   */
  public async deleteTag(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data: DeleteResult = await this.service.delete(id);
      if (!data) return this.tagHttpResponse.BadRequestTagNotFound(res, data);
      this.tagHttpResponse.Deleted(res, data);
    } catch (error) {
      console.error(error);
      if(error instanceof Error) return this.globalExceptionHandler.handleErrors(error, res);
    }
  }
}
