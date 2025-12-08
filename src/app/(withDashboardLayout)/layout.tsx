"use client";
import { DashboardNavbar } from "@/src/components/shared/DashboardNavbar";
import { MenuIcon } from "@/src/components/ui/icons";
import Sidebar from "@/src/components/ui/Sidebar";
import useUserData from "@/src/hooks/user.hook";
import { Button } from "@heroui/button";
import React, { useState } from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, user } = useUserData();
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  if (!user) return null;

  return (
    <div className="flex min-h-screen">
      {/* Fixed Sidebar */}
      <Sidebar
        isLoading={isLoading}
        user={user}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        toggled={toggled}
        setToggled={setToggled}
      />

      {/* Main Content Area - responsive margin */}
      <main
        className={`flex-1 transition-all duration-300 ${
          collapsed ? "md:ml-[80px]" : "md:ml-[230px]"
        }`}
      >
        {/* Mobile Menu Button */}
        <Button
          onPress={() => setToggled(!toggled)}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 md:hidden fixed top-4 left-4 z-50 text-white shadow shadow-primary"
          isIconOnly
          color="primary"
        >
          <MenuIcon className="w-6 h-6" />
        </Button>

        <DashboardNavbar isLoading={isLoading} user={user} />
        <div className="shadow dark:shadow-slate-700 m-2 md:m-4 rounded-md p-4">
          {children}
        </div>
      </main>
    </div>
  );
};

export default layout;
