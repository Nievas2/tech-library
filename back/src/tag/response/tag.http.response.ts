import { UpdateResult } from "typeorm";
import { BaseHttpResponse } from "../../shared/response/http.response";
import { Response } from "express";

export class TagHttpResponse extends BaseHttpResponse {

  constructor(lenguage: string | undefined) {
    super(lenguage);
  }

  BadRequestTagNotFound(res: Response, data?: any): Response {
    return this.BadRequest(res, "TAG_NOT_FOUND", data);
  }

  BadRequestTagAlreadyExist(res: Response, data?: any): Response {
    return this.BadRequest(res, "TAG_ALREADY_EXIST", data);
  }

  BadRequestUpdatedTag(res: Response, data?: UpdateResult): Response {
    return this.BadRequest(res, "UPDATED_TAG_BAD_REQUEST", data);
  }

  BadRequestTagIdInvalid(res: Response, data?: any): Response {
    return this.BadRequest(res, "TAG_ID_INVALID", data);
  }

}
