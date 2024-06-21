import { IsNotEmpty, Matches } from "class-validator";
import { BaseDTO } from "../../config/base.dto";

export class TagDto extends BaseDTO {
  @IsNotEmpty({ message: "The name can't be empty" })
  name!: string;

  @IsNotEmpty()
  @Matches(/#[A-Fa-f0-9]{6}/)
  color!: string;

  
}
