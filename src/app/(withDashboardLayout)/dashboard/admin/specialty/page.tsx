"use client";
import { FileUploadIcon } from "@/src/components/ui/icons";
import Container from "@/src/components/ui/Container";
import DEForm from "@/src/components/ui/Form/DEForm";
import MyInp from "@/src/components/ui/Form/MyInp";
import {
  useCreateSpecialty,
  useGetAllSpecialties,
} from "@/src/hooks/specialty.hook";
import { specialtyValidationSchema } from "@/src/schemas/specialty.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import React, { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
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

const SpecialtyPage = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });

  const { data: specialties, isLoading: isLoadingSpecialties } =
    useGetAllSpecialties([
      { name: "page", value: pagination.page },
      { name: "limit", value: pagination.limit },
    ]);

  const {
    mutate: createSpecialty,
    data,
    isPending,
    isSuccess,
    error,
  } = useCreateSpecialty();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file) {
      setFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log({ ...data, icon: file });
    if (!file) {
      toast.warning("Please upload an icon");
      return;
    }
    const formData = new FormData();

    formData.append("data", JSON.stringify(data));
    formData.append("file", file);

    createSpecialty(formData);
  };

  console.log({ specialties, isLoadingSpecialties });
  const rows = specialties?.data?.map((specialty: TSpecialty, ind: number) => {
    return {
      key: ind,
      name: specialty.name,
      icon: (
        <Image
          src={specialty.icon}
          alt={specialty.name}
          width={50}
          height={50}
        />
      ),
      description: specialty.description,
    };
  });

  const columns = [
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
  ];

  return (
    <div className="min-h-screen flex items-center justify-center my-28 md:my-0">
      <div className="w-full px-4">
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
            items={rows || []}
            loadingContent={<Spinner />}
          >
            {(item: TSpecialty) => (
              <TableRow key={item.name} className="cursor-pointer">
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>

        <DEForm
          onSubmit={onSubmit}
          resolver={zodResolver(
            specialtyValidationSchema.createSpecialtySchema
          )}
        >
          <div className="w-full bg-slate-50 px-8 py-14 rounded xl:rounded-none xl:rounded-l shadow">
            <div className="mb-8 space-y-1">
              <h2 className="text-primary font-semibold">Add Specialty</h2>
              <p className="text-gray-700 text-sm">
                Add a new specialty to the system
              </p>
            </div>

            <div className="space-y-4">
              <MyInp type="text" name="name" label="Name" />
              <MyInp type="textarea" name="description" label="Description" />

              {/* Icon upload */}
              <div>
                <label
                  htmlFor="specialtyIcon"
                  className="bg-gradient-to-r from-gray-100 to-gray-300 cursor-pointer shadow rounded block"
                >
                  <div className="flex items-center justify-center gap-2 h-[120px] w-full">
                    <FileUploadIcon className="text-black text-xl" />
                    <span className="text-black">Upload Icon</span>
                  </div>
                </label>
                <input
                  className="opacity-0 h-0"
                  id="specialtyIcon"
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                />
              </div>
              {/* Preview Section */}
              {preview && (
                <div className="my-2">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Preview:
                  </p>
                  <Image
                    src={preview}
                    alt="Icon Preview"
                    className="max-h-40 rounded border border-gray-300"
                  />
                </div>
              )}

              <Button
                isLoading={isPending}
                type="submit"
                color="primary"
                className="text-white"
              >
                Add specialty
              </Button>
            </div>
          </div>
        </DEForm>
      </div>
    </div>
  );
};

export default SpecialtyPage;
