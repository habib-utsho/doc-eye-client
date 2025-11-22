import { CheckIcon } from "@/src/components/ui/icons";
import Container from "@/src/components/ui/Container";
import MyMotion from "@/src/components/ui/MyMotion";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Tooltip } from "@heroui/tooltip";
import React from "react";
import SubscribeButton from "./_components/SubscribeButton";

const HealthPlansPage = () => {
  const healthPlans = [
    {
      planName: "Basic Plan",
      description:
        "Access to basic features like appointment scheduling and medical records.",
      price: 150,
      features: [
        "Basic appointment scheduling",
        "Access to medical records",
        "Limited access to specialized services",
        "Limited consultation time with doctors",
      ],
    },
    {
      planName: "Silver Plan",
      description:
        "Extended access to features, including appointment scheduling, medical records, and prescription requests.",
      price: 300,
      features: [
        "Extended appointment scheduling",
        "Access to medical records",
        "Prescription requests",
        "Longer consultation times with doctors",
        "Access to a broader range of specialists and services",
      ],
    },
    {
      planName: "Gold Plan",
      description:
        "Comprehensive access to all portal features, including appointment scheduling, medical records, prescription requests, and video consultations.",
      price: 500,
      features: [
        "Comprehensive appointment scheduling",
        "Access to medical records",
        "Video consultations",
        "Priority scheduling and shorter waiting times for appointments",
        "Prescription delivery services",
      ],
    },
    {
      planName: "Family Plan",
      description:
        "Covers all features available in the Gold Plan for the primary account holder and their family members.",
      price: 600,
      features: [
        "Comprehensive appointment scheduling for the entire family",
        "Shared medical records",
        "Discounted rates for additional family members",
      ],
    },
    {
      planName: "Telemedicine Plan",
      description: "Focused on telemedicine services.",
      price: 650,
      features: [
        "Unlimited video consultations with doctors",
        "Access to online prescription and medical advice",
        "Remote monitoring of health data",
      ],
    },
    {
      planName: "Customized Plan",
      description:
        "Tailored plans for individuals with specific medical conditions.",
      price: 750,
      features: [
        "Personalized health management and regular check-ins",
        "Access to specialized support groups and resources",
      ],
    },
    {
      planName: "Student Plan",
      description: "Designed for students and educational institutions.",
      price: 250,
      features: [
        "Affordable rates for students",
        "Access to basic health services and resources",
      ],
    },
    {
      planName: "Senior Citizen Plan",
      description: "Specialized plans for senior citizens.",
      price: 300,
      features: [
        "Priority access to geriatric specialists",
        "Health assessments and preventive care",
      ],
    },
  ];

  const highlightPlans = new Set(["Gold Plan", "Family Plan"]);

  return (
    <div className="min-h-[calc(100vh-64px)] py-6 md:py-10">
      <Container>
        <MyMotion y={35} delay={0.05}>
          <header className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary drop-shadow-sm">
              Health Plans
            </h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              Choose the plan that fits your health journey. Transparent
              pricing, meaningful features, and flexibility for individuals,
              families, students, and seniors.
            </p>
          </header>
        </MyMotion>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {healthPlans.map((hp, ind) => {
            const { planName, description, price, features } = hp;
            const isHighlight = highlightPlans.has(planName);
            return (
              <MyMotion key={planName} y={30} delay={0.1 + ind * 0.05}>
                <Card
                  aria-label={`${planName} pricing card`}
                  className={`relative flex flex-col justify-between h-full space-y-4 pb-24 border hover:border-primary/50 transition shadow-sm hover:shadow-xl hover:-translate-y-1 duration-300 ${
                    isHighlight
                      ? "bg-gradient-to-br from-primary/5 to-primary/10"
                      : ""
                  }`}
                >
                  {isHighlight && (
                    <span className="absolute top-4 right-4 inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow-sm">
                      Popular
                    </span>
                  )}
                  <CardHeader className="justify-start items-start flex-col space-y-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-primary">
                      {planName}
                    </h2>
                    <h3 className="font-bold text-xl">
                      ৳{price}
                      <span className="!text-lg font-semibold">/monthly</span>
                    </h3>
                  </CardHeader>
                  <Divider />
                  <CardBody className="space-y-5">
                    <Tooltip content={description}>
                      <p className="min-h-[72px] line-clamp-3 text-gray-600 dark:text-gray-300">
                        {description}
                      </p>
                    </Tooltip>
                    <ul className="space-y-3">
                      {features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                        >
                          <span className="mt-1 text-primary">
                            <CheckIcon />
                          </span>
                          <span className="leading-relaxed text-sm md:text-[15px]">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardBody>
                  <div className="absolute left-0 right-0 bottom-4 px-4">
                    <SubscribeButton />
                  </div>
                </Card>
              </MyMotion>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default HealthPlansPage;
