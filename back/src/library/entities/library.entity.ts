import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { State } from "../statate.enum";
import { UserEntity } from "../../user/entities/user.entity";
import { TagEntity } from "../../tag/entities/tag.entity";

/**
 * @version 1.0.0
 * @author Emiliano Gonzalez
 * @class LibraryEntity
 * @description Clase que representa una entidad de libreria
 * @property {string} name - Nombre de la libreria
 * @property {string} description - Descripción de la libreria
 * @property {number} likes - Cantidad de likes de la libreria
 * @property {boolean} isActive - Indica si la libreria esta activa o no para delete logico
 * @property {State} state - Indica el estado de la libreria (Activa, pendiente, inactiva)
 * @property {UserEntity} createdBy - Creador de la libreria
 * @property {TagEntity} tags - Etiquetas de la libreria
 * @method constructor - Constructor de la clase
 * @method getName - Obtiene el nombre de la libreria
 * @method setName - Establece el nombre de la libreria
 * @method getDescription - Obtiene la descripción de la libreria
 * @method setDescription - Establece la descripción de la libreria
 * @method getLikes - Obtiene la cantidad de likes de la libreria
 * @method setLikes - Establece la cantidad de likes de la libreria
 * @method getIsActive - Obtiene el estado de la libreria
 * @method setIsActive - Establece el estado de la libreria
 * @method getState - Obtiene el estado de la libreria
 * @method setState - Establece el estado de la libreria
 * @method getCreatedBy - Obtiene el creador de la libreria
 * @method setCreatedBy - Establece el creador de la libreria
 * @method getTags - Obtiene las etiquetas de la libreria
 * @method setTags - Establece las etiquetas de la libreria
 * @method upLikes - Incrementa la cantidad de likes de la libreria
 * @method downLikes - Decrementa la cantidad de likes de la libreria
 * @method activeState - Activa la libreria
 * @method inactiveState - Inactiva la libreria
 * @method pendingState - Devuelve la libreria en estado pendiente
 * @method deleteLogic - Elimina la libreria de forma lógica sin eliminar de la base de datos
 * @method restoreLogic - Restaura la libreria de forma lógica
 *
 */
@Entity({ name: "librarys" })
export class LibraryEntity extends BaseEntity {
  @Column({ type: "varchar", unique: true, length: 25, nullable: false })
  private name!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  private description!: string;

  @Column({ type: "bigint", default: 0, nullable: false })
  private likes!: number;

  @Column({ type: "boolean", default: true, nullable: false })
  private isActive!: boolean;

  @Column({ type: "enum", enum: State, default: State.PENDING })
  state!: State;

  @ManyToOne(() => UserEntity, (user) => user.libraries, {
    nullable: false,
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  createdBy!: UserEntity;

  @ManyToMany(() => TagEntity, (tag) => tag.libraries)
  @JoinTable({
    name: "library_tags",
    joinColumn: {
      name: "library_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "tag_id",
      referencedColumnName: "id",
    },
  })
  tags!: TagEntity[];

  constructor(
    name: string,
    description: string,
    likes: number,
    isActive: boolean,
    state: State,
    createdBy: UserEntity,
    tags: TagEntity[]
  ) {
    super();
    this.name = name;
    this.description = description;
    this.likes = likes;
    this.isActive = isActive;
    this.state = state;
    this.createdBy = createdBy;
    this.tags = tags;
  }

  //Methods start
  public upLikes(): void {
    this.likes++;
  }

  public downLikes(): void {
    this.likes--;
  }

  public activeState(): void {
    this.state = State.ACTIVE;
  }

  public pendingState(): void {
    this.state = State.PENDING;
  }

  public inactiveState(): void {
    this.state = State.INACTIVE;
  }

  public deleteLogic(): void {
    this.isActive = false;
  }

  public restoreLogic(): void {
    this.isActive = true;
  }

  //Methods end

  //Getters and Setters start
  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getDescription(): string {
    return this.description;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public getLikes(): number {
    return this.likes;
  }

  public setLikes(likes: number): void {
    this.likes = likes;
  }

  public getIsActive(): boolean {
    return this.isActive;
  }

  public setIsActive(isActive: boolean): void {
    this.isActive = isActive;
  }

  public getState(): State {
    return this.state;
  }

  public setState(state: State): void {
    this.state = state;
  }
  //Getters and Setters end
}
