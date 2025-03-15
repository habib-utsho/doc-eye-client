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
import { CheckIcon, SearchIcon, XMarkIcon } from "@/src/components/ui/icons";
import DeleteModal from "../../_components/DeleteModal";
import { useToggleUserStatus } from "@/src/hooks/auth.hook";
import { TSpecialty } from "@/src/types/specialty";
import WorkingExperiencesModal from "./_components/modal/WorkingExperiencesModal";
import {
  ClockCircleOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import DoctorDetailsModal from "./_components/modal/DoctorDetailsModal";
import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";
import { useGetAllSpecialties } from "@/src/hooks/specialty.hook";

const DoctorsPage = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [specialty, setSpecialty] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearch = useDebounce(searchTerm, 500);
  const {
    data: doctors,
    isLoading: isLoadingDoctors,
    refetch: refetchDoctors,
  } = useGetAllDoctors([
    ...(debounceSearch
      ? [
          {
            name: "searchTerm",
            value: debounceSearch,
          },
        ]
      : []),
    ...(specialty
      ? [
          {
            name: "medicalSpecialties",
            value: specialty,
          },
        ]
      : []),
    {
      name: "page",
      value: pagination.page,
    },
    {
      name: "limit",
      value: pagination.limit,
    },
  ]);
  const { data: specialties, isLoading: isLoadingSpecialties } =
    useGetAllSpecialties([
      {
        name: "limit",
        value: 50000,
      },
      {
        name: "isDeleted",
        value: false,
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
        {doctor?.profileImg ? (
          <Image
            src={doctor?.profileImg}
            width={60}
            height={60}
            alt={doctor?.name}
            className="rounded-full h-[60px] w-[60px] mr-2"
          />
        ) : (
          <div className="rounded-full h-[60px] w-[60px] bg-primary-500 bg-opacity-20 mr-2" />
        )}
        <div>
          <p>{doctor?.name}</p>
          <p className="text-gray-500 flex items-center gap-1">
            <MailOutlined />
            {doctor?.email}
          </p>
          <p className="text-gray-500 flex items-center gap-1">
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
    currentWorkplace: (
      <div>
        <p className="font-semibold">
          <span>{doctor?.currentWorkplace?.workPlace}</span> -{" "}
          {doctor?.currentWorkplace?.department}
        </p>
        <p className="text-gray-500">
          {doctor?.currentWorkplace?.designation},{" "}
          <ClockCircleOutlined className="mr-1" />
          {moment(doctor?.currentWorkplace?.workingPeriodStart).format(
            "YYYY"
          )}{" "}
          - Running
        </p>
      </div>
    ),
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
      <div className="mb-4 xl:mb-6 gap-4">
        <div className=" grid grid-cols-4 gap-4 text-nowrap">
          <Input
            name="search"
            startContent={<SearchIcon />}
            placeholder="Search doctor..."
            onChange={(e) => setSearchTerm(e.target.value)}
            isClearable
            onClear={() => setSearchTerm("")}
          />

          <Select
            className=" "
            label="Filter by specialty"
            onChange={(e) => setSpecialty(e.target.value)}
          >
            {specialties?.data?.map((specialty: TSpecialty) => (
              <SelectItem key={specialty._id}>{specialty.name}</SelectItem>
            ))}
          </Select>
          <Select
            className=""
            label="Sort by consultation fee"
            // onChange={(e) => setSpecialty(e.target.value)}
          >
            {[
              { title: "High to Low", value: "desc" },
              { title: "Low to High", value: "asc" },
            ]?.map((elem) => (
              <SelectItem key={elem.value}>{elem.title}</SelectItem>
            ))}
          </Select>
          <Select
            className=""
            label="Sort by experience"
            // onChange={(e) => setSpecialty(e.target.value)}
          >
            {[
              { title: "High to Low", value: "desc" },
              { title: "Low to High", value: "asc" },
            ]?.map((elem) => (
              <SelectItem key={elem.value}>{elem.title}</SelectItem>
            ))}
          </Select>
        </div>
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
