import { useMutation, useQuery } from "@tanstack/react-query";
import { TFilterQuery } from "../types";
import {
  deleteAdminById,
  getAdminById,
  getAllAdmin,
  updateAdminById,
} from "../services/admin";
import { toast } from "sonner";

export const useGetAllAdmin = (query: TFilterQuery[] | undefined) =>
  useQuery({
    queryKey: ["admin", query],
    queryFn: () => getAllAdmin(query),
  });
export const useGetAdminById = (id: string | null) =>
  useQuery({
    queryKey: ["admin", id],
    queryFn: () => getAdminById(id),
  });

export const useUpdateAdminById = () =>
  useMutation({
    mutationKey: ["admin"],
    mutationFn: ({ id, payload }: { id: string; payload: FormData }) =>
      updateAdminById(id, payload),
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
