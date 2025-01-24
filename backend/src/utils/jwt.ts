import { User } from "@prisma/client";
import { SignJWT, jwtVerify } from "jose";

export const createAccessToken = async (user: User) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ sub: user.id, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .sign(secret);

  return token;
};

export const verifyAccessToken = async (token: string) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload } = await jwtVerify(token, secret, {
    algorithms: ["HS256"],
  });

  return payload;
};
