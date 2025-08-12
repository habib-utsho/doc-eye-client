"use client";
import CommonSectionTitle from "@/src/components/ui/CommonSectionTitle";
import React from "react";
// import {
//   FaBell,
//   FaCalendar,
//   FaClock,
//   FaFile,
//   FaLock,
//   FaPrescription,
//   FaSchoolCircleExclamation,
//   FaTrophy,
// } from "react-icons/fa6";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { GithubIcon } from "../../ui/icons";
import {
  FaCalendarCheck,
  FaLock,
  FaFileMedical,
  FaUserDoctor,
  FaBell,
  FaPrescription,
} from "react-icons/fa6";
import Container from "../../ui/Container";
import { useTheme } from "next-themes";
import MyMotion from "../../ui/MyMotion";
const WhyUseDocEye = () => {
  const { theme } = useTheme();
  const timelines = [
    {
      id: 1,
      title: "Easy Appointment Scheduling",
      description:
        "Effortlessly book appointments with your preferred doctors at your convenience.",
      benefit: "Save time and avoid long waiting periods.",
      iconBg: "#09528C",
      icon: <FaCalendarCheck />,
    },
    {
      id: 2,
      title: "Secure and Private",
      description:
        "Your medical data is kept confidential and secure with advanced encryption.",
      benefit: "Ensure the privacy of your health information.",
      iconBg: "#E57373",
      icon: <FaLock />,
    },
    {
      id: 3,
      title: "Access Medical Records",
      description:
        "View and manage your medical records online, anytime, anywhere.",
      benefit: "Have easy access to your complete medical history.",
      iconBg: "#8B008B",
      icon: <FaFileMedical />,
    },
    {
      id: 4,
      title: "Real-time Doctor Availability",
      description:
        "Check real-time availability of doctors and make last-minute appointments.",
      benefit: "Get prompt medical care when you need it most.",
      iconBg: "#00008B",
      icon: <FaUserDoctor />,
    },
    {
      id: 5,
      title: "Prescription Refills",
      description:
        "Request prescription refills quickly and conveniently through the portal.",
      benefit: "Avoid running out of essential medications.",
      iconBg: "#07332F",
      icon: <FaPrescription />,
    },
    {
      id: 6,
      title: "Health Reminders",
      description:
        "Receive timely health reminders and notifications for check-ups and vaccinations.",
      benefit:
        "Stay on top of your health and never miss an important appointment.",
      iconBg: "#F7A582",
      icon: <FaBell />,
    },
  ];

  return (
    <div className="py-20">
      <Container className="space-y-8 md:space-y-16">
        <CommonSectionTitle title={"Why use DocEye?"}></CommonSectionTitle>

        <VerticalTimeline>
          {timelines.map((timeline) => {
            const { id, title, description, benefit, icon, iconBg } = timeline;
            return (
              <VerticalTimelineElement
                key={id}
                visible={true}
                contentStyle={{
                  background: theme === "light" ? "#ffffff" : "#0e001d",
                }}
                contentArrowStyle={{
                  borderRightColor: theme === "light" ? "#ffffff" : "#0e001d",
                }}
                iconStyle={{ background: `${iconBg}`, color: "#fff" }}
                icon={icon}
              >
                <MyMotion y={60}>
                  <h3 className="font-bold text-lg md:text-xl">{title}</h3>
                  <p>{description}</p>
                  <p className="flex gap-2 items-center text-slate-500 ">
                    {" "}
                    <span className="text-xl">{icon}</span> {benefit}
                  </p>
                </MyMotion>
              </VerticalTimelineElement>
            );
          })}
        </VerticalTimeline>
      </Container>
    </div>
  );
};

export default WhyUseDocEye;
