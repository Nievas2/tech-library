import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { TagDto, TagResponseDto } from "../entities/tag.dto";
import { TagEntity } from "../entities/tag.entity";
import { TagNotFoundException } from "../exceptions/tag.notfound.exception";
import { TagAlreadyExistException } from "../exceptions/tag.alreadyexist.exception";

/**
 * @version 1.0.0
 * @author Emiliano Gonzalez
 * @class TagService
 * @description Clase que representa un servicio de tags en el sistema y maneja la logica de las tags
 * @method findAll - Retorna todas las etiquetas
 * @method findById - Retorna una etiqueta por su id
 * @method create - Crea una etiqueta
 * @method update - Actualiza una etiqueta
 * @method delete - Elimina una etiqueta logicamente
 * @method restore - Restaura una etiqueta eliminada logicamente
 */
export class TagService extends BaseService<TagEntity> {
  constructor() {
    super(TagEntity);
  }

  async findAll(): Promise<TagEntity[]> {
    return (await this.execRepository).find( { where: { isActive: true } } );
  }

  async findById(id: number): Promise<TagEntity> {
    const data = await (await this.execRepository).findOneBy({ id: id, isActive: true });
    if (data === null) throw new TagNotFoundException("Tag not found");
    return data;
  }

  async create(tag: TagDto): Promise<TagEntity> {
    await this.existsByName(tag.name);
    return (await this.execRepository).save(tag);
  }

  async update(id: number, tag: TagDto): Promise<UpdateResult> {
    await this.existsById(id);
    await this.existsByName(tag.name);
    return (await this.execRepository).update(id, tag);
  }

  async restore(id: number): Promise<UpdateResult> {
    const data = await this.findById(id);
    if (data === null) throw new TagNotFoundException("Tag not found");
    data.isActive = true;
    return (await this.execRepository).update(id, data);
  }

  async delete(id: number): Promise<TagResponseDto> {
    const data = await this.findById(id);
    if (data === null) throw new TagNotFoundException("Tag not found");
    data.isActive = false;
    await (await this.execRepository).update(id, data);
    return new TagResponseDto(data);
  }

  //----------------------Helpers-----------------------------

  private async existsById(id: number): Promise<void> {
    const exist = await (await this.execRepository).existsBy({ id: id });
    if (!exist) throw new TagNotFoundException("Tag not found");
  }

  private async existsByName(name: string): Promise<void> {
    const exist = await (await this.execRepository).createQueryBuilder("tag").where("LOWER(tag.name) = LOWER(:name)", { name }).andWhere("tag.isActive = true").getExists();
    if (exist) throw new TagAlreadyExistException("Tag not found");
  }

}
