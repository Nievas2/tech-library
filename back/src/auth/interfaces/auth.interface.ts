import { RoleType } from "../../user/entities/role";

/**
 * @description Interfaz que define los datos que se retornan en el token
 * @interface PayloadToken
 * @author Emiliano Gonzalez
 * @version 1.0.0
 * @property role - Rol del usuario
 * @property sub - ID del usuario
 * @property name - Nombre del usuario
 * @property exp - Expiración del token
 */
export interface PayloadToken{
    role: RoleType,
    sub: string,
    name: string,
    exp: number
}