import DEForm from "@/src/components/ui/Form/DEForm";
import MyInp from "@/src/components/ui/Form/MyInp";
import MyUpload from "@/src/components/ui/Form/MyUpload";
import {
  useCreateSpecialty,
  useUpdateSpecialty,
} from "@/src/hooks/specialty.hook";
import { specialtyValidationSchema } from "@/src/schemas/specialty.schema";
import { TSpecialty } from "@/src/types/specialty";
import { EditOutlined } from "@ant-design/icons";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

const SpecialtyModal = ({
  updatedSpecialty,
  refetchSpecialties,
}: {
  updatedSpecialty?: TSpecialty | null;
  refetchSpecialties?: () => void;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    mutate: createSpecialty,
    isPending: isPendingCreateSpecialty,
    isSuccess: isSuccessCreateSpecialty,
    isError: isCreateSpecialtyError,
    error: createError,
  } = useCreateSpecialty();
  const {
    mutate: updateSpecialty,
    isSuccess: isSuccessUpdateSpecialty,
    isPending: isPendingUpdateSpecialty,
    isError: isUpdateSpecialtyError,
    error: updateError,
  } = useUpdateSpecialty();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { icon, ...restData } = data;
    if (!updatedSpecialty?.icon && !selectedFile) {
      toast.warning("Please upload a specialty icon");
      return;
    }
    const formData = new FormData();

    formData.append("data", JSON.stringify(updatedSpecialty ? restData : data));
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    if (updatedSpecialty?._id) {
      updateSpecialty(
        { id: updatedSpecialty._id, payload: formData }
      );
      return;
    }

    createSpecialty(formData, {
      onSuccess: () => {
        refetchSpecialties?.();
        toast.success("Specialty created successfully");
      },
    });
  };

  useEffect(() => {
    if (isSuccessCreateSpecialty || isSuccessUpdateSpecialty) {
      onOpenChange();
    }
    if (isCreateSpecialtyError || isUpdateSpecialtyError) {
      toast.error(
        createError?.message ||
          updateError?.message ||
          "Failed to create/update specialty"
      );
    }
  }, [
    isSuccessCreateSpecialty,
    isSuccessUpdateSpecialty,
    isCreateSpecialtyError,
    isUpdateSpecialtyError,
    createError,
    updateError,
  ]);

  return (
    <>
      {updatedSpecialty ? (
        <Button
          color="primary"
          className="text-primary bg-opacity-20 hover:scale-[1.07]"
          isIconOnly
          startContent={<EditOutlined />}
          onPress={onOpen}
        />
      ) : (
        <Button color="primary" onPress={onOpen} className="text-white">
          Add Specialty
        </Button>
      )}
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {updatedSpecialty ? "Update Specialty" : "Add Specialty"}
              </ModalHeader>
              <ModalBody>
                <DEForm
                  onSubmit={onSubmit}
                  resolver={zodResolver(
                    specialtyValidationSchema.createSpecialtySchema
                  )}
                  defaultValues={updatedSpecialty}
                >
                  <div className="w-full bg-slate-50 px-2 py-14 rounded xl:rounded-none xl:rounded-l shadow">
                    <div className="mb-8 space-y-1">
                      <h2 className="text-primary font-semibold">
                        {updatedSpecialty
                          ? "Update Specialty"
                          : "Add Specialty"}
                      </h2>
                      <p className="text-gray-700 text-sm">
                        {updatedSpecialty
                          ? "Update the existing specialty"
                          : "Add a new specialty to the system"}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <MyInp type="text" name="name" label="Name" />
                      <MyInp
                        type="textarea"
                        name="description"
                        label="Description"
                      />

                      {/* experiment upload */}
                      <MyUpload
                        setSelectedFile={setSelectedFile}
                        previewUrl={previewUrl}
                        setPreviewUrl={setPreviewUrl}
                        defaultValue={updatedSpecialty?.icon}
                        height={130}
                        width={160}
                        align="center"
                        placeholder="Upload specialty Icon"
                      />

                      <Button
                        isLoading={
                          isPendingCreateSpecialty || isPendingUpdateSpecialty
                        }
                        type="submit"
                        color="primary"
                        className="text-white w-full"
                      >
                        {updatedSpecialty
                          ? "Update Specialty"
                          : "Add Specialty"}
                      </Button>
                    </div>
                  </div>
                </DEForm>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SpecialtyModal;
