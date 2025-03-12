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
    async onSuccess(data) {},
    onError(error) {},
  });
};
export const useGetAllPayment = (query: TFilterQuery[] | undefined) => {
  return useQuery({
    queryKey: ["payment", query],
    queryFn: async () => await getAllPayment(query),
  });
};
