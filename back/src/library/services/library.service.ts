import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { UserNotFoundException } from "../../user/exceptions/user.notfound.exception";
import { UserService } from "../../user/services/user.service";
import {
  LibraryCreateDTO,
  LibraryResponseDTO,
  LibraryUpdateDTO,
} from "../entities/library.dto";
import { LibraryEntity } from "../entities/library.entity";
import { UserEntity } from "../../user/entities/user.entity";
import { State } from "../statate.enum";
import { TagEntity } from "../../tag/entities/tag.entity";
import { TagService } from "../../tag/services/tag.service";
import { TagNotFoundException } from "../../tag/exceptions/tag.notfound.exception";
import { LibraryNotFoundException } from "../exception/library.notfound";
import { LibraryAlreadyExistException } from "../exception/library.already.exist";
import { LikeService } from "../../like/service/like.service";
import { UserResponseDTO } from "../../user/entities/user.dto";

/**
 * @version 1.0.0
 * @author Emilio Gonzalez
 * @class LibraryService
 * @description Clase que representa un servicio de librerias en el sistema y maneja la logica de las librerias
 * @method findAll - Retorna todas las librerias
 * @method findAllActive - Retorna todos las librerias activas
 * @method findAllStatusActive - Retorna todos las librerias con estado activo y si el usuario le ha dado me gusta
 * @method findAllStatusPending - Retorna todos las librerias con estado pendiente
 * @method findAllStatusInactive - Retorna todos las librerias con estado inactivo
 * @method findById - Retorna una libreria por su id
 * @method findyAllByUserId - Retorna todas las librerias creadas por un usuario
 * @method create - Crea una libreria
 * @method update - Actualiza una libreria
 * @method delete - Elimina una libreria definitivamente
 * @method deleteLogic - Elimina una libreria logicamente
 * @method restoreLogic - Restaura una libreria logicamente
 *
 */
export class LibraryService extends BaseService<LibraryEntity> {
  constructor(
    private readonly userService: UserService = new UserService(),
    private readonly tagService: TagService = new TagService(),
    private readonly likeService: LikeService = new LikeService()
  ) {
    super(LibraryEntity);
  }

  //--------------------------FIND METHODS-----------------------------

  /**
   * @method findAll - Retorna todas las librerias
   * @returns Promise<LibraryEntity[]>
   */
  async findAll(): Promise<LibraryEntity[]> {
    const data = await (await this.execRepository).find();
    return data;
  }

  /**
   * @method findAllActive - Retorna todos las librerias activas y si el usuario le ha dado me gusta a cada una
   * @returns Promise<LibraryResponseDTO[]>
   * @param idUsuario - Id del usuario
   */
  async findAllActive(idUsuario: number): Promise<LibraryResponseDTO[]> {
     const data = await (await this.execRepository).find({
      where: {
        isActive: true,
      },
    });
    const user: UserEntity = await this.findUserById(idUsuario);

    return await this.createResponseDTO(data, user);
  }

  /**
   * @method findAllStatusActive - Retorna todos las librerias con estado activo
   * @returns Promise<LibraryEntity[]>
   */
  async findAllStatusActive(): Promise<LibraryEntity[]> {
    return (await this.execRepository).find({
      where: {
        state: State.ACTIVE,
      },
    });
  }

  /**
   * @method findAllStatusPending - Retorna todos las librerias con estado pendiente
   * @returns Promise<LibraryEntity[]>
   */
  async findAllStatusPending(): Promise<LibraryEntity[]> {
    return (await this.execRepository).find({
      where: {
        state: State.PENDING,
      },
    });
  }

  /**
   * @method findAllStatusInactive - Retorna todos las librerias con estado inactivo
   * @returns Promise<LibraryEntity[]>
   */
  async findAllStatusInactive(): Promise<LibraryEntity[]> {
    return (await this.execRepository).find({
      where: {
        state: State.INACTIVE,
      },
    });
  }

