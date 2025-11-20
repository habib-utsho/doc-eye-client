"use server";

import { TFilterQuery } from "@/src/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllAdmin = async (query: TFilterQuery[] | undefined) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("DEaccessToken")?.value;
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
    return res.json();
  } catch (e: unknown) {
    const error = e as any;
    const errorSource = error?.response?.data?.errorSources?.[0];
    const message = errorSource?.path
      ? `${errorSource.path}: ${errorSource.message}`
      : (errorSource?.message || error?.response?.data?.message || error.message || "Failed to get all admin!");
    throw new Error(message);
  }
};

export const getAdminById = async (id: string | null) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("DEaccessToken")?.value;
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
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/${id}`,
      fetchOption
    );
    return res.json();
  } catch (e: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const error = e as any;
    const errorSource = error?.response?.data?.errorSources?.[0];
    const message = errorSource?.path
      ? `${errorSource.path}: ${errorSource.message}`
      : (errorSource?.message || error?.response?.data?.message || error.message || "Failed to get single admin!");
    throw new Error(message);
  }
};
// export const updateAdminById = async (
//   id: string | undefined,
//   payload: FormData
// ) => {
//   const cookieStore = await cookies();
//   const accessToken = cookieStore.get("DEaccessToken")?.value;
//   try {
//     const fetchOption: RequestInit = {
//       method: "PATCH",
//       headers: {
//         ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
//       },
//       body: payload,
//     };
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/admin/${id}`,
//       fetchOption
//     );
//     revalidateTag("admin");
//     return res.json();
//   } catch (e: any) {
//     throw new Error(
//       `${e?.response?.data?.errorSources?.[0]?.path &&
//       `${e?.response?.data?.errorSources?.[0]?.path}:`
//       } ${e.response?.data?.errorSources?.[0]?.message}` ||
//       e?.response?.data ||
//       e.message ||
//       "Failed to delete an admin!"
//     );
//   }
// };
export const deleteAdminById = async (id: string | undefined) => {
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
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/${id}`,
      fetchOption
    );
    revalidateTag("admin");
    return res.json();
  } catch (e: unknown) {
    const error = e as any;
    const errorSource = error?.response?.data?.errorSources?.[0];
    const message = errorSource?.path
      ? `${errorSource.path}: ${errorSource.message}`
      : (errorSource?.message || error?.response?.data?.message || error.message || "Failed to delete an admin!");
    throw new Error(message);
  }
};
