import { useQuery } from "@tanstack/react-query";
import { TFilterQuery } from "../types";
import { getMessages } from "../services/message";

// Get all messages
export const useGetAllMessages = (query: TFilterQuery[] | undefined) => {
  return useQuery({
    queryKey: ["message", query],
    queryFn: async () => await getMessages(query),
  });
};
