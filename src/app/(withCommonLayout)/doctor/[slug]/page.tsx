import Container from "@/src/components/ui/Container";
import { getDoctorByDoctorCode } from "@/src/services/doctor";
import { TDoctor } from "@/src/types/user";
import Image from "next/image";
import React from "react";
import isDoctorAvailable from "@/src/utils/isDoctorAvailable";
import { Badge } from "@heroui/badge";
import BookingButton from "./_components/BookingButton";
import FavoriteDoctorHeart from "../../specialty/_components/FavoriteDoctorHeart";
import DoctorTabs from "./_components/doctor-tabs/DoctorTabs";

const DoctorDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const resolvedParams = await params;
  const doctorRes = await getDoctorByDoctorCode(resolvedParams.slug);
  const doctor = doctorRes?.data as TDoctor;
  const isDoctorAvailableP = isDoctorAvailable(doctor);
  return (
    <div className="py-8 space-y-4 md:space-y-8 bg-slate-50 dark:bg-gray-900">
      <div className=" py-4">
        <Container>
          <div className="grid grid-cols-12 bg-white dark:bg-gray-800 p-4 rounded-lg shadow gap-4">
            <div className="flex items-center gap-4 col-span-8">
              {doctor?.profileImg ? (
                <div className="relative">
                  <Image
                    src={doctor?.profileImg}
                    alt={doctor?.name}
                    width={200}
                    height={200}
                    className="border-2 rounded-md"
                  />
                  <span className="flex justify-center items-center ">
                    <Badge
                      color={isDoctorAvailableP ? "success" : "primary"}
                      className="text-white"
                      content={isDoctorAvailableP ? "Online" : "Appointment"}
                      size="sm"
                    >
                      {" "}
                    </Badge>
                  </span>
                </div>
              ) : (
                <div className="rounded-lg w-14 h-16 bg-primary-500 bg-opacity-20 mr-2" />
              )}
              <div>
                <h1 className="font-semibold text-lg flex items-center gap-2">
                  {doctor?.doctorTitle} {doctor?.name}{" "}
                  <FavoriteDoctorHeart
                    doctor={doctor}
                    // className="absolute top-1 right-1 z-10"
                  />
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
                    {doctor?.currentWorkplace?.workPlace} -{" "}
                    {doctor?.currentWorkplace?.department}
                  </p>
                </div>
                <p className="text-sm text-gray-500">
                  {doctor?.totalExperienceYear} years of experience
                </p>
              </div>
            </div>
            <div className="col-span-4 flex flex-col items-end  justify-center gap-1">
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
              <BookingButton
                isDoctorAvailableP={!!isDoctorAvailableP}
                params={resolvedParams}
              />
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
