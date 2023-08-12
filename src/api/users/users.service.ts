import { eq } from "drizzle-orm";
import db from "../../db";
import { user } from "../../db/schema";
import { FindUser } from "../../../types";
import { omit } from "lodash";
import redisClient from "../../lib/redisClient";
import { signJwt } from "../../lib/jwt";
import c from "config";

const excludedData = ["password"];

export const getAllUsers = async () => {
  return await db.select().from(user);
};

export const findUniqueUserByEmail = async (input: string) => {
  return await db.select().from(user).where(eq(user.email, input));
};

export const findUniqueUserById = async (input: number) => {
  return await db.select().from(user).where(eq(user.id, input));
};

export const signTokens = async (user: FindUser) => {
  redisClient.set(`${user.id}`, JSON.stringify(omit(user, excludedData)), {
    EX: c.get<number>("redisCacheExpiresIn") * 60,
  });

  const accessToken = signJwt({ sub: user.id }, {
    expiresIn: `${c.get<number>("accessTokenExpiresIn")}m`,
  });

  const refreshToken = signJwt({ sub: user.id }, {
    expiresIn: `${c.get<number>("refreshTokenExpiresIn")}m`,
  });

  return { accessToken, refreshToken };
};
