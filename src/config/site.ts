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
    {
      label: "Fit & Healthy",
      href: "/fit-healthy",
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
