import React from "react";
import { FaPlus } from "react-icons/fa6";
import doctorConsultation from "@/src/assets/img/Homepage/Services/doctorConsultation.png";
import healthRecord from "@/src/assets/img/Homepage/Services/healthRecord.png";
import medicationReminder from "@/src/assets/img/Homepage/Services/medicationReminder.png";
import support from "@/src/assets/img/Homepage/Services/support.png";
import servicesBG from "@/src/assets/img/Homepage/Services/servicesBG.svg";
import tharmoMeter from "@/src/assets/img/Homepage/Services/tharmo-meter.png";
import Image from "next/image";
import CommonSectionTitle from "../../ui/CommonSectionTitle";
import { Button } from "@nextui-org/button";
import Container from "../../ui/Container";
import { subtitle } from "../../primitives";
import MyMotion from "../../ui/MyMotion";

const Services = () => {
  const servicesData = [
    {
      title: "Online Consultations",
      description:
        "Connect with experienced doctors for virtual medical consultations any time.",
      img: doctorConsultation,
    },
    {
      title: "Health Records",
      description:
        "Securely store and access your medical records online for easy reference.",
      img: healthRecord,
    },
    {
      title: "Medication Reminders",
      description:
        "Receive timely reminders for taking medications to ensure your well-being.",
      img: medicationReminder,
    },
    {
      title: "24/7 Support",
      description:
        "Access round-the-clock assistance for medical queries and concerns.",
      img: support,
    },
  ];

  return (
    <div
      className="py-28 min-h-screen relative bg-center xl:bg-left"
      style={{ backgroundImage: `url(${servicesBG.src})` }}
    >
      <Container>
        <div className="space-y-5 pl-0 2xl:pl-[200px] relative z-30">
          {/* Heading */}
          <div className="pr-[80px] md:pr-[150px] space-y-5">
            <CommonSectionTitle
              subTitle={"Services"}
              title={"Main services by DocEye"}
            ></CommonSectionTitle>
            <p>
              We at DocEye offer world-class solutions in cardiac treatments
              with the help of advanced tools and the experience of pioneer
              cardiology team
            </p>
            <Button color="primary" className="text-white" size="lg">
              All services
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 space-y-6 md:space-y-0 py-14">
            {servicesData.map((service, ind) => {
              return (
                <div
                  key={ind}
                  className="rounded-lg px-2 py-5 pt-14 space-y-4 text-center bg-background border border-foreground/10 relative group flex flex-col justify-between"
                >
                  {/* <span className='p-4 inline-block rounded bg-primary text-white absolute -top-5 left-1/2 -translate-x-1/2'>{service.icon}</span> */}
                  <figure className="absolute left-1/2 -top-5 -translate-x-1/2 p-4 bg-primary border rounded group-hover:scale-110 group-hover:my-shadow transition duration-500">
                    <Image
                      src={service.img}
                      alt="doctorConsultation"
                      height={40}
                      width={40}
                    ></Image>
                  </figure>

                  <h2 className={`${subtitle()}`}>{service.title}</h2>
                  <p>{service.description}</p>
                  <Button>
                    Learn more <FaPlus></FaPlus>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </Container>

      {/* Doctor with tharmo meter */}
      {/* <figure className="absolute left-8 -top-24 h-[950px] w-[400px] hidden 2xl:block hover:rotate-3 transition duration-500 z-20"> */}
      <MyMotion
        y={-180}
        className="absolute left-8 -top-24 h-[950px] w-[400px] hidden 2xl:block hover:rotate-3 transition duration-500 z-20"
      >
        <Image src={tharmoMeter} fill={true} alt="tharmo-meter"></Image>
      </MyMotion>
      {/* </figure> */}
    </div>
  );
};

export default Services;
