import { useQuery } from "@tanstack/react-query";
import { talkToDB } from "../services/talk-to-db";
import { TFilterQuery } from "../types";

export const useTalkToDB = (
    query: TFilterQuery[] | undefined,
    enabled: boolean = true
) => {
    return useQuery({
        queryKey: ["talk-to-db", query],
        queryFn: async () => await talkToDB(query),
        enabled,
    });
};