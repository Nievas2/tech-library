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
import { LibraryNotFoundException } from "../exception/library.notfound";
import { LibraryAlreadyExistException } from "../exception/library.already.exist";
import { LikeService } from "../../like/service/like.service";
import {
  LibraryAlreadyDisabledException,
  LibraryAlreadyEnabledException,
} from "../exception/library.soft.delete.exceptions";
import { LibraryPagesDto } from "../entities/library.pages.dto";

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
   * @method findAll - Retorna todas las librerias en un formato paginado
   * @returns Promise<LibraryPagesDto>
   */
  async findAll(
    currentPage: number,
    pageSize: number
  ): Promise<LibraryPagesDto> {
    const [data, count] = await (
      await this.execRepository
    ).findAndCount({
      where: {
        isActive: true,
      },
      order: {
        name: "ASC",
      },
      relations: ["tags", "createdBy"],
      take: pageSize,
      skip: (currentPage - 1) * pageSize,
    });
    const dataDto: LibraryResponseDTO[] = await this.createResponseDTO(data);
    return new LibraryPagesDto(currentPage, pageSize, count, dataDto);
  }

  /**
   * @method findAllActive - Retorna todos las librerias activas y si el usuario le ha dado me gusta a cada una, independientemente si el usuario creo la libreria o no en un formato paginado
   * @returns Promise<LibraryPagesDto>
   * @param idUsuario - Id del usuario
   * @param currentPage - Pagina actual
   * @param pageSize - Cantidad de elementos por pagina
   * @throws {UserNotFoundException}
   */
  async findAllStatusActiveWithLike(
    idUsuario: number,
    currentPage: number,
    pageSize: number
  ): Promise<LibraryPagesDto> {
    if (idUsuario != 0) {
      if (
        !(await (
          await this.userService.execRepository
        ).existsBy({ id: idUsuario }))
      ) {
        throw new UserNotFoundException("User not found");
      }
    }

    const [libraries, total] = await (
      await this.execRepository
    ).findAndCount({
      where: {
        state: State.ACTIVE,
        isActive: true,
      },
      order: { name: "ASC" },
      relations: ["tags", "createdBy"],
      take: pageSize,
      skip: (currentPage - 1) * pageSize,
    });

    const dataDto: LibraryResponseDTO[] = await this.createResponseDTOWithLike(
      libraries,
      idUsuario
    );
    const dataResponse: LibraryPagesDto = new LibraryPagesDto(
      currentPage,
      pageSize,
      total,
      dataDto
    );
    return dataResponse;
  }

  /**
   * @method findAllSearchQueryCustom - Retorna todas las librerias y si el usuario le ha dado me gusta a cada una, independientemente si el usuario creo la libreria o no, filtra por query el nombre de la libreria y por tags asociados, en un formato paginado
   * @returns Promise<LibraryPagesDto>
   * @param idUsuario - Id del usuario
   * @param currentPage - Pagina actual
   * @param pageSize - Cantidad de elementos por pagina
   * @param tags - Id de los tags
   * @param query - Query
   * @throws {UserNotFoundException}
   */
  async findAllSearchQueryCustom(
    idUsuario: number,
    currentPage: number,
    pageSize: number,
    tags?: number[],
    query?: string,
    orderMostLiked?: string
  ) {
    const queryBuilder = (await this.execRepository)
      .createQueryBuilder("library")
      .andWhere("library.isActive = :isActive", { isActive: true })
      .andWhere("library.state = :state", { state: State.ACTIVE })
      .leftJoinAndSelect("library.tags", "tag")
      .leftJoinAndSelect("library.createdBy", "user")
      .take(pageSize)
      .skip((currentPage - 1) * pageSize);

    if (query && query.trim() != "" && query.length > 1) {
      queryBuilder.andWhere("library.name like :query", {
        query: `%${query}%`,
      });
    }

    if (tags && tags.length > 0) {
      const tagsEntity: TagEntity[] = await this.getTags(tags);
      queryBuilder.andWhere("tag.id IN (:...tags)", {
        tags: tagsEntity.map((tag) => tag.id),
      });
    }

    if (orderMostLiked) {
      if (orderMostLiked == "asc")
        queryBuilder.orderBy("library.likesCount", "ASC");
      if (orderMostLiked == "desc")
        queryBuilder.orderBy("library.likesCount", "DESC");
    } else {
      queryBuilder.orderBy("library.name", "ASC");
    }

    const [data, total] = await queryBuilder.getManyAndCount();

    const dataWithLike = await this.createResponseDTOWithLike(data, idUsuario);

    return new LibraryPagesDto(currentPage, pageSize, total, dataWithLike);
  }

  /**
   * @method findAllStatusActive - Retorna todos las librerias con estado activo
   * @param currentPage - Pagina actual
   * @param pageSize - Cantidad de elementos por pagina
   * @returns Promise<LibraryPagesDto>
   */
  async findAllStatusActive(
    currentPage: number,
    pageSize: number
  ): Promise<LibraryPagesDto> {
    return this.findAllByState(State.ACTIVE, currentPage, pageSize);
  }

  /**
   * @method findAllStatusPending - Retorna todos las librerias con estado pendiente
   * @param currentPage - Pagina actual
   * @param pageSize - Cantidad de elementos por pagina
   * @returns Promise<LibraryPagesDto>
   */
  async findAllStatusPending(
    currentPage: number,
    pageSize: number
  ): Promise<LibraryPagesDto> {
    return this.findAllByState(State.PENDING, currentPage, pageSize);
  }

  /**
   * @method findAllStatusInactive - Retorna todos las librerias con estado inactivo
   * @param currentPage - Pagina actual
   * @param pageSize - Cantidad de elementos por pagina
   * @returns Promise<LibraryPagesDto>
   */
  async findAllStatusInactive(
    currentPage: number,
    pageSize: number
  ): Promise<LibraryPagesDto> {
    return this.findAllByState(State.INACTIVE, currentPage, pageSize);
  }

  /**
   * @method findyAllByUserId - Retorna todas las librerias creadas por un usuario paginadas
   * @returns Promise<LibraryPagesDto>
   * @param id - Id del usuario
   * @param currentPage - Pagina actual
   * @param pageSize - Cantidad de elementos por pagina
   * @param userAuth - Usuario autenticado en el sistema
   * @throws {UserNotFoundException}
   */
  async findyAllByUserId(
    id: number,
    currentPage: number,
    pageSize: number,
    userAuth: UserEntity
  ): Promise<LibraryPagesDto> {
    const user: UserEntity = await this.findUserById(id, userAuth);

    const query = (await this.execRepository).createQueryBuilder("library");

    query
      .where("library.createdBy = :id")
      .andWhere("library.isActive = :isActive")
      .setParameters({
        id: user.id,
        isActive: true,
      })
      .leftJoinAndSelect("library.tags", "tag")
      .leftJoinAndSelect("library.createdBy", "user")
      .orderBy("library.name", "ASC")
      .take(pageSize)
      .skip((currentPage - 1) * pageSize);

    const [libraries, total] = await query.getManyAndCount();

    const dataDto: LibraryResponseDTO[] = await this.createResponseDTOWithLike(
      libraries,
      id
    );

    return new LibraryPagesDto(currentPage, pageSize, total, dataDto);
  }

  /**
   * @method findById - Retorna una libreria por su id
   * @returns Promise<LibraryResponseDTO>
   * @param id
   * @throws {LibraryNotFoundException}
   */
  async findByIdDTO(id: number): Promise<LibraryResponseDTO> {
    const data = await (await this.execRepository).findOneBy({ id: id });
    if (data === null) throw new LibraryNotFoundException("Library not found");
    return new LibraryResponseDTO(data);
  }

  /**
   * @method findById - Retorna una libreria por su id
   * @returns Promise<LibraryEntity>
   * @param id
   * @throws {LibraryNotFoundException}
   */
  async findById(id: number): Promise<LibraryEntity> {
    const data = await (await this.execRepository).findOneBy({ id: id });
    if (data === null) throw new LibraryNotFoundException("Library not found");
    return data;
  }

  /**
   * @method findByIdActive - Retorna una libreria por su id activa
   * @returns Promise<LibraryResponseDTO>
   * @param id
   * @throws {LibraryNotFoundException}
   */
  async findByIdActive(id: number): Promise<LibraryResponseDTO> {
    const data = await (
      await this.execRepository
    ).findOneBy({ id: id, isActive: true });
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
    idUsuario: number,
  ): Promise<LibraryResponseDTO> {
    const user = await this.findUserByIdWhithOutAuth(idUsuario);
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

  /**
   * @method addLikeInLibrary - Agrega un like a una libreria
   * @returns Promise<LibraryResponseDTO>
   * @param idUsuario
   * @param idLibrary
   * @throws {UserNotFoundException}
   * @throws {LibraryNotFoundException}
   * @throws {}
   */
  async addLikeInLibrary(
    idUsuario: number,
    idLibrary: number,
  ): Promise<LibraryResponseDTO> {
    const user: UserEntity = await this.findUserByIdWhithOutAuth(idUsuario);
    const library: LibraryEntity = await this.likeService.likeLibrary(
      user,
      await this.findById(idLibrary)
    );
    const data: LibraryEntity = await (await this.execRepository).save(library);
    return new LibraryResponseDTO(data);
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
  async update(
    id: number,
    library: LibraryUpdateDTO,
    url: string
  ): Promise<LibraryResponseDTO> {
    await this.existsByName(library.name);

    const libraryUpdate = await (
      await this.execRepository
    ).findOneBy({ id: id });
    if (libraryUpdate == null)
      throw new LibraryNotFoundException("Library not found");

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
    if (library == null)
      throw new LibraryNotFoundException("Library not found");

    if (library.isActive)
      throw new LibraryAlreadyEnabledException("Library already enabled");
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
    if (library == null)
      throw new LibraryNotFoundException("Library not found");

    if (!library.isActive)
      throw new LibraryAlreadyDisabledException("Library already disabled");
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

  /**
   * @method removeLikeInLibrary - Quita un like a una libreria
   * @returns Promise<LibraryResponseDTO>
   * @param idUsuario
   * @param idLibrary
   * @throws {UserNotFoundException}
   * @throws {LibraryNotFoundException}
   * @throws {LikeErrorException}
   */
  async removeLikeInLibrary(
    idUsuario: number,
    idLibrary: number,
  ): Promise<LibraryResponseDTO> {
    const user: UserEntity = await this.findUserByIdWhithOutAuth(idUsuario);
    const library: LibraryEntity = await this.likeService.unLikeLibrary(
      user,
      await this.findById(idLibrary)
    );
    const data: LibraryEntity = await (await this.execRepository).save(library);
    return new LibraryResponseDTO(data);
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
    const exist = await (await this.execRepository)
      .createQueryBuilder("library")
      .where("LOWER(library.name) = LOWER(:name)", { name })
      .getExists();

    if (exist) throw new LibraryAlreadyExistException("Libary already exists");
  }

  /**
   * @description Crea el DTO de respuesta de la libreria y si el usuario le ha dado me gusta
   * @param data - Lista de librerias
   * @param user - Usuario
   * @returns Promise<LibraryResponseDTO[]>
   */

  private async createResponseDTOWithLike(
    data: LibraryEntity[],
    userId: number
  ): Promise<LibraryResponseDTO[]> {
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
   * @description Retorna todas las librerias de un estado en forma paginado
   * @param state - Estado
   * @param currentPage - Pagina actual
   * @param pageSize - Cantidad de elementos por pagina
   * @returns Promise<LibraryPagesDto>
   * @throws {LibraryNotFoundException}
   */
  private async findAllByState(
    state: State,
    currentPage: number,
    pageSize: number
  ): Promise<LibraryPagesDto> {
    const [data, total] = await (
      await this.execRepository
    ).findAndCount({
      where: { state: state, isActive: true },
      take: pageSize,
      skip: (currentPage - 1) * pageSize,
    });

    const dataDto: LibraryResponseDTO[] = await this.createResponseDTO(data);
    return new LibraryPagesDto(currentPage, pageSize, total, dataDto);
  }

  /**
   * @description Crea una lista de el DTO de respuesta de la libreria
   * @param data - Lista de librerias
   * @returns Promise<LibraryResponseDTO[]>
   */
  private async createResponseDTO(
    data: LibraryEntity[]
  ): Promise<LibraryResponseDTO[]> {
    return data.map((library) => new LibraryResponseDTO(library));
  }

  //--------------------------HELPERs METHODS USERs-----------------------------

  /**
   * @description Comprueba si el usuario existe
   * @param id - Id del usuario
   * @throws {UserNotFoundException}
   */
  private async findUserById(
    id: number,
    userAuth: UserEntity
  ): Promise<UserEntity> {
    const user = await this.userService.findById(id, userAuth);
    if (user !== null) return user;
    throw new UserNotFoundException("User not found");
  }

  private async findUserByIdWhithOutAuth(id: number): Promise<UserEntity> {
    const data = await (await this.userService.execRepository).findOneBy({ id: id });
    if (data === null) throw new UserNotFoundException("User not found");
    return data;
  }

  //--------------------------HELPERs METHODS TAGS-----------------------------

  /**
   * @description Recibe una lista de ids de tags y los retorna
   * @param tags - Lista de tags
   * @returns {TagEntity[]}
   */
  private async getTags(tags: number[]): Promise<TagEntity[]> {
    const tagList: (TagEntity | null | undefined)[] = await Promise.all(
      tags.map(async (tag) => {
        const tagEntity = await (
          await this.tagService.execRepository
        ).findOneBy({ id: tag, isActive: true });
        if (tagEntity !== null && tagEntity !== undefined) return tagEntity;
      })
    );
    return tagList.filter(
      (tag): tag is TagEntity => tag !== null && tag !== undefined
    );
  }
}
