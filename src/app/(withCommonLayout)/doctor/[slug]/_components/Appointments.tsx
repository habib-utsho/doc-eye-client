"use client";
import { TDoctor } from "@/src/types/user";
import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import isDoctorAvailableByDay from "@/src/utils/isDoctorAvailableByDay";
import { convertTo12HourTime } from "@/src/utils/24FourHourTimeTo12HourTime";
import React, { useEffect } from "react";
import { getNext15DaysFunc } from "@/src/utils/getNext15DaysFunc";
import { useGetAllAppointments } from "@/src/hooks/appointment.hook";
import { TAppointment } from "@/src/types/appointment";
import { Skeleton } from "@heroui/skeleton";
import { firstLetterCapital } from "@/src/utils/firstLetterCapital";
import { availableTimeSlotsFunc } from "@/src/utils/availableTimeSlots";

const CategorizeTimeSlotsCompo = ({
  period,
  activeDate,
  timeSlots,
  appointmentsSchedule,
  activeTime,
  setActiveTime,
}: {
  period: "morning" | "afternoon" | "evening" | "night";
  activeDate: string | null;
  timeSlots: string[];
  appointmentsSchedule: string[];
  activeTime: string | null;
  setActiveTime: (time: string | null) => void;
}) => {
  let icon = null;
  switch (period) {
    case "morning":
      icon = "🌅 ";
      break;
    case "afternoon":
      icon = "🌞 ";
      break;
    case "evening":
      icon = "🌆 ";
      break;
    case "night":
      icon = "🌙 ";
      break;
    default:
      icon = "🌞 ";
  }
  const date = new Date();
  const currentDate = date.toISOString().slice(0, 10);
  const currentTime = `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;
  return (
    <div className="space-y-2 my-3">
      <h2>
        {icon} {firstLetterCapital(period)}{" "}
      </h2>
      <div className="flex flex-wrap gap-2">
        {timeSlots?.map((time: string) => {
          // console.log(time, "time");
          const isBookedTime = appointmentsSchedule?.includes(time);
          const isToday = currentDate === activeDate;
          const isExpiredTime =
            isToday &&
            Number(time.split(":").join("")) <
              Number(currentTime.split(":").join(""));
          return (
            <span
              className={`rounded-md border px-2 py-1 text-center cursor-pointer 
        ${
          (!time || isBookedTime || isExpiredTime) &&
          "blur-[1px] pointer-events-none cursor-not-allowed"
        }
       ${
         activeTime === time ? "bg-primary text-white" : "bg-white text-black"
       }`}
              onClick={() => setActiveTime(time)}
            >
              {convertTo12HourTime(time)}
            </span>
          );
        })}
      </div>
    </div>
  );
};

const Appointments = ({
  doctor,
  isAvailableNow,
  activeDate,
  setActiveDate,
  activeTime,
  setActiveTime,
}: {
  doctor: TDoctor;
  isAvailableNow: boolean | undefined;
  activeDate: string | null;
  setActiveDate: (day: string) => void;
  activeTime: string | null;
  setActiveTime: (time: string | null) => void;
}) => {
  if (isAvailableNow) return;

  const { data: appointments, isLoading: isLoadingAppointments } =
    useGetAllAppointments([
      { name: "doctor", value: doctor._id },
      { name: "date", value: activeDate },
      { name: "limit", value: 250 },
    ]);

  useEffect(() => {
    const availableActiveDate = next15Days.find((day) =>
      isDoctorAvailableByDay(doctor, day.day)
    )?.date;
    setActiveDate(availableActiveDate!!);
  }, []);

  const appointmentsSchedule = appointments?.data?.map(
    (appointment: TAppointment) => {
      const date = new Date(appointment.schedule);
      const time = date.toISOString().slice(11, 16);
      return time;
    }
  );

  const next15Days: { date: string; day: string }[] = getNext15DaysFunc();
  const availableTimeSlots = availableTimeSlotsFunc(doctor);
  const categorizeTimeSlotsFunc = (timeSlots: string[]) => {
    return {
      morning: timeSlots.filter((time) => {
        const hour = parseInt(time.split(":")[0], 10);
        return hour >= 5 && hour < 12;
      }),
      afternoon: timeSlots.filter((time) => {
        const hour = parseInt(time.split(":")[0], 10);
        return hour >= 12 && hour < 17;
      }),
      evening: timeSlots.filter((time) => {
        const hour = parseInt(time.split(":")[0], 10);
        return hour >= 17 && hour < 21;
      }),
      night: timeSlots.filter((time) => {
        const hour = parseInt(time.split(":")[0], 10);
        return hour >= 21 || hour < 5;
      }),
    };
  };
  const categorizeTimeSlots = categorizeTimeSlotsFunc(availableTimeSlots);

  
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
                activeDate === day.date
                  ? "bg-primary text-white"
                  : "bg-white text-black"
              }
              `}
              onClick={() => setActiveDate(day.date)}
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

        {isLoadingAppointments ? (
          <div className="flex flex-wrap gap-2 my-3">
            {Array.from({ length: 48 }).map((_, ind) => {
              return <Skeleton className="rounded-lg h-[33.79px] w-[75px]" />;
            })}
          </div>
        ) : (
          (
            Object.keys(categorizeTimeSlots) as Array<
              "morning" | "afternoon" | "evening" | "night"
            >
          ).map((period) => {
            if (!categorizeTimeSlots[period].length) return null;
            return (
              <CategorizeTimeSlotsCompo
                period={period}
                activeDate={activeDate}
                activeTime={activeTime}
                setActiveTime={setActiveTime}
                appointmentsSchedule={appointmentsSchedule}
                timeSlots={categorizeTimeSlots[period]}
              />
            );
          })
        )}
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
