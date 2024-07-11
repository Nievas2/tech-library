import { BaseRouter } from "../shared/router/router";
import { LibraryController } from "./controllers/library.controller";
import { LibraryMiddleware } from "./middlewares/library.middleware";

/**
 * @version 1.0.0
 * @author Emiliano Gonzalez
 * @class LibraryRouter
 * @description Clase que se encarga de registrar las rutas para el controlador de libros
 * @method routes - Método sobreescripto que se encarga de registrar las rutas
 * @method constructor - Constructor de la clase LibraryRouter para registrar las rutas
 */
export class LibraryRouter extends BaseRouter<
  LibraryController,
  LibraryMiddleware
> {
  constructor() {
    super(LibraryController, LibraryMiddleware);
  }

  public routes(): void {
    //--------------------GET--------------------
    this.router.get(
      "/library/all",
      this.middleware.passAuth("jwt"),
      (req, res, next) => this.middleware.checkAdminRole(req, res, next),
      (req, res) => this.controller.getLibrarys(req, res)
    );

    this.router.get("/library/all/active/:userid", (req, res) =>
      this.controller.getLibrarysStatusActiveWhithUserLike(req, res)
    );

    this.router.get(
      "/library/all/user/:userid",
      this.middleware.passAuth("jwt"),
      (req, res, next) => this.middleware.checkUserRole(req, res, next),
      (req, res) => this.controller.getLibrarysByUser(req, res)
    );

    this.router.get(
      "/library/all/status/active",
      this.middleware.passAuth("jwt"),
      (req, res, next) => this.middleware.checkAdminRole(req, res, next),
      (req, res) => this.controller.getLibrarysStatusActive(req, res)
    );

    this.router.get(
      "/library/all/status/pending",
      this.middleware.passAuth("jwt"),
      (req, res, next) => this.middleware.checkAdminRole(req, res, next),
      (req, res) => this.controller.getLibrarysStatusPending(req, res)
    );
    this.router.get("/library/all/status/inactive", (req, res) =>
      this.controller.getLibrarysStatusInactive(req, res)
    );

    this.router.get(
      "/library/all/search/:userid",
      (req, res) => this.controller.getLibrarysSearch(req, res)
    );

    this.router.get(
      "/library/:id",
      this.middleware.passAuth("jwt"),
      (req, res, next) => this.middleware.checkUserRole(req, res, next),
      (req, res) => this.controller.findById(req, res)
    );

    //--------------------POST--------------------

    this.router.post(
      "/library/create/:userid",
      this.middleware.passAuth("jwt"),
      (req, res, next) => this.middleware.checkUserRole(req, res, next),
      (req, res, next) =>
        this.middleware.libraryCreateValidator(req, res, next),
      (req, res) => this.controller.createLibrary(req, res)
    );

    this.router.post(
      "/library/like/:userid/:libraryid",
      this.middleware.passAuth("jwt"),
      (req, res, next) => this.middleware.checkUserRole(req, res, next),
      (req, res) => this.controller.likeLibrary(req, res)
    );

    //--------------------PUT--------------------
    this.router.put(
      "/library/admin/update/:id",
      this.middleware.passAuth("jwt"),
      (req, res, next) => this.middleware.checkAdminRole(req, res, next),
      (req, res, next) =>
        this.middleware.libraryUpdateAdminValidator(req, res, next),

      (req, res) => this.controller.updateLibrary(req, res)
    );
    this.router.put(
      "/library/update/:id",
      this.middleware.passAuth("jwt"),
      (req, res, next) => this.middleware.checkUserRole(req, res, next),
      (req, res, next) =>
        this.middleware.libraryUpdateUserValidator(req, res, next),
      (req, res) => this.controller.updateLibrary(req, res)
    );
    //por si se hace delete logico
    this.router.put(
      "/library/status/restore/:id",
      this.middleware.passAuth("jwt"),
      (req, res, next) => this.middleware.checkAdminRole(req, res, next),
      (req, res) => this.controller.restoreLogic(req, res)
    );

    //--------------------DELETE--------------------
    this.router.delete(
      "/library/delete/definitive/:id",
      this.middleware.passAuth("jwt"),
      (req, res, next) => this.middleware.checkAdminRole(req, res, next),
      (req, res) => this.controller.deleteLibrary(req, res)
    );
    //por si se hace delete logico
    this.router.delete(
      "/library/delete/temporal/:id",
      this.middleware.passAuth("jwt"),
      (req, res, next) => this.middleware.checkAdminRole(req, res, next),
      (req, res) => this.controller.deleteLogicLibrary(req, res)
    );

    this.router.delete(
      "/library/unlike/:userid/:libraryid",
      this.middleware.passAuth("jwt"),
      (req, res, next) => this.middleware.checkUserRole(req, res, next),
      (req, res) => this.controller.unlikeLibrary(req, res)
    );
  }
}
