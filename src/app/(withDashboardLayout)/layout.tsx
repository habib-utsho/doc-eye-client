"use client";
import { DashboardNavbar } from "@/src/components/shared/DashboardNavbar";
import Sidebar from "@/src/components/ui/Sidebar";
import useUserData from "@/src/hooks/user.hook";
import React, { useState } from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, user } = useUserData();
  const [collapsed, setCollapsed] = useState(false);

  if (!user) return null;

  return (
    <div className="flex min-h-screen">
      {/* Fixed Sidebar */}
      <Sidebar
        isLoading={isLoading}
        user={user}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* Main Content Area - with left padding to avoid overlap */}
      <main className={`flex-1 ${collapsed ? "ml-[80px]" : "ml-[230px]"}`}>
        <DashboardNavbar isLoading={isLoading} user={user} />
        <div className="shadow dark:shadow-slate-700 m-2 md:m-4 rounded-md p-4">
          {children}
        </div>
      </main>
    </div>
  );
};

export default layout;
