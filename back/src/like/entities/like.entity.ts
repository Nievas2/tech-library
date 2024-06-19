import { Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { UserEntity } from "../../user/entities/user.entity";
import { LibraryEntity } from "../../library/entities/library.entity";

/**
 * @version 1.0.0
 * @author Emiliano Gonzalez
 * @class LikeEntity
 * @description Clase que representa una entidad de like, la cual indica que un usuario ha dado like a una libreria
 * @property {UserEntity} user - Usuario que ha dado like
 * @property {LibraryEntity} library - Libreria que ha dado like
 * @method constructor - Constructor de la clase
 */
@Entity("likes")
export class LikeEntity extends BaseEntity{

    @ManyToOne(() => UserEntity, user => user.likes)
    user!: UserEntity

    @ManyToOne(() => LibraryEntity, library => library.likes)
    library!: LibraryEntity

}