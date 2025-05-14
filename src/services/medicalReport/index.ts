"use server";

import axiosInstance from "@/src/lib/axiosInstance";
import { TFilterQuery } from "@/src/types";
import { TCreateMedicalReport } from "@/src/types/medicalReport.type";
import { revalidateTag } from "next/cache";

export const createMedicalReport = async (payload: TCreateMedicalReport) => {
  try {
    const response = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/medical-report`,
      payload
    );
    revalidateTag("medicalReport");
    return response.data;
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
export const getAllMedicalReport = async (
  query: TFilterQuery[] | undefined
) => {
  const fetchOption = {
    next: {
      tags: ["medicalReport"],
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
    `${process.env.NEXT_PUBLIC_BASE_URL}/medical-report/?${params.toString()}`,
    fetchOption
  );
  return response.json();
};
export const getSingleMedicalReportById = async (id: string | undefined) => {
  const fetchOption = {
    next: {
      tags: ["medicalReport"],
      revalidate: 60,
    },
  };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/medical-report/${id}`,
    fetchOption
  );
  return response.json();
};
