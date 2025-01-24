import { useEffect, useMemo, useState } from "react";
import { Assignment } from "../types";
import api from "../api";
import { AxiosError } from "axios";

export default function useFetchStudentAssignments() {
  const [state, setState] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState<string>();
  const [error, setError] = useState<string>();

  const assignments = useMemo(() => {
    if (subject) {
      return state.filter((assignment) => assignment.subject === subject);
    }

    return state;
  }, [state, subject]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await api.getStudentAssignments();

        setState(response.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(error.response?.data.error);
        } else if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  const createAssignment = async (assignment: {
    title: string;
    subject: string;
    content: string;
  }) => {
    try {
      const response = await api.createAssignment(assignment);
      const newAssignment = response.data;

      setState((prev) => [...prev, newAssignment]);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.error);
      } else if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return { assignments, loading, error, subject, setSubject, createAssignment };
}
