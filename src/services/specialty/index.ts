"use server";

import axiosInstance from "@/src/lib/axiosInstance";
import { TFilterQuery } from "@/src/types";
import { revalidateTag } from "next/cache";

export const getSpecialties = async (query: TFilterQuery[] | undefined) => {
  const fetchOption = {
    next: {
      tags: ["specialty"],
      revalidate: 60,
    },
  };
  const params = new URLSearchParams();
  if (query) {
    query.forEach((element: TFilterQuery) => {
      params.append(element.name, element.value);
    });
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/specialty/?${params.toString()}`,
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
      `${
        e?.response?.data?.errorSources?.[0]?.path &&
        `${e?.response?.data?.errorSources?.[0]?.path}:`
      } ${e.response?.data?.errorSources?.[0]?.message}` ||
        e?.response?.data ||
        e.message ||
        "Failed to register doctor!"
    );
  }
};
