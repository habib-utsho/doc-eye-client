import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import logo from "@/src/assets/img/logo.png";
import { siteConfig } from "@/src/config/site";
import { ThemeSwitch } from "@/src/components/theme-switch";
import {
  GithubIcon,
  MessageIcon,
  NotificationIcon,
} from "@/src/components/ui/icons";
import Image from "next/image";
import NavbarProfileDropdown from "./NavbarProfileDropdown";
import { TUser, TDecodedUser } from "@/src/types/user";
import { usePathname, useRouter } from "next/navigation";
import { HomeOutlined, RightOutlined } from "@ant-design/icons";
import { useMemo } from "react";

export const DashboardNavbar = ({
  isLoading,
  user,
}: {
  isLoading: boolean;
  user: TDecodedUser;
}) => {
  const role = user?.role;
  const router = useRouter();
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    const paths = pathname.split("/").filter(Boolean);
    return paths.map((path, index) => ({
      label: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " "),
      href: "/" + paths.slice(0, index + 1).join("/"),
      isLast: index === paths.length - 1,
    }));
  }, [pathname]);
  // console.log({ isLoading, user });

  return (
    <NextUINavbar
      maxWidth="full"
      position="sticky"
      className="bg-[#f3f4f6] dark:bg-[#374151]"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <div className="flex justify-start items-center gap-1">
            {/* Breadcrumbs Navigation */}
            <div className="hidden lg:flex items-center gap-2 ml-6 text-sm">
              <HomeOutlined
                className="text-primary cursor-pointer hover:text-primary-600 transition-colors"
                onClick={() => router.push("/")}
              />
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.href} className="flex items-center gap-2">
                  <RightOutlined className="text-xs text-gray-400" />
                  {crumb.isLast ? (
                    <span className="text-gray-900 dark:text-gray-100 font-medium">
                      {crumb.label}
                    </span>
                  ) : (
                    <span
                      onClick={() => {
                        const label = crumb.label.toLowerCase();

                        if (
                          label === "dashboard" ||
                          label === "patient" ||
                          label === "admin" ||
                          label === "doctor"
                        ) {
                          router.push(`/dashboard/${role}`);
                        } else {
                          router.push(crumb.href);
                        }
                      }}
                      className="text-gray-600 dark:text-gray-400 hover:text-primary cursor-pointer transition-colors"
                    >
                      {crumb.label}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem>
          <MessageIcon
            className="text-xl cursor-pointer"
            onClick={() => router.push(`/dashboard/${role}/messages`)}
          />
        </NavbarItem>
        {!isLoading && (
          <NavbarItem>
            <NotificationIcon
              className="text-xl cursor-pointer"
              onClick={() => router.push(`/dashboard/${role}/notification`)}
            />
          </NavbarItem>
        )}
        <NavbarItem className="flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="flex">
          <NavbarProfileDropdown />
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
