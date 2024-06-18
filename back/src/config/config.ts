import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

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

  public get typeORMConfig(): DataSource {
    
    return new DataSource({
      type: "mysql",
      host: this.getEnvironment("DB_HOST"),
      port: this.getNumberEnvironment("DB_PORT"),
      username: this.getEnvironment("DB_USER"),
      password: this.getEnvironment("DB_PASSWORD"),
      database: this.getEnvironment("DB_DATABASE"),
      entities: [__dirname + "/../**/*.entity{.ts,.js}"],
      migrations: [__dirname + "/../../migrations/*{.ts,.js}"],
      synchronize: true,
      logging: false,
      namingStrategy: new SnakeNamingStrategy(),
    })
  }

  async dbConnect(): Promise<DataSource> {
    return await this.typeORMConfig.initialize();
  }
    
}
