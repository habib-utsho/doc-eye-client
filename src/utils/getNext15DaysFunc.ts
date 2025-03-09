import moment from "moment";

export const getNext15DaysFunc = () => {
  const days = [];
  for (let i = 0; i < 15; i++) {
    days.push({
      date: moment().add(i, "days").format("YYYY-MM-DD"),
      day: moment().add(i, "days").format("dddd"),
    });
  }
  return days;
};
