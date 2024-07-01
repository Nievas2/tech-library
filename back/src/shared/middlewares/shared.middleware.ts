import passport from "passport";
import { Request, Response, NextFunction } from "express";
import { UserEntity } from "../../user/entities/user.entity";
import { RoleType } from "../../user/entities/role";

export class SharedMiddleware {
  constructor() {}

  passAuth(typeStrategy: string) {
    return passport.authenticate(typeStrategy, { session: false, failureRedirect: "/api/auth/login"});
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
