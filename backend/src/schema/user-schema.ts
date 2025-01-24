import { z } from "zod";

export default class UserSchema {
  static readonly CREATE = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    role: z.enum(["STUDENT", "TEACHER"]),
  });
}
