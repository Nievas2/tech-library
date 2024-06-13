import { BaseRouter } from "../shared/router/router";
import { LibraryController } from "./controllers/library.controller";

export class LibraryRouter extends BaseRouter<LibraryController> {

    constructor() {
        super(LibraryController);
    }

    public routes() : void{
        this.router.get('/library', (req, res) => this.controller.getLibrary( req, res));
    }
}