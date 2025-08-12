"use client";
import { useInitPayment } from "@/src/hooks/payment.hook";
import { TAppointmentType } from "@/src/types/appointment";
import { TDecodedUser, TDoctor } from "@/src/types/user";
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
import moment from "moment";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

type TPaymentModalProps = {
  paymentType: "bKash" | "SSLCOMMERZ";
  amount: {
    consultationFee: number;
    vat: number;
    platformFee: number;
    total: number;
  };
  isDisabled?: boolean;
  activeDate: string | null;
  activeTime: string | null;
  isAvailableNow: boolean;
  user: TDecodedUser | null;
  doctor: TDoctor | null;
  refetchAppointments: () => void;
};
const PaymentModal: React.FC<TPaymentModalProps> = ({
  paymentType,
  amount,
  isDisabled,
  activeDate,
  activeTime,
  user,
  doctor,
  refetchAppointments,
  isAvailableNow,
}) => {
  const router = useRouter();
  const { mutate: initPayment, isPending: isLoadingInitPayment } =
    useInitPayment();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isRedirectModalOpen,
    onOpen: openRedirectModal,
    onClose: closeRedirectModal,
  } = useDisclosure();

  const handlePaymentFunc = () => {
    if (!isAvailableNow && !activeDate) {
      toast.error("Please select a date");
      return;
    }

    if (!isAvailableNow && !activeTime) {
      toast.error("Please select a time");
      return;
    }
    if (!user) {
      toast.error("Please select a patient");
      return;
    }
    if (!doctor) {
      toast.error("Please select a doctor");
      return;
    }

    const payload = {
      doctor: doctor._id,
      patient: user._id,
      // schedule: isAvailableNow
      //   ? new Date().toISOString()
      //   : activeDate + "T" + activeTime + ":00Z",
      schedule: isAvailableNow
        ? moment().format() // current time in local timezone as ISO 8601 string
        : moment(`${activeDate} ${activeTime}`, "YYYY-MM-DD HH:mm").format(),
      appointmentType: "online" as TAppointmentType,
      amount,
      paymentMethod: paymentType,
    };

    console.log({ payload });

    // return;

    initPayment(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          toast.success(data?.message || "Payment successful!");
          refetchAppointments();
          onOpenChange();

          // Open redirect confirmation modal
          openRedirectModal();
        } else {
          toast.error(data?.message || "Failed to payment!");
        }
      },
      onError: (error) => {
        toast.error(error?.message || "Failed to payment!");
      },
    });
  };
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
                  isLoading={isLoadingInitPayment}
                  className="text-white"
                >
                  Pay {amount.total} BDT
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Redirect modal */}
      <Modal isOpen={isRedirectModalOpen} onOpenChange={closeRedirectModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center justify-center flex-col gap-2 text-center">
                <span className="text-green-500 text-5xl">✅</span>
                <span className="text-xl font-bold text-gray-900">
                  Payment Successful!
                </span>
              </ModalHeader>

              <ModalBody className="text-center text-gray-700">
                <p className="text-sm">
                  Your appointment has been confirmed. Would you like to view
                  your upcoming appointments now?
                </p>
              </ModalBody>

              <ModalFooter className="flex justify-center gap-4">
                <Button color="secondary" variant="light" onPress={onClose}>
                  Stay Here
                </Button>
                <Button
                  color="primary"
                  className="text-white"
                  onPress={() => {
                    router.push(
                      isAvailableNow
                        ? "/dashboard/patient/expired-appointments"
                        : "/dashboard/patient/upcoming-appointments"
                    );
                  }}
                >
                  Go to Appointments
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
