import FAQuestions from "@/src/components/modules/faq/FAQuestions";
import FAQbg from "@/src/assets/img/Homepage/FAQ/FAQ-doctor-portal.png";
import React from "react";
import Container from "@/src/components/ui/Container";
import { title } from "@/src/components/primitives";

const FaqPage = () => {
  return (
    <div className="py-16" style={{ backgroundImage: `url(${FAQbg.src})` }}>
      <Container className="space-y-8">
        <h2 className={`${title()}`}>Commonly asked question</h2>
        <FAQuestions />
      </Container>
    </div>
  );
};

export default FaqPage;
