import {  EntityTarget, Repository } from "typeorm";
import { ConfigServer } from "./config";
import { BaseEntity } from "./base.entity";

export class BaseService<T extends BaseEntity> extends ConfigServer {

    public execRepository: Promise<Repository<T>>;

    constructor( private getEntity: EntityTarget<T>){
        super();
        this.execRepository = this.initRepository(this.getEntity);
    }

    async initRepository(e: EntityTarget<T>): Promise<Repository<T>> {
        try {
            const getConnection = await this.dbConnect();
            return getConnection.getRepository(e);
        } catch (error) {
            console.error("Error initializing repository:", error);
            throw error;
        }
    }
}
