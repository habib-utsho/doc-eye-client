"use client";
import { TDoctor } from "@/src/types/user";
import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import isDoctorAvailableByDay from "@/src/utils/isDoctorAvailableByDay";
import { convertTo12HourTime } from "@/src/utils/24FourHourTimeTo12HourTime";
import React, { useEffect } from "react";
import { getNext15DaysFunc } from "@/src/utils/getNext15DaysFunc";
import { useGetAllAppointments } from "@/src/hooks/appointment.hook";

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
  // console.log({ startTime: startMinutes, endTime: endMinutes });
  // console.log(
  //   doctor.availability.timeEnd,
  //   doctor.availability.timeStart,
  //   "time end start"
  // );
  if (isNaN(startMinutes) || isNaN(endMinutes)) {
    return [];
  }
  const timeSlots = [];
  for (let minutes = startMinutes; minutes <= endMinutes; minutes += 15) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    timeSlots.push(`${hours}:${mins}`);
  }
  // console.log(timeSlots, "timeSlots");
  return timeSlots;
};
const Appointments = ({
  doctor,
  isAvailableNow,
  activeDay,
  setActiveDay,
  activeTime,
  setActiveTime,
}: {
  doctor: TDoctor;
  isAvailableNow: boolean | undefined;
  activeDay: string | null;
  setActiveDay: (day: string) => void;
  activeTime: string | null;
  setActiveTime: (time: string) => void;
}) => {
  if (isAvailableNow) return;
  // console.log(availableTimeSlots, "availableTimeSlotsP");

  // console.log(availableTimeSlots[0], "availableTimeSlots[0]");

  // console.log(activeDay, "activeDay from appointments");

  // TODO: how to filter appointments by date and doctorId and get the available time slots

  console.log(doctor._id, activeDay, "doctor._id");
  const { data: appointments, isLoading: isLoadingAppointments } =
    useGetAllAppointments([
      { name: "doctor", value: doctor._id },
      { name: "date", value: activeDay },
      { name: "limit", value: 250 },
    ]);

  console.log(
    appointments,
    isLoadingAppointments,
    "isLoadingAppointments",
    "appointments"
  );

  useEffect(() => {
    const availableActiveDate = next15Days.find((day) =>
      isDoctorAvailableByDay(doctor, day.day)
    )?.date;
    setActiveDay(availableActiveDate!!);
  }, []);

  const next15Days: { date: string; day: string }[] = getNext15DaysFunc();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm space-y-3">
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
              {day.date?.split("-")?.[2]} <br /> {day.day}
            </span>
          );
        })}
      </div>
      {/* Available time slots */}
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

      {/* color to understand */}
      <div className="flex items-center justify-center gap-2">
        <div className="flex items-center gap-1">
          <div className="bg-primary-500 w-4 h-4 rounded-md"></div>
          <p>Selected</p>
        </div>
        <div className="flex items-center gap-1">
          <div className="bg-white border-2 rounded-md w-4 h-4 "></div>
          <p>Available</p>
        </div>
        <div className="flex items-center gap-1">
          <div className="bg-white border rounded-md w-4 h-4 blur-[1px]"></div>
          <p>Not Available</p>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
