import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllPayment, makePaymentInit } from "../services/payment";
import { toast } from "sonner";
import { TCreatePayment, TPayment } from "../types/payment";
import { TFilterQuery } from "../types";

export const useInitPayment = () => {
  return useMutation({
    mutationKey: ["payment"],
    mutationFn: async (payload: TCreatePayment) =>
      await makePaymentInit(payload),
    async onSuccess(data) {
      if (data?.success) {
        toast.success(data?.message || "Payment created successfully!");
      } else {
        toast.error(data?.message || "Failed to create payment!");
      }
    },
    onError(error) {
      toast.error(error?.message || "Failed to create payment!");
    },
  });
};
export const useGetAllPayment = (query: TFilterQuery[] | undefined) => {
  return useQuery({
    queryKey: ["payment", query],
    queryFn: async () => await getAllPayment(query),
  });
};
