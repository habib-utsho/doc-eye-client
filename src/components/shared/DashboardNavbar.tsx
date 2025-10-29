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
import { TUser } from "@/src/types/user";
import { useRouter } from "next/navigation";

export const DashboardNavbar = ({
  isLoading,
  user,
}: {
  isLoading: boolean;
  user: TUser;
}) => {
  const role = user?.role;
  const router = useRouter();
  console.log({ isLoading, user });

  return (
    <NextUINavbar
      maxWidth="full"
      position="sticky"
      className="bg-[#f3f4f6] dark:bg-[#374151]"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className="font-bold text-inherit">Something new here</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <MessageIcon className="text-xl cursor-pointer" />
        </NavbarItem>
        {!isLoading && (
          <NavbarItem className="hidden sm:flex gap-2">
            <NotificationIcon
              className="text-xl cursor-pointer"
              onClick={() => router.push(`/dashboard/${role}/notification`)}
            />
          </NavbarItem>
        )}
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <NavbarProfileDropdown />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
