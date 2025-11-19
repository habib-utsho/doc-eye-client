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
import { Link } from "@heroui/link";
import useUserData from "@/src/hooks/user.hook";
import { Skeleton } from "@heroui/skeleton";
import { useRouter } from "next/navigation";
import { useSignOut } from "@/src/hooks/useSignOut.hook";
import { firstLetterCapital } from "@/src/utils/firstLetterCapital";

const NavbarProfileDropdown = () => {
  const { isLoading, user } = useUserData();
  const router = useRouter();
  const { handleSignOut } = useSignOut();

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
              key="username"
              className="bg-gray-200 dark:bg-gray-800"
            >
              <div className="flex items-center gap-2">
                <Avatar
                  color="primary"
                  src={
                    user.profileImg ||
                    "https://i.pravatar.cc/150?u=a04258a2462d826712d"
                  }
                  className="cursor-pointer"
                />
                <div className="flex flex-col gap-0">
                  <span className="text-primary font-semibold">
                    {user?.name}
                  </span>
                  <p>{firstLetterCapital(user?.role)}</p>
                </div>
              </div>
            </DropdownItem>
            <DropdownItem
              key="dashboard"
              href={`/dashboard/${user?.role}`}
              onPress={() => router.push(`/dashboard/${user?.role}`)}
            >
              Dashboard
            </DropdownItem>
            <DropdownItem
              key="profile"
              href={`/dashboard/${user?.role}/profile`}
            >
              Profile
            </DropdownItem>
            <DropdownItem
              key="change-password"
              href={`/dashboard/${user?.role}/change-password`}
            >
              Change Password
            </DropdownItem>
            <DropdownItem onPress={handleSignOut} key="signOut" color="danger">
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
