"use client";
import {
  useDeleteDoctorById,
  useGetAllDoctors,
  useUpdateDoctorById,
} from "@/src/hooks/doctor.hook";
import useDebounce from "@/src/hooks/useDebounce";
import React, { useEffect, useState } from "react";
import DETable from "../../_components/DETable";
import Image from "next/image";
import { TAdmin, TDoctor, TUser } from "@/src/types/user";
import moment from "moment";
import { Switch } from "@heroui/switch";
import { Input } from "@heroui/input";
import {
  CheckIcon,
  PhoneIcon,
  SearchIcon,
  XMarkIcon,
} from "@/src/components/ui/icons";
import DeleteModal from "../../_components/DeleteModal";
import { useToggleUserStatus } from "@/src/hooks/auth.hook";
import { TSpecialty } from "@/src/types/specialty";
import WorkingExperiencesModal from "./_components/modal/WorkingExperiencesModal";
import { MailOutlined, PhoneOutlined, RightOutlined } from "@ant-design/icons";
import DoctorDetailsModal from "./_components/modal/DoctorDetailsModal";
import { Button } from "@heroui/button";
import { toast } from "sonner";

const DoctorsPage = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearch = useDebounce(searchTerm, 500);
  const {
    data: doctors,
    isLoading: isLoadingDoctors,
    refetch: refetchDoctors,
  } = useGetAllDoctors([
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
    mutate: deleteDoctorMutate,
    isPending: isLoadingDeleteDoctor,
    isSuccess: isSuccessDeleteDoctor,
  } = useDeleteDoctorById();
  const {
    mutate: updateDoctorMutate,
    isPending: isLoadingUpdateDoctor,
    isSuccess: isSuccessUpdateDoctor,
  } = useUpdateDoctorById();
  const {
    mutate: toggleUserStatus,
    isPending: isLoadingToggleUserStatus,
    isSuccess: isSuccessToggleUserStatus,
  } = useToggleUserStatus();

  const rows = doctors?.data?.map((doctor: TDoctor, ind: number) => ({
    _id: doctor?._id,
    user: doctor?.user,
    sl: ind + 1,
    userInfo: (
      <div className="flex items-center gap-1 min-w-[335px]">
        {/* <figure className="relative"> */}
        <Image
          src={doctor?.profileImg}
          width={50}
          height={50}
          alt={doctor?.name}
          className="rounded-full"
        />
        {/* </figure> */}
        <div>
          <p>{doctor?.name}</p>
          <p className="text-slate-700 flex items-center gap-1">
            <MailOutlined />
            {doctor?.email}
          </p>
          <p className="text-slate-700 flex items-center gap-1">
            <PhoneOutlined /> {doctor?.phone}
          </p>
        </div>
      </div>
    ),
    name: doctor?.name,
    gender: doctor?.gender,
    doctorType: doctor?.doctorType,
    medicalDegree: doctor?.medicalDegree,
    doctorCode: doctor?.doctorCode,
    bmdc: doctor?.bmdc,
    medicalSpecialties: doctor?.medicalSpecialties
      ?.map((specialty: TSpecialty) => specialty?.name)
      .join(", "),
    profileImg: (
      <Image
        src={doctor?.profileImg}
        width={50}
        height={50}
        alt={doctor?.name}
      />
    ),
    dateOfBirth: moment(doctor?.dateOfBirth).format("DD-MMM-YYYY"),
    consultationFee: `${doctor?.consultationFee} BDT`,
    followupFee: `${doctor?.followupFee} BDT`,
    currentWorkplace: doctor?.currentWorkplace,
    district: doctor?.district,
    isDeleted: doctor?.isDeleted,
    workingExperiences: (
      <WorkingExperiencesModal
        workingExperiences={doctor?.workingExperiences}
      />
    ),
    createdAt: doctor?.createdAt || "N/A",
    status: (
      <Switch
        onChange={() => handleStatusChange(doctor?.user)}
        disabled={isLoadingToggleUserStatus}
        isSelected={doctor?.user?.status === "active"}
      />
    ),
    approval: (
      <div>
        {doctor.status === "pending" ? (
          <div className="flex items-center gap-1">
            <Button
              onPress={() => handleDoctorApproval(doctor, "reject")}
              isIconOnly
              startContent={<XMarkIcon />}
              isLoading={isLoadingUpdateDoctor}
              color="danger"
            />
            <Button
              onPress={() => handleDoctorApproval(doctor, "approve")}
              isIconOnly
              startContent={<CheckIcon />}
              isLoading={isLoadingUpdateDoctor}
              color="success"
            />
          </div>
        ) : (
          <Button
            disabled
            isIconOnly
            startContent={
              doctor.status === "approve" ? <CheckIcon /> : <XMarkIcon />
            }
            isLoading={isLoadingUpdateDoctor}
            color={`${doctor.status === "approve" ? "success" : "danger"}`}
            className="opacity-30"
          />
        )}
      </div>
    ),
    actions: (
      <div className="flex items-center gap-1">
        <DoctorDetailsModal doctor={doctor} />
        <DeleteModal
          id={doctor?._id}
          handler={deleteDoctorMutate}
          isLoading={isLoadingDeleteDoctor}
          isSuccess={isSuccessDeleteDoctor}
          deleteType="doctor"
        />
      </div>
    ),
  }));
  const columns = [
    { key: "sl", label: "SL" },
    { key: "userInfo", label: "Doctor" },
    { key: "gender", label: "Gender" },
    { key: "doctorType", label: "Type" },
    { key: "bmdc", label: "BMDC" },
    { key: "doctorCode", label: "Dr Code" },
    { key: "currentWorkplace", label: "Current Workplace" },
    { key: "workingExperiences", label: "Experiences" },
    { key: "district", label: "District" },
    { key: "status", label: "Status" },
    { key: "approval", label: "Approval" },
    { key: "actions", label: "Actions" },
  ];

  const handleStatusChange = (user: TUser) => {
    toggleUserStatus(user?._id);
  };
  const handleDoctorApproval = (doctor: TDoctor, status: string) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify({ status }));
    console.log(formData.getAll("data"));
    toast.success(`${doctor?._id}  Doctor ${status} successfully!`);
    updateDoctorMutate({ id: doctor?._id, payload: formData });
  };

  useEffect(() => {
    if (
      isSuccessDeleteDoctor ||
      isSuccessToggleUserStatus ||
      isSuccessUpdateDoctor
    ) {
      refetchDoctors();
    }
  }, [isSuccessToggleUserStatus, isSuccessDeleteDoctor, isSuccessUpdateDoctor]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4 xl:mb-6 gap-4">
        <div className="flex items-center gap-2">
          <Input
            name="search"
            startContent={<SearchIcon />}
            placeholder="Search doctor..."
            onChange={(e) => setSearchTerm(e.target.value)}
            isClearable
            onClear={() => setSearchTerm("")}
          />
        </div>

        {/* <SpecialtyModal /> */}
      </div>

      <DETable
        data={doctors}
        isLoading={isLoadingDoctors}
        columns={columns}
        rows={rows}
        pagination={pagination}
        setPagination={setPagination}
        notFoundMessage="No Doctors found"
      />
    </div>
  );
};

export default DoctorsPage;
