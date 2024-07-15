import { UserEntity } from "../../user/entities/user.entity";

export interface UserAuthValidate {
    existUser: boolean;
    passwordOk: boolean;
    user: UserEntity | null;
}