import { IsArray, IsEnum, IsNotEmpty, IsOptional, Length } from "class-validator";
import { BaseDTO } from "../../config/base.dto";
import { LibraryEntity } from "./library.entity";
import { UserResponseDTO } from "../../user/entities/user.dto";
import { TagDto } from "../../tag/entities/tag.dto";
import { State } from "../state.enum";

export class LibraryCreateDTO extends BaseDTO {
  @IsNotEmpty()
  @Length(3, 20, { message: "Name must be between 3 and 20 characters" })
  name!: string;

  @IsNotEmpty()
  @Length(4, 255, {
    message: "Description must be between 4 and 255 characters",
  })
  description!: string;

  @IsNotEmpty()
  @IsArray( { message: "Tags must be an array" } )
  tags!: number[];

  @IsNotEmpty()
  link!: string;
}

export class LibraryUpdateDTO extends BaseDTO {
  @IsNotEmpty()
  @Length(4, 20, { message: "Lastname must be between 4 and 20 characters" })
  @IsOptional()
  name!: string;
  @IsNotEmpty()
  @IsOptional()
  @Length(4, 255, {
    message: "Description must be between 4 and 255 characters",
  })
  description!: string;

  @IsNotEmpty()
  @IsOptional()
  tags!: number[];

  @IsNotEmpty()
  @IsOptional()
  link!: string;

  @IsNotEmpty( { message: "State must be defined" } )
  @IsOptional()
  @IsEnum( State, { message: "State must be one of: ACTIVE, PENDING, INACTIVE" } )
  state!: State
}

export class LibraryResponseDTO extends BaseDTO {
  id!: number;
  name!: string;
  description!: string;
  link!: string;
  tags!: TagDto[];
  liked!: boolean;
  createdBy!: UserResponseDTO;
  createdAt!: Date;
  state!: string;
  likesCount!: number;

  constructor(library: LibraryEntity) {
    super();
    this.name = library.name;
    this.description = library.description;
    this.link = library.link;
    this.tags = library.tags.map((tag) => {
      const dto : TagDto = new TagDto();
      dto.name = tag.name;
      dto.color = tag.color;
      dto.id = tag.id;
      return dto;
    });
    this.createdBy = new UserResponseDTO(library.createdBy);
    this.createdAt = library.createdAt;
    this.state = library.state;
    this.id = library.id;
    this.likesCount = library.likesCount;
  }
}

export class LibraryCustomQueryDTO extends BaseDTO {
  @IsOptional()
  @IsArray( { message: "Tags must be an array" } )
  tags!: number[];
}