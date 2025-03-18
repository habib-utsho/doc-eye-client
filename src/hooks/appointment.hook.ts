import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getAppointmentById,
  getAppointments,
  updateAppointmentStatusById,
} from "../services/appointment";
import { TFilterQuery } from "../types";

export const useUpdateAppointmentStatusById = () => {
  return useMutation({
    mutationKey: ["appointment"],
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: "confirmed" | "canceled" | "completed";
    }) => await updateAppointmentStatusById({ id, status }),
    async onSuccess(data) {
      if (data?.success) {
        toast.success(
          data?.message || "Appointment status updated successfully!"
        );
      } else {
        toast.error(data?.message || "Failed to update appointment status!");
      }
    },
    onError(error) {
      toast.error(error?.message || "Failed to update appointment status!");
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
