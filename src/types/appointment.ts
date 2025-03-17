import { TPayment } from "./payment";
import { TDoctor, TPatient } from "./user";

export type TAppointmentType = "online" | "in-person";

export type TAppointment = {
  _id: string;
  doctor: TDoctor;
  patient: TPatient;
  payment: TPayment;
  schedule: Date;
  appointmentType: "in-person" | "online";
  symptoms?: string;
  status: "pending" | "confirmed" | "completed" | "canceled";
  createdAt: string;
  updatedAt: string;
};
export type TCreateAppointment = {
  doctor: string;
  patient: string;
  schedule: string;
  amount: number;
  paymentMethod: "bKash" | "SSLCOMMERZ";
  appointmentType: "in-person" | "online";
  symptoms?: string;
};
