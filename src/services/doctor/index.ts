"use server";

import { TFilterQuery } from "@/src/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllDoctors = async (query: TFilterQuery[] | undefined) => {
  const accessToken = cookies().get("DEaccessToken")?.value;
  try {
    const fetchOption: RequestInit = {
      headers: {
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      next: {
        tags: ["doctor"],
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
      `${process.env.NEXT_PUBLIC_BASE_URL}/doctor?${params.toString()}`,
      fetchOption
    );
    if (!res.ok) {
      throw new Error("Failed to get all doctors!");
    }
    return res.json();
  } catch (e: any) {
    console.log(e.message, "from server action");
    throw new Error(
      `${
        e?.response?.data?.errorSources?.[0]?.path &&
        `${e?.response?.data?.errorSources?.[0]?.path}:`
      } ${e.response?.data?.errorSources?.[0]?.message}` ||
        e?.response?.data ||
        e.message ||
        "Failed to get all doctors!"
    );
  }
};
export const getDoctorById = async (id: string | undefined) => {
  const accessToken = cookies().get("DEaccessToken")?.value;
  try {
    const fetchOption: RequestInit = {
      headers: {
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      next: {
        tags: ["doctor"],
        revalidate: 60,
      },
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/doctor/${id}`,
      fetchOption
    );
    if (!res.ok) {
      throw new Error("Failed to get doctor!");
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
        "Failed to get doctor!"
    );
  }
};
export const getDoctorByDoctorCode = async (id: string | undefined) => {
  const accessToken = cookies().get("DEaccessToken")?.value;
  try {
    const fetchOption: RequestInit = {
      headers: {
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      next: {
        tags: ["doctor"],
        revalidate: 60,
      },
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/doctor/doctor-code/${id}`,
      fetchOption
    );
    if (!res.ok) {
      throw new Error("Failed to get doctor!");
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
        "Failed to get doctor!"
    );
  }
};

export const updateDoctorById = async (
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
      `${process.env.NEXT_PUBLIC_BASE_URL}/doctor/${id}`,
      fetchOption
    );
    if (!res.ok) {
      throw new Error("Failed to update a doctor!");
    }
    revalidateTag("doctor");
    return res.json();
  } catch (e: any) {
    throw new Error(
      `${
        e?.response?.data?.errorSources?.[0]?.path &&
        `${e?.response?.data?.errorSources?.[0]?.path}:`
      } ${e.response?.data?.errorSources?.[0]?.message}` ||
        e?.response?.data ||
        e.message ||
        "Failed to update a doctor!"
    );
  }
};

export const deleteDoctorById = async (id: string | undefined) => {
  const accessToken = cookies().get("DEaccessToken")?.value;
  try {
    const fetchOption: RequestInit = {
      method: "DELETE",
      headers: {
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/doctor/${id}`,
      fetchOption
    );
    if (!res.ok) {
      throw new Error("Failed to delete a doctor!");
    }
    revalidateTag("doctor");
    return res.json();
  } catch (e: any) {
    throw new Error(
      `${
        e?.response?.data?.errorSources?.[0]?.path &&
        `${e?.response?.data?.errorSources?.[0]?.path}:`
      } ${e.response?.data?.errorSources?.[0]?.message}` ||
        e?.response?.data ||
        e.message ||
        "Failed to delete a doctor!"
    );
  }
};
