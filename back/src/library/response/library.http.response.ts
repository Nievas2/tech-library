import { BaseHttpResponse } from "../../shared/response/http.response";
import { Response } from "express";

export class LibraryHttpResponse extends BaseHttpResponse {
  
  constructor(lenguage: string | undefined) {
    super(lenguage);
  }
  
  BadRequestLibraryNotFound(res: Response, data?: any): Response {
    return this.BadRequest(res, "LIBRARY_NOT_FOUND", data);
  }
  
  BadRequestLibraryAlreadyExist(res: Response, data?: any): Response {
    return this.BadRequest(res, "LIBRARY_ALREADY_EXIST", data);
  }
  
  BadRequestUpdatedTag(res: Response, data?: any): Response {
    return this.BadRequest(res, "UPDATED_LIBRARY_BAD_REQUEST", data);
  }
  
  BadRequestLibraryAlreadyEnabled(res: Response, data?: any): Response {
    return this.BadRequest(res, "LIBRARY_ALREADY_ENABLED", data);
  }
  BadRequestLibraryAlreadyDisabled(res: Response, data?: any): Response {
    return this.BadRequest(res, "LIBRARY_ALREADY_DISABLED", data);
  }
  
}
