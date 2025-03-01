import Container from "@/src/components/ui/Container";
import { getCurrentUser } from "@/src/services/auth";
import { getDoctorByDoctorCode } from "@/src/services/doctor";
import { TResponse } from "@/src/types";
import { TDoctor } from "@/src/types/user";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  DollarCircleOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Badge } from "@heroui/badge";
import Image from "next/image";
import React from "react";
import moment from "moment";
import isDoctorAvailableByDay from "@/src/utils/isDoctorAvailableByDay";
import { convertTo12HourTime } from "@/src/utils/24FourHourTimeTo12HourTime";

const getNext15DaysFunc = () => {
  const days = [];
  for (let i = 0; i < 15; i++) {
    days.push({
      date: moment().add(i, "days").format("DD-MM-YYYY"),
      day: moment().add(i, "days").format("dddd"),
    });
  }
  return days;
};
const availableTimeSlotsFunc = (doctor: TDoctor) => {
  const parseTime = (time: string | undefined) => {
    if (!time) return 0;
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };
  const roundToNearest15 = (minutes: number) => {
    return Math.round(minutes / 15) * 15;
  };
  const startMinutes = roundToNearest15(
    parseTime(doctor.availability?.timeStart)
  );
  const endMinutes = roundToNearest15(parseTime(doctor.availability?.timeEnd));
  console.log({ startTime: startMinutes, endTime: endMinutes });
  console.log(
    doctor.availability.timeEnd,
    doctor.availability.timeStart,
    "time end start"
  );
  if (isNaN(startMinutes) || isNaN(endMinutes)) {
    return [];
  }
  const timeSlots = [];
  for (let minutes = startMinutes; minutes <= endMinutes; minutes += 15) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    timeSlots.push(`${hours}:${mins}`);
  }
  console.log(timeSlots, "timeSlots");
  return timeSlots;
};

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
  // const me = await getCurrentUser();
  // console.log({ me, doctor, params, searchParams }, "doctor details page");
  // console.log({ me }, "doctor details page");
  // console.log(getNext15Days(), doctor, "next 15 days");
  const availableTimeSlots = availableTimeSlotsFunc(doctor);
  console.log(availableTimeSlots, "availableTimeSlotsP");

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

          {searchParams?.isAvailableNow && (
            <div className=" bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm space-y-3">
              <h1 className="font-semibold text-md">
                <CalendarOutlined className="mr-2" />
                Appointment
              </h1>
              {/* Next 15 days */}
              <div className="flex  overflow-auto gap-2 my-3">
                {getNext15DaysFunc().map((day) => {
                  const isAvailableDay = isDoctorAvailableByDay(
                    doctor,
                    day.day
                  );
                  return (
                    <span
                      className={`rounded-md border px-2 py-1 text-center cursor-pointer ${
                        !isAvailableDay && "blur-[1px] pointer-events-none"
                      }`}
                    >
                      {day.date?.split("-")?.[0]} <br /> {day.day}
                    </span>
                  );
                })}
              </div>
              <div>
                <h1 className="font-semibold text-md">
                  <ClockCircleOutlined className="mr-2" />
                  Available Time Slots
                </h1>
                
                <div className="flex flex-wrap gap-2 my-3">
                  {availableTimeSlotsFunc(doctor).map((time: string) => {
                    return (
                      <span
                        className={`rounded-md border px-2 py-1 text-center cursor-pointer ${
                          !time && "blur-[1px] pointer-events-none"
                        }`}
                      >
                        {convertTo12HourTime(time)}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Payment details */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm space-y-3">
            <h1 className="font-semibold text-md">
              <DollarCircleOutlined /> Payment Details
            </h1>
            <div className="space-y-1 ">
              <div className="flex justify-between items-center">
                <p className="text-sm">Consultation Fee</p>
                <p className="text-lg font-semibold">
                  ৳{doctor.consultationFee}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm">Followup Fee</p>
                <p className="text-lg font-semibold">৳{doctor.followupFee}</p>
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
