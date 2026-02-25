import React from "react";
import WhyChooseUsBg from "@/src/assets/img/Homepage/WhyChooseUs/WhyChooseUs.svg";
import * as motion from "motion/react-client";
import type { Variants } from "motion/react";
import {
  SolutionOutlined,
  RiseOutlined,
  HomeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import CommonSectionTitle from "../../ui/CommonSectionTitle";
import Container from "../../ui/Container";
import { Button } from "@heroui/button";

const WhyChooseUs = () => {
  const whyChooseUs = [
    {
      icon: "👨‍⚕️",
      title: "Verified Doctors",
      subTitle:
        "Connect with certified and experienced healthcare professionals across all specialties.",
      hueA: 160,
      hueB: 200,
    },
    {
      title: "Trusted Treatment",
      subTitle:
        "DocEye has many types of treatment to relieve symptoms for all types illness.",
      icon: <RiseOutlined />,
      hueA: 160,
      hueB: 200,
    },
    {
      title: "24/7 Services",
      subTitle:
        "DocEye is at your service 24×7 aiming to provide the best services.",
      icon: <HomeOutlined />,
      hueA: 100,
      hueB: 140,
    },
    {
      icon: "📅",
      title: "Easy Appointment Booking",
      subTitle:
        "Schedule appointments with top specialists in just a few clicks. Real-time availability and instant confirmation.",
      hueA: 200,
      hueB: 240,
    },

    {
      icon: "💊",
      title: "Digital Prescriptions",
      subTitle:
        "Receive and manage your prescriptions digitally. Access your medication history anytime, anywhere.",
      hueA: 260,
      hueB: 300,
    },
    {
      icon: "📋",
      title: "Medical Records",
      subTitle:
        "Securely store and access your complete medical history. Share reports with doctors seamlessly.",
      hueA: 20,
      hueB: 60,
    },
    {
      icon: "💬",
      title: "Instant Consultation",
      subTitle:
        "Get immediate medical advice through our integrated messaging system. Your health, our priority.",
      hueA: 100,
      hueB: 140,
    },
    {
      icon: "🔔",
      title: "Smart Reminders",
      subTitle:
        "Never miss an appointment or medication with intelligent notifications and alerts.",
      hueA: 340,
      hueB: 20,
    },
    {
      icon: "📊",
      title: "Health Analytics",
      subTitle:
        "Track your health metrics and progress over time with comprehensive visual analytics.",
      hueA: 180,
      hueB: 220,
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      subTitle:
        "Your data is protected with enterprise-grade encryption. HIPAA compliant and fully secure.",
      hueA: 280,
      hueB: 320,
    },
  ];

  return (
    <div
      className="min-h-screen bg-left md:bg-bottom bg-no-repeat bg-cover dark:bg-slate-800 dark:bg-blend-overlay"
      style={{
        backgroundImage: `url(${WhyChooseUsBg.src})`,
      }}
    >
      <Container className="space-y-8  pt-[50px] md:pt-[100px]">
        <CommonSectionTitle
          subTitle={"Why Choose Us"}
          title={"Why people Choose DocEye"}
          subTitleClassName="dark:text-white dark:before:bg-white"
        ></CommonSectionTitle>
        <p>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don’t look even slightly believable.
        </p>

        <div
          style={containerStyle}
          className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-12 pb-20"
        >
          {whyChooseUs.map((item, index) => {
            const background = `linear-gradient(306deg, ${hue(item.hueA)}, ${hue(item.hueB)})`;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                className={`card-container-${index} !py-[50px] justify-center`}
                style={cardContainer}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ amount: 0.5, once: false }}
              >
                <div style={{ ...splash, background }} />
                <motion.div
                  style={card}
                  variants={cardVariants(isEven)}
                  className="card"
                >
                  <div className="bg-background border border-foreground/10 rounded-lg px-8 py-5 pt-14 space-y-4 text-center relative group w-full h-full flex flex-col justify-center">
                    <span className="p-4 inline-block rounded bg-primary absolute -top-5 left-1/2 -translate-x-1/2 group-hover:scale-110 transition duration-500 text-white text-2xl border-2 border-white">
                      {item.icon}
                    </span>
                    <h2 className={`text-xl font-bold`}>{item.title}</h2>
                    <p className="text-[14px]">{item.subTitle}</p>
                    <Button
                      variant="bordered"
                      color="primary"
                      size="md"
                      className="hover:bg-primary hover:text-white mx-auto"
                    >
                      Learn more <PlusOutlined />
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

// Animation variants
const cardVariants = (isEven: boolean): Variants => ({
  offscreen: {
    y: 100,
    opacity: 0,
    scale: 0.9,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    scale: 1,
    rotate: isEven ? -8 : 8,
    transition: {
      delay: isEven ? 0.2 : 0.4,
      type: "spring",
      bounce: 0.3,
      duration: 0.6,
    },
  },
});

const hue = (h: number) => `hsl(${h}, 100%, 50%)`;

// Styles
const containerStyle: React.CSSProperties = {
  margin: "50px auto",
  maxWidth: 1200,
  paddingBottom: 50,
  width: "100%",
};

const cardContainer: React.CSSProperties = {
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  paddingTop: 20,
  marginBottom: 0,
};

const splash: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
};

const card: React.CSSProperties = {
  fontSize: 16,
  width: 300,
  height: 430,
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  borderRadius: 20,
  background: "transparent",
  transformOrigin: "10% 60%",
};

export default WhyChooseUs;
