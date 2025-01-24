import { z } from "zod";

export default class GradeSchema {
  static readonly CREATE = z.object({
    assignmentId: z.number(),
    score: z.number().min(0).max(100),
    feedback: z.string(),
  });
}
