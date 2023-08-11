import { NextFunction, Request, Response } from "express";
import { getAllUsers } from "./users.service";

export const getUsersHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const user = await getAllUsers()
        if (user) {
            return res.status(200).json(user)
        }
        return res.status(404).json({ message: "User not found" })
    } catch (error) {
        console.error(error)
    }
}

export const healthCheck = async (req: Request, res: Response) => {
    res.json({ message: "OK" })
}