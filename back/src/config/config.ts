import * as dotenv from "dotenv";
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
    const nodeNameEnv = this.createPathEnv(this.nodeEnv);
    dotenv.config({ path: nodeNameEnv });
  }

  public getEnvironment(key: string): string | undefined {
    return process.env[key];
  }

  public getNumberEnvironment(key: string): number {
    return Number(this.getEnvironment(key));
  }

  public get nodeEnv(): string {
    return this.getEnvironment("NODE_ENV")?.trim() || "";
  }

  public createPathEnv(path: string): string {
    const arrEnv: string[] = ["env"];

    if (path.length > 0) {
      const stringToArray = path.split(".");
      arrEnv.unshift(...stringToArray);
    }

    return "." + arrEnv.join(".");
  }

  get initConnect(): Promise<DataSource> {
    return AppDataSource.initialize();
  }
    
}
