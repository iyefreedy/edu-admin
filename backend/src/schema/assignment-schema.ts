import { z } from "zod";

export default class AssignmentSchema {
  static readonly CREATE = z.object({
    title: z.string(),
    subject: z.enum(["MATH", "ENGLISH"]),
    content: z.string(),
  });
}
