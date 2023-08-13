import { NextFunction, Request, Response } from "express";
import { findUniqueUserByEmail, getAllUsers } from "./users.service";
import { omit } from "lodash";

export const getUsersHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getAllUsers();
    console.log(user);
    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getMeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const findUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.params;
  try {
    const user = await findUniqueUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
