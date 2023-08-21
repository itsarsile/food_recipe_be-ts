import { NextFunction, Request, Response } from "express";
import { createComment, getCommentsByRecipeId } from "./comments.service";

export const createCommentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorId, recipeId, text } = req.body;
    const comment = await createComment({
      authorId,
      recipeId,
      text,
    });

    return res.status(201).json({ message: "Comment added", comment });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while adding comment", error });
  }
};

export const getCommentsByRecipeIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { recipeId } = req.params;
    const comments = await getCommentsByRecipeId(Number(recipeId));

    res.status(200).json({ message: "OK", comments });
  } catch (error) {
    return res.status(500).json({ message: "Error while retrieving comment" });
  }
};
