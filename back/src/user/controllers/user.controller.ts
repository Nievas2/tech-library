import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { DeleteResult, UpdateResult } from "typeorm";
import { UserHttpResponse } from "../response/user.http.response";
import { GlobalExceptionHandling } from "../../shared/exception/global.exception.handling";
import { UserEntity } from "../entities/user.entity";
import { PayloadToken } from "../../auth/interfaces/auth.interface";

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
    private readonly userHttpResponse: UserHttpResponse = new UserHttpResponse(
      service.lenguaje
    ),
    private readonly globalExceptionHandler: GlobalExceptionHandling = new GlobalExceptionHandling(service.lenguaje)
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
      if (data.length === 0) return this.userHttpResponse.BadRequestUserNotFound(res, data);
      return this.userHttpResponse.Ok(res, data);
    } catch (error) {
      if(error instanceof Error) return this.globalExceptionHandler.handleErrors(error, res);
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
      if (data.length === 0) return this.userHttpResponse.BadRequestUserNotFound(res, data);
      return this.userHttpResponse.Ok(res, data);
    } catch (error) {
      console.error(error);
      if(error instanceof Error) return this.globalExceptionHandler.handleErrors(error, res);
    }
  }

  /**
   * @method getUser - Retorna un usuario
   * @property id - Id del usuario
   * @returns Status 200 con el usuario 
   * @returns Status 404 si el usuario no existe
   * @returns Status 500 si hay un error en el servidor
   */
  public async getUser(req: Request, res: Response) {
    try {
      const userAuth = req.user as PayloadToken;
      const id = Number(req.params.id);
      const data = await this.service.findById(id, userAuth);
      this.userHttpResponse.Ok(res, data);
    } catch (error) {
      if(error instanceof Error) return this.globalExceptionHandler.handleErrors(error, res);
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
      const userAuth = req.user as UserEntity;
      const id = Number(req.params.id);
      const data = await this.service.findByIdActive(id, userAuth);
      this.userHttpResponse.Ok(res, data);
    } catch (error) {
      if(error instanceof Error) return this.globalExceptionHandler.handleErrors(error, res);
    }
  }

  /**
   * @method existUser - Retorna si existe un usuario en la base de datos
   * @param username - Nombre de usuario
   * @returns Status 200 true si el usuario existe, false si no existe
   * @returns Status 500 si hay un error en el servidor
   */
  public async existUser(req: Request, res: Response) {
    try {
      const username = req.params.username as string;
      if(!username) return this.userHttpResponse.BadRequestUserUsernameInvalid(res);
      const data = await this.service.existUserByUsername(username);
      this.userHttpResponse.Ok(res, data);
    } catch (error) {
      if(error instanceof Error) return this.globalExceptionHandler.handleErrors(error, res);
    }
  }

  /**
   * @method existEmail - Retorna si existe un email en la base de datos
   * @param email - Email del usuario
   * @returns Status 200 true si el email existe, false si no existe
   * @returns Status 500 si hay un error en el servidor
   */
  public async existEmail(req: Request, res: Response) {
    try {
      const email = req.params.email as string;
      if(!email) return this.userHttpResponse.BadRequestUserEmailInvalid(res);
      const data = await this.service.existUserByEmail(email);
      this.userHttpResponse.Ok(res, data);
    } catch (error) {
      if(error instanceof Error) return this.globalExceptionHandler.handleErrors(error, res);
  }
}

  /**
   * @method createUser - Crea un nuevo usuario
   * @param user - DTO del usuario
   * @returns Status 200 con el usuario creado
   * @returns Status 400 si el usuario ya existe
   * @returns Status 500 si hay un error en el servidor
   */
  public async createUser(req: Request, res: Response) {
    try {
      const data = await this.service.create(req.body);
      this.userHttpResponse.Created(res, data);
    }
    catch (e) {
      if(e instanceof Error) return this.globalExceptionHandler.handleErrors(e, res);
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
  public async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const userAuth = req.user as PayloadToken;
      const data = await this.service.update(id, req.body, userAuth);
      this.userHttpResponse.Ok(res, data);
    } catch (e) {
      if(e instanceof Error) return this.globalExceptionHandler.handleErrors(e, res);
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
      if (!data) return this.userHttpResponse.BadRequestUserNotFound(res, data);
      this.userHttpResponse.Deleted(res, data);
    } catch (e) {
      if(e instanceof Error) return this.globalExceptionHandler.handleErrors(e, res);
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
      const userAuth = req.user as PayloadToken;
      const id = Number(req.params.id);
      const user = await this.service.findById(id, userAuth);

      if (!user?.isActive) return this.userHttpResponse.BadRequestUserAlreadyDisabled(res, user);

      const data: UpdateResult = await this.service.deleteLogic(id);
      if (!data.affected) return this.userHttpResponse.BadRequestUpdatedUser(res, data);
      this.userHttpResponse.Deleted(res, data);
    } catch (e) {
      if(e instanceof Error) return this.globalExceptionHandler.handleErrors(e, res);
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
      const userAuth = req.user as PayloadToken;
      const user = await this.service.findById(id, userAuth);

      if (user?.isActive) return this.userHttpResponse.BadRequestUserAlreadyActive(res, user);

      const data: UpdateResult = await this.service.restore(id);
      if (!data.affected) return this.userHttpResponse.BadRequestUpdatedUser(res, data);
      this.userHttpResponse.Updated(res, data);
    } catch (e) {
      if(e instanceof Error) return this.globalExceptionHandler.handleErrors(e, res);
    }
  }
}
