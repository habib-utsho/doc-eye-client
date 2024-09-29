"use server";

import axiosInstance from "@/src/lib/axiosInstance";
import { revalidateTag } from "next/cache";

export const getSpecialty = async () => {
  const fetchOption = {
    next: {
      tags: ["specialty"],
    },
  };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/specialty`,
    fetchOption
  );
  return response.json();
};

export const createSpecialty = async (payload: FormData) => {
  try {
    const response = await axiosInstance.post(`/specialty`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    revalidateTag("specialty");
    return response.data;
  } catch (e: any) {
    throw new Error(
      e.response?.data?.message || e.message || "Failed to create specialty!"
    );
  }
};
