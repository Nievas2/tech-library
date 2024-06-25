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
import { State } from "../state.enum";
import { TagEntity } from "../../tag/entities/tag.entity";
import { TagService } from "../../tag/services/tag.service";
import { TagNotFoundException } from "../../tag/exceptions/tag.notfound.exception";
import { LibraryNotFoundException } from "../exception/library.notfound";
import { LibraryAlreadyExistException } from "../exception/library.already.exist";
import { LikeService } from "../../like/service/like.service";
import { LibraryAlreadyDisabledException, LibraryAlreadyEnabledException } from "../exception/library.soft.delete.exceptions";

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
   * @returns Promise<LibraryResponseDTO[]>
   */
  async findAll(): Promise<LibraryResponseDTO[]> {
    const data = await (await this.execRepository).find();
    return this.createResponseDTO(data);
  }

  /**
   * @method findAllActive - Retorna todos las librerias activas y si el usuario le ha dado me gusta a cada una, independientemente si el usuario creo la libreria o no
   * @returns Promise<LibraryResponseDTO[]>
   * @param idUsuario - Id del usuario
   * @throws {UserNotFoundException}
   */
  async findAllStatusActiveWithLike(idUsuario: number): Promise<LibraryResponseDTO[]> {
    if (idUsuario != 0) this.existsUser(idUsuario);

     const data = await (await this.execRepository).find({
      where: {
        isActive: true,
        state: State.ACTIVE,
      },
    });

    return await this.createResponseDTOWithLike(data, idUsuario);
  }

  /**
   * @method findAllStatusActive - Retorna todos las librerias con estado activo
   * @returns Promise<LibraryResponseDTO[]>
   */
  async findAllStatusActive(): Promise<LibraryResponseDTO[]> {
    return this.findAllByState(State.ACTIVE);
  }

  /**
   * @method findAllStatusPending - Retorna todos las librerias con estado pendiente
   * @returns Promise<LibraryResponseDTO[]>
   */
  async findAllStatusPending(): Promise<LibraryResponseDTO[]> {
    return this.findAllByState(State.PENDING);
  }

  /**
   * @method findAllStatusInactive - Retorna todos las librerias con estado inactivo
   * @returns Promise<LibraryResponseDTO[]>
   */
  async findAllStatusInactive(): Promise<LibraryResponseDTO[]> {
    return this.findAllByState(State.INACTIVE);
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
        isActive: true,
      },
    });

    return await this.createResponseDTOWithLike(data, id);
  }

  /**
   * @method findById - Retorna una libreria por su id
   * @returns Promise<LibraryResponseDTO>
   * @param id
   * @throws {LibraryNotFoundException}
   */
  async findById(id: number): Promise<LibraryResponseDTO> {
    const data = await (await this.execRepository).findOneBy({ id: id });
    if (data === null) throw new LibraryNotFoundException("Library not found");
    return new LibraryResponseDTO(data);
  }

  /**
   * @method findByIdActive - Retorna una libreria por su id activa
   * @returns Promise<LibraryResponseDTO>
   * @param id
   * @throws {LibraryNotFoundException}
   */
  async findByIdActive(id: number): Promise<LibraryResponseDTO> {
    const data = await (await this.execRepository).findOneBy({ id: id, isActive: true });
    if (data === null) throw new LibraryNotFoundException("Library not found");
    return new LibraryResponseDTO(data);
  }

  //--------------------------CREATE METHOD-----------------------------

  /**
   * @method create - Crea una libreria
   * @returns Promise<LibraryResponseDTO>
   * @param libraryDto
   * @param idUsuario
   * @throws {UserNotFoundException}
   * @throws {LibraryAlreadyExistsException}
   * @throws {TagNotFoundException}
   */
  async create(
    libraryDto: LibraryCreateDTO,
    idUsuario: number
  ): Promise<LibraryResponseDTO> {
    const user = await this.findUserById(idUsuario);
    await this.existsByName(libraryDto.name);
    const tags = await this.getTags(libraryDto.tags);

    const library = new LibraryEntity(
      libraryDto.name,
      libraryDto.description,
      libraryDto.link,
      tags,
      user
    );

    await (await this.execRepository).save(library);

    return new LibraryResponseDTO(library);
  }

  //--------------------------UPDATE METHODS-----------------------------

  /**
   * @method update - Actualiza una libreria
   * @returns Promise<LibraryResponseDTO>
   * @param id
   * @param library
   * @throws {LibraryNotFoundException}
   * @throws {TagNotFoundException}
   * @throws {LibraryAlreadyExistsException}
   * @throws {UserNotFoundException}
   */
  async update(id: number, library: LibraryUpdateDTO, url: string): Promise<LibraryResponseDTO> {
    await this.existsByName(library.name);
    
    const libraryUpdate = await (await this.execRepository).findOneBy({ id: id });
    if (libraryUpdate == null) throw new LibraryNotFoundException("Library not found");

    let tags: TagEntity[] = [];
    if (library.tags) tags = await this.getTags(library.tags);

    if (library.name) libraryUpdate.name = library.name;
    if (library.description) libraryUpdate.description = library.description;
    if (library.link) libraryUpdate.link = library.link;
    if (url.includes("admin")) {
        if (library.state) libraryUpdate.state = library.state;
    } else {
        libraryUpdate.state = State.PENDING;
    }

    await (await this.execRepository).save(libraryUpdate);

    // Update tags 
    if (tags.length > 0 && url.includes("admin")) {
        libraryUpdate.tags = tags;
        await (await this.execRepository).save(libraryUpdate);
    }

    return new LibraryResponseDTO(libraryUpdate);
}


  /**
   * @method restoreLogic - Restaura una libreria logicamente
   * @returns Promise<UpdateResult>
   * @param id - Id de la libreria
   * @throws {LibraryNotFoundException}
   */
  async restoreLogic(id: number): Promise<UpdateResult> {
    const library = await (await this.execRepository).findOneBy({ id: id });
    if (library == null) throw new LibraryNotFoundException("Library not found");

    if (library.isActive) throw new LibraryAlreadyEnabledException("Library already enabled");
    return (await this.execRepository).update(id, { isActive: true });
  }

  //--------------------------DELETE METHODS-----------------------------

  /**
   * @method deleteLogic - Elimina una libreria logicamente
   * @returns Promise<UpdateResult>
   * @param id - Id de la libreria
   * @throws {LibraryNotFoundException}
   */
  async deleteLogic(id: number): Promise<UpdateResult> {
    const library = await (await this.execRepository).findOneBy({ id: id });
    if (library == null) throw new LibraryNotFoundException("Library not found");

    if (!library.isActive) throw new LibraryAlreadyDisabledException("Library already disabled");
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

  private async createResponseDTOWithLike(data: LibraryEntity[], userId: number) : Promise<LibraryResponseDTO[]> {
    const dataResponse = await Promise.all(
      data.map(async (library) => {
        const response: LibraryResponseDTO = new LibraryResponseDTO(library);
        if (await this.likeService.userLikeThisLibrary(userId, library.id)) {
          response.liked = true;
          return response;
        }

        response.liked = false;
        return response;
      })
    );
    return dataResponse;
  }

  /**
   * @description Retorna todas las librerias de un estado
   * @param state - Estado
   * @returns Promise<LibraryEntity[]>
   * @throws {LibraryNotFoundException}
   */
  private async findAllByState(state: State): Promise<LibraryResponseDTO[]> {
    const data = await (await this.execRepository).find({ where: { state: state, isActive: true } })
    return this.createResponseDTO(data);
  }

  /**
   * @description Crea una lista de el DTO de respuesta de la libreria
   * @param data - Lista de librerias
   * @returns Promise<LibraryResponseDTO[]>
   */
  private async createResponseDTO(data: LibraryEntity[]): Promise<LibraryResponseDTO[]> {
    return data.map((library) => new LibraryResponseDTO(library));
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

  /**
   * @description Comprueba si el usuario existe
   * @param id - Id del usuario
   * @throws {UserNotFoundException}
   */
  private async existsUser(id: number): Promise<void> {
    const exist = await (await this.execRepository).existsBy({ id: id });
    if (!exist) throw new UserNotFoundException("User not found");
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
