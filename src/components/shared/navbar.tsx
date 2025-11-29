"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import NextLink from "next/link";
import clsx from "clsx";
import logo from "@/src/assets/img/logo.png";

import { siteConfig } from "@/src/config/site";
import { ThemeSwitch } from "@/src/components/theme-switch";
import Image from "next/image";
import NavbarProfileDropdown from "./NavbarProfileDropdown";
// import NavbarProfileDropdown from "./NavbarProfileDropdown";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (!href) return false;
    // Exact match or nested path match
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image src={logo} height={40} width={40} alt="logo" />
            <p className="font-bold text-inherit">DocEye</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="center" className="basis-1/5 sm:basis-full">
        <ul className="hidden md:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={`${
                  isActive(item.href) ? "text-primary font-semibold" : ""
                }`}
                color="foreground"
                href={item.href}
                data-active={isActive(item.href)}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden md:flex basis-1/5 sm:basis-full !flex-grow-0"
        justify="end"
      >
        <NavbarItem className="hidden md:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <NavbarProfileDropdown />
        </NavbarItem>
      </NavbarContent>

      {/* Mobile menu */}
      <NavbarContent className="md:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>
      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navItems.map((item, index) => {
            const active = isActive(item.href);
            return (
              <NavbarMenuItem key={`${item.href}-${index}`}>
                <NextLink
                  href={item.href}
                  className={clsx(
                    "text-lg",
                    active ? "text-primary font-medium" : "text-foreground"
                  )}
                  data-active={active}
                >
                  {item.label}
                </NextLink>
              </NavbarMenuItem>
            );
          })}
        </div>
      </NavbarMenu>
      <NavbarItem className="flex md:hidden">
        <NavbarProfileDropdown />
      </NavbarItem>
    </NextUINavbar>
  );
};
