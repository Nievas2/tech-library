import { IsDate, IsOptional } from "class-validator";

export abstract class BaseDTO{

    @IsOptional()
    id!: number;

    @IsDate()
    @IsOptional()
    createdAt!: Date;

    @IsDate()
    @IsOptional()
    updatedAt!: Date;
}