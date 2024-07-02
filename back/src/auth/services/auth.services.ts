import { ConfigServer } from "../../config/config";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { UserService } from "../../user/services/user.service";
import { UserEntity } from "../../user/entities/user.entity";
import { PayloadToken } from "../interfaces/auth.interface";
import { UserDTO, UserResponseDTO } from "../../user/entities/user.dto";
import { Request, Response } from "express";

/**
 * @class AuthService
 * @author Emiliano Gonzalez
 * @description Clase que se encarga de manejar las peticiones de login y registro
 * @method validateUser - Método que se encarga de validar el usuario y contraseña
 * @method sing - Método que se encarga de generar el token
 * @method generateToken - Método que se encarga de generar el token
 * @method getEnvironment - Método que se encarga de obtener la variable de entorno
 */
export class AuthService extends ConfigServer {
  constructor(
    private readonly userService: UserService = new UserService(),
    private readonly jwtInstance = jwt
  ) {
    super();
  }

  /**
   * @method validateUser
   * @param username
   * @param password
   * @returns Promise<UserEntity | null>
   * @description Método que se encarga de validar el usuario y comprobar la contraseña
   */
  public async validateUser(
    username: string,
    password: string
  ): Promise<UserEntity | null> {
    const userByUsername = await this.userService.findUserByUsername(username);

    if (userByUsername) {
      const isMatch = await bcrypt.compare(password, userByUsername.password);
      if (!isMatch) return null;
      
      return userByUsername;
    }

    return null;
  }

  /**
   * @method sing
   * @param payload
   * @param secret
   * @returns Promise<string>
   * @description Método que se encarga de generar el token
   */
  sing(payload: jwt.JwtPayload, secret: string) {
    return this.jwtInstance.sign(payload, secret);
  }

  /**
   * @method generateToken
   * @param user
   * @returns Promise<{ accesToken: string; user: UserResponseDTO }>
   * @description Método que se encarga de generar el token 
   */
  public async generateToken(
    user: UserEntity
  ): Promise<{ accesToken: string; user: UserResponseDTO }> {
    
    const userConsult = await this.userService.findUserWithRole(
      user.id,
      user.role
    );

    const payload: PayloadToken = {
      role: userConsult!.role,
      sub: userConsult!.id.toString(),
      name: userConsult!.username,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
    };

    const secret = this.getEnvironment("JWT_SECRET") || "secret";

    const userResponse = new UserResponseDTO(user);

    return {
      accesToken: this.sing(payload, secret),
      user: userResponse,
    };
  }

  /**
   * @method createUser
   * @param req
   * @param _res
   * @returns Promise<UserEntity>
   * @description Método que se encarga de crear un nuevo usuario
   */
  public async createUser(req: Request, _res: Response) {
    const userdto: UserDTO = req.body;
    const data = await this.userService.create(userdto);
    return data;
  }

}
