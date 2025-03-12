import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllPayment, makePaymentInit } from "../services/payment";
import { toast } from "sonner";
import { TFilterQuery } from "../types";
import { TCreateAppointment } from "../types/appointment";

export const useInitPayment = () => {
  return useMutation({
    mutationKey: ["payment"],
    mutationFn: async (payload: TCreateAppointment) =>
      await makePaymentInit(payload),
    async onSuccess(data) {
      if (data?.success) {
        toast.success(data?.message || "Payment successful!");
      } else {
        toast.error(data?.message || "Failed to payment!");
      }
    },
    onError(error) {
      toast.error(error?.message || "Failed to payment!");
    },
  });
};
export const useGetAllPayment = (query: TFilterQuery[] | undefined) => {
  return useQuery({
    queryKey: ["payment", query],
    queryFn: async () => await getAllPayment(query),
  });
};
