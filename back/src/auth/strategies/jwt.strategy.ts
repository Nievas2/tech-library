import { PayloadToken } from "../interfaces/auth.interface";
import { AuthService } from "../services/auth.services";
import { usePassport } from "../utils/passport.use";
import { Strategy as JwtStr, StrategyOptions, ExtractJwt } from "passport-jwt";

/**
 * @class JwtStrategy
 * @author Emiliano Gonzalez
 * @version 1.0.0
 * @description Clase que se encarga de manejar el token de autorización
 * @method validate - Método que se encarga de validar el token de autorización
 * @method use - Método que se encarga de utilizar el token de autorización y validarlo
 */
export class JwtStrategy extends AuthService {
  constructor() {
    super();
  }

  /**
   * @method validate
   * @param payload
   * @param done
   * @returns done - Retorna el token de autorización
   */
  async validate(payload: PayloadToken, done: any) {
    if (!payload) {
      return done( null, false ,{status: 401, message: "Invalid token"});
    }
    return done(null, payload);
  }

  /**
   * @method use
   * @description Método que se encarga de registrar la estrategia jwt en passport, utilizando el token de autorización y validarlo
   * @returns usePassport - Retorna en req.user el payload del token
   * @params passReqToCallback - false - No se pasa el req al callback
   * @params secretOrKey - JWT_SECRET - Clave secreta del token
   * @params jwtFromRequest - ExtractJwt.fromAuthHeaderAsBearerToken() - Extrae el token de la cabecera de la petición
   * @params "jwt" - Nombre de la estrategia
   * @params JwtStr - Clase generica del controlador strategy
   */
  get use() {
    return usePassport<
      JwtStr,
      StrategyOptions & { passReqToCallback?: false },
      (payload: PayloadToken, done: any) => Promise<PayloadToken>
    >("jwt", JwtStr, {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: this.getEnvironment("JWT_SECRET") || "secret",
      passReqToCallback: false, 

    }, this.validate);
  }
}
