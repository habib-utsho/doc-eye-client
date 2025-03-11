import { TDoctor } from "../types/user";

export const availableTimeSlotsFunc = (doctor: TDoctor) => {
  if (!doctor.availability?.timeStart || !doctor.availability?.timeEnd)
    return [];
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
  if (isNaN(startMinutes) || isNaN(endMinutes)) {
    return [];
  }
  const timeSlots = [];
  for (let minutes = startMinutes; minutes <= endMinutes; minutes += 15) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    timeSlots.push(
      `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`
    );
  }
  return timeSlots;
};
