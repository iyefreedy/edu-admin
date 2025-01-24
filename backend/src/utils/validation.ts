import { ZodSchema } from "zod";

export function validate<T>(schema: ZodSchema, data: T): T {
  return schema.parse(data);
}
