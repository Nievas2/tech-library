import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";



dotenv.config(
    {
        path: process.env.NODE_ENV !== undefined ? `${process.env.NODE_ENV.trim()}.env` : ".env",
    }
);

/**
 * @version 1.0.0
 * @author Emiliano Gonzalez
 * @description Configuración de la base de datos MySQL
 */
const Config: DataSourceOptions = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  migrations: [__dirname + "./../migrations/*{.ts,.js}"],
  synchronize: true,
  migrationsRun: true,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
};



export const AppDataSource: DataSource = new DataSource(Config);
