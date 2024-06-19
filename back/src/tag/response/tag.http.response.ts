import { UpdateResult } from "typeorm";
import { BaseHttpResponse } from "../../shared/response/http.response";
import { Response } from "express";

export class TagHttpResponse extends BaseHttpResponse {

  constructor(lenguage: string | undefined) {
    super(lenguage);
  }

  BadRequestTagNotFound(res: Response, _data?: any): Response {
    return this.BadRequest(res, "TAG_NOT_FOUND", _data);
  }

  BadRequestTagAlreadyExist(res: Response, _data?: any): Response {
    return this.BadRequest(res, "TAG_ALREADY_EXIST", _data);
  }

  BadRequestUpdatedTag(res: Response, _data?: UpdateResult): Response {
    return this.BadRequest(res, "UPDATED_TAG_BAD_REQUEST", _data);
  }

}
