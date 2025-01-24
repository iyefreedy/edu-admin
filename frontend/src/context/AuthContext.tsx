import { createContext, useEffect, useMemo, useState } from "react";
import { LoginCredential, User } from "../types";
import api from "../api";
import { AxiosError } from "axios";

interface IAuthProvider {
  children: React.ReactNode;
}

interface IAuthContext {
  isAuthenticated: boolean;
  login: (credential: LoginCredential) => Promise<void>;
  logout: () => Promise<void>;
  user?: User;
  error?: string;
}

const AuthContext = createContext({} as IAuthContext);

const AuthProvider = ({ children }: IAuthProvider) => {
  const [state, setState] = useState<User>();
  const [error, setError] = useState<string>();

  const isAuthenticated = useMemo(() => {
    return !!state && !!state.id;
  }, [state]);

  useEffect(() => {
    const authenticate = async () => {
      try {
        const response = await api.authenticate();
        const user = response.data;
        setState(user);
      } catch (e) {
        if (e instanceof AxiosError) {
          setError(e.response?.data.error);
        } else if (e instanceof Error) {
          setError(e.message);
        }
      }
    };

    authenticate();
  }, []);

  const login = async (credential: LoginCredential) => {
    try {
      await api.login(credential.email, credential.password);
      const response = await api.authenticate();

      const user = response.data;
      setState(user);
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e.response?.data.error);
      } else if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  const logout = async () => {
    try {
      await api.logout();
      setState(undefined);
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e.response?.data.error);
      } else if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{ user: state, isAuthenticated, login, logout, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
