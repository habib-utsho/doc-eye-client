"use client";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { TDecodedUser } from "../types/user";
import { getCurrentUser } from "../services/authService";

type TUserProvider = {
  user: TDecodedUser | null;
  setUser: React.Dispatch<React.SetStateAction<TDecodedUser | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserContext = createContext<TUserProvider | null>(null);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TDecodedUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchUser = async () => {
    const user = await getCurrentUser();
    setUser(user);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const value = {
    user,
    setUser,
    isLoading,
    setIsLoading,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
