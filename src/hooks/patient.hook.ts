import { useMutation, useQuery } from "@tanstack/react-query";
import { TFilterQuery } from "../types";
import {
  deletePatientById,
  getAllPatient,
  updatePatientById,
} from "../services/patient";
import { toast } from "sonner";

export const useGetAllPatients = (query: TFilterQuery[] | undefined) =>
  useQuery({
    queryKey: ["patient", query],
    queryFn: () => getAllPatient(query),
  });

export const useUpdatePatientById = () =>
  useMutation({
    mutationKey: ["patient"],
    mutationFn: ({ id, payload }: { id: string; payload: FormData }) =>
      updatePatientById(id, payload),
    onSuccess(data) {
      if (data?.success) {
        toast.success(data?.message || "Patient updated successfully!");
      } else {
        toast.error(data?.message || "Failed to update patient!");
      }
    },
    onError(error) {
      toast.error(error?.message || "Failed to update patient!");
    },
  });

export const useDeletePatientById = () =>
  useMutation({
    mutationKey: ["patient"],
    mutationFn: (id: string) => deletePatientById(id),
    onSuccess(data) {
      if (data?.success) {
        toast.success(data?.message || "Patient deleted successfully!");
      } else {
        toast.error(data?.message || "Failed to delete patient!");
      }
    },
    onError(error) {
      toast.error(error?.message || "Failed to delete patient!");
    },
  });
