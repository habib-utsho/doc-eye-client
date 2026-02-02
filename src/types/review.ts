import { TAppointment } from "./appointment";
import { TDoctor, TPatient } from "./user";

export type TReview = {
    _id: string;
    patient: TPatient;
    doctor: TDoctor;
    appointment: TAppointment
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
};