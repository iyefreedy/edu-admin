import { User } from "@prisma/client";
import { SignJWT } from "jose";

export const createAccessToken = async (user: User) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ sub: user.id, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .sign(secret);

  return token;
};
