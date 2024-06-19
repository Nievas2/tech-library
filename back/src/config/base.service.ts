import {  EntityTarget, Repository } from "typeorm";
import { ConfigServer } from "./config";
import { BaseEntity } from "./base.entity";

/**
 * @version 1.0.0
 * @author Emiliano Gonzalez
 * @class BaseService
 * @description Clase que se encarga de manejar la logica de los repositorios y proveerlos a los controladores
 * @method initRepository - Método que se encarga de inicializar el repositorio
 * @property execRepository - Método que se encarga de ejecutar el repositorio
 * @property lenguaje - Propiedad que se encarga de obtener el lenguaje de las variables de entorno y proveerlos a los controladores
 */
export class BaseService<T extends BaseEntity> extends ConfigServer {

    public execRepository: Promise<Repository<T>>;
    public lenguaje!: string | undefined;

    constructor( private getEntity: EntityTarget<T>){
        super();
        this.execRepository = this.initRepository(this.getEntity);

        this.lenguaje = this.getEnvironment("LENGUAGE")?.trim();
    }

    /**
     * @description Método que se encarga de inicializar el repositorio
     * @param e - EntityTarget<T>
     * @returns Promise<Repository<T>>
     * 
     */
    async initRepository(e: EntityTarget<T>): Promise<Repository<T>> {
        try {
            const getConnection = await this.initConnect;
            return getConnection.getRepository(e);
        } catch (error) {
            console.error("Error initializing repository:", error);
            throw error;
        }
    }
}
