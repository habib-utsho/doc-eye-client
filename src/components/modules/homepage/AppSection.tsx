"use client";
import React from "react";
import appSectionBG from "@/src/assets/img/Homepage/appSection/appSectionBG2.jpg";
import QRcode from "@/src/assets/img/Homepage/appSection/QRcode.png";
import DownloadOnGooglePlay from "@/src/assets/img/Homepage/appSection/DownloadOnGooglePlay.png";
import DownloadOnAppStore from "@/src/assets/img/Homepage/appSection/DownloadOnAppStore.png";
import Image from "next/image";
import Container from "../../ui/Container";
import { useTheme } from "next-themes";
import { title } from "../../primitives";

const AppSection = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`bg-fixed ${
        theme === "light" ? "bg-slate-300" : "bg-slate-800"
      }  bg-blend-overlay py-36 bg-center bg-cover`}
      style={{ backgroundImage: `url(${appSectionBG.src})` }}
    >
      <Container className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 pr-10 md:pr-2">
          <h2 className={`${title()}`}>
            Download, register and stay connected to our app and feel safe!
          </h2>
          <p>
            Download Now for Quick and Easy Access to Doctors, Prescriptions,
            Health Services, and a World of Wellness, Anytime, Anywhere
          </p>
        </div>
        <div className="flex gap-5 justify-center xl:justify-end items-center">
          <figure className="flex items-center">
            <Image src={QRcode} alt="QRcode" height={180} width={180}></Image>
          </figure>
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
          </figure>
        </div>
      </Container>
    </div>
  );
};

export default AppSection;
