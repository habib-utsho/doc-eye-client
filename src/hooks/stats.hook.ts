import { useQuery } from "@tanstack/react-query";
import { getEarnings, getStats } from "../services/stats";
import { TUserRole } from "../types/user";
import { TFilterQuery } from "../types";

export const useGetStats = (role: TUserRole | undefined) => {
  return useQuery({
    queryKey: ["stats", role],
    queryFn: async () => await getStats(role),
  });
};

export const useGetEarnings = (query: TFilterQuery[] | undefined) => {
  return useQuery({
    queryKey: ["earnings", query],
    queryFn: async () => await getEarnings(query),
  });
};