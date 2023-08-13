import { CreateRecipe } from "../../../types";
import db from "../../db";
import { recipe } from "../../db/schema";

export const createRecipe = async (input: CreateRecipe) => {
  return await db.insert(recipe).values(input);
};
