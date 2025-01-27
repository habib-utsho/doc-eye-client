"use client";
import { useGetAllAdmin } from "@/src/hooks/admin.hook";
import useDebounce from "@/src/hooks/useDebounce";
import React, { useState } from "react";
import DETable from "../../_components/DETable";
import { Button } from "@heroui/button";

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
  return (
    <div>
      Admin list
      {/* <DETable data={admins} isLoading={isLoadingAdmins} /> */}
      <Button className=" bg-gradient-to-r from-green-500 to-red-500">
        atest
      </Button>
    </div>
  );
};

export default AdminsPage;
