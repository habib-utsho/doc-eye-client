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

const DeleteModal = ({
  id,
  handler,
  isLoading,
  isSuccess,
  deleteType,
}: {
  id: string;
  handler: (id: string) => void;
  isLoading: boolean;
  isSuccess: boolean;
  deleteType: string;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (isSuccess) {
      onOpenChange();
    }
  }, [isSuccess]);
  return (
    <>
      <Button
        color="danger"
        className="text-danger bg-opacity-20 hover:scale-[1.07]"
        isIconOnly
        startContent={<DeleteIcon />}
        isLoading={isLoading}
        onPress={onOpen}
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

export default DeleteModal;
