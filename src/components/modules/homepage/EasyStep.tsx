"use client";
import React, { useState } from "react";
import videoConsultationMockup1 from "@/src/assets/img/Homepage/EasyStep/videoConsultationMockup1.svg";
import onlinePrescriptionMockup2 from "@/src/assets/img/Homepage/EasyStep/onlinePrescriptionMockup2.svg";
import onlineMedicineMockup3 from "@/src/assets/img/Homepage/EasyStep/onlineMedicineMockup3.svg";
import Image from "next/image";
import { FaKitMedical, FaPrescription, FaUserDoctor } from "react-icons/fa6";
import CommonSectionTitle from "../../ui/CommonSectionTitle";
import Container from "../../ui/Container";
import { subtitle, title } from "../../primitives";

const EasyStep = () => {
  const [mockup, setMockup] = useState("Video Consultation");
  const easySteps = [
    {
      title: "Video Consultation",
      icon: <FaUserDoctor></FaUserDoctor>,
      description:
        "Connect with experienced doctors through secure video consultations. Receive personalized medical advice and guidance from the comfort of your home.",
    },
    {
      title: "Instant Prescription",
      icon: <FaPrescription></FaPrescription>,
      description:
        "Get your prescriptions instantly. Our qualified doctors will diagnose your condition and provide accurate prescriptions, allowing you to quickly access the medications you need.",
    },
    {
      title: "Order Medicine Online",
      icon: <FaKitMedical></FaKitMedical>,
      description:
        "Conveniently order your prescribed medications online. Our platform offers a seamless experience to have your medicines delivered to your doorstep, ensuring you never miss a dose.",
    },
  ];

  return (
    <div className="py-14 md:py-24">
      <Container>
        <CommonSectionTitle
          title={"Simple Ways to Quickly Improve Your Well-being"}
          subTitle={"Small Changes for a Rapid Boost in Your Overall Health"}
        />

        <div className="md:flex gap-5 pt-12">
          <div className="w-full md:w-2/6 flex items-center relative">
            <figure className="w-full h-[250px]">
              <Image
                src={
                  mockup === "Video Consultation"
                    ? videoConsultationMockup1
                    : mockup === "Instant Prescription"
                    ? onlinePrescriptionMockup2
                    : onlineMedicineMockup3
                }
                alt="videoConsultationMockup"
                fill={true}
              ></Image>
            </figure>
          </div>
          <div className="flex-1 flex md:flex-col justify-center md:justify-between gap-5 md:gap-10 py-10 md:py-20">
            {easySteps.map((step, ind) => {
              return (
                <div
                  key={ind}
                  className="flex gap-4 md:gap-8 xl:gap-12 items-center p-4 md:p-8"
                >
                  <span className={`${title()} hidden md:block opacity-40`}>
                    {ind + 1}
                  </span>
                  <span
                    className={`p-8 rounded cursor-pointer text-2xl ${
                      step.title === mockup
                        ? "bg-primary text-slate-50"
                        : "bg-slate-100 text-slate-800"
                    }`}
                    onClick={() => {
                      setMockup(step.title);
                    }}
                  >
                    {step.icon}
                  </span>
                  <div className="space-y-4 hidden md:block">
                    <h2
                      className={`${title({
                        className: "!text-[24px] md:!text-[28px]",
                      })}`}
                    >
                      {step.title}
                    </h2>
                    <p>{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default EasyStep;
