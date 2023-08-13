import express, { Application } from "express";
import userRoutes from "./api/users";
import authRoutes from "./api/auth";
import recipeRoutes from "./api/recipes";

const app: Application = express();

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);

export default app;
