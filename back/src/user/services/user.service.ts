import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { UserDTO } from "../entities/user.dto";
import { UserEntity } from "../entities/user.entity";

/**
 * @version 1.0.0
 * @author Emiliano Gonzalez
 * @class UserService
 * @description Clase que representa un servicio de usuario en el sistema y maneja la logica de los usuarios
 * @method findAll - Retorna todos los usuarios
 * @method findAllActive - Retorna todos los usuarios activos
 * @method findById - Retorna un usuario por su id
 * @method findByIdActive - Retorna un usuario activo por su id
 * @method create - Crea un usuario
 * @method update - Actualiza un usuario
 * @method delete - Elimina un usuario definitivamente
 * @method deleteLogic - Elimina un usuario logicamente
 * @method restore - Restaura un usuario eliminado logicamente
 */
export class UserService extends BaseService<UserEntity> {
  constructor() {
    super(UserEntity);
  }

  //-----------------READ METHODS-----------------

  /**
   * @method findAll - Retorna todos los usuarios
   * @returns Promise<UserEntity[]>
   */
  async findAll(): Promise<UserEntity[]> {
    return (await this.execRepository).find();
  }

  /**
   * @method findAllActive - Retorna todos los usuarios activos
   * @returns Promise<UserEntity[]>
   */
  async findAllActive(): Promise<UserEntity[]> {
    return (await this.execRepository).find({
      where: {
        isActive: true,
      },
    });
  }

  /**
   * @method findById - Retorna un usuario por su id
   * @param id - Id del usuario
   * @returns Promise<UserEntity | null>
   */
  async findById(id: number): Promise<UserEntity | null> {
    return (await this.execRepository).findOneBy({ id: id });
  }

  /**
   * @method findByIdActive - Retorna un usuario activo por su id
   * @param id - Id del usuario
   * @returns Promise<UserEntity | null>
   */
  async findByIdActive(id: number): Promise<UserEntity | null> {
    return (await this.execRepository).findOneBy({ id: id, isActive: true });
  }

  //-----------------CREATE METHODS-----------------

  /**
   * @method create - Crea un usuario
   * @param user - DTO del usuario
   * @returns Promise<UserEntity>
   */
  async create(user: UserDTO): Promise<UserEntity> {
    return (await this.execRepository).save(user);
  }

  //-----------------UPDATE METHODS-----------------


  /**
   * @method update - Actualiza un usuario
   * @param id - Id del usuario
   * @param user - DTO del usuario
   * @returns Promise<UpdateResult>
   */
  async update(id: number, user: UserDTO): Promise<UpdateResult> {
    return (await this.execRepository).update(id, user);
  }

  /**
   * @method restore - Restaura un usuario
   * @param id - Id del usuario
   * @returns Promise<UpdateResult>
   */
  async restore(id: number): Promise<UpdateResult> {
    return (await this.execRepository).update(id, { isActive: true });
  }

  /**
   * @method deleteLogic - Elimina un usuario logicamente sin borrar de la base de datos
   * @param id - Id del usuario
   * @returns Promise<UpdateResult>
   *
   */
  async deleteLogic(id: number): Promise<UpdateResult> {
    return (await this.execRepository).update(id, { isActive: false });
  }

  //----------------DELETE METHODS-----------------

  /**
   * @method delete - Elimina un usuario definitivamente
   * @param id - Id del usuario
   * @returns Promise<DeleteResult>
   */
  async delete(id: number): Promise<DeleteResult> {
    return (await this.execRepository).delete(id);
  }
}
