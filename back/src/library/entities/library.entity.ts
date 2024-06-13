import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../config/base.entity";

@Entity({ name: "librarys" })
export class LibraryEntity extends BaseEntity {

    @Column( { type: "varchar", unique: true, length: 25 } )
    name!: string

    @Column( { type: "varchar" } )
    description!: string

    @Column( { type: "bigint" } )
    likes!: number

}