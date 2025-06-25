"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useRef } from "react";
import prescriptionIcon from "@/src/assets/img/icon/prescription.png";
import { useReactToPrint } from "react-to-print";
import { useGetSingleMedicalReportById } from "@/src/hooks/medicalReport.hook";
import { TMedicalReport } from "@/src/types/medicalReport.type";
import { Divider } from "@heroui/divider";
import Loading from "@/src/components/ui/Loading";
import moment from "moment";
import { firstLetterCapital } from "@/src/utils/firstLetterCapital";
import { Button } from "@heroui/button";
import { subtitle, title } from "@/src/components/primitives";
import { PrescriptionIcon } from "@/src/components/ui/icons";

const page = () => {
  const { slug } = useParams() as { slug: string };
  const printContentRef = useRef<HTMLDivElement>(null);
  console.log(slug);
  console.log(printContentRef, "printContentRef");

  const { data, isLoading } = useGetSingleMedicalReportById(slug);

  console.log(data, "data");

  // const handlePrint = useReactToPrint({
  //   contentRef: printContentRef,

  //   documentTitle: `history`,
  //   // onBeforePrint: () => {console.log("before printing...");},
  //   // onAfterPrint: () => {console.log("after printing...");},
  //   removeAfterPrint: false,
  // });

  const handlePrint = useReactToPrint({
    contentRef: printContentRef,
    documentTitle: "history",
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="w-full p-4">
      <Button
        type="button"
        variant="shadow"
        className="text-white p-2 w-full h-[80px] flex items-center justify-start !gap-4 bg-primary"
        isIconOnly
        onPress={handlePrint}
        aria-label="Print prescription"
        block
      >
        <PrescriptionIcon />
        {/* <Image src={prescriptionIcon} alt="Prescription icon" /> */}
        <div className="text-left">
          <h2 className={`font-semibold text-lg text-slate-50 mb-0`}>
            Prescription
          </h2>
          <p className="text-slate-50 ">
            Click here to view and download your prescription
          </p>
        </div>
      </Button>
      <div id="printContent" ref={printContentRef} className="px-8 py-4">
        <div className="grid grid-cols-2 gap-4 ">
          <div>
            <h2 className="font-bold text-2xl">
              {data.data?.doctor.doctorTitle} {data.data?.doctor.name}
            </h2>
            <p className="font-semibold">{data.data?.doctor.doctorType}</p>
            <p className="font-semibold">{data.data?.doctor.doctorCode}</p>
          </div>
          <div className="text-right">
            <p>
              {data.data?.appointment.appointmentType &&
                firstLetterCapital(data.data?.appointment.appointmentType)}
            </p>
            <p>
              {moment
                .utc(data.data?.appointment?.schedule)
                .format("DD-MMM-YYYY ⏰ hh:mm A")}
            </p>
          </div>
        </div>

        <Divider className="mt-6" />
        <div className="flex gap-4 py-2">
          <h2>
            <span className="font-bold">Patient Name:</span>{" "}
            {data.data?.patient.name}
          </h2>
          <h2>
            <span className="font-bold">Gender:</span>{" "}
            {data.data?.patient.gender}
          </h2>
          <h2>
            <span className="font-bold">Weight:</span>{" "}
            {data.data?.patient.weight || "N/A"}
          </h2>
          <h2>
            <span className="font-bold">Age:</span>{" "}
            {data.data?.patient.dateOfBirth
              ? moment().diff(data.data.patient.dateOfBirth, "years")
              : ""}
          </h2>
        </div>
        <Divider className="mb-6" />
      </div>
    </div>
  );
};

export default page;
