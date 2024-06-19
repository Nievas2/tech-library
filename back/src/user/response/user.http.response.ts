import { UpdateResult } from "typeorm";
import { BaseHttpResponse } from "../../shared/response/http.response";
import { Response } from "express";

export class UserHttpResponse extends BaseHttpResponse {

  constructor(lenguage: string | undefined) {
    super(lenguage);
  }

  BadRequestUserNotFound(res: Response, _data?: any): Response {
    return this.BadRequest(res, "USER_NOT_FOUND", _data);
  }

  BadRequestUserAlreadyDisabled(res: Response, _data?: any): Response {
    return this.BadRequest(res,"USER_ALREADY_DISABLED", _data );
  }

  BadRequestUserAlreadyActive(res: Response, _data?: any): Response {
    return this.BadRequest(res, "USER_ALREADY_ACTIVE", _data);
  }

  BadRequestUserAlreadyExist(res: Response, _data?: any): Response {
    return this.BadRequest(res, "USER_ALREADY_EXIST", _data);
  }

  BadRequestUserAlreadyByEmail(res: Response, _data?: any): Response {
    return this.BadRequest(res, "USER_ALREADY_EXIST_EMAIL", _data);
  }

  BadRequestUserAlreadyByUsername(res: Response, _data?: any): Response {
    return this.BadRequest(res, "USER_ALREADY_EXIST_USERNAME", _data);
  }

  BadRequestUpdatedUser(res: Response, _data?: UpdateResult): Response {
    return this.BadRequest(res, "UPDATED_USER_BAD_REQUEST", _data);
  }

}
