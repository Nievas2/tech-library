import { UserResponseDTO } from "../../user/entities/user.dto";

export interface ResponseToken {
    accesToken: string,
    user: UserResponseDTO
}