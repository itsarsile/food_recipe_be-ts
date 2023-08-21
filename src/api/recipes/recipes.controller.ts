import { NextFunction, Request, Response } from "express";
import {
  createRecipe,
  deleteRecipeById,
  getAllRecipes,
  getRecipeById,
  getRecipesByUserId,
  updateRecipe,
} from "./recipes.service";

export const getAllRecipesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipes = await getAllRecipes();
    return res.status(200).json({ recipes });
  } catch (error) {
    next(error);
  }
};

export const getRecipesByUserIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    console.log(id);
    const recipes = await getRecipesByUserId(Number(id));
    if (recipes.length === 0) {
      return res.status(404).json({ message: "Recipes not found" });
    }
    return res.status(200).json({ recipes });
  } catch (error) {
    next(error);
  }
};

export const createRecipeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description, photo, video } = req.body;

  try {
    const authorId = res.locals.user.id;
    const newRecipe = await createRecipe({
      title,
      description,
      photo,
      video,
      authorId,
    });
    return res.status(201).json({ newRecipe });
  } catch (error) {
    next(error);
  }
};

export const updateRecipeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description, photo } = req.body;
  try {
    console.log(description);
    const recipeId = req.params.id;
    const updatedRecipe = await updateRecipe(
      {
        title,
        description,
        photo,
      },
      Number(recipeId)
    );

    return res.status(200).json({ updatedRecipe });
  } catch (error) {
    next(error);
  }
};

export const getRecipeByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipeId = req.params.id;
    const recipe = await getRecipeById(Number(recipeId));
    console.log(recipe);
    return res.status(200).json({ recipe });
  } catch (error) {
    next(error);
  }
};

export const deleteRecipeByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipeId = req.params.id;
    const deletedRecipe = await deleteRecipeById(Number(recipeId));
    return res.status(200).json({ deletedRecipe });
  } catch (error) {
    next(error);
  }
};
