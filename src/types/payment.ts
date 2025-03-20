import { TAppointment } from "./appointment";
import { TDoctor, TPatient } from "./user";

export type TPayment = {
  _id: string;
  amount: number;
  appointment: TAppointment;
  doctor: TDoctor;
  patient: TPatient;
  paymentMethod: "bKash" | "SSLCOMMERZ";
  status: "pending" | "confirmed" | "canceled";
  createdAt: string;
  updatedAt: string;
};
