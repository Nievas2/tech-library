import { UserController } from "./controllers/user.controller";
import { BaseRouter } from "./../shared/router/router";

/**
 * @version 1.0.0
 * @author Emiliano Gonzalez
 * @class UserRouter
 * @description Clase que se encarga de registrar las rutas para el controlador de usuarios
 * @method routes - Método sobreescripto que se encarga de registrar las rutas
 * @method constructor - Constructor de la clase UserRouter para registrar las rutas
 * @method routes - Método que se encarga de registrar las rutas
 */
export class UserRouter extends BaseRouter<UserController> {
  constructor() {
    super(UserController);
  }
/**
 * @description Método sobreescripto que se encarga de registrar las rutas para el controlador de usuarios
 * @method routes
 * @returns {void}
 * 
 */
  public routes(): void {

    this.router.get("/users/all", (req, res) =>
      this.controller.getUsers(req, res)
    );
    this.router.get("/users/all/active", (req, res) =>
      this.controller.getUsersActive(req, res)
    );
    this.router.get("/user/:id", (req, res) =>
      this.controller.getUser(req, res)
    );
    this.router.get("/user/active/:id", (req, res) =>
      this.controller.getUserActive(req, res)
    );
    this.router.post("/user/create", (req, res) =>
      this.controller.createUser(req, res)
    );
    this.router.delete("/user/delete/definitive/:id", (req, res) =>
      this.controller.deleteUser(req, res)
    );
    this.router.delete("/user/delete/temporal/:id", (req, res) =>
      this.controller.deleteLogicalUser(req, res)
    );
    this.router.put("/user/update/:id", (req, res) =>
      this.controller.updateUser(req, res)
    );
    this.router.get("/users/restore/:id", (req, res) =>
      this.controller.restoreUser(req, res)
    );
  }
}
