import { IsEmail, IsEnum, IsNotEmpty, IsOptional, Length, Min,  } from "class-validator";
import { BaseDTO } from "../../config/base.dto";
import { UserEntity } from "./user.entity";
import { RoleType } from "./role";

export class UserDTO extends BaseDTO {
  @IsNotEmpty()
  @Length(4, 20, { message: "Username must be between 4 and 20 characters" })
  username!: string;

  @Length(4, 20, { message: "Password must be between 4 and 20 characters" })
  @IsNotEmpty({ message: "Password cannot be empty" })
  password!: string;

  @IsNotEmpty({ message: "Email cannot be empty" })
  @IsEmail()
  email!: string;
}

export class userLoginDTO extends BaseDTO {
  @IsOptional()
  @IsNotEmpty({ message: "Username cannot be empty" })
  @Length(4, 20, { message: "Username must be between 4 and 20 characters" })
  username!: string;

  @IsOptional()
  @Min(4, { message: "Password must be at least 4 characters long" })
  @IsNotEmpty({ message: "Password cannot be empty" })
  password!: string;

  @IsOptional()
  @IsNotEmpty({ message: "Email cannot be empty" })
  @IsEmail() 
  email!: string;
}

export class UserUpdateDTO extends BaseDTO {
  @IsNotEmpty({ message: "Email cannot be empty" })
  @IsOptional()
  @IsEmail()
  email!: string;

  @IsNotEmpty({ message: "Password cannot be empty" })
  @IsOptional()
  @Min(4, { message: "Password must be at least 4 characters long" })
  password!: string;

  @IsNotEmpty({ message: "Username cannot be empty" })
  @IsOptional()
  @Length(4, 20, { message: "Username must be between 4 and 20 characters" })
  username!: string;

  @IsOptional()
  @IsNotEmpty({ message: "isActive cannot be empty" })
  @IsEnum(RoleType, { message: "Role must be ADMIN or USER" })
  role!: RoleType;
}

export class UserResponseDTO extends BaseDTO {
  username!: string;
  email!: string;
  id!: number;
  role! : RoleType

  constructor(user: UserEntity) {
    super();
    this.username = user.username;
    this.email = user.email;
    this.id = user.id;
    this.role = user.role

  }
}
