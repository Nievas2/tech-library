import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../config/base.entity";

@Entity({ name: "tags" })
export class TagEntity extends BaseEntity {
    @Column({ type: "varchar", length: 15 })
    name!: string
}