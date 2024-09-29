"use client";
import { FileUploadIcon } from "@/src/assets/img/icons";
import Container from "@/src/components/ui/Container";
import DEForm from "@/src/components/ui/Form/DEForm";
import MyInp from "@/src/components/ui/Form/MyInp";
import { useCreateSpecialty } from "@/src/hooks/specialty.hook";
import { specialtyValidationSchema } from "@/src/schemas/specialty.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import React from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

const SpecialtyPage = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);

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

  return (
    <div className="min-h-screen  flex items-center justify-center my-28 md:my-0">
      <Container className="w-full xl:w-3/6 mx-auto">
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
      </Container>
    </div>
  );
};

export default SpecialtyPage;
