import { Column, Entity, ManyToMany, Unique } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { LibraryEntity } from "../../library/entities/library.entity";

/**
 * @version 1.0.0
 * @author Emiliano Gonzalez
 * @class TagEntity
 * @description Clase que representa una entidad de etiqueta
 * @property {string} name - Nombre de la etiqueta
 * @property {LibraryEntity} libraries - Librerias asociadas a la etiqueta
 * @method constructor - Constructor de la clase
 * @method getName - Obtiene el nombre de la etiqueta
 * @method setName - Establece el nombre de la etiqueta
 * @method getLibraries - Obtiene las librerias asociadas a la etiqueta
 * @method setLibraries - Establece las librerias asociadas a la etiqueta
 */
@Entity({ name: "tags" })
@Unique(["name"])
export class TagEntity extends BaseEntity {

    @Column({ type: "varchar", length: 15, unique: true, nullable: false })
    name!: string

    @Column({ type: "varchar", length: 7, nullable: false })
    color!: string

    @ManyToMany(() => LibraryEntity, (library) => library.tags)
    libraries!: Promise<LibraryEntity[]>

    constructor(name: string) {
        super();
        this.name = name
    }
}
