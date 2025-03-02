import Container from "@/src/components/ui/Container";
import { getCurrentUser } from "@/src/services/auth";
import { getDoctorByDoctorCode } from "@/src/services/doctor";
import { TResponse } from "@/src/types";
import { TDoctor } from "@/src/types/user";
import { DollarCircleOutlined, UserAddOutlined } from "@ant-design/icons";
import { Badge } from "@heroui/badge";
import Image from "next/image";
import React from "react";

import Appointments from "../_components/Appointments";
import { Divider } from "@heroui/divider";

const DoctorCheckout = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: Record<string, string | string[]> | undefined;
}) => {
  const doctorRes = (await getDoctorByDoctorCode(
    params.slug
  )) as TResponse<TDoctor>;
  const doctor = doctorRes?.data;
  const me = await getCurrentUser();

  const vat5Percent = Math.round((doctor.consultationFee / 100) * 5);

  return (
    <div className="py-8 space-y-4 md:space-y-8">
      <Container className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-7 space-y-4">
          {/* Patient selection */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm space-y-3">
            <h1 className="font-semibold text-lg">
              <UserAddOutlined /> Patient Selection
            </h1>
            <div className="flex flex-wrap items-center gap-4">
              {me?.profileImg ? (
                <Image
                  src={me?.profileImg}
                  alt={me?.name}
                  width={80}
                  height={80}
                  className="border-2 rounded-md h-[80px] w-[80px]"
                />
              ) : (
                ""
              )}
              <div>
                <h2>{me?.name}</h2>
              </div>
            </div>
          </div>

          <Appointments doctor={doctor} searchParams={searchParams} />

          {/* Payment details */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm space-y-3">
            <h1 className="font-semibold text-md">
              <DollarCircleOutlined /> Payment Details
            </h1>
            <div className="space-y-1 ">
              <div className="flex justify-between items-center">
                <p className="text-sm">Consultation Fee</p>
                <p className="text-md">৳{doctor.consultationFee}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm">VAT (5% )</p>
                <p className="text-md">৳{vat5Percent}</p>
              </div>
              <div className="flex justify-between items-center pb-2">
                <p className="text-sm">Platform Fee</p>
                <p className="text-md">৳15</p>
              </div>
              <div className="flex justify-between items-center pt-2 border-t-4 border-dotted font-semibold">
                <p className="text-md">Subtotal</p>
                <p className="text-md">
                  ৳{vat5Percent + doctor.consultationFee + 15}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-5 space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="grid grid-cols-12 ">
              <div className="flex items-center gap-4 col-span-8">
                {doctor?.profileImg ? (
                  <div className="relative">
                    <Image
                      src={doctor?.profileImg}
                      alt={doctor?.name}
                      width={200}
                      height={200}
                      className="border-2 rounded-md h-[100px] w-[100px]"
                    />
                    <span className="flex justify-center items-center ">
                      <Badge
                        color={
                          searchParams?.isAvailableNow ? "success" : "primary"
                        }
                        className="text-white"
                        content={
                          searchParams?.isAvailableNow
                            ? "Online"
                            : "Appointment"
                        }
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
                  <h1 className="font-semibold text-lg">
                    {doctor.doctorTitle} {doctor.name}
                  </h1>
                  <p className="text-sm text-gray-500">{doctor.doctorType}</p>
                  <p>{doctor.medicalDegree}</p>
                  <p className="text-sm bg-primary-500 text-white my-1 pl-1 pr-2 py-[1px] rounded-r-xl font-bold">
                    {doctor?.medicalSpecialties
                      ?.map((specialty) => specialty.name)
                      ?.join(", ")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DoctorCheckout;
