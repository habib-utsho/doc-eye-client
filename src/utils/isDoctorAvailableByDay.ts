import { TDoctor } from "../types/user";
import moment from "moment";

const isDoctorAvailableByDay = (doctor: TDoctor, day: string) => {
  if (!doctor?.availability) return;
  // Date
  const convertedDay = moment().day(day).isoWeekday();
  const startDay = moment().day(doctor.availability?.dayStart).isoWeekday();
  const endDay = moment().day(doctor.availability?.dayEnd).isoWeekday();
  const isWithinDays =
    startDay <= endDay
      ? convertedDay >= startDay && convertedDay <= endDay
      : convertedDay >= startDay || convertedDay <= endDay;
  return isWithinDays;
};

export default isDoctorAvailableByDay;
