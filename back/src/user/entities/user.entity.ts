import { Column, Entity, OneToMany, Unique } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { LibraryEntity } from "../../library/entities/library.entity";
import { Exclude } from "class-transformer";
import { LikeEntity } from "../../like/entities/like.entity";

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
 * @property {LibraryEntity} libraries - Librerias creadas por el usuario
 * @method constructor - Constructor de la clase
 * @method restoreLogic - Activa el usuario
 * @method deleteLogic - Elimina el usuario logicamente sin borrar de la base de datos
 *
 */
@Entity({ name: "users" })
@Unique(["username", "email"])
export class UserEntity extends BaseEntity {
  @Column({ type: "varchar", length: 50, nullable: false })
  username!: string;
  @Column({ type: "varchar", nullable: false })
  @Exclude() 
  password!: string;
  @Column({ type: "varchar", length: 50, nullable: false })
  name!: string;
  @Column({ type: "varchar", length: 50, nullable: false })
  lastname!: string;
  @Column({ type: "varchar", length: 50, nullable: false })
  email!: string;
  @Column({ type: "boolean", default: true, nullable: false })
  isActive!: boolean;

  @OneToMany(() => LibraryEntity, (library) => library.createdBy)
  libraries!: Promise<LibraryEntity[]>;
    
  @OneToMany(() => LikeEntity, (like) => like.user)
  likes!: LikeEntity[];

  constructor(
    username: string,
    password: string,
    name: string,
    lastname: string,
    email: string
  ) {
    super();
    this.username = username;
    this.password = password;
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.isActive = true;
  }

}
