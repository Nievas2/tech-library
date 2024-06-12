import { Column, Entity } from "typeorm";
import { BaseEntity } from "../config/base.entity";


/**
 * @version 1.0.0
 * @author Emiliano Gonzalez
 * @class UserEntity 
 * @description Clase que representa una entidad de usuario
 * @property {string} username - Nombre de usuario
 * @property {string} password - Contraseña
 * @property {string} name - Nombre del usuario
 * @property {string} lastname - Apellido del usuario
 * @property {string} email - Email del usuario
 * 
 */
@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
  @Column({ unique: true , type: "varchar", length: 50, nullable: false })
  username!: string;
  @Column( { type: "varchar", nullable: false })
  password!: string;
  @Column( { type: "varchar", length: 50 , nullable: false})
  name!: string;
  @Column( { type: "varchar", length: 50 , nullable: false})
  lastname!: string;
  @Column( { type: "varchar", length: 50 , nullable: false})
  email!: string;
}
