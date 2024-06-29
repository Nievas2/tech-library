import { Request, Response } from "express";
import { LibraryHttpResponse } from "../response/library.http.response";
import { GlobalExceptionHandling } from "../../shared/exception/global.exception.handling";
import { LibraryService } from "../services/library.service";
import { getValidNumber } from "../../shared/utils/utils";
import { TagIdInvalidException } from "../../tag/exceptions/tag.id.invalid";
import { isArray } from "class-validator";
import { UserEntity } from "../../user/entities/user.entity";

/**
 * @version 1.0.0
 * @author Emiliano Gonzalez
 * @class LibraryController
 * @description Clase que se encarga de manejar la logica de los libros en el sistema
 * @method getLibrary - Método que se encarga de retornar una libreria
 */
export class LibraryController {
  constructor(
    private readonly service: LibraryService = new LibraryService(),
    private readonly libraryHttpResponse: LibraryHttpResponse = new LibraryHttpResponse(
      service.lenguaje
    ),
    private readonly globalExceptionHandler: GlobalExceptionHandling = new GlobalExceptionHandling(
      service.lenguaje
    )
  ) {}

  //--------------------GET--------------------
  public async getLibrarys(req: Request, res: Response) {
    try {
      const { currentPage, pageSize } = this.getParams(req);
      const data = await this.service.findAll(currentPage, pageSize);
      if (data.results.length === 0)
        return this.libraryHttpResponse.NotFound(res, data);
      return this.libraryHttpResponse.Ok(res, data);
    } catch (error) {
      if (error instanceof Error)
        return this.globalExceptionHandler.handleErrors(error, res);
    }
  }

  public async getLibrarysStatusActiveWhithUserLike(
    req: Request,
    res: Response
  ) {
    try {
      const idUsuario = Number(req.params.userid);
      const { currentPage, pageSize } = this.getParams(req);

      const data = await this.service.findAllStatusActiveWithLike(
        idUsuario,
        currentPage,
        pageSize
      );

      if (data.results.length === 0)
        return this.libraryHttpResponse.NotFound(res, data);
      return this.libraryHttpResponse.Ok(res, data);
    } catch (error) {
      if (error instanceof Error)
        return this.globalExceptionHandler.handleErrors(error, res);
    }
  }

  public async getLibrarysStatusActive(req: Request, res: Response) {
    try {
      const { currentPage, pageSize } = this.getParams(req);
      const data = await this.service.findAllStatusActive(
        currentPage,
        pageSize
      );
      if (data.results.length === 0)
        return this.libraryHttpResponse.NotFound(res, data);
      return this.libraryHttpResponse.Ok(res, data);
    } catch (error) {
      if (error instanceof Error)
        return this.globalExceptionHandler.handleErrors(error, res);
    }
  }

  public async getLibrarysStatusPending(req: Request, res: Response) {
    try {
      const { currentPage, pageSize } = this.getParams(req);
      const data = await this.service.findAllStatusPending(
        currentPage,
        pageSize
      );
      if (data.results.length === 0)
        return this.libraryHttpResponse.NotFound(res, data);
      return this.libraryHttpResponse.Ok(res, data);
    } catch (error) {
      if (error instanceof Error)
        return this.globalExceptionHandler.handleErrors(error, res);
    }
  }

  public async getLibrarysStatusInactive(req: Request, res: Response) {
    try {
      const { currentPage, pageSize } = this.getParams(req);
      const data = await this.service.findAllStatusInactive(
        currentPage,
        pageSize
      );
      if (data.results.length === 0)
        return this.libraryHttpResponse.NotFound(res, data);
      return this.libraryHttpResponse.Ok(res, data);
    } catch (error) {
      if (error instanceof Error)
        return this.globalExceptionHandler.handleErrors(error, res);
    }
  }

  public async getLibrarysByUser(req: Request, res: Response) {
    try {
      const id = Number(req.params.userid);
      const { currentPage, pageSize } = this.getParams(req);

      const userAuth = req.user as UserEntity;
      const data = await this.service.findyAllByUserId(
        id,
        currentPage,
        pageSize,
        userAuth
      );
      if (data.results.length === 0)
        return this.libraryHttpResponse.NotFound(res, data);
      return this.libraryHttpResponse.Ok(res, data);
    } catch (error) {
      if (error instanceof Error)
        return this.globalExceptionHandler.handleErrors(error, res);
    }
  }

