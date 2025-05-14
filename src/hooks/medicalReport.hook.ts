import { useMutation, useQuery } from "@tanstack/react-query";
import { TFilterQuery } from "../types";
import {
  createMedicalReport,
  getAllMedicalReport,
  getSingleMedicalReportById,
} from "../services/medicalReport";
import { TCreateMedicalReport } from "../types/medicalReport.type";

export const useCreateMedicalReport = () => {
  return useMutation({
    mutationKey: ["medicalReport"],
    mutationFn: async (payload: TCreateMedicalReport) =>
      await createMedicalReport(payload),
    async onSuccess(data) {},
    onError(error) {},
  });
};
export const useGetAllMedicalReport = (query: TFilterQuery[] | undefined) =>
  useQuery({
    queryKey: ["medicalReport", query],
    queryFn: () => getAllMedicalReport(query),
  });

export const useGetSingleMedicalReportById = (id: string | undefined) => {
  return useQuery({
    queryKey: ["medicalReport", id],
    queryFn: async () => await getSingleMedicalReportById(id),
  });
};
