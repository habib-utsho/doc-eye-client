"use server";

import axiosInstance from "@/src/lib/axiosInstance";
import { TFilterQuery } from "@/src/types";
import { revalidateTag } from "next/cache";

export const getReviews = async (query: TFilterQuery[] | undefined) => {
    const fetchOption: RequestInit & { next?: { tags: string[] } } = {
        // cache: "no-store" as RequestCache,
        next: { tags: ["reviews"], revalidate: 60 },
    };
    const params = new URLSearchParams();
    if (query) {
        query.forEach((element: TFilterQuery) => {
            params.append(element.name, element.value);
        });
    }
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/review/?${params.toString()}`,
        fetchOption
    );
    return response.json();
};

export const createReview = async (payload: FormData) => {
    try {
        const response = await axiosInstance.post(`/review`, payload);
        revalidateTag("reviews");
        return response.data;
    } catch (e: unknown) {
        const error = e as any;
        const errorSource = error?.response?.data?.errorSources?.[0];
        const message = errorSource?.path
            ? `${errorSource.path}: ${errorSource.message}`
            : (errorSource?.message || error?.response?.data?.message || error.message || "Failed to create review!");
        throw new Error(message);
    }
};
export const updateReview = async ({
    id,
    payload,
}: {
    id: string;
    payload: FormData;
}) => {
    try {
        const response = await axiosInstance.patch(`/review/${id}`, payload);
        revalidateTag("reviews");
        return response.data;
    } catch (e: any) {
        const error = e as any;
        const errorSource = error?.response?.data?.errorSources?.[0];
        const message = errorSource?.path
            ? `${errorSource.path}: ${errorSource.message}`
            : (errorSource?.message || error?.response?.data?.message || error.message || "Failed to update review!");
        throw new Error(message);
    }
};
export const deleteReview = async (id: string) => {
    try {
        const response = await axiosInstance.delete(`/review/${id}`);
        revalidateTag("reviews");
        return response.data;
    } catch (e: any) {
        const error = e as any;
        const errorSource = error?.response?.data?.errorSources?.[0];
        const message = errorSource?.path
            ? `${errorSource.path}: ${errorSource.message}`
            : (errorSource?.message || error?.response?.data?.message || error.message || "Failed to delete review!");
        throw new Error(message);
    }
};