import dotenv from "dotenv";
import { sequelize } from "./db/sequelize";
import { initModels } from "./models";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/auth.routes";
import { seedDatabase } from "./db/seeder";
import storyRoutes from "./routes/story.routes";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

const PORT = Number(process.env.PORT || 8000);
export const JWT_SECRET: string = process.env.JWT_SECRET!;

async function start() {
  if (!JWT_SECRET) {
    console.error("JWT_SECRET is not defined in environment variables");
    process.exit(1);
  }

  try {
    initModels(sequelize);
    app.use(express.json());

    await sequelize.authenticate();
    console.log("db connection established");

    await sequelize.sync({ alter: false });
    console.log("models synchronized");

    await seedDatabase();

    app.use("/auth", userRoutes);
    app.use("/stories", storyRoutes);

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
