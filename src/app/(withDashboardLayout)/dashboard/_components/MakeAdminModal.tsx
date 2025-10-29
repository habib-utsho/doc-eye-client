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
import { TPatient, TUser } from "@/src/types/user";
import { FaShield } from "react-icons/fa6";
import {
  useMakePatientAdmin,
  useUpdatePatientById,
} from "@/src/hooks/patient.hook";

interface MakeAdminModalProps {
  patient: TPatient;
  refetch: () => void;
}

const MakeAdminModal = ({ patient, refetch }: MakeAdminModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: makePatientAdmin, isPending: isMakePatientAdminLoading } =
    useMakePatientAdmin();

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

  return (
    <>
      <Button
        color="primary"
        className="text-white"
        variant="shadow"
        onPress={() => setIsOpen(true)}
      >
        <FaShield size={16} />
        Make Admin
      </Button>

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

export default MakeAdminModal;
