import { eq } from "drizzle-orm";
import { CreateRecipe } from "../../../types";
import db from "../../db";
import { recipe } from "../../db/schema";

export const createRecipe = async (input: CreateRecipe) => {
  return await db.insert(recipe).values(input).returning();
};

export const getAllRecipes = async () => {
  return await db.select().from(recipe);
};

export const updateRecipe = async (input: Object, recipeId: number) => {
  return await db.update(recipe).set(input).where(eq(recipe.id, recipeId));
};

export const getRecipesByUserId = async (input: number) => {
  const response = db.select().from(recipe).where(eq(recipe.authorId, input));
  console.log(response);
  return response;
};

export const getRecipeById = async (recipeId: number) => {
  return await db.select().from(recipe).where(eq(recipe.id, recipeId));
};

export const deleteRecipeById = async (recipeId: number) => {
  return await db.delete(recipe).where(eq(recipe.id, recipeId));
};
