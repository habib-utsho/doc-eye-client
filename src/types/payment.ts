import { TAppointment } from "./appointment";
import { TDoctor, TPatient } from "./user";

export type TPayment = {
  trans_id: string;
  _id: string;
  amount: {
    consultationFee: number,
    vat: number,
    platformFee: number,
    total: number,
  };
  appointment: TAppointment;
  doctor: TDoctor;
  patient: TPatient;
  paymentMethod: "bKash" | "SSLCOMMERZ";
  status: "pending" | "confirmed" | "canceled";
  createdAt: string;
  updatedAt: string;
};
