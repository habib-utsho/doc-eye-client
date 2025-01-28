"use client";
import { useGetAllAdmin } from "@/src/hooks/admin.hook";
import useDebounce from "@/src/hooks/useDebounce";
import React, { useState } from "react";
import DETable from "../../_components/DETable";
import Image from "next/image";
import { TAdmin } from "@/src/types/user";
import moment from "moment";
import { Switch } from "@heroui/switch";
import { toast } from "sonner";

const AdminsPage = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const { data: admins, isLoading: isLoadingAdmins } = useGetAllAdmin([
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

  const rows = admins?.data?.map((admin: TAdmin) => ({
    name: admin?.name,
    email: admin?.email,
    phone: admin?.phone,
    gender: admin?.gender,
    profileImg: (
      <Image src={admin?.profileImg} width={50} height={50} alt={admin?.name} />
    ),
    dateOfBirth: moment(admin?.dateOfBirth).format("DD-MMM-YYYY"),
    district: admin?.district,
    createdAt: admin?.createdAt || "N/A",
    status: (
      <Switch
        onChange={() => handleStatusChange(admin)}
        defaultSelected={admin?.user?.status === "active"}
      />
    ),
  }));
  const columns = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "phone",
      label: "Phone",
    },
    {
      key: "gender",
      label: "Gender",
    },
    {
      key: "profileImg",
      label: "Profile Image",
    },
    {
      key: "dateOfBirth",
      label: "Date of Birth",
    },
    {
      key: "district",
      label: "District",
    },
    {
      key: "createdAt",
      label: "Created At",
    },
    {
      key: "status",
      label: "Status",
    },
  ];

  const handleStatusChange = (admin: TAdmin) => {
    console.log(admin);
    toast.success("Status changed successfully");
  };

  return (
    <div className="">
      Admin list
      <DETable
        data={admins}
        isLoading={isLoadingAdmins}
        columns={columns}
        rows={rows}
        pagination={pagination}
        setPagination={setPagination}
        notFoundMessage="No Admins found"
      />
    </div>
  );
};

export default AdminsPage;
