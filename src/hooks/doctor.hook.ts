import { useMutation, useQuery } from "@tanstack/react-query";
import { TFilterQuery } from "../types";
import {
  deleteDoctorById,
  getAllDoctors,
  getDoctorByDoctorCode,
  getDoctorById,
  updateDoctorById,
} from "../services/doctor";
import { toast } from "sonner";

export const useGetAllDoctors = (query: TFilterQuery[] | undefined) =>
  useQuery({
    queryKey: ["doctor", query],
    queryFn: () => getAllDoctors(query),
  });
export const useGetDoctorById = (id: string | undefined) =>
  useQuery({
    queryKey: ["doctor", id],
    queryFn: () => getDoctorById(id),
  });
export const useGetDoctorByDoctorCode = (id: string | null) =>
  useQuery({
    queryKey: ["doctor", id],
    queryFn: () => getDoctorByDoctorCode(id),
  });

export const useUpdateDoctorById = () =>
  useMutation({
    mutationKey: ["doctor"],
    mutationFn: async ({ id, payload }: { id: string; payload: FormData }) => {
      let res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/doctor/${id}`, {
        method: "PATCH",
        credentials: "include",
        body: payload,
      })
      let data = await res.json()
      return data
    },
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
