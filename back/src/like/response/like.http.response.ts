import { BaseHttpResponse } from "../../shared/response/http.response";
import { Response } from "express";

export class LikeHttpResponse extends BaseHttpResponse {

    constructor(lenguage: string | undefined) {
        super(lenguage);}


    BadRequestLikeNotFound(res: Response, _data?: any): Response {
        return this.BadRequest(res, "LIKE_NOT_FOUND", _data);
    }
}