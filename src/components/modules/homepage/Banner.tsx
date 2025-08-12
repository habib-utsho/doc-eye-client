"use client";
import React from "react";
import banner1 from "@/src/assets/img/Homepage/Banner/DocEyeBanner.png";
import banner2 from "@/src/assets/img/Homepage/Banner/DocEyeBanner_dark.png";
import videoConsultation from "@/src/assets/img/Homepage/Banner/videoConsultation.png";
import healthResource from "@/src/assets/img/Homepage/Banner/healthResource.png";
import patientSupport from "@/src/assets/img/Homepage/Banner/patientSupport.png";
import orderMedicine from "@/src/assets/img/Homepage/Banner/orderMedicine.png";
import Image from "next/image";
import Container from "../../ui/Container";
import { subtitle, title } from "../../primitives";
import { useTheme } from "next-themes";
import MyMotion from "../../ui/MyMotion";

const Banner = () => {
  const services = [
    {
      title: "Online Consultations",
      subTitle:
        "Provide virtual appointments for patients to consult with doctors remotely.",
      img: videoConsultation,
    },
    {
      title: "Health Information Resources",
      subTitle:
        "Provide articles, videos, and resources on various health topics.",
      img: healthResource,
    },
    {
      title: "Patient support",
      subTitle:
        "This includes a help desk where patients can get help with using the portal or with their health in general.",
      img: patientSupport,
    },
    {
      title: "Order medicine online",
      subTitle: "Order easily and get the medicine in 1 hour!",
      img: orderMedicine,
    },
  ];

  const { theme } = useTheme();

  return (
    <div
      className="bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${
          theme === "light" ? banner1.src : banner2.src
        })`,
      }}
    >
      <Container>
        <div className="!pt-28 pb-16  min-h-screen text-center">
          <h2
            className={`${title()} flex gap-2 items-center justify-center flex-wrap`}
          >
            Complete health solution{" "}
            <span className={title({ color: "primary" })}>DocEye!</span>
          </h2>
          <p className={title({ class: "mt-4 !text-[24px]" })}>
            Connected with 50,000+ individuals who trust us.
          </p>
          <p className={subtitle({ class: "mt-5" })}>
            For years, we’ve been working with care and dedication, helping
            people find their way to mental well-being and a happier, more
            fulfilling life. It’s been a journey of impact and transformation,
            and we’d love for you to be a part of it as we continue moving
            forward together.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 py-10">
            {services.map((service, ind) => (
              <MyMotion
                scale={1.1}
                key={ind}
                className="py-7 px-3 rounded-md bg-background border space-y-4 text-center cursor-pointer hover:!scale-105 hover:!-translate-y-5 transition duration-500"
              >
                <Image
                  alt="videoConsultation"
                  className="mx-auto"
                  height={60}
                  width={60}
                  src={service.img}
                ></Image>
                <h2 className="font-semibold text-xl">{service.title}</h2>
                <p className="text-paragraph">{service.subTitle}</p>
              </MyMotion>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Banner;
