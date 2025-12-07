"use server";

import { TFilterQuery } from "@/src/types";
import { cookies } from "next/headers";

export const getMessages = async (query: TFilterQuery[] | undefined) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("DEaccessToken")?.value;
    const fetchOption: RequestInit = {
        method: "GET",
        next: {
            tags: ["message"],
            revalidate: 0,
        },
        headers: {
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
    };
    const params = new URLSearchParams();
    if (query) {
        query.forEach((element: TFilterQuery) => {
            params.append(element.name, element.value);
        });
    }
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/message/?${params.toString()}`,
        fetchOption
    );
    return response.json();
};
