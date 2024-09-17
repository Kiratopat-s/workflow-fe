"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode library

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

interface User {
  uid: number;
  username: string;
  firstName: string;
  lastName: string;
  photoLink: string;
  position: string;
  tokenExpire?: Date;
}

interface JwtPayload {
  exp: number;
  firstName: string;
  lastName: string;
  photoLink: string;
  position: string;
  uid: number;
  username: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  // Decode JWT and extract user data
  const decodeTokenAndSetUser = (token: string) => {
    try {
      const decoded: JwtPayload = jwtDecode(token); // Decode JWT token
      const userData: User = {
        uid: decoded.uid,
        username: decoded.username,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        photoLink: decoded.photoLink,
        position: decoded.position,
        tokenExpire: new Date(decoded.exp * 1000),
      };
      setUser(userData); // Store user data in state
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  };

  // Login function
  const login = (token: string) => {
    decodeTokenAndSetUser(token);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Clear token cookie
    router.push("/"); // Redirect to homepage
  };

  useEffect(() => {
    // get token from cookie
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    if (token) {
      decodeTokenAndSetUser(token); // Decode token and set user on page load
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
