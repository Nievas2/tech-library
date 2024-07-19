import { IsNotEmpty, IsOptional, Matches } from "class-validator";
import { BaseDTO } from "../../config/base.dto";
import { TagEntity } from "./tag.entity";

/**
 * DTO para la creacion de un tag
 * @class TagDto
 * @property {string} name - Nombre del tag
 * @property {string} color - Color del tag
 */
export class TagDto extends BaseDTO {
  @IsNotEmpty({ message: "The name can't be empty" })
  name!: string;

  @IsNotEmpty()
  @Matches(/#[A-Fa-f0-9]{8}/)
  color!: string;
}

/**
 * DTO para la actualizacion de un tag, se puede actualizar el nombre o el color
 * @class TagUpdateDto
 * @property {string} name - Nombre del tag
 * @property {string} color - Color del tag
 */
export class TagUpdateDto extends BaseDTO {
  @IsOptional()
  @IsNotEmpty({ message: "The name can't be empty" })
  name!: string;

  @IsOptional()
  @IsNotEmpty()
  @Matches(/#[A-Fa-f0-9]{8}/)
  color!: string;
}

export class TagResponseDto extends BaseDTO {
  name!: string;
  color!: string;
  id!: number;

  constructor(tag: TagEntity) {
    super();
    this.name = tag.name;
    this.color = tag.color;
    this.id = tag.id;
  }
}