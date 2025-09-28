"use client";
import React, { useState } from "react";
import { Input } from "@heroui/input";
import Image from "next/image";
import moment from "moment";
import { SearchIcon } from "@/src/components/ui/icons";
import DETable from "../DETable";
import useDebounce from "@/src/hooks/useDebounce";
import useUserData from "@/src/hooks/user.hook";
import { firstLetterCapital } from "@/src/utils/firstLetterCapital";
import { useGetAllMedicalReport } from "@/src/hooks/medicalReport.hook";
import { TUserRole } from "@/src/types/user";

const ConsultationHistories = ({ from }: { from: TUserRole }) => {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearch = useDebounce(searchTerm, 500);

  const { isLoading: isLoadingUser, user } = useUserData();

  const { data: consultationHistory, isLoading: isLoadingConsultationHistory } =
    useGetAllMedicalReport([
      {
        name: user?.role === "doctor" ? "doctor" : "patient",
        value: user?._id,
      },
      { name: "searchTerm", value: debounceSearch },
      { name: "page", value: pagination.page },
      { name: "limit", value: pagination.limit },
    ]);

  const rows = consultationHistory?.data?.map(
    (history: any, index: number) => ({
      _id: history?._id,
      sl: index + 1,
      doctorInfo: (
        <div className="flex items-center gap-1">
          <Image
            src={history?.doctor?.profileImg}
            width={60}
            height={60}
            alt={history?.doctor?.name}
            className="rounded-full h-[60px] w-[60px]"
          />
          <div>
            {history?.doctor?.name} ({history?.doctor?.doctorTitle})
          </div>
        </div>
      ),
      patientInfo: (
        <div className="flex items-center gap-1">
          <Image
            src={history?.patient?.profileImg}
            width={50}
            height={50}
            alt={history?.patient?.name}
            className="rounded-full h-[50px] w-[50px]"
          />
          <div>{history?.patient?.name}</div>
        </div>
      ),
      appointmentType: firstLetterCapital(
        history?.appointment?.appointmentType
      ),
      problems: history?.problems?.join(", ") || "N/A",
      diagnosis: history?.diagnosis || "N/A",
      followUp: history?.followUpDate
        ? moment(history?.followUpDate).format("DD-MMM-YYYY")
        : "N/A",
      schedule: moment(history?.appointment?.schedule).format(
        "DD-MMM-YYYY ⏰ hh:mm A"
      ),
      createdAt: moment(history?.createdAt).format("DD-MMM-YYYY ⏰ hh:mm A"),
    })
  );

  const columns = [
    { key: "sl", label: "SL" },
    { key: "doctorInfo", label: "Doctor" },
    { key: "patientInfo", label: "Patient" },
    { key: "appointmentType", label: "Type" },
    { key: "problems", label: "Problems" },
    { key: "diagnosis", label: "Diagnosis" },
    { key: "schedule", label: "Schedule" },
    { key: "followUp", label: "Follow-up Date" },
    { key: "createdAt", label: "Created At" },
  ];

  console.log({
    consultationHistory,
    isLoadingConsultationHistory,
    isLoadingUser,
  });

  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center mb-4 xl:mb-6 gap-4">
        <div className="flex items-center gap-2">
          <Input
            name="search"
            startContent={<SearchIcon />}
            placeholder="Search consultation history..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            isClearable
            onClear={() => setSearchTerm("")}
          />
        </div>
      </div>

      <DETable
        data={consultationHistory}
        isLoading={isLoadingConsultationHistory || isLoadingUser}
        columns={columns}
        rows={rows}
        pagination={pagination}
        setPagination={setPagination}
        notFoundMessage="No consultation history found"
        redirectByRowClick={`/dashboard/${from}/consultation-history`}
      />
    </div>
  );
};

export default ConsultationHistories;
