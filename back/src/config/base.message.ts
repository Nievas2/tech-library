import * as dotenv from "dotenv";

/**
 * @version 1.0.0
 * @author Emiliano Gonzalez
 * @class BaseMessage
 * @description Clase que se encarga de manejar la logica de las variables de entorno relacionada a los mensajes en distintos idiomas
 * @method getEnvironment - Método que se encarga de obtener el valor de una variable de entorno
 * @method createPathEnv - Método que se encarga de crear el path de la variable de entorno
 * @method hasLenguaje - Método que se encarga de verificar si la variable de entorno tiene un valor
 * @property lenguaje - Propiedad que se encarga de obtener el valor de la variable de entorno
 */
export abstract class BaseMessage {
  private lenguaje!: string | undefined;

  constructor(lenguaje: string | undefined) {
    this.lenguaje = lenguaje;
    if (this.lenguaje) {
      const nodeNameEnv = this.createPathEnv(this.lenguaje);
      dotenv.config({ path: nodeNameEnv });
    }
  }

  public hasLenguaje(): boolean {
    return this.lenguaje == undefined ? false : true;
  }

  public createPathEnv(path: string): string {
    const arrEnv: string[] = ["env"];

    if (path.length > 0) {
      const stringToArray = path.split(".");
      arrEnv.unshift(...stringToArray);
    }

    return "." + arrEnv.join(".");
  }

  public getEnvironment(key: string): string | undefined {
    return process.env[key];
  }
}
