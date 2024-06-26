import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { UserDTO, UserResponseDTO } from "../entities/user.dto";
import { UserEntity } from "../entities/user.entity";
import { UserNotFoundException } from "../exceptions/user.notfound.exception";
import {
  UserAlreadyExistByEmailException,
  UserAlreadyExistByUsernameException,
  UserAlreadyExistException,
} from "../exceptions/user.alreadyexist.exception";

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
   * @returns Promise<UserResponseDTO[]>
   */
  async findAll(): Promise<UserResponseDTO[]> {
    const data = await (await this.execRepository).find();
    return data.map(user => new UserResponseDTO(user));
  }

  /**
   * @method findAllActive - Retorna todos los usuarios activos
   * @returns Promise<UserResponseDTO[]>
   */
  async findAllActive(): Promise<UserResponseDTO[]> {
    const data = await (await this.execRepository).find({
      where: {
        isActive: true,
      },
    })
    return data.map(user => new UserResponseDTO(user));
  }

  /**
   * @method findById - Retorna un usuario por su id
   * @param id - Id del usuario
   * @returns Promise<UserResponseDTO>
   */
  async findById(iduser: number): Promise<UserEntity> {
    const data = await (await this.execRepository).findOneBy({ id: iduser });
    if (data === null) throw new UserNotFoundException("User not found");
    return data;
  }
  /**
   * @method findById - Retorna un usuario por su id
   * @param id - Id del usuario
   * @returns Promise<UserResponseDTO>
   */
  async findByIdDTO(iduser: number): Promise<UserResponseDTO> {
    const data = await this.findById(iduser);
    return new UserResponseDTO(data);
  }

  /**
   * @method findByIdActive - Retorna un usuario activo por su id
   * @param id - Id del usuario
   * @returns Promise<UserResponseDTO>
   */
  async findByIdActive(id: number): Promise<UserEntity> {
    const data = await (await this.execRepository).findOneBy({ id: id, isActive: true });
    if (data === null) throw new UserNotFoundException("User not found");
    return data;
  }

  
  /**
   * @method findByIdActiveDto - Retorna un DTO del usuario activo por su id
   * @param id - Id del usuario
   * @returns Promise<UserResponseDTO>
   */
  async findByIdActiveDto(id: number): Promise<UserResponseDTO> {
   const data = await this.findByIdActive(id);
    return new UserResponseDTO(data);
  }

  //-----------------CREATE METHODS-----------------

  /**
   * @method create - Crea un usuario
   * @param user - DTO del usuario
   * @returns Promise<UserResponseDTO>
   * @throws {UserAlreadyExistException} - Error si el usuario ya existe
   * @throws {UserAlreadyExistByEmailException} - Error si el usuario ya existe con el mismo email
   * @throws {UserAlreadyExistByUsernameException} - Error si el usuario ya existe con el mismo username
   */
  async create(user: UserDTO): Promise<UserResponseDTO> {
    await this.existsByEmailAndUsername(user.username, user.email);
    const userEntity = new UserEntity(user.username, user.password, user.email);
    await (await this.execRepository).save(userEntity);
    return new UserResponseDTO(userEntity);
  }

  //-----------------UPDATE METHODS-----------------

  /**
   * @method update - Actualiza un usuario
   * @param id - Id del usuario
   * @param user - DTO del usuario
   * @returns Promise<UpdateResult>
   */
  async update(id: number, user: UserDTO): Promise<UpdateResult> {
    await this.existsById(id);
    return (await this.execRepository).update(id, user);
  }

  /**
   * @method restore - Restaura un usuario
   * @param id - Id del usuario
   * @returns Promise<UpdateResult>
   */
  async restore(id: number): Promise<UpdateResult> {
    await this.existsById(id);
    return (await this.execRepository).update(id, { isActive: true });
  }

  /**
   * @method deleteLogic - Elimina un usuario logicamente sin borrar de la base de datos
   * @param id - Id del usuario
   * @returns Promise<UpdateResult>
   *
   */
  async deleteLogic(id: number): Promise<UpdateResult> {
    await this.existsById(id);
    return (await this.execRepository).update(id, { isActive: false });
  }

  //----------------DELETE METHODS-----------------

  /**
   * @method delete - Elimina un usuario definitivamente
   * @param id - Id del usuario
   * @returns Promise<DeleteResult>
   */
  async delete(id: number): Promise<DeleteResult> {
    await this.existsById(id);
    return (await this.execRepository).delete(id);
  }

  //-----------------HELPERS-----------------

  /**
   * @method existsById - Verifica si un usuario existe por su id
   * @param id - Id del usuario
   * @returns Promise<void>
   * @throws {UserNotFoundException} - Error si el usuario no existe
   */
  private async existsById(id: number): Promise<void> {
    const exist = await (await this.execRepository).existsBy({ id: id });
    if (!exist) throw new UserNotFoundException("User not found");
  }

  /**
   * @method existsByEmailAndUsername - Verifica si un usuario ya existe con el mismo email y username
   * @param usarname - Nombre de usuario
   * @param email - Email del usuario
   * @returns Promise<void> 
   * @throws {UserAlreadyExistException} - Error si el usuario ya existe con el mismo email y username
   * @throws {UserAlreadyExistByEmailException} - Error si el usuario ya existe con el mismo email
   * @throws {UserAlreadyExistByUsernameException} - Error si el usuario ya existe con el mismo username
   */
  private async existsByEmailAndUsername(
    usarname: string,
    email: string
  ): Promise<void> {
    const existByUsername = await (
      await this.execRepository
    ).existsBy({ username: usarname });
    const existByEmail = await (
      await this.execRepository
    ).existsBy({ email: email });

    if (existByUsername && existByEmail)
      throw new UserAlreadyExistException(
        `User already exist with this email and username: ${email} and ${usarname}`
      );
    if (existByEmail)
      throw new UserAlreadyExistByEmailException(
        `User already exist with this email: ${email}`
      );
    if (existByUsername)
      throw new UserAlreadyExistByUsernameException(
        `User already exist with this username: ${usarname}`
      );
  }
}
