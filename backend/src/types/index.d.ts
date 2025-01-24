import { User } from "@prisma/client";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      JWT_SECRET: string;
    }
  }

  namespace Express {
    export interface Request {
      user?: Omit<User, "password">;
    }
  }
}