  public async findById(_req: Request, res: Response) {
    try {
      const id = Number(_req.params.id);
      const data = await this.service.findByIdDTO(id);
      return this.libraryHttpResponse.Ok(res, data);
    } catch (error) {
      if (error instanceof Error)
        return this.globalExceptionHandler.handleErrors(error, res);
    }
  }

  /**
   * @author: Emiliano Gonzalez
   * @description - Método que se encarga de retornar una libreria determinada por filtros de búsqueda, tanto la búsqueda como la paginación, por nombre de libreria y por tags que contenga
   * @method getLibrarysSearch
   * @param idUsuario - Id del usuario
   * @param query - Cuerpo de la petición
   * @param tagList - Lista de tags
   * @param currentPage - Página actual
   * @param pageSize - Cantidad de elementos por página
   */
  public async getLibrarysSearch(req: Request, res: Response) {
    try {
      const { currentPage, pageSize } = this.getParams(req);
      const idUsuario = Number(req.params.userid);
      const query = req.query.q as string;
      const orderLike = req.query.like as string;
      const tagList = req.body.tags as number[];

      let tagListParse: number[] = [];

      if (isArray(tagList)) {
        tagListParse = tagList.map((item) => {
          if (Number.isNaN(Number(item))) {
            throw new TagIdInvalidException(item);
          }
          return Number(item);
        });
      }

      const data = await this.service.findAllSearchQueryCustom(
        idUsuario,
        currentPage,
        pageSize,
        tagListParse,
        query,
        orderLike
      );
      if (data.results.length === 0)
        return this.libraryHttpResponse.NotFound(res, data);
      return this.libraryHttpResponse.Ok(res, data);
    } catch (error) {
      if (error instanceof Error)
        return this.globalExceptionHandler.handleErrors(error, res);
    }
  }

  //--------------------POST--------------------
  public async createLibrary(req: Request, res: Response) {
    try {
      const idUsuario = Number(req.params.userid);
      const data = await this.service.create(req.body, idUsuario);
      return this.libraryHttpResponse.Created(res, data);
    } catch (error) {
      if (error instanceof Error)
        return this.globalExceptionHandler.handleErrors(error, res);
    }
  }

  public async likeLibrary(req: Request, res: Response) {
    try {
      const idUsuario = Number(req.params.userid);
      const idLibrary = Number(req.params.libraryid);
      const data = await this.service.addLikeInLibrary(idUsuario, idLibrary);
      return this.libraryHttpResponse.Ok(res, data);
    } catch (error) {
      if (error instanceof Error)
        return this.globalExceptionHandler.handleErrors(error, res);
    }
  }

  //--------------------PUT--------------------
  public async updateLibrary(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const urlApi = req.originalUrl;
      const data = await this.service.update(id, req.body, urlApi);
      return this.libraryHttpResponse.Ok(res, data);
    } catch (error) {
      if (error instanceof Error)
        return this.globalExceptionHandler.handleErrors(error, res);
    }
  }

  public async restoreLogic(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = await this.service.restoreLogic(id);
      return this.libraryHttpResponse.Ok(res, data);
    } catch (error) {
      if (error instanceof Error)
        return this.globalExceptionHandler.handleErrors(error, res);
    }
  }

  //--------------------DELETE--------------------
  public async deleteLibrary(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = await this.service.delete(id);
      return this.libraryHttpResponse.Deleted(res, data);
    } catch (error) {
      if (error instanceof Error)
        return this.globalExceptionHandler.handleErrors(error, res);
    }
  }

  public async deleteLogicLibrary(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = await this.service.deleteLogic(id);
      return this.libraryHttpResponse.Deleted(res, data);
    } catch (error) {
      if (error instanceof Error)
        return this.globalExceptionHandler.handleErrors(error, res);
    }
  }

  public async unlikeLibrary(req: Request, res: Response) {
    try {
      const idUsuario = Number(req.params.userid);
      const idLibrary = Number(req.params.libraryid);
      const data = await this.service.removeLikeInLibrary(idUsuario, idLibrary);
      return this.libraryHttpResponse.Ok(res, data);
    } catch (error) {
      if (error instanceof Error)
        return this.globalExceptionHandler.handleErrors(error, res);
    }
  }

  private getParams(req: Request) {
    const defaultPageSize =
      this.service.getNumberEnvironment("DEFAULT_PAGE_SIZE");
    const currentPage = getValidNumber(req.query.page, 1);
    const pageSize = getValidNumber(
      req.query.size,
      getValidNumber(defaultPageSize, 9)
    );

    return {
      currentPage,
      pageSize,
    };
  }
}
