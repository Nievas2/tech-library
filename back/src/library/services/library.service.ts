import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { UserNotFoundException } from "../../user/exceptions/user.notfound.exception";
import { UserService } from "../../user/services/user.service";
import { LibraryCreateDTO } from "../entities/library.dto";
import { LibraryEntity } from "../entities/library.entity";
import { UserEntity } from "../../user/entities/user.entity";
import { State } from "../statate.enum";
import { TagEntity } from "../../tag/entities/tag.entity";
import { TagService } from "../../tag/services/tag.service";
import { TagNotFoundException } from "../../tag/exceptions/tag.notfound.exception";

/**
 * @version 1.0.0
 * @author Emilio Gonzalez
 * @class LibraryService
 * @description Clase que representa un servicio de librerias en el sistema y maneja la logica de las librerias
 * @method findAll - Retorna todas las librerias
 * @method findAllActive - Retorna todos las librerias activas
 * @method findAllStatusActive - Retorna todos las librerias con estado activo
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
    private readonly tagService: TagService = new TagService()
  ) {
    super(LibraryEntity);
  }

  //--------------------------FIND METHODS-----------------------------
  async findAll(): Promise<LibraryEntity[]> {
    return (await this.execRepository).find();
  }

  async findAllActive(): Promise<LibraryEntity[]> {
    return (await this.execRepository).find({
      where: {
        isActive: true,
      },
    });
  }

  async findAllStatusActive(): Promise<LibraryEntity[]> {
    return (await this.execRepository).find({
      where: {
        state: State.ACTIVE,
      },
    });
  }

  async findAllStatusPending(): Promise<LibraryEntity[]> {
    return (await this.execRepository).find({
      where: {
        state: State.PENDING,
      },
    });
  }

  async findAllStatusInactive(): Promise<LibraryEntity[]> {
    return (await this.execRepository).find({
      where: {
        state: State.INACTIVE,
      },
    });
  }

  async findyAllByUserId(id: number): Promise<LibraryEntity[]> {
    const user = await this.findUserById(id);
    return (await this.execRepository).find({
      where: {
        createdBy: {
          id: user.id,
        },
      },
    });
  }

  async findById(id: number): Promise<LibraryEntity | null> {
    return (await this.execRepository).findOneBy({ id: id });
  }

  async findByIdActive(id: number): Promise<LibraryEntity | null> {
    return (await this.execRepository).findOneBy({ id: id, isActive: true });
  }

  //--------------------------CREATE METHOD-----------------------------

  async create(
    libraryDto: LibraryCreateDTO,
    idUsuario: number
  ): Promise<LibraryEntity> {
    const user = await this.findUserById(idUsuario);

    const tags = await this.getTags(libraryDto.tags);

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

  // async update(id: number, library: LibraryUpdateDTO): Promise<UpdateResult> {
  //   return (await this.execRepository).update(id, library);
  // }

  async restoreLogic(id: number): Promise<UpdateResult> {
    return (await this.execRepository).update(id, { isActive: true });
  }

  //--------------------------DELETE METHODS-----------------------------
  async deleteLogic(id: number): Promise<UpdateResult> {
    return (await this.execRepository).update(id, { isActive: false });
  }

  async delete(id: number): Promise<DeleteResult> {
    return (await this.execRepository).delete(id);
  }

  //--------------------------HELPERs METHODS-----------------------------

  private async findUserById(id: number): Promise<UserEntity> {
    const user = await this.userService.findById(id);
    if (user !== null) {
      return user;
    }

    throw new UserNotFoundException("User not found");
  }

  private async getTags(tags: number[]): Promise<TagEntity[]> {
    const tagList: TagEntity[] = await Promise.all(
      tags.map(async (tag) => {
        return await this.getTag(tag);
      })
    );

    return tagList;
  }

  private async getTag(id: number): Promise<TagEntity> {
    const tag = await this.tagService.findById(id);
    if (tag !== null) return tag;
    throw new TagNotFoundException("Tag not found");
  }
}
