import { useEffect, useState } from "react";
import { Assignment } from "../types";
import api from "../api";
import { AxiosError } from "axios";

export default function useFetchAssignments() {
  const [state, setState] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState<string>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchAssignments = async () => {
      setError(undefined);
      try {
        if (!subject) {
          throw new Error("Please select subject");
        }

        const response = await api.getAllAssignments(subject);

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
  }, [subject]);

  const gradeAssignment = async ({
    assignmentId,
    score,
    feedback,
  }: {
    assignmentId: number;
    score: number;
    feedback: string;
  }) => {
    try {
      await api.gradeAssignment({ assignmentId, score, feedback });
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

  return { state, loading, error, subject, setSubject, gradeAssignment };
}
