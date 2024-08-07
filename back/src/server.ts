import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
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
import { AuthErrorResponse } from "./auth/interfaces/auth.error.response.interface";
import  limiter from "./config/rate.limiter";
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

    this.app.set('trust proxy', 'loopback 127.0.0.1');
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
    this.app.use("/api", limiter, this.routers());

    // Middleware para limitar la cantidad de peticiones por minuto
    this.app.use(limiter);
    // Middleware para manejar rutas no encontradas (404)
    this.app.use( (_req, res, ) => {
      res.status(404).sendFile(path.join(__dirname, "public", "index.html"));
    });

    // Middleware para manejar errores de autenticación 
    this.app.use((err : any, _req : Request, res: Response, next: NextFunction) => {
      if (err) {
        const {status, statusMessage} = err as AuthErrorResponse
        return res.status(err.status || 500).json({
          status: status || 500,
          message: statusMessage || "Internal Server Error",
        });
      }
      next();
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
