import { BaseRouter } from "../shared/router/router";
import { UserMiddleware } from "../user/middlewares/user.middleware";
import { AuthController } from "./controllers/auth.controller";
import { NextFunction, Request, Response } from "express";

/**
 * @version 1.0.0
 * @author Emiliano Gonzalez
 * @class AuthRouter
 * @description Clase que se encarga de registrar las rutas para el controlador de autenticacion
 * @method routes - Método sobreescripto que se encarga de registrar las rutas
 * @method constructor - Constructor de la clase AuthRouter para registrar las rutas
 */
export class AuthRouter extends BaseRouter<AuthController, UserMiddleware> {
  constructor() {
    super(AuthController, UserMiddleware);
  }

  public routes(): void {
    this.router.post(
      "/login",
      (req: Request, res: Response, next: NextFunction) => this.middleware.userLoginValidate(req, res, next),
      this.middleware.passAuth("local"),
      (req: Request, res: Response) => this.controller.login(req, res)
    );

    this.router.post(
      "/register",
      (req: Request, res: Response, next) =>
        this.middleware.userValidator(req, res, next),
      (req: Request, res: Response) => this.controller.register(req, res)
    );

    this.router.get("/login/github", this.middleware.passAuth("github"));

    this.router.get(
      "/auth/github/callback",
      this.middleware.passAuth("github"),
      (req: Request, res: Response) => this.controller.loginGitHub(req, res)
    );

    this.router.get(
      "/login/google", this.middleware.passAuth("google") )

    this.router.get(
      "/auth/google/callback",
      this.middleware.passAuth("google"),
      (req: Request, res: Response) => this.controller.loginGoogle(req, res)
    );
  }
}
