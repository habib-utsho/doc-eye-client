export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "DocEye",
  description:
    "DocEye is a telemedicine platform that connects patients with doctors for online consultations and prescription services.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Specialty",
      href: "/specialty",
    },
    {
      label: "Health Plans",
      href: "/health-plans",
    },
    {
      label: "About",
      href: "/about-us",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "/signin",
  },
};
