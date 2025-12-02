"use server";

import { TFilterQuery } from "@/src/types";
import { TUserRole } from "@/src/types/user";
import { cookies } from "next/headers";

export const getStats = async (role: TUserRole | undefined) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("DEaccessToken")?.value;


  const fetchOption = {
    headers: {
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    next: {
      tags: ["stats"],
      revalidate: 60,
    },
  };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/stats/${role}`,
    fetchOption
  );

  return response.json();
};
export const getEarnings = async (query: TFilterQuery[] | undefined) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("DEaccessToken")?.value;


  const fetchOption = {
    headers: {
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    next: {
      tags: ["earnings"],
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
    `${process.env.NEXT_PUBLIC_BASE_URL}/stats/earnings/?${params.toString()}`,
    fetchOption
  );

  return response.json();
};