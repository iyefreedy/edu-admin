import { Subject } from "@prisma/client";

export interface CreateAssignmentRequest {
  title: string;
  subject: Subject;
  content: string;
}
