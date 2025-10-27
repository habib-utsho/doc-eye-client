"use client";
import Container from "@/src/components/ui/Container";
import { HeartFilledIcon } from "@/src/components/ui/icons";
import { GlobalOutlined } from "@ant-design/icons";
import { FaGraduationCap } from "react-icons/fa6";
import Image from "next/image";
import React from "react";

import about1 from "@/src/assets/img/Homepage/About/About1.jpg";
import about2 from "@/src/assets/img/Homepage/About/About2.jpg";
import about3 from "@/src/assets/img/Homepage/About/About3.jpg";
import WhyChooseUs from "@/src/components/modules/homepage/WhyChooseUs";
import { Button } from "@heroui/button";

const AboutUs = () => {
  const features = [
    {
      name: "Trusted Medical Professionals",
      description:
        "Get access to verified and highly qualified doctors at your fingertips.",
      icon: <FaGraduationCap className="text-primary-500 text-3xl" />,
    },
    {
      name: "Patient-Centered Care",
      description:
        "Designed to empower patients through digital health access.",
      icon: <HeartFilledIcon className="text-primary-500 text-3xl" />,
    },
    {
      name: "Accessible & Secure",
      description: "We make healthcare accessible for everyone, everywhere.",
      icon: <GlobalOutlined className="text-primary-500 text-3xl" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 dark:from-slate-900 dark:to-slate-800 py-12">
      {/* Intro */}
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary drop-shadow-lg">
            Discover DocEye
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg">
            For years, we’ve been working with care and dedication, helping
            people find their way to mental well-being and a happier, more
            fulfilling life. It’s been a journey of impact and transformation,
            and we’d love for you to be a part of it as we continue moving
            forward together.
          </p>
        </div>
      </Container>

      {/* Hero Image (optional) */}
      <Container>
        <div className="w-full flex justify-center mb-16">
          <Image
            src={about1}
            alt="DocEye"
            width={700}
            height={500}
            className="rounded-lg shadow-sm dark:shadow-md"
          />
        </div>
      </Container>

      {/* What is DocEye */}
      <Container>
        <section className="mb-20">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h3 className="text-3xl font-bold text-slate-800 dark:text-white">
              What is DocEye?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-md">
              <b>DocEye</b> is an intelligent platform that connects patients
              with top-tier doctors, specialists, and health services across the
              country. Offering scheduling, medical records tracking, and secure
              consultations all in one place. It's your digital health
              companion.
            </p>
          </div>
        </section>
      </Container>

      {/* Features */}
      <Container>
        <section className="mb-20">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg p-8 text-center shadow transition duration-300 hover:shadow-lg"
              >
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h4 className="text-xl font-semibold mb-2 dark:text-white">
                  {feature.name}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </Container>

      {/* Mission & Why Choose */}
      <section className="text-center max-w-4xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-bold mb-6 text-slate-800 dark:text-white">
          Our Mission
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-12 leading-relaxed">
          At DocEye, Our goal is to eliminate or control disabling or troubling
          symptoms so the patient can function better. This treatment involves a
          talking relationship between a therapist & patient.
        </p>

        <h3 className="text-xl md:text-2xl font-semibold mb-4 text-primary-600">
          Why Choose DocEye?
        </h3>
        <ul className="text-left list-disc ml-6 text-gray-700 dark:text-gray-400 space-y-3 text-[16px]">
          <li>Verified & Licensed Medical Experts</li>
          <li>Encrypted Patient-Doctor Communication</li>
          <li>Instant Appointment Booking System</li>
          <li>Free Access to Medical Records & Prescriptions</li>
          <li>Personalized Health Insights (Coming Soon!)</li>
        </ul>
      </section>

      <WhyChooseUs />

      {/* CTA Banner */}
      <section className="mt-24 text-center bg-primary-500 text-white p-10 rounded-lg shadow-md">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          Be part of the future of healthcare
        </h3>
        <p className="mb-6 text-white/90">
          Whether you're a doctor looking to expand, or a patient looking to
          simplify health — DocEye is for you.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Button
            variant="flat"
            className="text-white dark:text-white mt-5"
            size="lg"
          >
            Join as Doctor
          </Button>
          <Button
            variant="ghost"
            className="text-white dark:text-white mt-5"
            size="lg"
          >
            Book your Appointment
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
