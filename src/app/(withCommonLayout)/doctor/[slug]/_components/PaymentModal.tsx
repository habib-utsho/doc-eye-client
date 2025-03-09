"use client";
import { DollarOutlined } from "@ant-design/icons";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import React from "react";

type TPaymentModalProps = {
  paymentType: "bKash" | "SSLCOMMERZ";
  handlePaymentFunc: () => void;
  amount: number;
  isDisabled?: boolean;
  isLoading?: boolean;
};
const PaymentModal: React.FC<TPaymentModalProps> = ({
  paymentType,
  handlePaymentFunc,
  amount,
  isDisabled,
  isLoading,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        className={`text-white w-full !mt-3 ${
          isDisabled ? "opacity-20 pointer-events-none" : ""
        }`}
        color="primary"
        startContent={<DollarOutlined />}
        onPress={() => !isDisabled && onOpen()}
        disabled={isDisabled}
      >
        {paymentType === "bKash" ? "Pay with bKash" : "Pay with SSLCOMMERZ"}
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="opaque"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              {/* Modal Header */}
              <ModalHeader className="text-lg font-semibold text-gray-900">
                Confirm Payment
              </ModalHeader>

              {/* Modal Body */}
              <ModalBody className="text-gray-700">
                <p className="text-sm">
                  You are about to make a payment using <b>{paymentType}</b>.
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  *This is a dummy payment simulation.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    handlePaymentFunc();
                  }}
                  isLoading={isLoading}
                  className="text-white"
                >
                  Pay {amount} BDT
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PaymentModal;
