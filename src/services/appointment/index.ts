"use server";

import axiosInstance from "@/src/lib/axiosInstance";
import { TFilterQuery } from "@/src/types";
import { revalidateTag } from "next/cache";

export const getAppointments = async (query: TFilterQuery[] | undefined) => {
  const fetchOption = {
    next: {
      tags: ["appointment"],
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
    `${process.env.NEXT_PUBLIC_BASE_URL}/appointment/?${params.toString()}`,
    fetchOption
  );
  return response.json();
};
export const getAppointmentById = async (id: string | undefined) => {
  const fetchOption = {
    next: {
      tags: ["appointment"],
      revalidate: 60,
    },
  };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/appointment/${id}`,
    fetchOption
  );
  return response.json();
};

export const updateAppointmentStatusById = async ({
  id,
  status,
}: {
  id: string;
  status: "confirmed" | "canceled" | "completed";
}) => {
  try {
    const response = await axiosInstance.patch(
      `/appointment/update-status/${id}`,
      { status }
    );
    revalidateTag("appointment");
    revalidateTag("stats");
    return response.data;
  } catch (e: any) {
    throw new Error(
      `${e?.response?.data?.errorSources?.[0]?.path &&
      `${e?.response?.data?.errorSources?.[0]?.path}:`
      } ${e.response?.data?.errorSources?.[0]?.message}` ||
      e?.response?.data ||
      e.message ||
      "Failed to update appointment status!"
    );
  }
};
