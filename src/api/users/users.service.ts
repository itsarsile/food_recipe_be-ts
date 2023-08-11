import { CreateUser } from "../../../types"
import db from "../../db"
import { user } from "../../db/schema"

export const getAllUsers = async () => {
    return (await db.select().from(user))
}

export const createUser = async (input: CreateUser) => {
    return (await db.insert(user).values(input).returning())
}