import React from "react";
import logo from "@/src/assets/img/logo.png";
import Link from "next/link";
import Image from "next/image";
import DownloadOnGooglePlay from "@/src/assets/img/Homepage/appSection/DownloadOnGooglePlay.png";
import DownloadOnAppStore from "@/src/assets/img/Homepage/appSection/DownloadOnAppStore.png";
import {
  AngleRightIcon,
  DiscordIcon,
  GithubIcon,
  Logo,
  TwitterIcon,
} from "@/src/components/ui/icons";
import Container from "../ui/Container";

const Footer = () => {
  const footerLink = [
    { link: "about-us", text: "About us" },
    { link: "services", text: "Services" },
    { link: "appointment", text: "Appointment" },
    { link: "blogs", text: "Blogs" },
    { link: "contact-us", text: "FAQ" },
    { link: "terms", text: "Terms of use" },
    { link: "doctor-portal", text: "Doctor Portal" },
    { link: "patient-portal", text: "Patient Portal" },
  ];

  return (
    <div className="bg-primary bg-opacity-20 footer-top pt-20">
      {/* Footer top */}
      <Container className="grid gap-10 md:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 py-20">
        {/* Contact info */}
        <div className="space-y-4">
          <Link
            href={"/"}
            className="font-bold text-xl flex gap-3 items-center"
          >
            <Image height={40} width={40} src={logo} alt="DocEye"></Image>{" "}
            <span className="flex">
              Doc<span className="text-secondary">Eye</span>
            </span>
          </Link>
          <p className="flex items-center gap-3">
            <span className="inline-block p-3 bg-background rounded-full">
              <Logo />
            </span>{" "}
            0170678-5160
          </p>
          <p className="flex items-center gap-3">
            <span className="inline-block p-3 bg-background rounded-full">
              <Logo />
            </span>{" "}
            utsho926@gmail.com
          </p>
          <p className="flex items-center gap-3">
            <span className="inline-block p-3 bg-background rounded-full">
              <Logo />
            </span>{" "}
            25/fa/3 Satarkul, Badda, Dhaka, Bangladesh
          </p>
          <div className="flex gap-3">
            <span className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-500 text-slate-50 cursor-pointer hover:scale-110 transition">
              <Logo />
            </span>
            <span className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-500 text-slate-50 cursor-pointer hover:scale-110 transition">
              <GithubIcon />
            </span>
            <span className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-500 text-slate-50 cursor-pointer hover:scale-110 transition">
              <DiscordIcon />
            </span>
            <span className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-500 text-slate-50 cursor-pointer hover:scale-110 transition">
              <TwitterIcon />
            </span>
          </div>
        </div>

        {/* Useful link */}
        <div className="space-y-4">
          {footerLink.slice(0, 4).map((fl, ind) => {
            return (
              <Link
                key={ind}
                href={`/${fl.link}`}
                className="font-semibold text-md flex gap-3 items-center hover:text-[#E57373] transition group"
              >
                {" "}
                <span className="group-hover:translate-x-2 transition text-[#E57373]">
                  <AngleRightIcon />
                </span>
                {fl.text}
              </Link>
            );
          })}
        </div>
        <div className="space-y-4">
          {footerLink.slice(4).map((fl, ind) => {
            return (
              <Link
                key={ind}
                href={`/${fl.link}`}
                className="font-semibold text-md flex gap-3 items-center hover:text-[#E57373] transition group"
              >
                {" "}
                <span className="group-hover:translate-x-2 transition text-[#E57373]">
                  <AngleRightIcon />
                </span>
                {fl.text}
              </Link>
            );
          })}
        </div>

        {/* Download our app */}
        <div className="space-y-4">
          <h2 className="my-subtitle">Download our app</h2>
          <figure className="space-y-4 flex flex-col justify-center">
            <Image
              src={DownloadOnGooglePlay}
              alt="DownloadOnGooglePlay"
              height={55}
              width={130}
              className="cursor-pointer"
            ></Image>
            <Image
              src={DownloadOnAppStore}
              alt="DownloadOnAppStore"
              height={55}
              width={130}
              className="cursor-pointer"
            ></Image>
            <Image
              src={
                "https://doctime.com.bd/guestView/images/logo/app/browser.svg"
              }
              alt="DownloadOnBrowserStore"
              height={55}
              width={130}
              className="cursor-pointer"
            ></Image>
          </figure>
        </div>
      </Container>
      {/* Footer bottom */}
      <div className="bg-primary bg-opacity-30 py-6 text-center">
        <p className="text-foreground text-opacity-70 font-semibold">
          {" "}
          Copyright © {new Date().getFullYear()}{" "}
          <span className="text-secondary">DocEye</span>. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
