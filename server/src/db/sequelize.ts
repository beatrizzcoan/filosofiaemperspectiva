import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const {
  DB_HOST = "localhost",
  DB_PORT = "5432",
  DB_NAME = "myapp",
  DB_USER = "myuser",
  DB_PASSWORD = "mypassword",
  DB_SSL = "false",
  DB_LOGGING = "true",
} = process.env;

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: "postgres",
  logging: DB_LOGGING === "true" ? console.log : false,
  dialectOptions: {
    ssl:
      DB_SSL === "true" ? { require: true, rejectUnauthorized: false } : false,
  },
});
