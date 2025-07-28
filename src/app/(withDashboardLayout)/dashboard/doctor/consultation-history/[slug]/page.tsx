"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useGetSingleMedicalReportById } from "@/src/hooks/medicalReport.hook";
import { TMedicalReport } from "@/src/types/medicalReport.type";
import { Divider } from "@heroui/divider";
import Loading from "@/src/components/ui/Loading";
import moment from "moment";
import { firstLetterCapital } from "@/src/utils/firstLetterCapital";
import { Button } from "@heroui/button";
import { DownloadIcon, PrescriptionIcon } from "@/src/components/ui/icons";
import leftIcon from "@/src/assets/img/icon/left-icon.png";
import Link from "next/link";
import MedicalReportPDF from "../../../_components/MedicalReportPDF";
import InvoicePDF from "../../../_components/InvoicePDF";

const MedicalReportDetailsPage = () => {
  const { slug } = useParams() as { slug: string };
  const printMedicalReportContentRef = useRef<HTMLDivElement>(null);
  const printInvoiceContentRef = useRef<HTMLDivElement>(null);
  console.log(slug);
  console.log(printMedicalReportContentRef, "printContentRef");

  const { data, isLoading } = useGetSingleMedicalReportById(slug);

  const medicalReport = data?.data as TMedicalReport;

  const handleMedicalReportPrint = useReactToPrint({
    contentRef: printMedicalReportContentRef,
    documentTitle: `prescription-${medicalReport?.patient?.name}-${medicalReport?._id}`,
  });
  const handleInvoicePrint = useReactToPrint({
    contentRef: printInvoiceContentRef,
    documentTitle: `invoice-${medicalReport?.patient?.name}-${medicalReport?.appointment?.payment?._id}`,
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="w-full p-4">
      <div className="grid grid-cols-12 gap-8">
        {/* Left side - Patient, prescription and other info */}
        <div className="col-span-12 md:col-span-8 space-y-4">
          {/* Back to all medical report */}
          <div className="shadow p-4 rounded-md flex gap-4 justify-between items-center flex-wrap">
            <Link
              className="font-semibold text-xl flex gap-2 items-center cursor-pointer"
              href={"/dashboard/doctor/consultation-history"}
            >
              {" "}
              <Image src={leftIcon} alt="Left icon" width={50} /> Consultation
              history
            </Link>
            <h2 className="text-paragraph">
              {moment(medicalReport.appointment?.schedule).format("DD-MMM-YYYY ⏰ hh:mm A")}
            </h2>
          </div>

          {/* Patient , diagnosis , problems */}
          <div className="shadow p-4 rounded-md space-y-4">
            {/* Patient */}
            <div className="shadow p-4 rounded-md flex gap-4 justify-between items-center flex-wrap">
              <div className="space-y-2">
                <p className="text-[14px] text-paragraph">Patient</p>
                <div className=" flex gap-4 items-center">
                  <figure>
                    <Image
                      src={medicalReport.patient.profileImg}
                      alt={medicalReport.patient.name}
                      width={100}
                      height={100}
                      className="rounded-md"
                    />
                  </figure>
                  <div>
                    <h2 className="font-semibold text-xl">
                      {" "}
                      {medicalReport.patient.name}
                    </h2>
                    <div className="flex gap-2 items-center text-paragraph text-[13px]">
                      <p>
                        Age:{" "}
                        {medicalReport.patient.dateOfBirth
                          ? `${moment().diff(
                              medicalReport.patient.dateOfBirth,
                              "years"
                            )} years`
                          : "N/A"}
                      </p>{" "}
                      |<p>Weight: {medicalReport.patient.weight || "N/A"}</p>|
                      <p>BG: {medicalReport.patient.bloodGroup || "N/A"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Divider />
            {/* Diagnosis */}
            <div className="shadow p-4 rounded-md flex gap-4 justify-between items-center flex-wrap">
              <div className="space-y-2">
                <p className="text-[14px] text-paragraph">Diagnosis</p>
                <h2 className="font-semibold text-xl">
                  {medicalReport.diagnosis}
                </h2>
              </div>
            </div>
            <Divider />
            {/* Problems */}
            <div className="shadow p-4 rounded-md flex gap-4 justify-between items-center flex-wrap">
              <div className="space-y-2">
                <p className="text-[14px] text-paragraph">Problems</p>
                <ul className="list-decimal">
                  {medicalReport.problems?.map((problem) => (
                    <li className="list-inside">{problem}</li>
                  ))}
                </ul>
              </div>
            </div>
            <Divider />

            {/* Advices */}
            <div className="shadow p-4 rounded-md flex gap-4 justify-between items-center flex-wrap">
              <div className="space-y-2">
                <p className="text-[14px] text-paragraph">Advices</p>
                <ul className="list-decimal">
                  {medicalReport.advices?.map((advice) => (
                    <li className=" list-inside">{advice}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Prescription */}
          <Button
            type="button"
            variant="shadow"
            className="text-white p-2 w-full h-[80px] flex items-center justify-start !gap-4 bg-primary"
            isIconOnly
            onPress={handleMedicalReportPrint}
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
        </div>

        {/*Right side -  Doctor and payment info */}
        <div className="col-span-12 md:col-span-4 space-y-4">
          {/* Doctor */}
          <div className="shadow p-4 flex gap-4 rounded-md">
            <figure>
              <Image
                src={medicalReport.doctor.profileImg}
                alt={medicalReport.doctor.name}
                width={60}
                height={50}
              />
            </figure>
            <div>
              <h2 className="font-semibold text-xl">
                {" "}
                {medicalReport.doctor.doctorTitle} {medicalReport.doctor.name}
              </h2>
              <p className="text-[14px] text-paragraph">
                {medicalReport.doctor.doctorType}
              </p>
              <p className="text-[14px] text-paragraph">
                {medicalReport.doctor.currentWorkplace.department},{" "}
                {medicalReport.doctor.currentWorkplace.designation} <br />
                {medicalReport.doctor.currentWorkplace.workPlace}
              </p>
            </div>
          </div>
          {/* Payment */}
          <div className="shadow p-4 rounded-md space-y-4">
            <h2 className="font-semibold text-xl">Payment Info</h2>

            <div className="flex gap-6 flex-wrap justify-between">
              {/* Amount */}
              <div className="flex flex-col gap-2">
                <div>
                  <p className=" text-[14px] text-paragraph">
                    Consultation fee
                  </p>
                  <h2 className="font-semibold">
                    {" "}
                    {
                      medicalReport.appointment?.payment?.amount
                        ?.consultationFee
                    }{" "}
                    BDT
                  </h2>
                </div>
                <div>
                  <p className=" text-[14px] text-paragraph">Platform fee</p>
                  <h2 className="font-semibold">
                    {" "}
                    {
                      medicalReport.appointment?.payment?.amount?.platformFee
                    }{" "}
                    BDT
                  </h2>
                </div>
                <div>
                  <p className=" text-[14px] text-paragraph">VAT</p>
                  <h2 className="font-semibold">
                    {" "}
                    {medicalReport.appointment?.payment?.amount?.vat} BDT
                  </h2>
                </div>
                <div>
                  <p className=" text-[14px] text-paragraph">Total</p>
                  <h2 className="font-semibold text-primary text-xl">
                    {" "}
                    {medicalReport.appointment?.payment?.amount?.total} BDT
                  </h2>
                </div>
              </div>

              {/* Additional info */}
              <div className="flex flex-col gap-2 text-right">
                <div>
                  <p className=" text-[14px] text-paragraph">Status</p>
                  <h2 className="font-semibold">
                    {" "}
                    {firstLetterCapital(
                      medicalReport.appointment?.payment?.status
                    )}
                  </h2>
                </div>
                <div>
                  <p className=" text-[14px] text-paragraph">Date</p>
                  <h2 className="font-semibold">
                    {" "}
                    {moment(
                      medicalReport.appointment?.payment?.createdAt
                    ).format("Do MMM, YYYY")}
                  </h2>
                </div>
                <div>
                  <p className=" text-[14px] text-paragraph">Payment method</p>
                  <h2 className="font-semibold">
                    {" "}
                    {medicalReport.appointment?.payment?.paymentMethod}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* Invoice */}
          <Button
            type="button"
            // variant="shadow"
            className="text-black text-center p-2 w-full h-[70px] !gap-4 bg-gray-100 border"
            isIconOnly
            onPress={handleInvoicePrint}
            aria-label="Print invoice"
            block
          >
            <DownloadIcon className="text-2xl" />
            {/* <Image src={prescriptionIcon} alt="Prescription icon" /> */}
            <h2 className={`font-semibold text-lg  mb-0`}>Download Invoice</h2>
          </Button>
        </div>
      </div>

      {/* PDF content */}
      <MedicalReportPDF
        medicalReport={data?.data}
        printContentRef={printMedicalReportContentRef}
      />
      <InvoicePDF
        medicalReport={data?.data}
        printContentRef={printInvoiceContentRef}
      />
    </div>
  );
};

export default MedicalReportDetailsPage;
