import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getAppointmentById,
  getAppointments,
  updateAppointment,
} from "../services/appointment";
import { TFilterQuery } from "../types";
import { TCreateAppointment } from "../types/appointment";

export const useUpdateAppointment = () => {
  return useMutation({
    mutationKey: ["appointment"],
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<TCreateAppointment>;
    }) => await updateAppointment({ id, payload }),
    async onSuccess(data) {
      if (data?.success) {
        toast.success(data?.message || "Appointment updated successfully!");
      } else {
        toast.error(data?.message || "Failed to update appointment!");
      }
    },
    onError(error) {
      toast.error(error?.message || "Failed to update appointment!");
    },
  });
};

export const useGetAppointmentById = (id: string | undefined) => {
  return useQuery({
    queryKey: ["appointment", id],
    queryFn: async () => await getAppointmentById(id),
  });
};

export const useGetAllAppointments = (query: TFilterQuery[] | undefined) => {
  return useQuery({
    queryKey: ["appointment", query],
    queryFn: async () => await getAppointments(query),
  });
};
