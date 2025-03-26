"use client";
import {
  useDeletePatientById,
  useGetAllPatients,
} from "@/src/hooks/patient.hook";
import useDebounce from "@/src/hooks/useDebounce";
import React, { useEffect, useState } from "react";
import DETable from "../../_components/DETable";
import Image from "next/image";
import { TPatient, TUser } from "@/src/types/user";
import moment from "moment";
import { Switch } from "@heroui/switch";
import { Input } from "@heroui/input";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import DeleteModal from "../../_components/DeleteModal";
import { useToggleUserStatus } from "@/src/hooks/auth.hook";
import { SearchIcon } from "@/src/components/ui/icons";
import PatientDetailsModal from "../../admin/patients/_components/modal/PatientDetailsModal";
import useUserData from "@/src/hooks/user.hook";
import { useGetAllAppointments } from "@/src/hooks/appointment.hook";
import { TAppointment } from "@/src/types/appointment";
import { firstLetterCapital } from "@/src/utils/firstLetterCapital";

const ManagePatientsPage = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearch = useDebounce(searchTerm, 500);
  const { isLoading, user } = useUserData();
  const {
    data: appointments,
    isLoading: isLoadingAppointments,
    refetch: refetchPatients,
  } = useGetAllAppointments([
    {
      name: "searchTerm",
      value: debounceSearch,
    },
    {
      name: "page",
      value: pagination.page,
    },
    {
      name: "limit",
      value: pagination.limit,
    },
    {
      name: "doctor",
      value: user?._id,
    },
  ]);

  const rows = appointments?.data?.map(
    (appointment: TAppointment, ind: number) => ({
      _id: appointment?._id,
      user: appointment?.patient?.user,
      sl: ind + 1,
      userInfo: (
        <div className="flex items-center gap-1 min-w-[335px]">
          <Image
            src={appointment?.patient?.profileImg}
            width={60}
            height={60}
            alt={appointment?.patient?.name}
            className="rounded-full bg-red-500 h-[60px] w-[60px]"
          />
          <div>
            <p>{appointment?.patient?.name}</p>
            <p className="text-slate-700 flex items-center gap-1">
              <MailOutlined />
              {appointment?.patient?.email}
            </p>
            <p className="text-slate-700 flex items-center gap-1">
              <PhoneOutlined /> {appointment?.patient?.phone}
            </p>
          </div>
        </div>
      ),


      
      appointment: <div>
        {appointment.symptoms}
        {moment(appointment?.schedule).format("DD MMM YYYY")}
        <br />
        <span className="font-semibold">

          {firstLetterCapital(appointment.appointmentType)}
        </span>
        <div>
          <span className="font-semibold">
            {appointment.payment.amount} BDT
          </span> | {" "}
          <span className="font-semibold">
            {appointment.payment.paymentMethod}
          </span>
        </div>
      </div>,

      actions: (
        <div className="flex items-center gap-1">
          <PatientDetailsModal patient={appointment.patient} />
        </div>
      ),
    })
  );

  const columns = [
    { key: "sl", label: "SL" },
    { key: "userInfo", label: "Patient" },
    { key: "appointment", label: "Appointment" },
    { key: "actions", label: "Actions" },
  ];
  console.log(appointments);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4 xl:mb-6 gap-4">
        <div className="flex items-center gap-2">
          <Input
            name="search"
            startContent={<SearchIcon />}
            placeholder="Search patient..."
            onChange={(e) => setSearchTerm(e.target.value)}
            isClearable
            onClear={() => setSearchTerm("")}
          />
        </div>
      </div>
      <DETable
        data={appointments}
        isLoading={isLoadingAppointments}
        columns={columns}
        rows={rows}
        pagination={pagination}
        setPagination={setPagination}
        notFoundMessage="No Patients found"
      />
    </div>
  );
};

export default ManagePatientsPage;
