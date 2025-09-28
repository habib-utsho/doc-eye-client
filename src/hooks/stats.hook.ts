import { useMutation, useQuery } from "@tanstack/react-query";
import { getStats } from "../services/stats";
import { TUserRole } from "../types/user";

export const useGetStats = (role: TUserRole | undefined) => {
  return useQuery({
    queryKey: ["stats", role],
    queryFn: async () => await getStats(role),
  });
};