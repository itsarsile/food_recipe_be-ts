import jwt, { SignOptions } from "jsonwebtoken";
export const signJwt = (payload: Object, options: SignOptions) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY!, {
    ...(options && options),
    algorithm: "HS256",
  });
};

export const verifyJwt = <T>(token: string): T | null => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!, {
      algorithms: ["HS256"],
    }) as T;

    console.log("L15:jwt.ts", decoded);

    return decoded;
  } catch (error) {
    return null;
  }
};
