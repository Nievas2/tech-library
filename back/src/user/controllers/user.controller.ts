import { Request, Response } from "express";
import { UserService } from "../services/user.service";

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

    constructor(private readonly service: UserService = new UserService()) { }


    /**
     * @method getUsers - Retorna todos los usuarios 
     * @returns Status 200 con los usuarios o un error
     */
    public async getUsers(_req: Request, res: Response) {
        try {
            const data = await this.service.findAll();
            res.status(200).json(data);
        } catch (error) {
            console.error(error);
        }
    }
    /**
     * @method getUsersActive - Retorna todos los usuario activos
     * @returns Status 200 con el usuario activo o un error
     */
    public async getUsersActive(_req: Request, res: Response) {
        try {
            const data = await this.service.findAllActive();
            res.status(200).json(data);
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * @method getUser - Retorna un usuario
     * @param id - Id del usuario
     * @returns Status 200 con el usuario o un error
     */
    public async getUser(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const data = await this.service.findById(id);
            res.status(200).json(data);
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * @method getUserActive - Retorna un usuario activo
     * @param id - Id del usuario
     * @returns Status 200 con el usuario activo o un error
     */
    public async getUserActive(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const data = await this.service.findByIdActive(id);
            res.status(200).json(data);
        } catch (error) {
            console.error(error);
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
            res.status(200).json(data);
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * @method updateUser - Actualiza un usuario
     * @param id - Id del usuario
     * @returns Status 200 con el usuario actualizado o un error
     */
    public async updateUser(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const data = await this.service.update(id, req.body);
            res.status(200).json(data);
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * @method deleteUser - Elimina un usuario definitivamente
     * @param id - Id del usuario
     * @returns Status 200 con el usuario eliminado o un error
     */

    public async deleteUser(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const data = await this.service.delete(id);
            res.status(200).json(data);
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * @method deleteLogicalUser - Elimina un usuario lógicamente sin borrar de la base de datos
     * @param id - Id del usuario
     * @returns Status 200 con el usuario eliminado o un error
     */
    public async deleteLogicalUser(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const data = await this.service.deleteLogic(id);
            res.status(200).json(data);
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * @method restoreUser - Restaura un usuario
     * @param id - Id del usuario
     * @returns Status 200 con el usuario restaurado o un error
     */
    public async restoreUser(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const data = await this.service.restore(id);
            res.status(200).json(data);
        } catch (error) {
            console.error(error);
        }
    }
}