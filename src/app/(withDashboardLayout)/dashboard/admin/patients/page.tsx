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
import DeleteUserModal from "../../_components/DeleteUserModal";
import { useToggleUserStatus } from "@/src/hooks/auth.hook";
import PatientDetailsModal from "./_components/modal/PatientDetailsModal";
import { SearchIcon } from "@/src/components/ui/icons";
import { Button } from "@heroui/button";
import { FaShield } from "react-icons/fa6";
import MakeAdminModal from "../../_components/MakeAdminModal";

const PatientsPage = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearch = useDebounce(searchTerm, 500);
  const {
    data: patients,
    isLoading: isLoadingPatients,
    refetch: refetchPatients,
  } = useGetAllPatients([
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
  ]);
  const {
    mutate: deletePatientMutate,
    isPending: isLoadingDeletePatient,
    isSuccess: isSuccessDeletePatient,
  } = useDeletePatientById();
  const { mutate: toggleUserStatus, isPending: isLoadingToggleUserStatus } =
    useToggleUserStatus();

  const rows = patients?.data?.map((patient: TPatient, ind: number) => ({
    _id: patient?._id,
    user: patient?.user,
    sl: ind + 1,
    userInfo: (
      <div className="flex items-center gap-1 min-w-[335px]">
        <Image
          src={patient?.profileImg}
          width={60}
          height={60}
          alt={patient?.name}
          className="rounded-full bg-red-500 h-[60px] w-[60px]"
        />
        <div>
          <p>{patient?.name}</p>
          <p className="text-slate-700 flex items-center gap-1">
            <MailOutlined />
            {patient?.email}
          </p>
          <p className="text-slate-700 flex items-center gap-1">
            <PhoneOutlined /> {patient?.phone}
          </p>
        </div>
      </div>
    ),
    name: patient?.name,
    gender: patient?.gender,
    dateOfBirth: moment(patient?.dateOfBirth).format("DD-MMM-YYYY"),
    district: patient?.district,
    isDeleted: patient?.isDeleted,
    status: (
      <Switch
        onChange={() => handleStatusChange(patient?.user)}
        disabled={isLoadingToggleUserStatus || isLoadingPatients}
        isSelected={patient?.user?.status === "active"}
      />
    ),
    actions: (
      <div className="flex items-center gap-2">
        <PatientDetailsModal patient={patient} />
        <DeleteUserModal
          id={patient?._id}
          handler={deletePatientMutate}
          isLoading={isLoadingDeletePatient}
          isSuccess={isSuccessDeletePatient}
          deleteType="patient"
        />
        <MakeAdminModal patient={patient} refetch={refetchPatients} />
      </div>
    ),
  }));

  const columns = [
    { key: "sl", label: "SL" },
    { key: "userInfo", label: "Patient" },
    { key: "gender", label: "Gender" },
    { key: "dateOfBirth", label: "Date of Birth" },
    { key: "district", label: "District" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ];

  const handleStatusChange = (user: TUser) => {
    toggleUserStatus(user?._id, {
      onSuccess: () => {
        refetchPatients();
      },
    });
  };

  useEffect(() => {
    if (isSuccessDeletePatient) {
      refetchPatients();
    }
  }, [isSuccessDeletePatient]);

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
        data={patients}
        isLoading={isLoadingPatients}
        columns={columns}
        rows={rows}
        pagination={pagination}
        setPagination={setPagination}
        notFoundMessage="No Patients found"
      />
    </div>
  );
};

export default PatientsPage;
