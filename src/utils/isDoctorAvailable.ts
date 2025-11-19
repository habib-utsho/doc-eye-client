import { TDoctor } from "../types/user";
import moment from "moment";

const isDoctorAvailable = (doctor: TDoctor) => {
  if (!doctor?.availability) return;
  // Date
  const currentDay = moment().isoWeekday();
  const startDay = moment().day(doctor.availability?.dayStart).isoWeekday();
  const endDay = moment().day(doctor.availability?.dayEnd).isoWeekday();
  //   Time
  const currentTime = moment().format("HH:mm");
  const startTime = doctor.availability?.timeStart;
  const endTime = doctor.availability?.timeEnd;
  const isWithinDays =
    startDay <= endDay
      ? currentDay >= startDay && currentDay <= endDay
      : currentDay >= startDay || currentDay <= endDay;
  const isWithinTime = currentTime >= startTime && currentTime <= endTime;
  // console.log(
  //   { startTime, endTime, currentTime, isWithinDays, isWithinTime },
  //   "utils"
  // );
  return isWithinDays && isWithinTime;
};

export default isDoctorAvailable;
