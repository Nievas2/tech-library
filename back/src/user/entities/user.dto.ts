import { IsEmail, IsNotEmpty, Length, Matches } from "class-validator";
import { BaseDTO } from "../../config/base.dto";
import { UserEntity } from "./user.entity";

export class UserDTO extends BaseDTO {
@IsNotEmpty()
@Length(4, 20, { message: "Username must be between 4 and 20 characters" })
username!: string;

@Matches(/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/, {
message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercaseon letter, one number and e special character",
})
@IsNotEmpty({ message: "Password cannot be empty" })
password!: string;

@IsNotEmpty({ message: "Email cannot be empty" })
@IsEmail()
email!: string;
}

export class UserResponseDTO extends BaseDTO{
    username!: string;
    email!: string;

    constructor(user: UserEntity) {
        super();
        this.username = user.username;
        this.email = user.email;
    }
}


