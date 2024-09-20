"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContextType, JwtPayload, User } from "@/interface/Auth";
import { jwtDecode } from "jwt-decode";

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
      const currentTime = Date.now() / 1000; // current time in seconds

      if (decoded.exp < currentTime) {
        // Token is expired
        handleLogout();
        return;
      }

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

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/about");
  };

  const logout = () => {
    handleLogout();
  };

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (token) {
      decodeTokenAndSetUser(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

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
