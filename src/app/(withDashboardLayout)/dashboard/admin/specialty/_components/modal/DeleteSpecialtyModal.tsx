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
import React, { useEffect, useState } from "react";
const DeleteSpecialtyModal = ({
  id,
  handler,
  isLoading,
  isSuccess,
}: {
  id: string;
  handler: (id: string) => void;
  isLoading: boolean;
  isSuccess: boolean;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [closeModal, setCloseModal] = useState<(() => void) | null>(null);

  // Close modal after success
  useEffect(() => {
    if (isSuccess && closeModal) {
      closeModal();
    }
  }, [isSuccess, closeModal]);

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
          {(onClose) => {
            // store stable onClose function
            if (!closeModal) setCloseModal(() => onClose);

            return (
              <>
                <ModalHeader>Delete specialty</ModalHeader>

                <ModalBody>
                  Are you sure you want to delete this specialty?
                </ModalBody>

                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>

                  <Button
                    color="primary"
                    onPress={() => handler(id)}
                    isLoading={isLoading}
                    className="text-white"
                  >
                    Delete
                  </Button>
                </ModalFooter>
              </>
            );
          }}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteSpecialtyModal;
