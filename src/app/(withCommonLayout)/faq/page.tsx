"use client";

import FAQuestions from "@/src/components/modules/faq/FAQuestions";
import FAQbg from "@/src/assets/img/Homepage/FAQ/FAQ-doctor-portal.png";
import FAQbg_dark from "@/src/assets/img/Homepage/FAQ/FAQ-doctor-portal_dark.png";
import React from "react";
import Container from "@/src/components/ui/Container";
import { title } from "@/src/components/primitives";
import { useTheme } from "next-themes";

const FaqPage = () => {
  const { theme } = useTheme();

  return (
    <div
      className="py-16"
      style={{
        backgroundImage: `url(${
          theme === "dark" ? FAQbg_dark.src : FAQbg.src
        })`,
      }}
    >
      <Container className="space-y-8">
        <h2 className={`${title()}`}>Commonly asked question</h2>
        <FAQuestions />
      </Container>
    </div>
  );
};

export default FaqPage;
