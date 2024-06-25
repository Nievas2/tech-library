import { Request, Response } from "express";
import { LibraryHttpResponse } from "../response/library.http.response";
import { GlobalExceptionHandling } from "../../shared/exception/global.exception.handling";
import { LibraryService } from "../services/library.service";

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
  public async getLibrarys(_req: Request, res: Response) {
    try {
      const data = await this.service.findAll();
      if (data.length === 0)
        return this.libraryHttpResponse.NotFound(res, data);
      return this.libraryHttpResponse.Ok(res, data);
    } catch (error) {
      if (error instanceof Error)
        return this.globalExceptionHandler.handleErrors(error, res);
    }
  }

  public async getLibrarysStatusActiveWhithUserLike(req: Request, res: Response) {
    try {
      const idUsuario = Number(req.params.userid);
      console.log(idUsuario);
      
      const data = await this.service.findAllStatusActiveWithLike(idUsuario);
      if (data.length === 0)
        return this.libraryHttpResponse.NotFound(res, data);
      return this.libraryHttpResponse.Ok(res, data);
    } catch (error) {
      if (error instanceof Error)
        return this.globalExceptionHandler.handleErrors(error, res);
    }
  }

  public async getLibrarysStatusActive(_req: Request, res: Response) {
    try {
      const data = await this.service.findAllStatusActive();
      if (data.length === 0)
        return this.libraryHttpResponse.NotFound(res, data);
      return this.libraryHttpResponse.Ok(res, data);
    } catch (error) {
      if (error instanceof Error)
        return this.globalExceptionHandler.handleErrors(error, res);
    }
  }

  public async getLibrarysStatusPending(_req: Request, res: Response) {
    try {
      const data = await this.service.findAllStatusPending();
      if (data.length === 0)
        return this.libraryHttpResponse.NotFound(res, data);
      return this.libraryHttpResponse.Ok(res, data);
    } catch (error) {
      if (error instanceof Error)
        return this.globalExceptionHandler.handleErrors(error, res);
    }
  }

  public async getLibrarysStatusInactive(_req: Request, res: Response) {
    try {
      const data = await this.service.findAllStatusInactive();
      if (data.length === 0)
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
      const data = await this.service.findyAllByUserId(id);
      if (data.length === 0)
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
      const data = await this.service.findById(id);
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
  };


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
  };

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


}
