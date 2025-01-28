"use server";

import { TFilterQuery } from "@/src/types";
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
      throw new Error("Failed to get all admins!");
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
        "Failed to update specialty!"
    );
  }
};
