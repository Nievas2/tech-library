import express from "express";
import morgan from "morgan";
import cors from "cors";
import { UserRouter } from "./user/user.router";
import { ConfigServer } from "./config/config";
import { DataSource } from "typeorm";

/**
 * @version 1.0.0
 * @author Emiliano Gonzalez
 * @class ServerBootstrap
 * @description Clase que se encarga de inicializar el servidor
 * @property {express.Application} app - Instancia de express para el manejo de las rutas
 * @property {number} port - Puerto en el que se va a ejecutar el servidor
 * @method constructor - Constructor de la clase ServerBootstrap para inicializar el servidor y registrar las rutas y la base de datos
 * @method listen - Método que se encarga de iniciar el servidor
 * @method routers - Método que se encarga de registrar la lista de las rutas
 * @method dbConnect - Método que se encarga de conectar a la base de datos
 * @method initialize - Método que se encarga de inicializar el servidor
 *
 */
class ServerBootstrap extends ConfigServer {
  public app: express.Application = express();
  private port = this.getNumberEnvironment("PORT") || 3000;

  constructor() {
    super();

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
    this.app.use(cors());

    try {
      this.dbConnect();
    } catch (error) {
      console.error("Error al conectar a la base de datos:", error);
    }

    this.app.use("/api", this.routers());
    this.listen();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  routers(): Array<express.Router> {
    return [new UserRouter().router];
  }

  async dbConnect(): Promise<DataSource> {
    return await this.typeORMConfig.initialize();
  }
}

new ServerBootstrap();
