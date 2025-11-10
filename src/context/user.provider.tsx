"use client";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { TDecodedUser } from "../types/user";
import { getCurrentUser } from "../services/auth";

type TUserProvider = {
  user: TDecodedUser | null;
  setUser: React.Dispatch<React.SetStateAction<TDecodedUser | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserContext = createContext<TUserProvider | null>(null);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [localUserRefetch, setLocalUserRefetch] = useState<Boolean>(true);
  const [user, setUser] = useState<TDecodedUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchUser = async () => {
    const user = await getCurrentUser();
    setUser(user);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchUser();
  }, [localUserRefetch]);

  const value = {
    user,
    setUser,
    isLoading,
    setIsLoading,
    localUserRefetch,
    setLocalUserRefetch,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
