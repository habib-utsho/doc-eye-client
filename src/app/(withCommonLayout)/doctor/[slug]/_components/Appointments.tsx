"use client";
import { TDoctor } from "@/src/types/user";
import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import isDoctorAvailableByDay from "@/src/utils/isDoctorAvailableByDay";
import { convertTo12HourTime } from "@/src/utils/24FourHourTimeTo12HourTime";
import React from "react";
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
const Appointments = ({
  doctor,
  searchParams,
}: {
  doctor: TDoctor;
  searchParams: Record<string, string | string[]> | undefined;
}) => {
  if (searchParams?.isAvailableNow) return;
  const availableTimeSlots: string[] = availableTimeSlotsFunc(doctor);
  const next15Days: { date: string; day: string }[] = getNext15DaysFunc();
  console.log(availableTimeSlots, "availableTimeSlotsP");

  const activeDate = next15Days.find((day) =>
    isDoctorAvailableByDay(doctor, day.day)
  )?.date;
  const [activeDay, setActiveDay] = React.useState<string | null>(activeDate!!);
  const [activeTime, setActiveTime] = React.useState<string | null>(null);
  console.log(availableTimeSlots[0], "availableTimeSlots[0]");

  return (
    <div className=" bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm space-y-3">
      <h1 className="font-semibold text-md">
        <CalendarOutlined className="mr-2" />
        Appointment
      </h1>
      {/* Next 15 days */}
      <div className="flex my-scrollbar pb-2 overflow-auto gap-2 my-3">
        {next15Days.map((day) => {
          const isAvailableDay = isDoctorAvailableByDay(doctor, day.day);
          return (
            <span
              className={`rounded-md border px-2 py-1 text-center cursor-pointer ${
                !isAvailableDay && "blur-[1px] pointer-events-none"
              }
              ${
                activeDay === day.date
                  ? "bg-primary text-white"
                  : "bg-white text-black"
              }
              `}
              onClick={() => setActiveDay(day.date)}
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
                className={`rounded-md border px-2 py-1 text-center cursor-pointer 
                    ${!time && "blur-[1px] pointer-events-none"}
                ${
                  activeTime === time
                    ? "bg-primary text-white"
                    : "bg-white text-black"
                }
                `}
                onClick={() => setActiveTime(time)}
              >
                {convertTo12HourTime(time)}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
