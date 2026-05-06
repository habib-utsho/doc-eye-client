import { TFilterQuery } from "@/src/types";

export const talkToDB = async (query: TFilterQuery[] | undefined) => {
    const fetchOption: RequestInit = {
        credentials: "include",
        cache: "no-store",
    };

    const params = new URLSearchParams();
    if (query) {
        query.forEach((element: TFilterQuery) => {
            params.append(element.name, element.value);
        });
    }

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/talk-to-db/?${params.toString()}`,
        fetchOption
    );

    if (!response.ok) {
        throw new Error("Failed to fetch analytics data");
    }

    return response.json();
};