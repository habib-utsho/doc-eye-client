import { CheckIcon } from "@/src/assets/img/icons";
import Container from "@/src/components/ui/Container";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Tooltip } from "@nextui-org/tooltip";
import React from "react";

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

  return (
    <div className="min-h-[calc(100vh-64px)] py-4 md:py-6">
      <Container>
        <h2 className="text-3xl md:text-4xl xl:text-6xl mb-6 md:mb-8 text-center">
          Health Plans
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {healthPlans.map((hp, ind) => {
            const { planName, description, price, features } = hp;
            return (
              <Card key={ind} className="space-y-4 relative pb-20">
                <CardHeader className="justify-start items-start flex-col space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-primary">
                    {planName}
                  </h2>
                  <h3 className="font-bold text-xl">
                    ৳{price}{" "}
                    <span className="!text-lg font-semibold">/monthly</span>
                  </h3>
                </CardHeader>
                <Divider />
                <CardBody className="space-y-4">
                  <Tooltip content={description}>
                    <p className="text-paragraph min-h-[72px] line-clamp-3">
                      {" "}
                      {description}
                    </p>
                  </Tooltip>
                  <ul className="space-y-3">
                    {features?.map((feature, ind) => (
                      <li key={ind} className="flex items-center gap-2">
                        {" "}
                        <span className="text-primary">
                          <CheckIcon></CheckIcon>
                        </span>{" "}
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardBody>
                <Button
                  color="primary"
                  className="absolute bottom-2 left-0 right-0 mx-5 text-white"
                >
                  Subscribe Now
                </Button>
              </Card>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default HealthPlansPage;
