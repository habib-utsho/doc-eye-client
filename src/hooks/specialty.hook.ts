import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  createSpecialty,
  getSpecialties,
  updateSpecialty,
} from "../services/specialty";
import { TFilterQuery } from "../types";

export const useCreateSpecialty = () => {
  return useMutation({
    mutationKey: ["specialty"],
    mutationFn: async (payload: FormData) => await createSpecialty(payload),
    async onSuccess(data) {
      if (data?.success) {
        toast.success(data?.message || "Specialty created successfully!");
      } else {
        toast.error(data?.message || "Failed to create specialty!");
      }
    },
    onError(error) {
      toast.error(error?.message || "Failed to create specialty!");
    },
  });
};
export const useUpdateSpecialty = () => {
  return useMutation({
    mutationKey: ["specialty"],
    mutationFn: async ({ id, payload }: { id: string; payload: FormData }) =>
      await updateSpecialty({ id, payload }),
    async onSuccess(data) {
      if (data?.success) {
        toast.success(data?.message || "Specialty updated successfully!");
      } else {
        toast.error(data?.message || "Failed to update specialty!");
      }
    },
    onError(error) {
      toast.error(error?.message || "Failed to update specialty!");
    },
  });
};

export const useGetAllSpecialties = (query: TFilterQuery[] | undefined) => {
  return useQuery({
    queryKey: ["specialty", query],
    queryFn: async () => await getSpecialties(query),
  });
};
