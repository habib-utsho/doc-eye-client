import { useMutation, useQuery } from "@tanstack/react-query";
import { TFilterQuery } from "../types";
import {
  deleteAdminById,
  getAllAdmin,
  updateAdminById,
} from "../services/admin";
import { toast } from "sonner";

export const useGetAllAdmin = (query: TFilterQuery[] | undefined) =>
  useQuery({
    queryKey: ["admin", query],
    queryFn: () => getAllAdmin(query),
  });

export const useUpdateAdminById = (id: string, payload: FormData) =>
  useMutation({
    mutationKey: ["admin"],
    mutationFn: () => updateAdminById(id, payload),
    onSuccess(data) {
      if (data?.success) {
        toast.success(data?.message || "Admin updated successfully!");
      } else {
        toast.error(data?.message || "Failed to update admin!");
      }
    },
    onError(error) {
      toast.error(error?.message || "Failed to update admin!");
    },
  });

export const useDeleteAdminById = () =>
  useMutation({
    mutationKey: ["admin"],
    mutationFn: (id: string) => deleteAdminById(id),
    onSuccess(data) {
      if (data?.success) {
        toast.success(data?.message || "Admin deleted successfully!");
      } else {
        toast.error(data?.message || "Failed to delete admin!");
      }
    },
    onError(error) {
      toast.error(error?.message || "Failed to delete admin!");
    },
  });
