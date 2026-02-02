import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { TFilterQuery } from "../types";
import { createReview, deleteReview, getReviews, updateReview } from "../services/reviews";
import { TCreateReview } from "../types/review";

export const useCreateReview = () => {
    return useMutation({
        mutationKey: ["reviews"],
        mutationFn: async (payload: TCreateReview) => await createReview(payload),
        async onSuccess(data) {
            if (data?.success) {
                toast.success(data?.message || "Review created successfully!");
            } else {
                toast.error(data?.message || "Failed to create review!");
            }
        },
        onError(error) {
            toast.error(error?.message || "Failed to create review!");
        },
    });
};
export const useUpdateReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["reviews"],
        mutationFn: async ({ id, payload }: { id: string; payload: FormData }) =>
            await updateReview({ id, payload }),
        async onSuccess(data) {
            if (data?.success) {
                queryClient.invalidateQueries({
                    queryKey: ["reviews"],
                });
                toast.success(data?.message || "Review updated successfully!");
            } else {
                toast.error(data?.message || "Failed to update review!");
            }
        },
        onError(error) {
            toast.error(error?.message || "Failed to update review!");
        },
    });
};
export const useDeleteReview = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["reviews"],
        mutationFn: async (id: string) => await deleteReview(id),
        async onSuccess(data) {
            if (data?.success) {
                queryClient.invalidateQueries({
                    queryKey: ["reviews"],
                });
                toast.success(data?.message || "Review deleted successfully!");
            } else {
                toast.error(data?.message || "Failed to delete review!");
            }
        },
        onError(error) {
            toast.error(error?.message || "Failed to delete review!");
        },
    });
};

export const useGetAllReviews = (query: TFilterQuery[] | undefined) => {
    return useQuery({
        queryKey: ["reviews", query],
        queryFn: async () => await getReviews(query),
    });
};
