// components/Countdown.tsx
"use client";

import moment from "moment";
import { useEffect, useState } from "react";

interface AppointmentScheduleCountdownProps {
  schedule: string | Date;
  className?: string;
}

const AppointmentScheduleCountdown = ({
  schedule,
  className = "",
}: AppointmentScheduleCountdownProps) => {
  const calculate = () => {
    const now = moment();
    const end = moment(schedule);
    const diff = end.diff(now);

    if (diff <= 0) {
      return {
        text: moment(schedule).fromNow(),
        color: "text-danger",
        pulse: false,
      };
    }

    const duration = moment.duration(diff);
    const days = Math.floor(duration.asDays());
    const h = duration.hours();
    const m = duration.minutes();
    const s = duration.seconds();

    let text = "";
    let color = "text-success";
    let pulse = false;

    if (days > 0) {
      text = `In ${days}d ${h}h ${m}m ${s}s`;
      color = "text-primary";
    } else if (h > 0) {
      text = `In ${h}h ${m}m ${s}s`;
      color = "text-secondary";
    } else if (m > 5) {
      text = `In ${m}m ${s}s`;
      color = "text-success";
    } else {
      text = `In ${m}m ${s}s`;
      color = "text-success";
      pulse = true;
    }

    return { text, color, pulse };
  };

  const [state, setState] = useState(calculate);

  useEffect(() => {
    const interval = setInterval(() => setState(calculate()), 1000);
    return () => clearInterval(interval);
  }, [schedule]);

  return (
    <div className={`flex flex-col ${className}`}>
      <span
        className={`font-semibold text-sm ${state.color} ${
          state.pulse ? "animate-pulse" : ""
        }`}
      >
        {state.text}
      </span>
      <span className="text-xs text-gray-500">
        {moment(schedule).format("DD-MMM-YYYY hh:mm A")}
      </span>
    </div>
  );
};

export default AppointmentScheduleCountdown;
