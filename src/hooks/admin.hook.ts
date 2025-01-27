import { useQuery } from "@tanstack/react-query";
import { TFilterQuery } from "../types";
import { getAllAdmin } from "../services/admin";

export const useGetAllAdmin = (query: TFilterQuery[] | undefined) =>
  useQuery({
    queryKey: ["admin", query],
    queryFn: () => getAllAdmin(query),
  });
