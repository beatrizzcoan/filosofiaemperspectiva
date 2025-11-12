import dotenv from "dotenv";
import { sequelize } from "./db/sequelize";
import { initModels } from "./models";
import express from "express";
import userRoutes from "./routes/auth.routes";
dotenv.config();

const app = express();

const PORT = Number(process.env.PORT || 8000);

async function start() {
  try {
    initModels(sequelize);
    app.use(express.json());

    await sequelize.authenticate();
    console.log("db connection established");

    await sequelize.sync({ alter: false });
    console.log("models synchronized");

    app.use("/auth", userRoutes);

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`server is listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("failed to start server:", err);
    process.exit(1);
  }
}

start();

// process.on("unhandledRejection", (reason, promise) => {})

// process.on("uncaughtException", (error) => {})
