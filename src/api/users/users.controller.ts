import { NextFunction, Request, Response } from "express";
import { createUser, getAllUsers } from "./users.service";

export const getUsersHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getAllUsers();
    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const createUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password, phone } = req.body;

  console.log(name, email, password, phone);
  try {
    const createdUser = await createUser({ name, email, password, phone });
    return res
      .status(201)
      .json({ message: "User created successfully", createdUser });
  } catch (error) {
    next(error);
  }
};

export const healthCheck = async (req: Request, res: Response) => {
  res.json({ message: "OK" });
};
