"use client";
import { useGetAllAppointments } from "@/src/hooks/appointment.hook";
import useDebounce from "@/src/hooks/useDebounce";
import React, { useState } from "react";
import DETable from "../DETable";
import Image from "next/image";
import moment from "moment";
import { Input } from "@heroui/input";
import { SearchIcon, XMarkIcon } from "@/src/components/ui/icons";
import { TAppointment } from "@/src/types/appointment";
import { firstLetterCapital } from "@/src/utils/firstLetterCapital";
import { Button } from "@heroui/button";
import useUserData from "@/src/hooks/user.hook";
import { CheckCircleFilled, CheckCircleOutlined } from "@ant-design/icons";
import Chat from "../Chat";
import VideoCall from "../VideoCall";

const PatientAppointmentsPage = ({
  state = "upcoming",
}: {
  state: "upcoming" | "expired";
}) => {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearch = useDebounce(searchTerm, 500);

  const { isLoading: isLoadingUser, user } = useUserData();

  const { data: appointments, isLoading: isLoadingAppointments } =
    useGetAllAppointments([
      { name: "patient", value: user?._id },
      { name: "searchTerm", value: debounceSearch },
      { name: "page", value: pagination.page },
      { name: "limit", value: pagination.limit },
      { name: "state", value: state },
    ]);

  const rows = appointments?.data?.map(
    (appointment: TAppointment, ind: number) => ({
      _id: appointment?._id,
      sl: ind + 1,
      doctorInfo: (
        <div className="flex items-center gap-1">
          <Image
            src={appointment?.doctor?.profileImg}
            width={60}
            height={60}
            alt={appointment?.doctor?.name}
            className="rounded-full h-[60px] w-[60px]"
          />
          <div>
            {appointment?.doctor?.name} ({appointment?.doctor?.doctorTitle})
          </div>
        </div>
      ),
      patientInfo: (
        <div className="flex items-center gap-1">
          <Image
            src={appointment?.patient?.profileImg}
            width={50}
            height={50}
            alt={appointment?.patient?.name}
            className="rounded-full h-[50px] w-[50px]"
          />
          <div>{appointment?.patient?.name}</div>
        </div>
      ),
      appointmentType: firstLetterCapital(appointment?.appointmentType),
      symptoms: appointment?.symptoms
        ? firstLetterCapital(appointment?.symptoms)
        : "N/A",
      schedule: moment(appointment?.schedule).format("DD-MMM-YYYY ⏰ hh:mm A"),
      paymentStatus: firstLetterCapital(appointment?.payment?.status),
      status: (
        <Button
          disabled
          startContent={
            appointment.status === "confirmed" ? (
              <CheckCircleOutlined />
            ) : appointment.status === "completed" ? (
              <CheckCircleFilled />
            ) : appointment.status === "canceled" ? (
              <XMarkIcon />
            ) : null
          }
          color={`${
            appointment.status === "confirmed"
              ? "primary"
              : appointment.status === "completed"
              ? "success"
              : appointment.status === "canceled"
              ? "danger"
              : "warning"
          }`}
          className="opacity-50 pointer-events-none text-white"
        >
          {firstLetterCapital(appointment.status)}
        </Button>
      ),
      action: (
        <>
          {appointment.status === "confirmed" ||
          appointment.status === "completed" ? (
            <div className="flex  items-center rounded-md shadow shadow-primary">
              <Chat
                from={"patient"}
                appointment={appointment}
                doctor={appointment.doctor}
                patient={appointment.patient}
              />
              <VideoCall
                from={"patient"}
                appointment={appointment}
                doctor={appointment.doctor}
                patient={appointment.patient}
              />
            </div>
          ) : (
            "-"
          )}
        </>
      ),
      createdAt: moment(appointment?.createdAt).format(
        "DD-MMM-YYYY ⏰ hh:mm A"
      ),
    })
  );

  const columns = [
    { key: "sl", label: "SL" },
    { key: "doctorInfo", label: "Doctor" },
    { key: "patientInfo", label: "Patient" },
    { key: "appointmentType", label: "Type" },
    { key: "symptoms", label: "Symptoms" },
    { key: "schedule", label: "Schedule" },
    { key: "paymentStatus", label: "Payment" },
    { key: "status", label: "Status" },
    { key: "action", label: "Action" },
    { key: "createdAt", label: "Created At" },
  ];

  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center mb-4 xl:mb-6 gap-4">
        <div className="flex justify-between w-full items-center gap-2 ">
          <h2 className="whitespace-nowrap font-semibold text-xl">
            {firstLetterCapital(state)} Appointments{" "}
            {appointments?.meta?.total && `(${appointments?.meta?.total})`}
          </h2>
          <Input
            name="search"
            startContent={<SearchIcon />}
            placeholder="Search appointments..."
            onChange={(e) => setSearchTerm(e.target.value)}
            isClearable
            onClear={() => setSearchTerm("")}
            className="max-w-sm"
          />
        </div>
      </div>

      <DETable
        data={appointments}
        isLoading={isLoadingAppointments || isLoadingUser}
        columns={columns}
        rows={rows}
        pagination={pagination}
        setPagination={setPagination}
        notFoundMessage="No Appointments found"
      />
    </div>
  );
};

export default PatientAppointmentsPage;
