import React from "react";
import WhyChooseUsBg from "@/src/assets/img/Homepage/WhyChooseUs/WhyChooseUs.svg";
import * as motion from "motion/react-client";
import type { Variants } from "motion/react";
import { RiseOutlined, HomeOutlined, PlusOutlined } from "@ant-design/icons";
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
        "DocEye offers reliable care plans to help relieve symptoms and improve daily wellbeing.",
      icon: <RiseOutlined />,
      hueA: 160,
      hueB: 200,
    },
    {
      title: "24/7 Services",
      subTitle:
        "Day or night, DocEye is here to support you with fast access to care and guidance.",
      icon: <HomeOutlined />,
      hueA: 100,
      hueB: 140,
    },
    {
      icon: "📅",
      title: "Easy Appointment Booking",
      subTitle:
        "Book top specialists in a few clicks with real-time availability and instant confirmation.",
      hueA: 200,
      hueB: 240,
    },
    {
      icon: "💊",
      title: "Digital Prescriptions",
      subTitle:
        "Get prescriptions digitally and track medication history from anywhere, anytime.",
      hueA: 260,
      hueB: 300,
    },
    {
      icon: "📋",
      title: "Medical Records",
      subTitle:
        "Store medical history safely and share reports with doctors in seconds.",
      hueA: 20,
      hueB: 60,
    },
    {
      icon: "💬",
      title: "Instant Consultation",
      subTitle:
        "Message for quick medical guidance using built-in secure communication.",
      hueA: 100,
      hueB: 140,
    },
    {
      icon: "🔔",
      title: "Smart Reminders",
      subTitle:
        "Stay on schedule with intelligent alerts for appointments and medication.",
      hueA: 340,
      hueB: 20,
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      subTitle:
        "Enterprise-grade protection for your data, built with privacy-first standards.",
      hueA: 280,
      hueB: 320,
    },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-no-repeat"
        style={{
          backgroundImage: `url(${WhyChooseUsBg.src})`,
          backgroundSize: "auto 100%",
        }}
      />

      <Container className="relative z-[1] py-14 md:py-24">
        <div className="max-w-[720px]">
          <CommonSectionTitle
            subTitle={"Why Choose Us"}
            title={"Why people Choose DocEye"}
            subTitleClassName="dark:text-white dark:before:bg-white"
          />
          <p className="mt-4 text-slate-600 dark:text-slate-200 leading-relaxed">
            Built for modern care. Book appointments, manage records, and stay
            on track with reminders, all in one simple experience.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseUs.map((item, index) => {
            const background = `linear-gradient(306deg, ${hue(item.hueA)}, ${hue(item.hueB)})`;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                className="relative"
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ amount: 0.35, once: false }}
              >
                {/* Color splash */}
                <div
                  style={{ ...splash, background }}
                  className="absolute -inset-1 rounded-3xl blur-[18px] opacity-40"
                />

                <motion.div
                  style={{ transformOrigin: "10% 60%" }}
                  variants={cardVariants(isEven)}
                  className="relative rounded-3xl border border-slate-200/70 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/55 backdrop-blur-xl shadow-[0_14px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_18px_55px_rgba(0,0,0,0.12)] transition-shadow"
                >
                  <div className="p-7 pt-10">
                    <div className="absolute -top-6 left-6">
                      <div className="h-12 w-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-700/60 shadow-sm flex items-center justify-center text-xl">
                        {item.icon}
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {item.title}
                    </h3>
                    <hr className="border-2 border-dotted border-slate-300 dark:border-slate-600 mt-3" />
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-200 leading-relaxed">
                      {item.subTitle}
                    </p>

                    <div className="mt-5">
                      <Button
                        variant="bordered"
                        color="primary"
                        size="md"
                        className="hover:bg-primary hover:text-white"
                      >
                        Learn more <PlusOutlined />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

// Animation variants
const cardVariants = (isEven: boolean): Variants => ({
  offscreen: { y: 80, opacity: 0, scale: 0.96 },
  onscreen: {
    y: 0,
    opacity: 1,
    scale: 1,
    rotate: isEven ? -2 : 2,
    transition: {
      type: "spring",
      bounce: 0.25,
      duration: 0.7,
      delay: isEven ? 0.2 : 0.4,
    },
  },
});

const hue = (h: number) => `hsl(${h}, 100%, 50%)`;

// Styles (now used as a blur splash behind card)
const splash: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 0,
  pointerEvents: "none",
};

export default WhyChooseUs;
