type Role = "STUDENT" | "TEACHER";
type Subject = "ENGLISH" | "MATH";

export type LoginCredential = {
  email: string;
  password: string;
};

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface Grade {
  id: number;
  assignmentId: number;
  score: number;
  feedback: string;
  assignment: Assignment;
  teacher: {
    name: string;
  };
}

export interface Assignment {
  id: number;
  title: string;
  content: string;
  subject: Subject;
  grade?: Grade;
  student: {
    name: string;
  };
}
