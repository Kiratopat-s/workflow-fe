"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode library
import { AuthContextType, JwtPayload, User } from "@/interface/Auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  const decodeTokenAndSetUser = (token: string) => {
    try {
      const decoded: JwtPayload = jwtDecode(token);
      const userData: User = {
        uid: decoded.uid,
        username: decoded.username,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        photoLink: decoded.photoLink,
        position: decoded.position,
        tokenExpire: new Date(decoded.exp * 1000),
      };
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  };

  const login = (token: string) => {
    decodeTokenAndSetUser(token);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/");
  };

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    if (token) {
      decodeTokenAndSetUser(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
