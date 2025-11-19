"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { toast } from "sonner";
import { TPatient } from "@/src/types/user";
import { SafetyOutlined } from "@ant-design/icons";
import { useMakePatientAdmin } from "@/src/hooks/patient.hook";
import { useGetAllAppointments } from "@/src/hooks/appointment.hook";
import { Tooltip } from "@heroui/tooltip";

interface MakeAdminModalProps {
  patient: TPatient;
  refetch: () => void;
}

const MakePatientToAdminModal = ({ patient, refetch }: MakeAdminModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: makePatientAdmin, isPending: isMakePatientAdminLoading } =
    useMakePatientAdmin();
  const { data: appointments, isLoading: isLoadingAppointments } =
    useGetAllAppointments([
      {
        name: "patient",
        value: patient?._id,
      },
    ]);
  console.log(appointments, patient.name, patient._id);

  const handleConfirm = () => {
    makePatientAdmin(patient._id, {
      onSuccess: (data) => {
        if (data?.success) {
          toast.success(
            data?.message || "Patient promoted to admin successfully!"
          );
          refetch();
          setIsOpen(false);
        } else {
          toast.error(data?.message || "Failed to make admin!");
        }
      },
      onError: (err) => {
        toast.error(err?.message || "Failed to make admin!");
      },
    });
  };
  const hasAppointments = appointments?.meta?.total;

  return (
    <>
      <Tooltip
        content={
          hasAppointments
            ? "Cannot make admin — patient has appointments"
            : "Make this patient an admin"
        }
      >
        <Button
          color="primary"
          className={`${
            (hasAppointments || isLoadingAppointments) && "opacity-50"
          } text-white`}
          variant="shadow"
          onPress={() =>
            !hasAppointments && !isLoadingAppointments && setIsOpen(true)
          }
          disabled={hasAppointments || isLoadingAppointments}
        >
          <SafetyOutlined style={{ fontSize: 16 }} />
          Make Admin
        </Button>
      </Tooltip>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <ModalContent>
          <ModalHeader>Confirm Promotion</ModalHeader>
          <ModalBody>
            Are you sure you want to make{" "}
            <span className="font-semibold">{patient?.name}</span> an admin?
          </ModalBody>
          <ModalFooter>
            <Button
              variant="flat"
              onPress={() => setIsOpen(false)}
              disabled={isMakePatientAdminLoading}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onPress={handleConfirm}
              isLoading={isMakePatientAdminLoading}
              className="text-white"
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MakePatientToAdminModal;
