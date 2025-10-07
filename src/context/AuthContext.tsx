import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface AuthContextType {
  user: any | null;
  branch: any | null;
  loading: boolean;
  signIn: (
    identifier: string,
    password: string,
    branchId: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
  hasRole: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any | null>(null);
  const [branch, setBranch] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const signIn = async (
    identifier: string,
    password: string,
    branchId: string
  ) => {};

  const signOut = async () => {
    toast.info("Sesión cerrada");
  };

  const hasRole = (role: string) => {
    return user?.roles.includes(role as any) || false;
  };

  return (
    <AuthContext.Provider
      value={{ user, branch, loading, signIn, signOut, hasRole }}
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
