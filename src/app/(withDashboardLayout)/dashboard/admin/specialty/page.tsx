"use client";
import { SearchIcon } from "@/src/components/ui/icons";
import {
  useDeleteSpecialty,
  useGetAllSpecialties,
} from "@/src/hooks/specialty.hook";
import { Image } from "@heroui/image";
import React, { useState } from "react";
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { TSpecialty } from "@/src/types/specialty";
import { Pagination } from "@heroui/pagination";
import { Spinner } from "@heroui/spinner";
import { Input } from "@heroui/input";
import useDebounce from "@/src/hooks/useDebounce";
import SpecialtyModal from "./_components/modal/SpecialtyModal";
import DeleteSpecialtyModal from "./_components/modal/DeleteSpecialtyModal";

const SpecialtyPage = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearch = useDebounce(searchTerm, 500);

  const { data: specialties, isLoading: isLoadingSpecialties } =
    useGetAllSpecialties([
      { name: "page", value: pagination.page },
      { name: "limit", value: pagination.limit },
      ...(debounceSearch
        ? [{ name: "searchTerm", value: debounceSearch }]
        : []),
    ]);

  const {
    mutate: deleteSpecialtyMutate,
    isPending: isLoadingDeleteSpecialty,
    isSuccess: isSuccessDeleteSpecialty,
  } = useDeleteSpecialty();

  const rows = specialties?.data?.map((specialty: TSpecialty, ind: number) => {
    return {
      key: ind,
      ind: ind + 1,
      name: specialty.name,
      isDeleted: specialty.isDeleted,
      icon: (
        <Image
          src={specialty.icon}
          alt={specialty.name}
          width={50}
          height={50}
        />
      ),
      description: specialty.description,
      actions: (
        <div className="flex items-center gap-1">
          <SpecialtyModal updatedSpecialty={specialty} />
          <DeleteSpecialtyModal
            id={specialty?._id}
            handler={deleteSpecialtyMutate}
            isLoading={isLoadingDeleteSpecialty}
            isSuccess={isSuccessDeleteSpecialty}
          />
        </div>
      ),
    };
  });

  const columns = [
    {
      key: "ind",
      label: "Sl",
    },
    {
      key: "name",
      label: "Name",
    },
    {
      key: "icon",
      label: "Icon",
    },
    {
      key: "description",
      label: "Description",
    },
    {
      key: "actions",
      label: "Actions",
    },
  ];

  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center mb-8 gap-4">
        <div className="flex items-center gap-2">
          <Input
            name="search"
            startContent={<SearchIcon />}
            placeholder="Search specialty..."
            onChange={(e) => setSearchTerm(e.target.value)}
            isClearable
            onClear={() => setSearchTerm("")}
          />
        </div>

        <SpecialtyModal />
      </div>

      {/* Specialties */}
      <Table
        className="mt-5"
        color="primary"
        aria-label="Example static collection table"
        bottomContent={
          specialties?.meta?.page > 0 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={pagination.page}
                total={specialties?.meta?.totalPage}
                onChange={(page) => setPagination({ ...pagination, page })}
              />
            </div>
          ) : null
        }
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          isLoading={isLoadingSpecialties}
          emptyContent={
            <h2 className="text-primary font-bold text-2xl">
              No specialties found!
            </h2>
          }
          items={rows || []}
          loadingContent={<Spinner />}
        >
          {(item: TSpecialty) => (
            <TableRow
              key={item.name}
              className={`${
                item.isDeleted
                  ? "bg-red-50 pointer-events-none blur-[.6px]"
                  : ""
              }`}
            >
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SpecialtyPage;