  /**
   * @method findyAllByUserId - Retorna todas las librerias creadas por un usuario y si el usuario le ha dado me gusta
   * @returns Promise<LibraryResponseDTO[]>
   * @param id
   * @throws {UserNotFoundException}
   */
  async findyAllByUserId(id: number): Promise<LibraryResponseDTO[]> {
    const user: UserEntity = await this.findUserById(id);
    const data = await (await this.execRepository).find({
      where: {
        createdBy: {
          id: user.id,
        },
      },
    });

    return await this.createResponseDTO(data, user);
  }

  /**
   * @method findById - Retorna una libreria por su id
   * @returns Promise<LibraryEntity | null>
   * @param id
   */
  async findById(id: number): Promise<LibraryEntity | null> {
    await this.exists(id);
    return (await this.execRepository).findOneBy({ id: id });
  }

  /**
   * @method findByIdActive - Retorna una libreria por su id activa
   * @returns Promise<LibraryEntity | null>
   * @param id
   */
  async findByIdActive(id: number): Promise<LibraryEntity | null> {
    await this.exists(id);
    return (await this.execRepository).findOneBy({ id: id, isActive: true });
  }

  //--------------------------CREATE METHOD-----------------------------

  /**
   * @method create - Crea una libreria
   * @returns Promise<LibraryEntity>
   * @param libraryDto
   * @param idUsuario
   * @throws {UserNotFoundException}
   * @throws {LibraryAlreadyExistsException}
   * @throws {TagNotFoundException}
   */
  async create(
    libraryDto: LibraryCreateDTO,
    idUsuario: number
  ): Promise<LibraryEntity> {
    const user = await this.findUserById(idUsuario);

    const tags = await this.getTags(libraryDto.tags);

    await this.existsByName(libraryDto.name);

    const library = new LibraryEntity(
      libraryDto.name,
      libraryDto.description,
      libraryDto.link,
      tags,
      user
    );

    return (await this.execRepository).save(library);
  }

  //--------------------------UPDATE METHODS-----------------------------

  /**
   * @method update - Actualiza una libreria
   * @returns Promise<UpdateResult>
   * @param id
   * @param library
   * @throws {LibraryNotFoundException}
   * @throws {TagNotFoundException}
   * @throws {LibraryAlreadyExistsException}
   * @throws {UserNotFoundException}
   */
  async update(id: number, library: LibraryUpdateDTO): Promise<UpdateResult> {
    const tags = await this.getTags(library.tags);

    const libraryUpdate = await (
      await this.execRepository
    ).findOneBy({ id: id });

    await this.existsByName(library.name);

    if (libraryUpdate != null) {
      if (library.name != null) libraryUpdate.name = library.name;
      if (library.description != null)
        libraryUpdate.description = library.description;
      if (library.link != null) libraryUpdate.link = library.link;
      if (library.tags != null) libraryUpdate.tags = tags;
      return (await this.execRepository).update(id, libraryUpdate);
    }
    throw new LibraryNotFoundException("Library not found");
  }

  /**
   * @method restoreLogic - Restaura una libreria logicamente
   * @returns Promise<UpdateResult>
   * @param id - Id de la libreria
   * @throws {LibraryNotFoundException}
   */
  async restoreLogic(id: number): Promise<UpdateResult> {
    await this.exists(id);
    return (await this.execRepository).update(id, { isActive: true });
  }

  /**
   * @method setStateActive - Actualiza el estado de una libreria activa
   * @returns Promise<UpdateResult>
   * @param id - Id de la libreria
   */
  async setStateActive(id: number): Promise<UpdateResult> {
    await this.exists(id);
    return (await this.execRepository).update(id, { state: State.ACTIVE });
  }

  /**
   * @method setStatePending - Actualiza el estado de una libreria pendiente
   * @returns Promise<UpdateResult>
   * @param id - Id de la libreria
   */
  async setStatePending(id: number): Promise<UpdateResult> {
    await this.exists(id);
    return (await this.execRepository).update(id, { state: State.PENDING });
  }

