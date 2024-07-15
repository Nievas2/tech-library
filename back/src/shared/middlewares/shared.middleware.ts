import passport from "passport";
import { Request, Response, NextFunction } from "express";
import { UserEntity } from "../../user/entities/user.entity";
import { RoleType } from "../../user/entities/role";
import { AuthErrorResponse } from "../../auth/interfaces/auth.error.response.interface";

/**
 * @class SharedMiddleware
 * @author Emiliano Gonzalez
 * @version 1.0.0
 * @description Clase que se encarga de manejar las estrategias de autenticacion de los usuarios con passport mediante middlewares
 * @method passAuth - Método que se encarga de manejar las estrategias de autenticacion de los usuarios con passport
 * @method checkAdminRole - Método que se encarga de verificar si el usuario es administrador
 * @method checkUserRole - Método que se encarga de verificar si el usuario es usuario
 */
export class SharedMiddleware {
  constructor() {}

  /**
   * @method passAuth - Método que se encarga de manejar las estrategias de autenticacion de los usuarios con passport 
   */
  passAuth(typeStrategy: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      passport.authenticate(typeStrategy, { session: false }, (err: any, user: any, info: AuthErrorResponse) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(401).json(info);
        }
        req.logIn(user, { session: false }, (err) => {
          if (err) {
            return next(err);
          }
          next();
        });
      })(req, res, next);
    };
  }

  /**
   * @method checkAdminRole - Método que se encarga de verificar si el usuario es administrador
   */
  checkAdminRole(req: Request, res: Response, next: NextFunction) {
    const user = req.user as UserEntity;
    if (user.role !== RoleType.ADMIN) {
      return res.status(401).json({ message: "Unauthorized", status: 401 });
    }
    return next();
  }

  /**
   * @method checkUserRole - Método que se encarga de verificar si el usuario es usuario
   */
  checkUserRole(req: Request, res: Response, next: NextFunction) {
    const user = req.user as UserEntity;

    if (user.role === RoleType.USER || user.role === RoleType.ADMIN) {
      return next();
    }
    return res.status(401).json({ message: "Unauthorized", status: 401 });
  }
}
