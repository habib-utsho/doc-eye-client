"use server";

import { TFilterQuery } from "@/src/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllAdmin = async (query: TFilterQuery[] | undefined) => {
  const accessToken = cookies().get("DEaccessToken")?.value;
  try {
    const fetchOption: RequestInit = {
      headers: {
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      next: {
        tags: ["admin"],
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
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin?${params.toString()}`,
      fetchOption
    );
    if (!res.ok) {
      throw new Error("Failed to get all admin!");
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
        "Failed to get all admin!"
    );
  }
};
export const updateAdminById = async (
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
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/${id}`,
      fetchOption
    );
    if (!res.ok) {
      throw new Error("Failed to update an admin!");
    }
    revalidateTag("admin");
    return res.json();
  } catch (e: any) {
    throw new Error(
      `${
        e?.response?.data?.errorSources?.[0]?.path &&
        `${e?.response?.data?.errorSources?.[0]?.path}:`
      } ${e.response?.data?.errorSources?.[0]?.message}` ||
        e?.response?.data ||
        e.message ||
        "Failed to delete an admin!"
    );
  }
};
export const deleteAdminById = async (id: string | undefined) => {
  const accessToken = cookies().get("DEaccessToken")?.value;
  try {
    const fetchOption: RequestInit = {
      method: "DELETE",
      headers: {
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/${id}`,
      fetchOption
    );
    if (!res.ok) {
      throw new Error("Failed to delete an admin!");
    }
    revalidateTag("admin");
    return res.json();
  } catch (e: any) {
    throw new Error(
      `${
        e?.response?.data?.errorSources?.[0]?.path &&
        `${e?.response?.data?.errorSources?.[0]?.path}:`
      } ${e.response?.data?.errorSources?.[0]?.message}` ||
        e?.response?.data ||
        e.message ||
        "Failed to delete an admin!"
    );
  }
};
