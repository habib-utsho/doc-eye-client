"use server";

import { TFilterQuery } from "@/src/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllDoctors = async (query: TFilterQuery[] | undefined) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("DEaccessToken")?.value;
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
    // if (!res.ok) {
    //   throw new Error("Failed to get all doctors!");
    // }
    return res.json();
  } catch (e: unknown) {
    const error = e as any;
    const errorSource = error?.response?.data?.errorSources?.[0];
    const prefix = errorSource?.path ? `${errorSource.path}: ` : "";
    const message =
      prefix +
      (errorSource?.message ?? error?.response?.data ?? error.message ?? "Failed to get all doctors!");
    throw new Error(message);
  }
};
export const getDoctorById = async (id: string | undefined) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("DEaccessToken")?.value;
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
  } catch (e: unknown) {
    const error = e as any;
    const errorSource = error?.response?.data?.errorSources?.[0];
    const message = errorSource?.path
      ? `${errorSource.path}: ${errorSource.message}`
      : (errorSource?.message || error?.response?.data?.message || error.message || "Failed to get doctor!");
    throw new Error(message);
  }
};
export const getDoctorByDoctorCode = async (id: string | null) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("DEaccessToken")?.value;
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
  } catch (e: unknown) {
    const error = e as any;
    const errorSource = error?.response?.data?.errorSources?.[0];
    const message = errorSource?.path
      ? `${errorSource.path}: ${errorSource.message}`
      : (errorSource?.message || error?.response?.data?.message || error.message || "Failed to get doctor!");
    throw new Error(message);
  }
};

export const updateDoctorById = async (
  id: string | undefined,
  payload: FormData
) => {


  const cookieStore = await cookies();
  const accessToken = cookieStore.get("DEaccessToken")?.value;
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

    const response = await res.clone().json();
    if (res.ok && response?.success) {
      const newAccess = response?.accessToken;
      const newRefresh = response?.refreshToken;
      if (newAccess) cookieStore.set("DEaccessToken", newAccess);
      if (newRefresh) cookieStore.set("DErefreshToken", newRefresh);
    }

    revalidateTag("doctor");
    return res.json();
  } catch (e: any) {
    const error = e as any;
    const errorSource = error?.response?.data?.errorSources?.[0];
    const message = errorSource?.path
      ? `${errorSource.path}: ${errorSource.message}`
      : (errorSource?.message || error?.response?.data?.message || error.message || "Failed to update doctor!");
    throw new Error(message);
  }
};

export const deleteDoctorById = async (id: string | undefined) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("DEaccessToken")?.value;
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
  } catch (e: unknown) {
    const error = e as any;
    const errorSource = error?.response?.data?.errorSources?.[0];
    const message = errorSource?.path
      ? `${errorSource.path}: ${errorSource.message}`
      : (errorSource?.message || error?.response?.data?.message || error.message || "Failed to delete a doctor!");
    throw new Error(message);
  }
};
