"use client";
import { siteConfig } from "@/src/config/site";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import React from "react";
import { HeartFilledIcon } from "../../assets/img/icons";
import { Link } from "@nextui-org/link";
import { signOut } from "@/src/services/authService";
import useUserData from "@/src/hooks/user.hook";
import { Skeleton } from "@nextui-org/skeleton";
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
              src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
              className="cursor-pointer"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="dashboard" href={`/dashboard/${user?.role}`}>
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
          startContent={<HeartFilledIcon className="text-danger" />}
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
