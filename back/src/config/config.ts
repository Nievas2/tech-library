import { DataSource } from "typeorm";
import { AppDataSource } from "./data.source";

/**
 * @version 1.0.0
 * @author Emiliano Gonzalez
 * @class ConfigServer
 * @description Clase que se encarga de configurar el servidor
 * @method nodeEnv - Método que se encarga de obtener el entorno de ejecución
 * @method typeORMConfig - Método que se encarga de configurar la base de datos
 * @method constructor - Constructor de la clase ConfigServer para configurar el servidor
 * @method createPathEnv - Método que se encarga de crear el path de la variable de entorno
 * @method getEnvironment - Método que se encarga de obtener la variable de entorno
 * @method getNumberEnvironment - Método que se encarga de obtener el número de la variable de entorno
 */
export abstract class ConfigServer {
  constructor() {
  }

  public getEnvironment(key: string): string | undefined {
    let value = process.env[key];
    if (!value) {
      return undefined;}
    return value.trim();
  }

  public getNumberEnvironment(key: string): number {
    return Number(this.getEnvironment(key));
  }

  get initConnect(): Promise<DataSource> {
    return AppDataSource.initialize();
  }
    
}
