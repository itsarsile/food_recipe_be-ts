import express from "express";
import { deserializeUser } from "../../middlewares/deserializeUser";
import { requireUser } from "../../middlewares/requireUser";
import {
  createCommentHandler,
  getCommentsByRecipeIdHandler,
} from "./comments.controller";

const router = express.Router();

router.use(deserializeUser, requireUser);

router
  .post("/", createCommentHandler)
  .get("/recipes/:recipeId", getCommentsByRecipeIdHandler);

export default router;
