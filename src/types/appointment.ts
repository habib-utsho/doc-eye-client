export type TAppointmentType = "online" | "in-person";

export type TAppointment = {
  _id: string;
  doctor: string;
  patient: string;
  payment: string;
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
  schedule: Date;
  amount: number;
  paymentMethod: "bKash" | "SSLCOMMERZ";
  appointmentType: "in-person" | "online";
  symptoms?: string;
};