  /**
   * @method setStateInactive - Actualiza el estado de una libreria inactiva
   * @returns Promise<UpdateResult>
   * @param id - Id de la libreria
   */
  async setStateInactive(id: number): Promise<UpdateResult> {
    await this.exists(id);
    return (await this.execRepository).update(id, { state: State.INACTIVE });
  }

  //--------------------------DELETE METHODS-----------------------------

  /**
   * @method deleteLogic - Elimina una libreria logicamente
   * @returns Promise<UpdateResult>
   * @param id - Id de la libreria
   * @throws {LibraryNotFoundException}
   */
  async deleteLogic(id: number): Promise<UpdateResult> {
    await this.exists(id);
    return (await this.execRepository).update(id, { isActive: false });
  }

  /**
   * @method delete - Elimina una libreria definitivamente
   * @returns Promise<DeleteResult>
   * @param id - Id de la libreria
   */
  async delete(id: number): Promise<DeleteResult> {
    await this.exists(id);
    return (await this.execRepository).delete(id);
  }

  //--------------------------HELPERs METHODS-----------------------------

  /**
   * @description Comprueba si la libreria existe
   * @param id - Id de la libreria
   * @throws {LibraryNotFoundException}
   */
  private async exists(id: number): Promise<void> {
    const exist = await (await this.execRepository).existsBy({ id: id });
    if (!exist) throw new LibraryNotFoundException("Library not found");
  }

  /**
   * @description Comprueba si el nombre de la libreria existe
   * @param name - Nombre de la libreria
   * @throws {LibraryAlreadyExistException}
   */
  private async existsByName(name: string): Promise<void> {
    const exist = await (
      await this.execRepository
    )
      .createQueryBuilder("library")
      .where("library.name like :name", { name: `%${name}%` })
      .getExists();

    if (exist) throw new LibraryAlreadyExistException("Libary already exists");
  }

  /**
   * @description Crea el DTO de respuesta de la libreria y si el usuario le ha dado me gusta
   * @param data - Lista de librerias
   * @param user - Usuario
   * @returns Promise<LibraryResponseDTO[]>
   */

  private async createResponseDTO(data: LibraryEntity[], user: UserEntity) : Promise<LibraryResponseDTO[]> {

    const userDto: UserResponseDTO = new UserResponseDTO(user);
    const dataResponse = await Promise.all(
      data.map(async (library) => {
        const response: LibraryResponseDTO = new LibraryResponseDTO(library, userDto);
        if (await this.likeService.userLikeThisLibrary(user.id, library.id)) {
          response.liked = true;
          return response;
        }

        response.liked = false;
        return response;
      })
    );

    return dataResponse;

  }

  //--------------------------HELPERs METHODS USERs-----------------------------

  /**
   * @description Comprueba si el usuario existe
   * @param id - Id del usuario
   * @throws {UserNotFoundException}
   */
  private async findUserById(id: number): Promise<UserEntity> {
    const user = await this.userService.findById(id);
    if (user !== null) return user;
    throw new UserNotFoundException("User not found");
  }

  //--------------------------HELPERs METHODS TAGS-----------------------------

  /**
   * @description Recibe una lista de ids de tags y los retorna
   * @param tags - Lista de tags
   * @returns {TagEntity[]}
   */
  private async getTags(tags: number[]): Promise<TagEntity[]> {
    const tagList: TagEntity[] = await Promise.all(
      tags.map(async (tag) => {
        return await this.getTag(tag);
      })
    );

    return tagList;
  }

  /**
   * @description Comprueba si el tag existe y lo retorna
   * @param id - Id del tag
   * @throws {TagNotFoundException}
   */

  private async getTag(id: number): Promise<TagEntity> {
    const tag = await this.tagService.findById(id);
    if (tag !== null) return tag;
    throw new TagNotFoundException("Tag not found");
  }
}
