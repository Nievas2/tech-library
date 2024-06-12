import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

/**
 * @version 1.0.0
 * @author Emiliano Gonzalez
 * @class BaseEntity
 * @description Clase base para las entidades
 * @property {number} id - Identificador de la entidad
 * @property {Date} createdAt - Fecha de creación de la entidad
 * @property {Date} updatedAt - Fecha de actualización de la entidad
*/
export abstract class BaseEntity {
    @PrimaryGeneratedColumn("increment", { type: "bigint" })
    id!: number;

    @CreateDateColumn({
        name: "created_at",
        type: "timestamp",
    })
    createdAt!: Date;
    
    @UpdateDateColumn({
        name: "updated_at",
        type: "timestamp",
    })
    updatedAt!: Date;
}


//id
//createdAt
//updatedAt
