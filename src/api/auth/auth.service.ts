import { eq } from "drizzle-orm";
import { CreateUser } from "../../../types";
import db from "../../db";
import { user } from "../../db/schema";


export const createUser = async (input: CreateUser) => {
  return await db.insert(user).values(input).returning();
};

export const loginUser = async (email: string, password: string) => {
  return await db
    .select()
    .from(user)
    .where(eq(user.email, email))
    .where(eq(user.password, password));
};

