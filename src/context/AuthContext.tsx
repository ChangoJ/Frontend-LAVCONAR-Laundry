import React, { createContext, useContext, useEffect, useState } from "react";
import type { User } from "@/auth/interfaces/login.response";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  hasRole: (role: string) => boolean;
  initializeAuth: () => void;
  clearAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Función para inicializar la autenticación desde localStorage
  const initializeAuth = () => {
    try {
      setLoading(true);
      const storedUser = localStorage.getItem("user");
      const accessToken = localStorage.getItem("accessToken");

      if (storedUser && accessToken) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error initializing auth:", error);
      clearAuth();
    } finally {
      setLoading(false);
    }
  };

  // Función para limpiar la autenticación
  const clearAuth = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  // Inicializar auth al montar el componente
  useEffect(() => {
    initializeAuth();
  }, []);

  const hasRole = (role: string): boolean => {
    return user?.roles?.includes(role) || false;
  };

  const isAuthenticated = !!user && !!localStorage.getItem("accessToken");

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        hasRole,
        initializeAuth,
        clearAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
