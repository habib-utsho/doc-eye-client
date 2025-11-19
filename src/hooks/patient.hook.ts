import { useMutation, useQuery } from "@tanstack/react-query";
import { TFilterQuery } from "../types";
import {
  deletePatientById,
  getAllPatient,
  getSinglePatient,
  makePatientAdmin,
  updateFavoriteDoctors,
} from "../services/patient";
import { toast } from "sonner";

export const useGetAllPatients = (query: TFilterQuery[] | undefined) =>
  useQuery({
    queryKey: ["patient", query],
    queryFn: () => getAllPatient(query),
  });

export const useGetPatientById = (id: string | null) =>
  useQuery({
    queryKey: ["patient", id],
    queryFn: () => getSinglePatient(id),
  });

export const useMakePatientAdmin = () =>
  useMutation({
    mutationKey: ["patient"],
    mutationFn: (id: string) =>
      makePatientAdmin(id),
    // onSuccess(data) {
    //   if (data?.success) {
    //     toast.success(data?.message || "Patient promoted to admin successfully!");
    //   } else {
    //     toast.error(data?.message || "Failed to update patient!");
    //   }
    // },
    // onError(error) {
    //   toast.error(error?.message || "Failed to update patient!");
    // },
  });


// const getCookie = (name: string) => {
//   const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
//   if (match) return match[2];
//   return null;
// };

export const useUpdatePatientById = () =>
  useMutation({
    mutationKey: ["patient"],
    // mutationFn: 
    // ({ id, payload }: { id: string; payload: FormData }) =>
    //   updatePatientById(id, payload),

    mutationFn: async ({ id, payload }: { id: string; payload: FormData }) => {

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/patient/${id}`, {
        method: "PATCH",
        credentials: "include",
        body: payload,
      })
      const data = await res.json()
      return data
    },
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
export const useUpdateFavoriteDoctors = () =>
  useMutation({
    mutationKey: ["patient"],
    mutationFn: (payload: { doctorId: string }) =>
      updateFavoriteDoctors(payload),
    onSuccess(data) {
      if (data?.success) {
        toast.success(data?.message || "Favorite doctors updated successfully!");
      } else {
        toast.error(data?.message || "Failed to update favorite doctors!");
      }
    },
    onError(error) {
      toast.error(error?.message || "Failed to update favorite doctors!");
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
