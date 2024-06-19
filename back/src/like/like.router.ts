import { BaseRouter } from "../shared/router/router";
import { LikeEntity } from "./entities/like.entity";

export class LikeRouter extends BaseRouter<LikeEntity> {

    constructor() {
        super(LikeEntity);
    }

    public routes() {
        // this.router.get('/like', (req, res) => this.controller.getLikes(req, res));
    }
}