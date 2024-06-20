import { Response } from "express";
import {
  ErrorResponseHandler,
  ExceptionConstructor,
  createErrorHandlerMap,
} from "./map.exception";
import { UserHttpResponse } from "../../user/response/user.http.response";
import { TagHttpResponse } from "../../tag/response/tag.http.response";
import { LibraryHttpResponse } from "../../library/response/library.http.response";
import { LikeHttpResponse } from "../../like/response/like.http.response";

/**
 * @version 1.0.0
 * @author Emiliano Gonzalez
 * @class GlobalExceptionHandling
 * @description Esta clase se encarga de manejar las excepciones de modo universal y devolver los estados http correspondientes
 * @method handleErrors - Método que se encarga de manejar las excepciones
 */
export class GlobalExceptionHandling {
  private errorHandlerMap: Map<
    ExceptionConstructor<Error>,
    ErrorResponseHandler
  >;
  private userHttpResponse!: UserHttpResponse;
  private tagHttpResponse!: TagHttpResponse;
  private libraryResponse!: LibraryHttpResponse;
  private likeHttpResponse!: LikeHttpResponse;

  constructor(lenguaje: string | undefined) {
    this.userHttpResponse = new UserHttpResponse(lenguaje);
    this.tagHttpResponse = new TagHttpResponse(lenguaje);
    this.libraryResponse = new LibraryHttpResponse(lenguaje);
    this.likeHttpResponse = new LikeHttpResponse(lenguaje);


    this.errorHandlerMap = createErrorHandlerMap(
      this.userHttpResponse,
      this.tagHttpResponse,
      this.libraryResponse,
      this.likeHttpResponse
    );
  }

  public handleErrors(error: Error, res: Response): Response {
    const errorHandler = this.errorHandlerMap.get(
      error.constructor as ExceptionConstructor<Error>
    );

    console.log(error);
    
    if (errorHandler) {
      return errorHandler(res);
    }

    return this.userHttpResponse.Error(res, error);
  }
}
