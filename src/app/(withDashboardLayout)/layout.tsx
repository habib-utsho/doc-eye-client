"use client";
import { DashboardNavbar } from "@/src/components/shared/DashboardNavbar";
import Sidebar from "@/src/components/ui/Sidebar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex justify-between relative">
        <Sidebar />
        <main className="flex-1 overflow-x-auto">
          <DashboardNavbar />
          {children}
        </main>
      </div>
    </>
  );
};

export default layout;
