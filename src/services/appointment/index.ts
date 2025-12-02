"use server";

import axiosInstance from "@/src/lib/axiosInstance";
import { TFilterQuery } from "@/src/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAppointments = async (query: TFilterQuery[] | undefined) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("DEaccessToken")?.value;
  const fetchOption = {
    headers: {
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
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
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("DEaccessToken")?.value;
  const fetchOption = {
    headers: {
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
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
    revalidateTag("earnings");
    return response.data;
  } catch (e: unknown) {
    const error = e as any;
    const errorSource = error?.response?.data?.errorSources?.[0];
    const message = errorSource?.path
      ? `${errorSource.path}: ${errorSource.message}`
      : (errorSource?.message || error?.response?.data?.message || error.message || "Failed to update appointment status!");
    throw new Error(message);
  }
};
