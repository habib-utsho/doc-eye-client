"use client";
import React, { ReactNode, RefObject, useRef, useState } from "react";
import { Input } from "@heroui/input";
import Image from "next/image";
import moment from "moment";
import { DownloadIcon, SearchIcon } from "@/src/components/ui/icons";
import DETable from "../../_components/DETable";
import useDebounce from "@/src/hooks/useDebounce";
import useUserData from "@/src/hooks/user.hook";
import { firstLetterCapital } from "@/src/utils/firstLetterCapital";
import { useGetAllMedicalReport } from "@/src/hooks/medicalReport.hook";
import { Button } from "@heroui/button";
import { useReactToPrint } from "react-to-print";
import { ContentNode } from "react-to-print/lib/types/ContentNode";

const ConsultationHistory = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearch = useDebounce(searchTerm, 500);

  const [selectedHistory, setSelectedHistory] = useState(null);

  const printContentRef = useRef<HTMLDivElement>(null);
  // const handlePrint = useReactToPrint({
  //   contentRef: printContentRef,

  //   documentTitle: `history`,
  //   // onBeforePrint: () => {console.log("before printing...");},
  //   // onAfterPrint: () => {console.log("after printing...");},
  //   removeAfterPrint: false,
  // });
  const handlePrint = useReactToPrint({ contentRef: printContentRef });

  console.log(printContentRef, "printContentRef");

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
      medications:
        history?.medications
          ?.map((med: any) => `${med.name} (${med.dosage})`)
          .join(", ") || "N/A",
      followUp: history?.followUpDate
        ? moment(history?.followUpDate).format("DD-MMM-YYYY")
        : "N/A",
      schedule: moment
        .utc(history?.appointment?.schedule)
        .format("DD-MMM-YYYY ⏰ hh:mm A"),
      createdAt: moment(history?.createdAt).format("DD-MMM-YYYY ⏰ hh:mm A"),
      download: (
        <Button
          type="button"
          color="primary"
          className="text-white"
          isIconOnly
          variant="shadow"
          onPress={handlePrint}
        >
          <DownloadIcon />
        </Button>
      ),
    })
  );

  const columns = [
    { key: "sl", label: "SL" },
    { key: "doctorInfo", label: "Doctor" },
    { key: "patientInfo", label: "Patient" },
    { key: "appointmentType", label: "Type" },
    { key: "problems", label: "Problems" },
    { key: "diagnosis", label: "Diagnosis" },
    { key: "medications", label: "Medications" },
    { key: "followUp", label: "Follow-up Date" },
    { key: "schedule", label: "Schedule" },
    { key: "createdAt", label: "Created At" },
    { key: "download", label: "Download" },
  ];

  console.log(rows, "rows");

  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center mb-4 xl:mb-6 gap-4">
        <div className="flex items-center gap-2">
          <Input
            name="search"
            startContent={<SearchIcon />}
            placeholder="Search consultation history..."
            onChange={(e) => setSearchTerm(e.target.value)}
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
      />

      <div id="printContent" ref={printContentRef}>
        Content to print
      </div>
    </div>
  );
};

export default ConsultationHistory;
