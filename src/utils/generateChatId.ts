import { TAppointment } from "../types/appointment";

export default function generateChatId(appt: TAppointment) {
    const timestamp = new Date(appt.schedule).getTime();
    return `${appt._id}-${appt.doctor?._id}-${appt.patient?._id}-${timestamp}`;
}