import { DeleteResult, UpdateResult } from "typeorm";
import * as bcrypt from "bcrypt";
import { BaseService } from "../../config/base.service";
import { UserDTO, UserResponseDTO, UserUpdateDTO } from "../entities/user.dto";
import { UserEntity } from "../entities/user.entity";
import { UserNotFoundException } from "../exceptions/user.notfound.exception";
import {
  UserAlreadyExistByEmailException,
  UserAlreadyExistByUsernameException,
  UserAlreadyExistException,
} from "../exceptions/user.alreadyexist.exception";
import { RoleType } from "../entities/role";
import { UnauthorizedException } from "../../shared/exception/unauthorized.exception";

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
    return data.map((user) => new UserResponseDTO(user));
  }

  /**
   * @method findAllActive - Retorna todos los usuarios activos
   * @returns Promise<UserResponseDTO[]>
   */
  async findAllActive(): Promise<UserResponseDTO[]> {
    const data = await (
      await this.execRepository
    ).find({
      where: {
        isActive: true,
      },
    });
    return data.map((user) => new UserResponseDTO(user));
  }

  /**
   * @method findById - Retorna un usuario por su id
   * @param id - Id del usuario
   * @returns Promise<UserResponseDTO>
   */
  async findById(iduser: number, userAuth: UserEntity): Promise<UserEntity> {
    const data = await (await this.execRepository).findOneBy({ id: iduser });
    if (data === null) throw new UserNotFoundException("User not found");
    if (userAuth.role === RoleType.ADMIN) return data;
    if (userAuth.role === RoleType.USER && userAuth.id !== iduser)
      throw new UnauthorizedException(
        "You are not authorized to perform this action"
      );
    return data;
  }
  /**
   * @method findById - Retorna un usuario por su id
   * @param id - Id del usuario
   * @returns Promise<UserResponseDTO>
   */
  async findByIdDTO(
    iduser: number,
    userAuth: UserEntity
  ): Promise<UserResponseDTO> {
    const data = await this.findById(iduser, userAuth);
    return new UserResponseDTO(data);
  }

  /**
   * @method findByIdActive - Retorna un usuario activo por su id
   * @param id - Id del usuario
   * @returns Promise<UserResponseDTO>
   */
  async findByIdActive(id: number, userAuth: UserEntity): Promise<UserEntity> {
    const data = await (
      await this.execRepository
    ).findOneBy({ id: id, isActive: true });

    if (data === null) throw new UserNotFoundException("User not found");
    if (userAuth.role === RoleType.ADMIN) return data;
    if (userAuth.role === RoleType.USER && userAuth.id !== id)
      throw new UnauthorizedException(
        "You are not authorized to perform this action"
      );
    return data;
  }

  /**
   * @method findByIdActiveDto - Retorna un DTO del usuario activo por su id
   * @param id - Id del usuario
   * @returns Promise<UserResponseDTO>
   */
  async findByIdActiveDto(id: number, userAuth: UserEntity): Promise<UserResponseDTO> {
    const data = await this.findByIdActive(id, userAuth);
    return new UserResponseDTO(data);
  }

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    const data = await (await this.execRepository)
      .createQueryBuilder("user")
      .where("user.email = :email", { email: email })
      .andWhere("user.isActive = true")
      .addSelect("user.password")
      .getOne();

    return data;
  }

  async findUserByUsername(username: string): Promise<UserEntity | null> {
    console.log(username);
    
    const data = await (await this.execRepository)
      .createQueryBuilder("user")
      .where("user.username = :username", { username: username })
      .andWhere("user.isActive = true")
      .addSelect("user.password")
      .getOne();

    return data;
  }

  async findUserWithRole(
    id: number,
    role: RoleType
  ): Promise<UserEntity | null> {
    return await (await this.execRepository).findOneBy({ id: id, role: role });
  }

  //-----------------CREATE METHODS-----------------

  /**
   * @method create - Crea un usuario
   * @param user - DTO del usuario
   * @returns Promise<UserResponseDTO>
   * @throws {UserAlreadyExistException} - Error si el usuario ya existe
   * @throws {UserAlreadyExistByEmailException} - Error si el usuario ya existe con el mismo email
   * @throws {UserAlreadyExistByUsernameException} - Error si el usuario ya existe con el mismo username
   *
   */
  async create(user: UserDTO): Promise<UserEntity> {
    await this.existsByEmailAndUsername(user.username, user.email);
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const userEntity = new UserEntity(
      user.username,
      hashedPassword,
      user.email
    );
    return await (await this.execRepository).save(userEntity);
  }

  //-----------------UPDATE METHODS-----------------

  /**
   * @method update - Actualiza un usuario
   * @param id - Id del usuario
   * @param user - DTO del usuario
   * @returns Promise<UpdateResult>
   */
  async update(
    id: number,
    user: UserUpdateDTO,
    userAuth: UserEntity
  ): Promise<UserResponseDTO> {
    const userEntity: UserEntity = await this.findById(id, userAuth);

    this.existsByEmailAndUsername(user.username, user.email);

    if (user.username) userEntity.username = user.username;
    if (user.email) userEntity.email = user.email;
    if (user.password)
      userEntity.password = user.password
        ? await bcrypt.hash(user.password, 10)
        : userEntity.password;
    if (userAuth.role === RoleType.ADMIN) {
      if (user.role) userEntity.role = user.role;
    }

    await (await this.execRepository).save(userEntity);
    return new UserResponseDTO(userEntity);
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
    username: string,
    email: string
  ): Promise<void> {
    let existByUsername: boolean = false;
    let existByEmail: boolean = false;

    if (username != undefined) {
      const usernameEntity = await (
        await this.execRepository
      ).existsBy({ username: username });
      if (usernameEntity) {
        existByUsername = true;
        throw new UserAlreadyExistByUsernameException(
          `User already exist with this username: ${username}`
        );
      }
    }

    if (email != undefined) {
      const emailEntity = await (
        await this.execRepository
      ).existsBy({ email: email });
      if (emailEntity) {
        existByEmail = true;
        throw new UserAlreadyExistByEmailException(
          `User already exist with this email: ${email}`
        );
      }
    }

    if (existByUsername && existByEmail)
      throw new UserAlreadyExistException(
        `User already exist with this email and username: ${email} and ${username}`
      );
  }
}
