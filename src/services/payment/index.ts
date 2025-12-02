"use server";

import axiosInstance from "@/src/lib/axiosInstance";
import { TFilterQuery } from "@/src/types";
import { TCreateAppointment } from "@/src/types/appointment";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const makePaymentInit = async (payload: TCreateAppointment) => {
  try {
    const response = await axiosInstance.post(`/payment-gateway/init`, payload);
    revalidateTag("payment");
    revalidateTag("appointment");
    revalidateTag("doctor");
    revalidateTag("stats");
    revalidateTag("earnings");
    return response.data;
  } catch (e: unknown) {
    const error = e as any;
    const errorSource = error?.response?.data?.errorSources?.[0];
    const message = errorSource?.path
      ? `${errorSource.path}: ${errorSource.message}`
      : (errorSource?.message || error?.response?.data?.message || error.message || "Failed to init payment!");
    throw new Error(message);
  }
};

export const getAllPayment = async (query: TFilterQuery[] | undefined) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("DEaccessToken")?.value;
  const fetchOption = {
    headers: {
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    next: {
      tags: ["payment"],
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
    `${process.env.NEXT_PUBLIC_BASE_URL}/payment/?${params.toString()}`,
    fetchOption
  );
  return response.json();
};
