import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { HttpResponse } from "../../shared/response/http.response";
import { DeleteResult, UpdateResult } from "typeorm";

/**
 * @version 1.0.0
 * @author Emiliano Gonzalez
 * @class UserController
 * @description Clase que se encarga de manejar la logica de los usuarios en el sistema de rutas
 * @method getUsers - Método que se encarga de retornar todos los usuarios
 * @method getUser - Método que se encarga de retornar un usuario
 * @method getUsersActive - Método que se encarga de retornar todos los usuarios activos
 * @method updateUser - Método que se encarga de actualizar un usuario
 * @method deleteUser - Método que se encarga de borrar un usuario de la base de datos
 * @method createUser - Método que se encarga de crear un usuario
 * @method getUserActive - Método que se encarga de retornar un usuario activo
 * @method updateUser - Método que se encarga de actualizar un usuario activo
 * @method deleteLogicalUser - Método que se encarga de borrar un usuario lógicamente
 * @method restoreUser - Método que se encarga de restaurar un usuario
 *
 */
export class UserController {
  constructor(
    private readonly service: UserService = new UserService(),
    private readonly httpResponse: HttpResponse = new HttpResponse(
      service.lenguaje
    )
  ) {}

  /**
   * @method getUsers - Retorna todos los usuarios
   * @returns Status 200 con los usuarios 
   * @returns Status 404 si no hay usuarios
   * @returns Status 500 si hay un error en el servidor
   */
  public async getUsers(_req: Request, res: Response) {
    try {
      const data = await this.service.findAll();
      if (data.length === 0) return this.httpResponse.NotFound(res, data);
      return this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * @method getUsersActive - Retorna todos los usuario activos
   * @returns Status 200 con el usuario activo 
   * @returns Status 404 si el usuario no existe
   * @returns Status 500 si hay un error en el servidor
   */
  public async getUsersActive(_req: Request, res: Response) {
    try {
      const data = await this.service.findAllActive();
      if (data.length === 0) return this.httpResponse.NotFound(res, data);
      return this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error(error);
      this.httpResponse.Error(res, error);
    }
  }

  /**
   * @method getUser - Retorna un usuario
   * @param id - Id del usuario
   * @returns Status 200 con el usuario 
   * @returns Status 404 si el usuario no existe
   * @returns Status 500 si hay un error en el servidor
   */
  public async getUser(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = await this.service.findById(id);
      if (!data) return this.httpResponse.NotFound(res, data);
      this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error(error);
      this.httpResponse.Error(res, error);
    }
  }

  /**
   * @method getUserActive - Retorna un usuario activo
   * @param id - Id del usuario
   * @returns Status 200 con el usuario activo 
   * @returns Status 404 si el usuario no existe
   * @returns Status 500 si hay un error en el servidor
   */
  public async getUserActive(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = await this.service.findByIdActive(id);
      if (!data) return this.httpResponse.NotFound(res, data);
      this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error(error);
      this.httpResponse.Error(res, error);
    }
  }
  /**
   * @method createUser - Crea un nuevo usuario
   * @returns Status 200 con el usuario creado o un error
   * @param user - DTO del usuario
   * @returns Status 200 con el usuario creado o un error
   */
  public async createUser(req: Request, res: Response) {
    try {
      const data = await this.service.create(req.body);
      this.httpResponse.Created(res, data);
    } catch (error) {
      console.error(error);
      this.httpResponse.Error(res, error);
    }
  }

  /**
   * @method updateUser - Actualiza un usuario
   * @param id - Id del usuario
   * @returns Status 200 con el usuario actualizado
   * @returns Status 404 si el usuario no existe
   * @Returns Status 400 si el usuario ya estaba actualizado
   * @Returns Status 500 si hay un error en el servidor
   */
  public async updateUser(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data: UpdateResult = await this.service.update(id, req.body);
      if (!data.affected) return this.httpResponse.NotFound(res, data);
      this.httpResponse.Updated(res, data);
    } catch (error) {
      console.error(error);
      this.httpResponse.Error(res, error);
    }
  }

  /**
   * @method deleteUser - Elimina un usuario definitivamente
   * @param id - Id del usuario
   * @returns Status 200 con el usuario eliminado
   * @returns Status 404 si el usuario no existe
   * @Returns Status 500 si hay un error en el servidor
   */

  public async deleteUser(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data: DeleteResult = await this.service.delete(id);
      if (!data) return this.httpResponse.NotFound(res, data);
      this.httpResponse.Deleted(res, data);
    } catch (error) {
      console.error(error);
      this.httpResponse.Error(res, error);
    }
  }

  /**
   * @method deleteLogicalUser - Elimina un usuario lógicamente
   * @param id - Id del usuario
   * @returns Status 200 con el usuario eliminado
   * @returns Status 404 si el usuario no existe
   * @Returns Status 400 si el usuario ya estaba eliminado
   * @returns Status 500 si hay un error en el servidor
   *
   */
  public async deleteLogicalUser(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const user = await this.service.findById(id);

      if (!user?.isActive) return this.httpResponse.BadRequest(res, user);

      const data: UpdateResult = await this.service.deleteLogic(id);
      if (!data.affected) return this.httpResponse.NotFound(res, data);
      this.httpResponse.Deleted(res, data);
    } catch (error) {
      console.error(error);
      this.httpResponse.Error(res, error);
    }
  }

  /**
   * @method restoreUser - Restaura un usuario
   * @param id - Id del usuario
   * @returns Status 200 con el usuario restaurado
   * @returns Status 404 si el usuario no existe
   * @Returns Status 400 si el usuario ya estaba activo
   * @returns Status 500 si hay un error en el servidor
   */
  public async restoreUser(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const user = await this.service.findById(id);

      if (user?.isActive) return this.httpResponse.BadRequest(res, user);

      const data: UpdateResult = await this.service.restore(id);
      if (!data.affected) return this.httpResponse.NotFound(res, data);
      this.httpResponse.Updated(res, data);
    } catch (error) {
      console.error(error);
      this.httpResponse.Error(res, error);
    }
  }
}
