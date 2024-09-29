import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createSpecialty } from "../services/specialty";

export const useCreateSpecialty = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["specialty"],
    mutationFn: async (payload: FormData) => await createSpecialty(payload),
    async onSuccess(data) {
      if (data?.success) {
        toast.success(data?.message || "Specialty created successfully!");
        router.push("/specialty");
      } else {
        toast.error(data?.message || "Failed to create specialty!");
      }
    },
    onError(error) {
      toast.error(error?.message || "Failed to create specialty!");
    },
  });
};
