import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  withCredentials: true,
});

export default {
  async login(email: string, password: string) {
    return api.post("/api/users/login", { email, password });
  },
  async authenticate() {
    return api.get("/api/users/me");
  },
  async logout() {
    return api.delete("/api/users/logout");
  },
  async getStudentAssignments() {
    return api.get("/api/users/me/assignments");
  },
  async createAssignment(assignment: {
    title: string;
    subject: string;
    content: string;
  }) {
    return api.post("/api/assignments", { ...assignment });
  },
  async getAllAssignments(subject: string) {
    return api.get("/api/assignments", {
      params: {
        subject,
      },
    });
  },
  async gradeAssignment({
    assignmentId,
    score,
    feedback,
  }: {
    assignmentId: number;
    score: number;
    feedback: string;
  }) {
    return api.post("/api/grades", {
      assignmentId,
      score,
      feedback,
    });
  },
  async getGradedAssignment(studentId: string) {
    return api.get(`/api/grades/${studentId}`);
  },
};
