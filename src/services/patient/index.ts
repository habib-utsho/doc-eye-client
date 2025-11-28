"use server";

import axiosInstance from "@/src/lib/axiosInstance";
import { TFilterQuery } from "@/src/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllPatient = async (query: TFilterQuery[] | undefined) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("DEaccessToken")?.value;
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
  } catch (e: unknown) {
    const error = e as any;
    const errorSource = error?.response?.data?.errorSources?.[0];
    const message = errorSource?.path
      ? `${errorSource.path}: ${errorSource.message}`
      : (errorSource?.message || error?.response?.data?.message || error.message || "Failed to get all patient!");
    throw new Error(message);
  }
};
export const getSinglePatient = async (id: string | null) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("DEaccessToken")?.value;
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
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/patient/${id}`,
      fetchOption
    );
    if (!res.ok) {
      throw new Error("Failed to get single patient!");
    }
    return res.json();
  } catch (e: unknown) {
    const error = e as any;
    const errorSource = error?.response?.data?.errorSources?.[0];
    const message = errorSource?.path
      ? `${errorSource.path}: ${errorSource.message}`
      : (errorSource?.message || error?.response?.data?.message || error.message || "Failed to get single patient!");
    throw new Error(message);
  }
};

export const updateFavoriteDoctors = async (
  payload: { doctorId: string }
) => {
  console.log(payload);
  try {
    const res = await axiosInstance.patch(
      `/patient/favorite-doctors`,
      payload);
    revalidateTag("doctor");
    revalidateTag("patient");
    return res.data;
  } catch (e: unknown) {
    const error = e as any;
    const errorSource = error?.response?.data?.errorSources?.[0];
    const message = errorSource?.path
      ? `${errorSource.path}: ${errorSource.message}`
      : (errorSource?.message || error?.response?.data?.message || error.message || "Failed to update favorite doctors!");
    throw new Error(message);
  }
};
export const makePatientAdmin = async (
  id: string | undefined,
) => {
  try {
    const res = await axiosInstance.patch(
      `/patient/make-patient-admin/${id}`,
    );

    revalidateTag("patient");
    revalidateTag("admin");
    return res.data;
  } catch (e: unknown) {
    const error = e as any;
    const errorSource = error?.response?.data?.errorSources?.[0];
    const message = errorSource?.path
      ? `${errorSource.path}: ${errorSource.message}`
      : (errorSource?.message || error?.response?.data?.message || error.message || "Failed to update a patient!");
    throw new Error(message);
  }
};

// update patient (Not used directly in client components due to cookies handling  )
export const updatePatientById = async (
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
      `${process.env.NEXT_PUBLIC_BASE_URL}/patient/${id}`,
      fetchOption
    );
    const response = await res.clone().json();
    if (res.ok && response?.success) {
      const newAccess = response?.accessToken;
      const newRefresh = response?.refreshToken;
      if (newAccess) cookieStore.set("DEaccessToken", newAccess);
      if (newRefresh) cookieStore.set("DErefreshToken", newRefresh);
    }
    revalidateTag("patient");
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

export const deletePatientById = async (id: string | undefined) => {
  try {

    const res = await axiosInstance.delete(
      `/patient/${id}`,
    );
    revalidateTag("patient");
    return res.data;
  } catch (e: unknown) {
    const error = e as any;
    const errorSource = error?.response?.data?.errorSources?.[0];
    const message = errorSource?.path
      ? `${errorSource.path}: ${errorSource.message}`
      : (errorSource?.message || error?.response?.data?.message || error.message || "Failed to delete a patient!");
    throw new Error(message);
  }
};
