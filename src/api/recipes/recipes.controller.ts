import { NextFunction, Request, Response } from "express";
import {
  createRecipe,
  deleteRecipeById,
  getAllRecipes,
  getRecipeById,
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

export const createRecipeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description, photo } = req.body;

  try {
    const authorId = res.locals.user.id;
    const newRecipe = await createRecipe({
      title,
      description,
      photo,
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
    const recipeId = req.params.id;
    console.log(recipeId);
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
