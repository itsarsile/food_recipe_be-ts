import { InferModel } from "drizzle-orm";
import { user } from "./src/db/schema";

export type CreateUser = InferModel<typeof user, 'insert'>
export type FindUser = InferModel<typeof user, 'select'>