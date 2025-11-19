"use client";
import { DashboardNavbar } from "@/src/components/shared/DashboardNavbar";
import Sidebar from "@/src/components/ui/Sidebar";
import useUserData from "@/src/hooks/user.hook";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, user } = useUserData();

  if (!user) return null;

  return (
    <>
      <div className="flex justify-between relative">
        <Sidebar isLoading={isLoading} user={user} />
        <main className="flex-1 overflow-x-auto">
          <DashboardNavbar isLoading={isLoading} user={user} />
          <div className="bg-background shadow m-2 md:m-4 rounded-md">
            {children}
          </div>
        </main>
      </div>
    </>
  );
};

export default layout;
