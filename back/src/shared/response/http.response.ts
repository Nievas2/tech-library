import { Response } from "express";
import { BaseMessage } from "../../config/base.message";
import { UpdateResult } from "typeorm";

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  DELETED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

/**
 *  @version 1.0.0
 *  @author Emiliano Gonzalez
 *  @description Clase que se encarga de manejar las respuestas
 *  @method Ok - Método que se encarga de retornar una respuesta exitosa 200
 *  @method NotFound - Método que se encarga de retornar una respuesta not found 404
 *  @method Unauthorized - Método que se encarga de retornar una respuesta unauthorized 401
 *  @method Forbidden - Método que se encarga de retornar una respuesta forbidden  403
 *  @method Error - Método que se encarga de retornar una respuesta error 500
 */
export class HttpResponse extends BaseMessage {
  constructor(lenguage: string | undefined) {
    super(lenguage);
  }

  Ok(res: Response, data?: any): Response {
    const message = this.hasLenguaje() ? this.getEnvironment("OK") : "OK";
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      statusMessage: message,
      data: data,
    });
  }
  NotFound(res: Response, data?: any): Response {
    let message = "";
    const msg: string | undefined = this.hasLenguaje()
      ? this.getEnvironment("UPDATE_ERROR")
      : "Updated error";
    message = msg === undefined ? "Updated error" : msg;
    return res.status(HttpStatus.NOT_FOUND).json({
      status: HttpStatus.NOT_FOUND,
      statusMessage: message,
    });
  }
  Unauthorized(res: Response, data?: any): Response {
    const message = this.hasLenguaje()
      ? this.getEnvironment("UNAUTHORIZED")
      : "Unauthorized";
    return res.status(HttpStatus.UNAUTHORIZED).json({
      status: HttpStatus.UNAUTHORIZED,
      statusMessage: message,
    });
  }
  Forbidden(res: Response, data?: any): Response {
    const message = this.hasLenguaje()
      ? this.getEnvironment("FORBIDDEN")
      : "Forbidden";
    return res.status(HttpStatus.FORBIDDEN).json({
      status: HttpStatus.FORBIDDEN,
      statusMessage: message,
    });
  }

  Error(res: Response, data?: any): Response {
    const message = this.hasLenguaje()
      ? this.getEnvironment("ERROR")
      : "Internal Server Error";
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      statusMessage: message,
    });
  }

  Created(res: Response, data?: any): Response {
    const message = this.hasLenguaje()
      ? this.getEnvironment("CREATED")
      : "Created";
    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      statusMessage: message,
      data: data,
    });
  }

  Updated(res: Response, data?: UpdateResult): Response {
    const message = this.hasLenguaje()
      ? this.getEnvironment("UPDATED")
      : "Updated";
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      statusMessage: message,
      data: data,
    });
  }

  Deleted(res: Response, data?: any): Response {
    const message = this.hasLenguaje()
      ? this.getEnvironment("DELETED")
      : "Deleted";
    return res.status(HttpStatus.DELETED).json({
      status: HttpStatus.DELETED,
      statusMessage: message,
    });
  }

  BadRequest(res: Response, data?: any): Response {
    const message = this.hasLenguaje()
      ? this.getEnvironment("BAD_REQUEST")
      : "Bad Request";
    return res.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      statusMessage: message,
    });
  }
}
