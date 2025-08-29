"use server";

import { TFilterQuery } from "@/src/types";
import { cache } from "react";

export const getMessages = async (query: TFilterQuery[] | undefined) => {
    const fetchOption = {
        next: {
            tags: ["message"],
            revalidate: 0,
            // cache: "no-store"
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
