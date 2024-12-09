import React from "react";
import FAQbg from "@/src/assets/img/Homepage/FAQ/FAQ-doctor-portal.png";
import CommonSectionTitle from "../../ui/CommonSectionTitle";
import { Button } from "@nextui-org/button";
import FAQuestions from "../faq/FAQuestions";
import Container from "../../ui/Container";
import Link from "next/link";

const FAQ = () => {
  return (
    <div
      className="py-24 bg-cover bg-center"
      style={{ backgroundImage: `url(${FAQbg.src})` }}
    >
      <Container className="space-y-8">
        <CommonSectionTitle
          title={"Commonly asked question"}
          subTitle={"Exploring Common Queries About Our Services"}
        />

        {/* Accordion */}
        <div>
          <FAQuestions limit={5} />
          <div className="text-center mt-16">
            <Link href="/faq">
              <Button variant="ghost" color="primary">
                View all FAQ{"'"}s
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FAQ;
