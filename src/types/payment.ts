export type TPayment = {
  _id: string;
  amount: number;
  appointment: string;
  paymentMethod: "bKash" | "SSLCOMMERZ";
  status: "pending" | "confirmed" | "canceled";
  createdAt: string;
  updatedAt: string;
};
