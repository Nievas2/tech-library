import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { UserRouter } from "./user/user.router";
import { ConfigServer } from "./config/config";
import { TagRouter } from "./tag/tag.router";
import { DataSource } from "typeorm";
import { LibraryRouter } from "./library/library.router";
import { LoginLocalStrategy } from "./auth/strategies/local.login.strategy";
import { JwtStrategy } from "./auth/strategies/jwt.strategy";
import { AuthRouter } from "./auth/auth.routher";
import { GithubStrategy } from "./auth/strategies/github.strategy";
import { GoogleStrategy } from "./auth/strategies/google.strategy";
import path from "path";
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

    this.passportUSe();

    this.app.use(morgan("dev"));
    this.app.use(
      cors({
        origin: this.getEnvironment("ORIGIN") || "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
      })
    );

    this.dbConnect();
    this.app.use("/api", this.routers());

    // Middleware para manejar rutas no encontradas (404)
    this.app.use((_req, res, ) => {
      res.status(404).sendFile(path.join(__dirname, "public", "index.html"));
    });

    this.listen();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  async dbConnect(): Promise<DataSource | void> {
    return this.initConnect
      .then(() => {
        console.log("Connect to database successfully");
      })
      .catch((error) => {
        console.error("Error connecting to database:", error);
      });
  }

  passportUSe() {
    return [
      new LoginLocalStrategy().use,
      new JwtStrategy().use,
      new GithubStrategy().use,
      new GoogleStrategy().use,
    ];
  }

  routers(): Array<express.Router> {
    return [
      new UserRouter().router,
      new TagRouter().router,
      new LibraryRouter().router,
      new AuthRouter().router,
    ];
  }
}

new ServerBootstrap();
