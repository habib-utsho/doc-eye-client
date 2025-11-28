import React from "react";
import WhyChooseUsBg from "@/src/assets/img/Homepage/WhyChooseUs/WhyChooseUs.svg";
import {
  SolutionOutlined,
  RiseOutlined,
  HomeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import CommonSectionTitle from "../../ui/CommonSectionTitle";
import Container from "../../ui/Container";
import { Button } from "@heroui/button";
import { subtitle } from "../../primitives";

const WhyChooseUs = () => {
  const whyChooseUs = [
    {
      title: "Qualified Doctors",
      subTitle:
        "a person who holds a degree recognised by the Medical Council is registered",
      icon: <SolutionOutlined />,
    },
    {
      title: "Trusted Treatment",
      subTitle:
        "DocEye has many types of treatment to relieve symptoms for all types illness.",
      icon: <RiseOutlined />,
    },
    {
      title: "24/7 Services",
      subTitle:
        "DocEye is at your service 24×7 aiming to provide the best services.",
      icon: <HomeOutlined />,
    },
  ];

  return (
    <div
      className="min-h-screen bg-left md:bg-bottom bg-no-repeat bg-cover dark:bg-slate-800 dark:bg-blend-overlay"
      style={{
        backgroundImage: `url(${WhyChooseUsBg.src})`,
      }}
    >
      <Container className="space-y-8 pr-0 lg:pr-[300px] pt-[50px] md:pt-[100px]">
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
        <ul>
          <li></li>
        </ul>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 py-10">
          {whyChooseUs.map((item, ind) => {
            return (
              <div
                key={ind}
                className="bg-background border border-foreground/10 rounded-lg px-8 py-5 pt-14 space-y-4 text-center  relative group mb-6 xl:mb-0"
              >
                <span className="p-4 inline-block rounded bg-primary absolute -top-5 left-1/2 -translate-x-1/2 group-hover:scale-110 transition duration-500 text-white">
                  {item.icon}
                </span>
                <h2 className={`${subtitle()}`}>{item.title}</h2>
                <p className="text-[14px]">{item.subTitle}</p>
                <Button
                  variant="bordered"
                  color="primary"
                  size="md"
                  className="hover:bg-primary hover:text-white"
                >
                  Learn more <PlusOutlined />
                </Button>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default WhyChooseUs;
