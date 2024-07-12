import passport from "passport";
import { Request, Response, NextFunction } from "express";
import { UserEntity } from "../../user/entities/user.entity";
import { RoleType } from "../../user/entities/role";
import { AuthErrorResponse } from "../../auth/interfaces/auth.error.response.interface";

export class SharedMiddleware {
  constructor() {}

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

  checkAdminRole(req: Request, res: Response, next: NextFunction) {
    const user = req.user as UserEntity;
    if (user.role !== RoleType.ADMIN) {
      return res.status(401).json({ message: "Unauthorized", status: 401 });
    }
    return next();
  }

  checkUserRole(req: Request, res: Response, next: NextFunction) {
    const user = req.user as UserEntity;

    if (user.role === RoleType.USER || user.role === RoleType.ADMIN) {
      return next();
    }
    return res.status(401).json({ message: "Unauthorized", status: 401 });
  }
}
