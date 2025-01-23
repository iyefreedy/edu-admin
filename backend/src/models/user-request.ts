import { Role } from "@prisma/client";

export type CreateUserRequest = {
  name: string;
  email: string;
  role: Role;
  password: string;
};
