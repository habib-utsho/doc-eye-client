"use client";
import { siteConfig } from "@/src/config/site";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import React from "react";
import { HeartFilledIcon } from "../ui/icons";
import { Link } from "@heroui/link";
import { signOut } from "@/src/services/auth";
import useUserData from "@/src/hooks/user.hook";
import { Skeleton } from "@heroui/skeleton";
import { protectedRoutes } from "@/src/constant";
import { usePathname, useRouter } from "next/navigation";

const NavbarProfileDropdown = () => {
  const { isLoading, user, setUser } = useUserData();
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    signOut();
    setUser(null);

    const isMatchProtectedRoute = protectedRoutes?.some((route) => {
      const partial = route?.split("/")?.[1];
      return pathname.match(partial);
    });

    if (isMatchProtectedRoute) {
      router.push(`/signin?redirect=${pathname}`);
    }
  };

  return (
    <>
      {isLoading ? (
        <Skeleton className="flex rounded-full w-12 h-12" />
      ) : user?.email ? (
        <Dropdown>
          <DropdownTrigger>
            <Avatar
              isBordered
              color="primary"
              src={
                user.profileImg ||
                "https://i.pravatar.cc/150?u=a04258a2462d826712d"
              }
              className="cursor-pointer"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem
              key="dashboard"
              href={`/dashboard/${user?.role}`}
              onClick={() => router.push(`/dashboard/${user?.role}`)}
            >
              Dashboard
            </DropdownItem>
            <DropdownItem key="profile" href="/dashboard/profile">
              Profile
            </DropdownItem>
            <DropdownItem
              key="change-password"
              href="/dashboard/change-password"
            >
              Change Password
            </DropdownItem>
            <DropdownItem onClick={handleSignOut} key="signOut" color="danger">
              Sign out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Button
          as={Link}
          className="text-sm font-normal text-white"
          href={siteConfig.links.sponsor}
          variant="shadow"
          color="primary"
        >
          Signin
        </Button>
      )}
    </>
  );
};

export default NavbarProfileDropdown;
