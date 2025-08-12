"use server";

import axiosInstance from "@/src/lib/axiosInstance";
import { TFilterQuery } from "@/src/types";
import { TCreateAppointment } from "@/src/types/appointment";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const makePaymentInit = async (payload: TCreateAppointment) => {
  try {
    const response = await axiosInstance.post(`/payment`, payload);
    revalidateTag("payment");
    revalidateTag("appointment");
    revalidateTag("doctor");
    return response.data;
  } catch (e: any) {
    throw new Error(
      `${e?.response?.data?.errorSources?.[0]?.path &&
      `${e?.response?.data?.errorSources?.[0]?.path}:`
      } ${e.response?.data?.errorSources?.[0]?.message}` ||
      e?.response?.data ||
      e.message ||
      "Failed to init payment!"
    );
  }
};

export const getAllPayment = async (query: TFilterQuery[] | undefined) => {
  const accessToken = cookies().get("DEaccessToken")?.value;
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
