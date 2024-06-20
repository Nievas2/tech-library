import { Response } from "express";
import { UserNotFoundException } from "../../user/exceptions/user.notfound.exception";
import {
  UserAlreadyExistByEmailException,
  UserAlreadyExistByUsernameException,
  UserAlreadyExistException,
} from "../../user/exceptions/user.alreadyexist.exception";
import { UserHttpResponse } from "../../user/response/user.http.response";
import { TagHttpResponse } from "../../tag/response/tag.http.response";
import { TagNotFoundException } from "../../tag/exceptions/tag.notfound.exception";
import { TagAlreadyExistException } from "../../tag/exceptions/tag.alreadyexist.exception";
import { LibraryNotFoundException } from "../../library/exception/library.notfound";
import { LibraryHttpResponse } from "../../library/response/library.http.response";
import { LibraryAlreadyExistException } from "../../library/exception/library.already.exist";
import { LikeHttpResponse } from "../../like/response/like.http.response";
import { LikeErrorException } from "../../like/exception/like.error";

/**
 * @description Tipado de la respuesta de las excepciones de respuesta HTTP
 */
export type ErrorResponseHandler = (res: Response) => Response;

/**
 * @description Interfaz para las excepciones de respuesta HTTP
 * @returns Una interfaz para las excepciones de respuesta HTTP
 */
export interface ExceptionConstructor<T extends Error> {
  new (...args: any[]): T;
}

/**
 * @description Crea un mapa con los tipos de excepciones y sus manejadores de errores de respuesta HTTP, el objetivo del map es reducir el tiempo de chequeo de excepciones evitadndo if uno por uno
 * @param user - Instancia de la clase UserHttpResponse
 * @param tag - Instancia de la clase TagHttpResponse
 * @returns Un mapa con los tipos de excepciones y sus manejadores de errores de respuesta HTTP
 */
export const createErrorHandlerMap = (
  user: UserHttpResponse,
  tag: TagHttpResponse,
  library: LibraryHttpResponse,
  like: LikeHttpResponse
): Map<ExceptionConstructor<Error>, ErrorResponseHandler> => {
  return new Map<ExceptionConstructor<Error>, ErrorResponseHandler>([
    [
      UserNotFoundException,
      (res: Response) => user.BadRequestUserNotFound(res),
    ],
    [
      UserAlreadyExistByEmailException,
      (res: Response) => user.BadRequestUserAlreadyByEmail(res),
    ],
    [
      UserAlreadyExistByUsernameException,
      (res: Response) => user.BadRequestUserAlreadyByUsername(res),
    ],
    [
      UserAlreadyExistException,
      (res: Response) => user.BadRequestUserAlreadyExist(res),
    ],
    [ TagNotFoundException,
      (res: Response) => tag.BadRequestTagNotFound(res)],
    [
      TagAlreadyExistException,
      (res: Response) => tag.BadRequestTagAlreadyExist(res),
    ],
    [
      LibraryNotFoundException,
      (res: Response) => library.BadRequestLibraryNotFound(res),
    ],
    [
      LibraryAlreadyExistException,
      (res: Response) => library.BadRequestLibraryAlreadyExist(res),
    ],
    [
      LikeErrorException,
      (res: Response) => like.BadRequestLikeNotFound(res),
    ]
  ]);
};
