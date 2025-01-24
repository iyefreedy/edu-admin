import { useEffect, useState } from "react";
import { Grade } from "../types";
import api from "../api";
import useAuth from "./useAuth";
import { AxiosError } from "axios";

export default function useFetchGradedAssignment() {
  const [state, setState] = useState<Grade[]>([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchGradedAssignment = async () => {
      setLoading(true);
      try {
        const response = await api.getGradedAssignment(user!.id);
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

    fetchGradedAssignment();
  }, [user]);
  return { state, loading, error };
}
