import { IsNotEmpty, Length } from "class-validator";
import { BaseDTO } from "../../config/base.dto";

export class LibraryCreateDTO extends BaseDTO{
    @IsNotEmpty()
    @Length(4, 20, { message: "Lastname must be between 4 and 20 characters" })
    nombre!: string;
    @IsNotEmpty()
    @Length(4, 255, { message: "Description must be between 4 and 255 characters" })
    description!: string;
    @IsNotEmpty()
    tags!: number[];
}

export class LibraryUpdateDTO extends BaseDTO{
    @IsNotEmpty()
    @Length(4, 20, { message: "Lastname must be between 4 and 20 characters" })
    nombre!: string;
    @IsNotEmpty()
    @Length(4, 255, { message: "Description must be between 4 and 255 characters" })
    description!: string;
}
