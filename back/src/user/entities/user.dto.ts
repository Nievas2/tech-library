import { IsEmail, IsNotEmpty, Length, Matches } from "class-validator";
import { BaseDTO } from "../../config/base.dto";

export class UserDTO extends BaseDTO {
@IsNotEmpty()
@Length(4, 20, { message: "Username must be between 4 and 20 characters" })
username!: string;

@Matches(/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/, {
message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character",
})
@IsNotEmpty({ message: "Password cannot be empty" })
password!: string;

@Length(4, 20, { message: "Name must be between 4 and 20 characters" })
@IsNotEmpty({ message: "Name cannot be empty" })
name!: string;

@Length(4, 20, { message: "Lastname must be between 4 and 20 characters" })
@IsNotEmpty({ message: "Lastname cannot be empty" })
lastname!: string;

@IsNotEmpty({ message: "Email cannot be empty" })
@IsEmail()
email!: string;
}


