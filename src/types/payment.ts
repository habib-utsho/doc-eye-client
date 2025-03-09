export type TPayment = {
  _id: string;
  amount: number;
  appointment: string | null;
  paymentMethod: "bKash" | "SSLCOMMERZ";
  status: "pending" | "confirmed" | "canceled";
  createdAt: string;
  updatedAt: string;
};
