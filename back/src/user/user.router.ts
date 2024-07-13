import { UserController } from "./controllers/user.controller";
import { BaseRouter } from "./../shared/router/router";
import { UserMiddleware } from "./middlewares/user.middleware";

/**
 * @version 1.0.0
 * @author Emiliano Gonzalez
 * @class UserRouter
 * @description Clase que se encarga de registrar las rutas para el controlador de usuarios
 * @method routes - Método sobreescripto que se encarga de registrar las rutas
 * @method constructor - Constructor de la clase UserRouter para registrar las rutas
 * @method routes - Método que se encarga de registrar las rutas
 */
export class UserRouter extends BaseRouter<UserController, UserMiddleware> {
  constructor() {
    super(UserController, UserMiddleware);
  }
  /**
   * @description Método sobreescripto que se encarga de registrar las rutas para el controlador de usuarios
   * @method routes
   * @returns {void}
   *
   */
  public routes(): void {
    //--------------------GET---------------------
    this.router.get(
      "/user/all",
      this.middleware.passAuth("jwt"),
      (req, res, next) => this.middleware.checkAdminRole(req, res, next),
      (req, res) => this.controller.getUsers(req, res)
    );
    this.router.get(
      "/user/all/active",
      this.middleware.passAuth("jwt"),
      (req, res, next) => this.middleware.checkAdminRole(req, res, next),
      (req, res) => this.controller.getUsersActive(req, res)
    );
    this.router.get(
      "/user/:id",
      this.middleware.passAuth("jwt"),
      (req, res, next) => this.middleware.checkUserRole(req, res, next),
      (req, res) => this.controller.getUser(req, res)
    );
    this.router.get(
      "/user/active/:id",
      this.middleware.passAuth("jwt"),
      (req, res, next) => this.middleware.checkUserRole(req, res, next),
      (req, res) => this.controller.getUserActive(req, res)
    );

    this.router.get("/user/checkuser/:username", (req, res) =>
      this.controller.existUser(req, res)
    );

    this.router.get("/user/checkemail/:email", (req, res) =>
      this.controller.existEmail(req, res)
    );

    //--------------------POST--------------------
    this.router.post(
      "/user/create",
      this.middleware.passAuth("jwt"),
      (req, res, next) => this.middleware.checkAdminRole(req, res, next),
      (req, res, next) => this.middleware.userValidator(req, res, next),

      (req, res) => this.controller.createUser(req, res)
    );

    //--------------------DELETE--------------------
    this.router.delete(
      "/user/delete/definitive/:id",
      this.middleware.passAuth("jwt"),
      (req, res, next) => this.middleware.checkAdminRole(req, res, next),
      (req, res) => this.controller.deleteUser(req, res)
    );
    this.router.delete(
      "/user/delete/temporal/:id",
      this.middleware.passAuth("jwt"),
      (req, res, next) => this.middleware.checkAdminRole(req, res, next),
      (req, res) => this.controller.deleteLogicalUser(req, res)
    );

    //--------------------PUT---------------------
    this.router.put(
      "/user/update/:id",

      this.middleware.passAuth("jwt"),
      (req, res, next) => this.middleware.checkUserRole(req, res, next),
      (req, res, next) => this.middleware.userUpdateValidator(req, res, next),
      (req, res) => this.controller.update(req, res)
    );

    this.router.put(
      "/user/restore/:id",
      this.middleware.passAuth("jwt"),
      (req, res, next) => this.middleware.checkAdminRole(req, res, next),

      (req, res) => this.controller.restoreUser(req, res)
    );
  }
}
