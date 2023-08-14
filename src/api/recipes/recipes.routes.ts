import express from "express";
import { deserializeUser } from "../../middlewares/deserializeUser";
import { requireUser } from "../../middlewares/requireUser";
import {
  createRecipeHandler,
  deleteRecipeByIdHandler,
  getAllRecipesHandler,
  getRecipeByIdHandler,
  getRecipesByUserIdHandler,
  updateRecipeHandler,
} from "./recipes.controller";

const router = express.Router();
router.use(deserializeUser, requireUser);

router
  .get("/", getAllRecipesHandler)
  .get("/:id", getRecipeByIdHandler)
  .get("/author/:id", getRecipesByUserIdHandler)
  .post("/", createRecipeHandler)
  .delete("/:id", deleteRecipeByIdHandler)
  .put("/:id", updateRecipeHandler);

export default router;
