import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, Unique } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { State } from "../state.enum";
import { UserEntity } from "../../user/entities/user.entity";
import { TagEntity } from "../../tag/entities/tag.entity";
import { LikeEntity } from "../../like/entities/like.entity";

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
@Unique(["name"])
export class LibraryEntity extends BaseEntity {
  @Column({ type: "varchar", length: 25, nullable: false })
  name!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  description!: string;

  @Column({ type: "varchar", length: 300, nullable: false })
  link: string;
  
  @Column({ type: "boolean", default: true, nullable: false })
  isActive!: boolean;
  
  @Column({ type: "enum", enum: State, default: State.PENDING })
  state!: State;
  
  @ManyToOne(() => UserEntity, (user) => user.libraries, {
    nullable: false,
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
    eager: true,
  })
  createdBy!: UserEntity;

  @OneToMany(() => LikeEntity, (like) => like.library)
  likes!: LikeEntity[];

  @ManyToMany(() => TagEntity, (tag) => tag.libraries, {
    eager: true,
  })
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

  @Column({ type: "int", default: 0 })
  likesCount!: number;


  constructor(
    name: string,
    description: string,
    link: string,
    tags: TagEntity[],
    createdBy: UserEntity,

  ) {
    super();
    this.name = name;
    this.description = description;
    this.isActive = true;
    this.state = State.PENDING;
    this.createdBy = createdBy;
    this.tags = tags;
    this.link = link;
    this.likesCount = 0;
  }

  //Methods start

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
}
