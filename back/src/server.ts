import express from "express";
import morgan from "morgan";
import cors from "cors";
import { UserRouter } from "./user/user.router";
import { ConfigServer } from "./config/config";
import { TagRouter } from "./tag/tag.router";
import { DataSource } from "typeorm";
import { LibraryRouter } from "./library/library.router";
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

    this.dbConnect();

    this.app.use("/api", this.routers());
    this.listen();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  async dbConnect(): Promise<DataSource | void> {
    return this.initConnect.then(() => {
      console.log("Connect to database successfully");
    }).catch((error) => {
      console.error("Error connecting to database:", error);
    });
  }

  routers(): Array<express.Router> {
    return [new UserRouter().router, new TagRouter().router, new LibraryRouter().router];
  }
}

new ServerBootstrap();
