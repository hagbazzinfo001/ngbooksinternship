"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  User,
  SignupFormData,
  SigninFormData,
  AuthContextType,
  SignupResult,
  SigninResult,
} from "@/types/auth";

const BASE_URL = "https://api.ngbookings.com/api";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("ngbooks-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const signin = async (data: SigninFormData): Promise<SigninResult> => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/user_auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        return { success: false, error: result.message || "Login failed" };
      }

      const loggedInUser: User = {
        id: result.user._id,
        email: result.user.email,
        firstName: result.user.firstName || "",
        lastName: result.user.lastName || "",
        createdAt: new Date(result.user.createdAt),
      };

      setUser(loggedInUser);
      localStorage.setItem("ngbooks-user", JSON.stringify(loggedInUser));

      return { success: true };
    } catch (error: any) {
      return { success: false, error: "Network error. Please try again." };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: SignupFormData): Promise<SignupResult> => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/user_auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          password: data.password,
          phoneNumber: data.phoneNumber,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        return { success: false, error: result.message || "Signup failed" };
      }

      const nameParts = data.fullName.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ") || "";

      const registeredUser: User = {
        id: result.user._id,
        email: result.user.email,
        firstName,
        lastName,
        createdAt: new Date(result.user.createdAt),
      };

      setUser(registeredUser);
      localStorage.setItem("ngbooks-user", JSON.stringify(registeredUser));

      return { success: true };
    } catch (error: any) {
      return { success: false, error: "Network error. Please try again." };
    } finally {
      setIsLoading(false);
    }
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("ngbooks-user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signin, signup, signout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
