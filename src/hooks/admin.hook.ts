import { useMutation, useQuery } from "@tanstack/react-query";
import { TFilterQuery } from "../types";
import {
  deleteAdminById,
  getAdminById,
  getAllAdmin,
} from "../services/admin";
import { toast } from "sonner";
import axios from "axios";
import axiosInstance from "../lib/axiosInstance";

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
    mutationFn: async ({ id, payload }: { id: string; payload: FormData }) => {

      let res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/${id}`, {
        method: "PATCH",
        credentials: "include",
        body: payload,
      })
      let data = await res.json()
      return data
    },
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
