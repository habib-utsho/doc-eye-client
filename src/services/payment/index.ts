"use server";

import { TFilterQuery } from "@/src/types";
import { TCreateAppointment } from "@/src/types/appointment";
import { revalidateTag } from "next/cache";

export const makePaymentInit = async (payload: TCreateAppointment) => {
  try {
    const fetchOption = {
      method: "POST",
      body: JSON.stringify(payload),
    };
    console.log(
      `${process.env.NEXT_PUBLIC_BASE_URL}/payment`,
      "`${process.env.NEXT_PUBLIC_BASE_URL}/payment}`"
    );
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/payment`,
      fetchOption
    );
    revalidateTag("payment");
    if (!response.ok) {
      throw new Error("Failed to init payment!");
    }
    return response.json();
  } catch (e: any) {
    throw new Error(
      `${
        e?.response?.data?.errorSources?.[0]?.path &&
        `${e?.response?.data?.errorSources?.[0]?.path}:`
      } ${e.response?.data?.errorSources?.[0]?.message}` ||
        e?.response?.data ||
        e.message ||
        "Failed to init payment!"
    );
  }
};

export const getAllPayment = async (query: TFilterQuery[] | undefined) => {
  const fetchOption = {
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
