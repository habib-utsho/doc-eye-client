export const convertTo12HourTime = (time: string) => {
  if (!time) return;
  const [h, m] = time.split(":").map(Number); // Convert to numbers once
  const period = h >= 12 ? "PM" : "AM";
  const hours = h % 12 === 0 ? 12 : h % 12; // Convert 0/24 to 12 for AM/PM
  const minutes = m.toString().padStart(2, "0"); // Ensure 2-digit minutes
  return `${hours}:${minutes} ${period}`;
};
