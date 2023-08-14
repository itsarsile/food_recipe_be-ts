import { NextFunction, Request, Response } from "express";
import { omit } from "lodash";
import redisClient from "../lib/redisClient";
import { verifyJwt } from "../lib/jwt";
import { excludedData, findUniqueUserById } from "../api/users/users.service";

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let accessToken;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      accessToken = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.accessToken) {
      accessToken = req.cookies.accessToken;
    }

    console.log(accessToken);

    if (!accessToken) {
      return next("You are not logged in");
    }

    // Validate the access token
    const decoded = verifyJwt<{ sub: string }>(accessToken);
    console.log(decoded);
    if (!decoded) {
      return next(`Invalid token or user doesn't exist`);
    }

    // Check if the user has a valid session
    const session = await redisClient.get(decoded.sub.toString());

    if (!session) {
      return next(`Invalid token or session has expired`);
    }

    // Check if the user still exist
    const user = await findUniqueUserById(JSON.parse(session).id);
    if (!user) {
      return next(`Invalid token or session has expired`);
    }

    // Add user to res.locals
    res.locals.user = omit(user[0], "password");

    next();
  } catch (err: any) {
    next(err);
  }
};
