"use client";
import { useDeleteAdminById, useGetAllAdmin } from "@/src/hooks/admin.hook";
import useDebounce from "@/src/hooks/useDebounce";
import React, { useEffect, useState } from "react";
import DETable from "../../_components/DETable";
import Image from "next/image";
import { TAdmin, TUser } from "@/src/types/user";
import moment from "moment";
import { Switch } from "@heroui/switch";
import { toast } from "sonner";
import { Input } from "@heroui/input";
import { SearchIcon } from "@/src/components/ui/icons";
import DeleteUserModal from "../../_components/DeleteUserModal";
import { useToggleUserStatus } from "@/src/hooks/auth.hook";

const AdminsPage = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearch = useDebounce(searchTerm, 500);
  const {
    data: admins,
    isLoading: isLoadingAdmins,
    refetch: refetchAdmins,
  } = useGetAllAdmin([
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
    mutate: deleteAdminMutate,
    isPending: isLoadingDeleteAdmin,
    isSuccess: isSuccessDeleteAdmin,
  } = useDeleteAdminById();
  const {
    mutate: toggleUserStatus,
    isPending: isLoadingToggleUserStatus,
    isSuccess: isSuccessToggleUserStatus,
  } = useToggleUserStatus();

  const rows = admins?.data?.map((admin: TAdmin, ind: number) => ({
    _id: admin?._id,
    user: admin?.user,
    sl: ind + 1,
    userInfo: (
      <div className="flex items-center gap-1">
        <Image
          src={admin?.profileImg}
          width={60}
          height={60}
          alt={admin?.name}
          className="rounded-full h-[60px] w-[60px]"
        />
        <div>{admin?.name}</div>
      </div>
    ),
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
    isDeleted: admin?.isDeleted,
    status: (
      <Switch
        onChange={() => handleStatusChange(admin?.user)}
        disabled={isLoadingToggleUserStatus}
        isSelected={admin?.user?.status === "active"}
      />
    ),
    actions: (
      <div className="flex items-center gap-1">
        <DeleteUserModal
          id={admin?._id}
          handler={deleteAdminMutate}
          isLoading={isLoadingDeleteAdmin}
          isSuccess={isSuccessDeleteAdmin}
          deleteType="admin"
        />
      </div>
    ),
  }));
  const columns = [
    {
      key: "sl",
      label: "SL",
    },
    {
      key: "userInfo",
      label: "User",
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
    {
      key: "actions",
      label: "Actions",
    },
  ];

  const handleStatusChange = (user: TUser) => {
    toggleUserStatus(user?._id);
  };

  useEffect(() => {
    if (isSuccessToggleUserStatus) {
      refetchAdmins();
    }
  }, [isSuccessToggleUserStatus]);

  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center mb-4 xl:mb-6 gap-4">
        <div className="flex items-center gap-2">
          <Input
            name="search"
            startContent={<SearchIcon />}
            placeholder="Search admin..."
            onChange={(e) => setSearchTerm(e.target.value)}
            isClearable
            onClear={() => setSearchTerm("")}
          />
        </div>
      </div>

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
