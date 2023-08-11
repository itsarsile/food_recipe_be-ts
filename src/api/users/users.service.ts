import db from "../../db"
import { user } from "../../db/schema"


export const getAllUsers = async () => {
    return (await db.select().from(user))
}