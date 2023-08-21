import express, { Application } from "express";
import userRoutes from "./api/users";
import authRoutes from "./api/auth";
import recipeRoutes from "./api/recipes";
import commentRoutes from "./api/comments";
const app: Application = express();

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/comments", commentRoutes);

export default app;
