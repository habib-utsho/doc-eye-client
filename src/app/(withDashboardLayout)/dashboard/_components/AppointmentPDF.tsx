import { TAppointment } from "@/src/types/appointment";
import { firstLetterCapital } from "@/src/utils/firstLetterCapital";
import { Divider } from "@heroui/divider";
import moment from "moment";
import React from "react";
import { CalendarOutlined } from "@ant-design/icons";
import logo from "@/src/assets/img/logo.png";
import Image from "next/image";

const AppointmentPDF = ({
  printContentRef,
  appointment,
}: {
  printContentRef: React.RefObject<HTMLDivElement>;
  appointment: TAppointment;
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
            {appointment?.doctor.doctorTitle} {appointment?.doctor.name}
          </h1>
          <p className="text-gray-700">{appointment?.doctor.doctorType}</p>
          <p className="text-gray-700">{appointment?.doctor.medicalDegree}</p>
          <p className="text-gray-700 font-medium">
            Reg. No: {appointment?.doctor.doctorCode}
          </p>
          <p className="text-gray-700 text-sm mt-2">
            {appointment?.doctor.currentWorkplace?.workPlace}
          </p>
        </div>
        <div className="text-right">
          <div className="flex justify-end items-center mb-2">
            <Image src={logo} height={40} width={40} alt="logo" />
          </div>
          <p className="text-sm text-gray-600">Appointment Receipt</p>
          <p className="font-semibold text-lg">
            {firstLetterCapital(appointment?.appointmentType)}
          </p>
          <p className="text-sm text-gray-600">
            {moment(appointment?.schedule).format("DD-MMM-YYYY")}
          </p>
          <p className="text-sm text-gray-600">
            {moment(appointment?.schedule).format("hh:mm A")}
          </p>
        </div>
      </div>

      <Divider className="my-4" />

      {/* Appointment Details */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <CalendarOutlined className="text-2xl text-primary" />
          <h2 className="text-xl font-bold">Appointment Information</h2>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600">Appointment ID:</p>
            <p className="font-semibold">{appointment?._id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Status:</p>
            <p className="font-semibold">
              {firstLetterCapital(appointment?.status)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Created At:</p>
            <p className="font-semibold">
              {moment(appointment?.createdAt).format("DD-MMM-YYYY hh:mm A")}
            </p>
          </div>
          {appointment?.symptoms && (
            <div className="col-span-2">
              <p className="text-sm text-gray-600">Symptoms:</p>
              <p className="font-semibold">
                {firstLetterCapital(appointment?.symptoms)}
              </p>
            </div>
          )}
        </div>
      </div>

      <Divider className="my-4" />

      {/* Patient Information */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-3">Patient Information</h2>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-600">Name:</p>
            <p className="font-semibold">{appointment?.patient.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Gender:</p>
            <p className="font-semibold">{appointment?.patient.gender}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Blood Group:</p>
            <p className="font-semibold">{appointment?.patient.bloodGroup}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Age:</p>
            <p className="font-semibold">
              {appointment?.patient.dateOfBirth
                ? `${moment().diff(
                    appointment.patient.dateOfBirth,
                    "years"
                  )} years`
                : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email:</p>
            <p className="font-semibold text-sm">
              {appointment?.patient.email}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Phone:</p>
            <p className="font-semibold">{appointment?.patient.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Weight:</p>
            <p className="font-semibold">
              {appointment?.patient.weight
                ? `${appointment.patient.weight} kg`
                : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Height:</p>
            <p className="font-semibold">
              {appointment?.patient.height
                ? `${appointment.patient.height} ft`
                : "N/A"}
            </p>
          </div>
        </div>

        {appointment?.patient.allergies && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm font-semibold text-yellow-800">
              ⚠️ Allergies:
            </p>
            <p className="text-sm text-yellow-900">
              {appointment?.patient.allergies}
            </p>
          </div>
        )}
      </div>

      <Divider className="my-4" />

      {/* Payment Information */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-3">Payment Details</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600">Payment ID:</p>
            <p className="font-semibold font-mono text-sm">
              {appointment?.payment?._id}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Payment Status:</p>
            <p className="font-semibold">
              {firstLetterCapital(appointment?.payment?.status)}
            </p>
          </div>
        </div>

        <div className="border rounded-md overflow-hidden mt-4">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">Description</th>
                <th className="p-3 border text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              <tr className="even:bg-gray-50">
                <td className="p-3 border">Consultation Fee</td>
                <td className="p-3 border text-right font-semibold">
                  ৳{appointment?.payment?.amount?.consultationFee}
                </td>
              </tr>
              <tr className="even:bg-gray-50">
                <td className="p-3 border">VAT</td>
                <td className="p-3 border text-right font-semibold">
                  ৳{appointment?.payment?.amount?.vat}
                </td>
              </tr>
              <tr className="even:bg-gray-50">
                <td className="p-3 border">Platform Fee</td>
                <td className="p-3 border text-right font-semibold">
                  ৳{appointment?.payment?.amount?.platformFee}
                </td>
              </tr>
              <tr className="bg-gray-100 font-bold">
                <td className="p-3 border">Total Amount</td>
                <td className="p-3 border text-right text-lg">
                  ৳{appointment?.payment?.amount?.total}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Divider className="my-6" />

      {/* Doctor Contact */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-3">Contact Information</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600">Email:</p>
            <p className="font-semibold text-sm">{appointment?.doctor.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Phone:</p>
            <p className="font-semibold">{appointment?.doctor.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Location:</p>
            <p className="font-semibold">{appointment?.doctor.district}</p>
          </div>
        </div>
      </div>

      <Divider className="my-6" />

      {/* Notes */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-900 mb-2">Important Notes:</h3>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>Please arrive 10 minutes before your scheduled time</li>
          <li>Bring any previous medical records or test results</li>
          <li>Keep this receipt for your records</li>
          {appointment?.appointmentType === "online" && (
            <li>
              You will receive a meeting link via email before the appointment
            </li>
          )}
        </ul>
      </div>

      {/* Signature */}
      <div className="text-right mt-8">
        <h2 className="font-semibold text-lg">
          {appointment?.doctor.doctorTitle} {appointment?.doctor.name}
        </h2>
        <p className="text-gray-700">{appointment?.doctor.doctorType}</p>
        <p className="text-sm text-gray-600">
          {appointment?.doctor.currentWorkplace?.designation}
        </p>
        <p className="text-sm text-gray-600 mt-1">DocEye Healthcare Platform</p>
      </div>

      {/* Footer */}
      <div className="text-center mt-10 text-sm text-gray-500">
        <p>Generated via DocEye Healthcare Platform</p>
        <p className="mt-1">
          For any queries, contact us at support@doceye.com
        </p>
        <p className="mt-1">Powered with ❤️ by Habib Utsho</p>
      </div>
    </div>
  );
};

export default AppointmentPDF;
