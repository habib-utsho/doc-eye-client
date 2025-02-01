import { useMutation, useQuery } from "@tanstack/react-query";
import { TFilterQuery } from "../types";
import {
  deleteDoctorById,
  getAllDoctors,
  updateDoctorById,
} from "../services/doctor";
import { toast } from "sonner";

export const useGetAllDoctors = (query: TFilterQuery[] | undefined) =>
  useQuery({
    queryKey: ["doctor", query],
    queryFn: () => getAllDoctors(query),
  });

export const useUpdateDoctorById = (id: string, payload: FormData) =>
  useMutation({
    mutationKey: ["doctor"],
    mutationFn: () => updateDoctorById(id, payload),
    onSuccess(data) {
      if (data?.success) {
        toast.success(data?.message || "Doctor updated successfully!");
      } else {
        toast.error(data?.message || "Failed to update doctor!");
      }
    },
    onError(error) {
      toast.error(error?.message || "Failed to update doctor!");
    },
  });

export const useDeleteDoctorById = () =>
  useMutation({
    mutationKey: ["doctor"],
    mutationFn: (id: string) => deleteDoctorById(id),
    onSuccess(data) {
      if (data?.success) {
        toast.success(data?.message || "Doctor deleted successfully!");
      } else {
        toast.error(data?.message || "Failed to delete doctor!");
      }
    },
    onError(error) {
      toast.error(error?.message || "Failed to delete doctor!");
    },
  });
