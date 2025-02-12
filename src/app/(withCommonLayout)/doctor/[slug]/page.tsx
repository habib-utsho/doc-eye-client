import Container from "@/src/components/ui/Container";
import { getDoctorByDoctorCode } from "@/src/services/doctor";
import { TDoctor } from "@/src/types/user";
import { CalendarOutlined } from "@ant-design/icons";
import { Button } from "@heroui/button";
import Image from "next/image";
import React from "react";
import DoctorTabs from "./_components/DoctorTabs";

const DoctorDetailsPage = async ({ params }: { params: { slug: string } }) => {
  console.log(params.slug, "slug");
  const doctorRes = await getDoctorByDoctorCode(params.slug);
  const doctor = doctorRes?.data as TDoctor;
  console.log(doctor, "doctor");
  return (
    <div className="py-8 space-y-4 md:space-y-8">
      <div className="bg-gradient-to-r from-white to-gray-100 dark:from-black dark:to-gray-900 py-4">
        <Container>
          <div className="grid grid-cols-12 ">
            <div className="flex items-center gap-4 col-span-8">
              <Image
                src={doctor?.profileImg}
                alt={doctor?.name}
                width={200}
                height={200}
              />
              <div>
                <h1 className="font-semibold text-lg">
                  {doctor?.doctorTitle} {doctor?.name}
                </h1>
                <p className="text-sm text-gray-500">{doctor?.doctorType}</p>
                <p className="text-sm text-primary-500 font-bold">
                  {doctor?.medicalDegree}
                </p>
                <p className="text-sm bg-primary-500 text-white my-1 pl-1 pr-2 py-[1px] rounded-r-xl font-bold">
                  {doctor?.medicalSpecialties
                    ?.map((specialty) => specialty.name)
                    ?.join(", ")}
                </p>
                <div className="">
                  <p className="text-[12px] text-gray-500">Working in</p>
                  <p className="text-sm text-gray-500 font-semibold">
                    {doctor?.currentWorkplace}
                  </p>
                </div>
                <p className="text-sm text-gray-500">
                  {doctor?.totalExperienceYear} years of experience
                </p>
              </div>
            </div>
            <div className="col-span-4 flex flex-col items-end justify-center gap-1">
              <p className="text-sm text-gray-500">
                <span className="font-bold text-lg text-primary-500">
                  ৳{doctor?.consultationFee}
                </span>{" "}
                /per consultation
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-bold text-lg text-primary-500">
                  ৳{doctor?.followupFee}
                </span>{" "}
                /per followup
              </p>
              <p className="text-sm text-gray-500">
                {doctor.patientAttended} patients attended
              </p>
              <Button
                color="primary"
                className="text-white"
                size="lg"
                startContent={<CalendarOutlined />}
              >
                Book now
              </Button>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <DoctorTabs doctor={doctor} />
      </Container>
    </div>
  );
};

export default DoctorDetailsPage;
