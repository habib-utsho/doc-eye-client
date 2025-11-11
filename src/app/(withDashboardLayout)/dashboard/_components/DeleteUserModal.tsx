import { DeleteIcon } from "@/src/components/ui/icons";
import { TSpecialty } from "@/src/types/specialty";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import React, { useEffect } from "react";

const DeleteUserModal = ({
  id,
  handler,
  isLoading,
  isSuccess,
  deleteType,
  disabled,
}: {
  id: string;
  handler: (id: string) => void;
  isLoading: boolean;
  isSuccess: boolean;
  deleteType: string;
  disabled?: boolean;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (isSuccess && isOpen) {
      onOpenChange();
    }
  }, [isSuccess]);
  return (
    <>
      <Button
        color="danger"
        className={`${
          disabled && "pointer-events-none opacity-50"
        } text-danger bg-opacity-20 hover:scale-[1.07]`}
        isIconOnly
        startContent={<DeleteIcon />}
        isLoading={isLoading}
        onPress={onOpen}
        disabled={disabled}
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete {deleteType}
              </ModalHeader>
              <ModalBody>
                Are you sure you want to delete this {deleteType}?
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    handler(id);
                  }}
                  isLoading={isLoading}
                  className="text-white"
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteUserModal;
