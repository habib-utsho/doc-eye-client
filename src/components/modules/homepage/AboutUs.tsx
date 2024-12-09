import React from "react";
import about1 from "@/src/assets/img/Homepage/About/About1.jpg";
import about2 from "@/src/assets/img/Homepage/About/About2.jpg";
import about3 from "@/src/assets/img/Homepage/About/About3.jpg";
import Image from "next/image";
import CommonSectionTitle from "../../ui/CommonSectionTitle";
import { ArrowRightIcon, PhoneIcon } from "../../ui/icons";
import Container from "../../ui/Container";
import MyMotion from "../../ui/MyMotion";
import { subtitle, title } from "../../primitives";
import { Divider } from "@nextui-org/divider";

const AboutUs = () => {
  return (
    <Container className="pt-40 md:pt-32 pb-12 md:pb-36">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* About us left */}
        <div className="flex items-center relative">
          <MyMotion scale={1.5}>
            <Image src={about1} alt="about1" className="rounded-md" />
          </MyMotion>
          <figure className="absolute -left-28 -bottom-24 hidden lg:block">
            <MyMotion x={-80} delay={0.5}>
              <Image
                src={about2}
                alt="about2"
                width="300"
                height="300"
                className="rounded-md"
              />
            </MyMotion>
          </figure>
          <figure className="absolute -left-28 -top-24 hidden lg:block">
            <MyMotion x={-80}>
              <Image
                src={about3}
                alt="about3"
                width="300"
                height="300"
                className="rounded-md"
              />
            </MyMotion>
          </figure>
          {/* <Image src={about4} alt='about4' width='40%' height='auto'></Image> */}
        </div>

        {/* About us right */}
        <div className="space-y-5 pt-28 lg:pt-0">
          <CommonSectionTitle
            title={"Your Health, Our Priority"}
            subTitle={"About us"}
          />
          <p>
            Our goal is to eliminate or control disabling or troubling symptoms
            so the patient can function better. This treatment involves a
            talking relationship between a therapist & patient.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col justify-between">
              <ul className="space-y-4">
                <li className="flex items-center gap-2 font-semibold">
                  {" "}
                  <span className="text-primary">
                    <ArrowRightIcon />
                  </span>{" "}
                  We{"'"}re here to help you feel better.
                </li>
                <li className="flex items-center gap-2 font-semibold">
                  {" "}
                  <span className="text-primary">
                    <ArrowRightIcon />
                  </span>{" "}
                  Your health is important.
                </li>
                <li className="flex items-center gap-2 font-semibold">
                  {" "}
                  <span className="text-primary">
                    <ArrowRightIcon />
                  </span>{" "}
                  Trust us with your care.
                </li>
                <li className="flex items-center gap-2 font-semibold">
                  {" "}
                  <span className="text-primary">
                    <ArrowRightIcon />
                  </span>{" "}
                  Your health is our goal.
                </li>
              </ul>
              <Divider className="!my-6" />
              <div className="flex gap-4 items-center">
                <span className="bg-primary text-white p-4 rounded-full h-fit">
                  <PhoneIcon />
                </span>
                <div>
                  <p className="font-semibold">Feel free to contact us here</p>
                  <h3>+880170678-5160</h3>
                </div>
              </div>
            </div>

            <div className="border border-foreground/10 rounded text-center my-shadow p-8 space-y-4">
              <span
                className={`${title({
                  className: "!text-[26px] md:!text-[32px]",
                })} text-primary`}
              >
                100%
              </span>
              <p className={`${subtitle()}`}>Satisfaction Guarantees</p>
              <p className="text-[14px]">
                It is a long established fact that a reader will be distracted
                by the readable content
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AboutUs;
