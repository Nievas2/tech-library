import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { LibraryEntity } from "../../library/entities/library.entity";

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
 * @method getUsername - Obtiene el nombre de usuario
 * @method setUsername - Establece el nombre de usuario
 * @method getPassword - Obtiene la contraseña
 * @method setPassword - Establece la contraseña
 * @method getName - Obtiene el nombre del usuario
 * @method setName - Establece el nombre del usuario
 * @method getLastname - Obtiene el apellido del usuario
 * @method setLastname - Establece el apellido del usuario
 * @method getEmail - Obtiene el email del usuario
 * @method setEmail - Establece el email del usuario
 * @method getLibraries - Obtiene las librerias creadas por el usuario
 * @method setLibraries - Establece las librerias creadas por el usuario
 * @method getIsActive - Obtiene el estado del usuario
 * @method setIsActive - Establece el estado del usuario
 * @method restoreLogic - Activa el usuario
 * @method deleteLogic - Elimina el usuario logicamente sin borrar de la base de datos
 *
 */
@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
  @Column({ unique: true, type: "varchar", length: 50, nullable: false })
  private username!: string;
  @Column({ type: "varchar", nullable: false })
  private password!: string;
  @Column({ type: "varchar", length: 50, nullable: false })
  private name!: string;
  @Column({ type: "varchar", length: 50, nullable: false })
  private lastname!: string;
  @Column({ type: "varchar", length: 50, nullable: false })
  private email!: string;
  @Column({ type: "boolean", default: true, nullable: false })
  private isActive!: boolean;

  @OneToMany(() => LibraryEntity, (library) => library.createdBy)
  libraries!: Promise<LibraryEntity[]>;

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

  //Methods start

  public deleteLogic(): void {
    this.isActive = false;
  }

  public restoreLogic(): void {
    this.isActive = true;
  }

  //Getters and Setters start
  public getUsername(): string {
    return this.username;
  }
  public setUsername(username: string) {
    this.username = username;
  }
  public getPassword(): string {
    return this.password;
  }
  public setPassword(password: string) {
    this.password = password;
  }
  public getName(): string {
    return this.name;
  }
  public setName(name: string) {
    this.name = name;
  }
  public getLastname(): string {
    return this.lastname;
  }
  public setLastname(lastname: string) {
    this.lastname = lastname;
  }
  public getEmail(): string {
    return this.email;
  }
  public setEmail(email: string) {
    this.email = email;
  }

  public getIsActive(): boolean {
    return this.isActive;
  }

  public setIsActive(isActive: boolean) {
    this.isActive = isActive;
  }
  //Getters and Setters end
}
