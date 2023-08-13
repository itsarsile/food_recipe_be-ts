import { InferModel } from "drizzle-orm";
import { recipe, user } from "./src/db/schema";

export type CreateUser = InferModel<typeof user, "insert">;
export type FindUser = InferModel<typeof user, "select">;

export type CreateRecipe = InferModel<typeof recipe, "insert">;
