"use server";

import { TFilterQuery } from "@/src/types";

export const getAllAdmin = async (query: TFilterQuery[] | undefined) => {
  try {
    const fetchOption = {
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
    const res = await fetch(`/admin?${params.toString()}`, fetchOption);
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
