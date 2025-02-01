"use client";
import { useDeleteDoctorById, useGetAllDoctors } from "@/src/hooks/doctor.hook";
import useDebounce from "@/src/hooks/useDebounce";
import React, { useEffect, useState } from "react";
import DETable from "../../_components/DETable";
import Image from "next/image";
import { TDoctor, TUser } from "@/src/types/user";
import moment from "moment";
import { Switch } from "@heroui/switch";
import { Input } from "@heroui/input";
import { SearchIcon } from "@/src/components/ui/icons";
import DeleteModal from "../../_components/DeleteModal";
import { useToggleUserStatus } from "@/src/hooks/auth.hook";
import { TSpecialty } from "@/src/types/specialty";
import WorkingExperiencesModal from "./_components/modal/WorkingExperiencesModal";

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
    mutate: toggleUserStatus,
    isPending: isLoadingToggleUserStatus,
    isSuccess: isSuccessToggleUserStatus,
  } = useToggleUserStatus();

  const rows = doctors?.data?.map((doctor: TDoctor, ind: number) => ({
    _id: doctor?._id,
    user: doctor?.user,
    sl: ind + 1,
    userInfo: (
      <div className="flex items-center gap-1">
        <Image
          src={doctor?.profileImg}
          width={50}
          height={50}
          alt={doctor?.name}
          className="rounded-full"
        />
        <div>{doctor?.name}</div>
      </div>
    ),
    name: doctor?.name,
    email: doctor?.email,
    phone: doctor?.phone,
    gender: doctor?.gender,
    doctorType: doctor?.doctorType,
    medicalDegree: doctor?.medicalDegree,
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
    actions: (
      <div className="flex items-center gap-1">
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
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "gender", label: "Gender" },
    { key: "dateOfBirth", label: "Date of Birth" },
    { key: "medicalDegree", label: "Degree" },
    { key: "medicalSpecialties", label: "Specialties" },
    { key: "doctorType", label: "Type" },
    { key: "consultationFee", label: "Consultation Fee" },
    { key: "followupFee", label: "Followup Fee" },
    { key: "currentWorkplace", label: "Current Workplace" },
    { key: "workingExperiences", label: "Experiences" },
    { key: "district", label: "District" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ];

  console.log({ doctors });

  const handleStatusChange = (user: TUser) => {
    toggleUserStatus(user?._id);
  };

  useEffect(() => {
    if (isSuccessToggleUserStatus) {
      refetchDoctors();
    }
  }, [isSuccessToggleUserStatus]);

  return (
    <div className="w-full p-4">
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
