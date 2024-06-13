import { BaseRouter } from "./../shared/router/router";
import { TagController } from "./controllers/tag.controller";

export class TagRouter extends BaseRouter<TagController> {
    constructor() {
        super(TagController);
    }

    public routes(): void {
        this.router.get('/tag', (req, res) => this.controller.getTags( req, res));
    }
}