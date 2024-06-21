import { BaseHttpResponse } from "../../shared/response/http.response";
import { Response } from "express";

export class LibraryHttpResponse extends BaseHttpResponse {

  constructor(lenguage: string | undefined) {
    super(lenguage);
  }

  BadRequestLibraryNotFound(res: Response, _data?: any): Response {
    return this.BadRequest(res, "LIBRARY_NOT_FOUND", _data);
  }

  BadRequestLibraryAlreadyExist(res: Response, _data?: any): Response {
    return this.BadRequest(res, "LIBRARY_ALREADY_EXIST", _data);
  }
  
  BadRequestUpdatedTag(res: Response, _data?: any): Response {
    return this.BadRequest(res, "UPDATED_LIBRARY_BAD_REQUEST", _data);
  }

  
}
