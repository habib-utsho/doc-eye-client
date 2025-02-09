"use server";

import { TFilterQuery } from "@/src/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllPatient = async (query: TFilterQuery[] | undefined) => {
  const accessToken = cookies().get("DEaccessToken")?.value;
  try {
    const fetchOption: RequestInit = {
      headers: {
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      next: {
        tags: ["patient"],
        revalidate: 60,
      },
    };
    const params = new URLSearchParams();
    if (query) {
      query.forEach((elem) => {
        params.append(elem.name, elem.value);
      });
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/patient?${params.toString()}`,
      fetchOption
    );
    if (!res.ok) {
      throw new Error("Failed to get all patient!");
    }
    return res.json();
  } catch (e: any) {
    throw new Error(
      `${
        e?.response?.data?.errorSources?.[0]?.path &&
        `${e?.response?.data?.errorSources?.[0]?.path}:`
      } ${e.response?.data?.errorSources?.[0]?.message}` ||
        e?.response?.data ||
        e.message ||
        "Failed to get all patient!"
    );
  }
};

export const updatePatientById = async (
  id: string | undefined,
  payload: FormData
) => {
  const accessToken = cookies().get("DEaccessToken")?.value;
  try {
    const fetchOption: RequestInit = {
      method: "PATCH",
      headers: {
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      body: payload,
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/patient/${id}`,
      fetchOption
    );
    if (!res.ok) {
      throw new Error("Failed to update a patient!");
    }
    revalidateTag("patient");
    return res.json();
  } catch (e: any) {
    throw new Error(
      `${
        e?.response?.data?.errorSources?.[0]?.path &&
        `${e?.response?.data?.errorSources?.[0]?.path}:`
      } ${e.response?.data?.errorSources?.[0]?.message}` ||
        e?.response?.data ||
        e.message ||
        "Failed to update a patient!"
    );
  }
};

export const deletePatientById = async (id: string | undefined) => {
  const accessToken = cookies().get("DEaccessToken")?.value;
  try {
    const fetchOption: RequestInit = {
      method: "DELETE",
      headers: {
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/patient/${id}`,
      fetchOption
    );
    if (!res.ok) {
      throw new Error("Failed to delete a patient!");
    }
    revalidateTag("patient");
    return res.json();
  } catch (e: any) {
    throw new Error(
      `${
        e?.response?.data?.errorSources?.[0]?.path &&
        `${e?.response?.data?.errorSources?.[0]?.path}:`
      } ${e.response?.data?.errorSources?.[0]?.message}` ||
        e?.response?.data ||
        e.message ||
        "Failed to delete a patient!"
    );
  }
};
