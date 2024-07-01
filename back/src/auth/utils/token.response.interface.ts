import { UserResponseDTO } from "../../user/entities/user.dto";

export interface ResponseToken {
    token: string,
    user: UserResponseDTO
}