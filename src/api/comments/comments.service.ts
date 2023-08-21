import { eq } from "drizzle-orm";
import db from "../../db";
import { comments, user } from "../../db/schema";

export const createComment = async ({ authorId, recipeId, text }: any) => {
  return await db
    .insert(comments)
    .values({ authorId, recipeId, text })
    .returning();
};

export const getCommentsByRecipeId = async (recipeId: number) => {
  return await db
    .select({
      id: comments.id,
      author: user.name,
      text: comments.text,
      createdAt: comments.createdAt,
    })
    .from(comments)
    .where(eq(comments.recipeId, recipeId))
    .leftJoin(user, eq(comments.authorId, user.id));
};
