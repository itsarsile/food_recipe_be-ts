import bcrypt from "bcryptjs";
import c from "config";
import * as dotenv from "dotenv";
import { CookieOptions, NextFunction, Request, Response } from "express";
import { signJwt, verifyJwt } from "../../lib/jwt";
import redisClient from "../../lib/redisClient";
import { findUniqueUserByEmail, findUniqueUserById, signTokens } from "../users/users.service";
import { createUser } from "./auth.service";
dotenv.config();

const cookiesOptions: CookieOptions = {
  httpOnly: true,
  sameSite: "lax",
};

if (process.env.NODE_ENV === "production") cookiesOptions.secure = true;

const accessTokenCookieOptions: CookieOptions = {
  ...cookiesOptions,
  expires: new Date(
    Date.now() + c.get<number>("accessTokenExpiresIn") * 60 * 1000
  ),
  maxAge: c.get<number>("accessTokenExpiresIn") * 60 * 1000,
};

const refreshTokenCookieOptions: CookieOptions = {
  ...cookiesOptions,
  expires: new Date(
    Date.now() + c.get<number>("refreshTokenExpiresIn") * 60 * 1000
  ),
  maxAge: c.get<number>("refreshTokenExpiresIn") * 60 * 1000,
};

export const registerHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password, phone } = req.body;


  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    if (newUser) {
      return res.status(201).json(newUser);
    }

    return res.status(400).json({ message: "User not created" });
  } catch (error) {
    next(error);
  }
};

export const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const user = await findUniqueUserByEmail(email);
    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user[0].password);

    if (passwordMatch) {

      const { accessToken, refreshToken } = await signTokens(user[0]);
      res.cookie("accessToken", accessToken, accessTokenCookieOptions);
      res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
      res.cookie("logged_in", true, {
        ...accessTokenCookieOptions,
        httpOnly: false,
      });

      return res.status(200).json({
        status: "success",
        accessToken,
      });
    }

    return res.status(400).json({ message: "Invalid credentials" });
  } catch (error) {
    next(error);
  }
};


export const refreshTokenHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies.refreshToken
    const message = 'Could not refresh token'

    if (!refreshToken) {
      return next(message)
    }
    const decoded = verifyJwt<{sub: string}>(
      refreshToken,
    )

    if (!decoded) {
      return next(message)
    }

    const session = await redisClient.get(decoded.sub.toString())

    if (!session) {
      return next(message)
    }

    

    const user = await findUniqueUserById(JSON.parse(session).id)

    if (!user) {
      next(message)
    }

    const accessToken = signJwt({ sub: user[0].id }, {
      expiresIn: `${c.get<number>('accessTokenExpiresIn')}m`
    })

    res.cookie('accessToken', accessToken, accessTokenCookieOptions)
    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    })

    res.status(200).json({ status: 'success', accessToken})

  } catch (error) {
    next(error)
  }
}

function logout(res: Response) {
  res.cookie('accessToken', '', { maxAge: -1 })
  res.cookie('refreshToken', '', { maxAge: -1 })
  res.cookie('logged_in', '', { maxAge: -1 })
}

export const logoutUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user
    console.log(user)
    await redisClient.del(res.locals.user.id.toString());
    logout(res)
    res.status(200).json({
      message: "Logged out"
    })
  } catch (error) {
    next(error)
  }
}