import { TMedicalReport } from "@/src/types/medicalReport.type";
import { firstLetterCapital } from "@/src/utils/firstLetterCapital";
import { Divider } from "@heroui/divider";
import moment from "moment";
import React from "react";
import { FaPrescription } from "react-icons/fa6";
import logo from "@/src/assets/img/logo.png";
import Image from "next/image";

const MedicalReportPDF = ({
  printContentRef,
  medicalReport,
}: {
  printContentRef: React.RefObject<HTMLDivElement>;
  medicalReport: TMedicalReport;
}) => {
  return (
    <div
      id="printContent"
      ref={printContentRef}
      className="px-10 py-6 text-[16px] text-black"
    >
      {/* Header Section */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">
            {medicalReport?.doctor.doctorTitle} {medicalReport?.doctor.name}
          </h1>
          <p className="text-gray-700">{medicalReport?.doctor.doctorType}</p>
          <p className="text-gray-700">{medicalReport?.doctor.medicalDegree}</p>
          <p className="text-gray-700 font-medium">
            Reg. No: {medicalReport?.doctor.doctorCode}
          </p>
        </div>
        <div className="text-right">
          <div className="flex justify-end items-center">
            <Image src={logo} height={40} width={40} alt="logo" />
          </div>
          <p className="mb-1">
            Appointment Type:{" "}
            <span className="font-semibold">
              {firstLetterCapital(medicalReport?.appointment?.appointmentType)}
            </span>
          </p>
          <p className="text-paragraph">
            {moment(medicalReport?.appointment?.schedule).format(
              "DD-MMM-YYYY ⏰ hh:mm A"
            )}
          </p>
        </div>
      </div>

      <Divider className="my-4" />

      {/* Patient Information */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <p>
          <span className="font-semibold">Patient Name:</span>{" "}
          {medicalReport?.patient.name}
        </p>
        <p>
          <span className="font-semibold">Gender:</span>{" "}
          {medicalReport?.patient.gender}
        </p>
        <p>
          <span className="font-semibold">Weight:</span>{" "}
          {medicalReport?.patient.weight
            ? `${medicalReport.patient.weight} kg`
            : "N/A"}
        </p>
        <p>
          <span className="font-semibold">Age:</span>{" "}
          {medicalReport?.patient.dateOfBirth
            ? `${moment().diff(
                medicalReport.patient.dateOfBirth,
                "years"
              )} years`
            : "N/A"}
        </p>
      </div>

      <Divider className="my-4 !mb-[40px]" />

      {/* Medical Information Section */}
      <div className="grid grid-cols-12 gap-6">
        {/* Diagnosis */}
        <div className="col-span-4 space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Diagnosis</h2>
            <p className="text-paragraph">
              {medicalReport?.diagnosis || "N/A"}
            </p>
          </div>

          <Divider />

          {/* Problems */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Problems</h2>
            {medicalReport?.problems?.length ? (
              <ul className="list-disc list-inside space-y-1">
                {medicalReport.problems.map((problem, idx) => (
                  <li key={idx}>{problem}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No problems mentioned.</p>
            )}
          </div>
        </div>

        {/*  Advices & Medication */}
        <div className="col-span-8 space-y-6">
          <FaPrescription className="text-4xl mb-2 text-primary-1" />

          {/* Advices */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Advices</h2>
            {medicalReport?.advices?.length ? (
              <ul className="list-disc list-inside space-y-1">
                {medicalReport.advices.map((advice, idx) => (
                  <li key={idx}>{advice}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No advice provided.</p>
            )}
          </div>

          {/* Medications */}
          {medicalReport.medications &&
            medicalReport.medications.length > 0 && (
              <>
                <Divider className="my-6" />
                <div>
                  <h2 className="text-xl font-semibold mb-3">Medications</h2>
                  <div className="border rounded-md overflow-hidden">
                    <table className="w-full text-left border-collapse text-md font-semibold text-paragraph">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="p-2 border">Name</th>
                          <th className="p-2 border">Dosage</th>
                          <th className="p-2 border">Duration</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-800">
                        {medicalReport.medications.map((med, idx) => (
                          <tr key={idx} className="even:bg-gray-50">
                            <td className="p-2 border">{med.name}</td>
                            <td className="p-2 border">{med.dosage}</td>
                            <td className="p-2 border">{med.duration}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
        </div>
      </div>

      {/* Tests */}
      {medicalReport?.tests?.length ? (
        <>
          <Divider className="my-6" />
          <div>
            <h2 className="text-xl font-semibold mb-2">Recommended Tests</h2>
            <ul className="list-disc list-inside space-y-1">
              {medicalReport.tests.map((test, idx) => (
                <li key={idx}>{test}</li>
              ))}
            </ul>
          </div>
        </>
      ) : null}

      {/* Follow-up */}
      {medicalReport?.followUpDate && (
        <>
          <Divider className="my-6" />
          <p className="text-lg font-semibold">
            📅 Follow-up Date:{" "}
            <span className="font-normal">
              {moment(medicalReport.followUpDate).format("DD MMM YYYY")}
            </span>
          </p>
        </>
      )}

      <Divider className="my-6" />

      {/* Signature */}
      <div className="text-right mt-8">
        <h2 className="font-semibold text-lg">
          {medicalReport?.doctor.doctorTitle} {medicalReport?.doctor.name}
        </h2>
        <p>{medicalReport?.doctor.doctorType}</p>
        <p className="text-sm text-gray-600">DocEye</p>
      </div>

      {/* Footer */}
      <div className="text-center mt-10 text-sm text-gray-500">
        <p>Generated via DocEye</p>
        <p>Powered with ❤️ by Habib Utsho</p>
      </div>
    </div>
  );
};

export default MedicalReportPDF;
