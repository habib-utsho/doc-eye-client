"use client";
import VideoCall from "@/src/app/(withDashboardLayout)/dashboard/_components/VideoCall";
import { useInitPayment } from "@/src/hooks/payment.hook";
import { TAppointmentType } from "@/src/types/appointment";
import { TDecodedUser, TDoctor, TPatient } from "@/src/types/user";
import { DollarOutlined } from "@ant-design/icons";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
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
  paymentType: "bKash" | "SSLCOMMERZ" | "aamarPay";
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
  patient: TPatient;
  doctor: TDoctor;
  paymentMethod: "bKash" | "SSLCOMMERZ" | "aamarPay";
  refetchAppointments: () => void;
};
const PaymentModal: React.FC<TPaymentModalProps> = ({
  paymentType,
  amount,
  isDisabled,
  activeDate,
  activeTime,
  patient,
  doctor,
  refetchAppointments,
  paymentMethod,
  isAvailableNow,
}) => {
  const router = useRouter();
  const { mutate: initPayment, isPending: isLoadingInitPayment } =
    useInitPayment();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // const {
  //   isOpen: isRedirectModalOpen,
  //   onOpen: openRedirectModal,
  //   onClose: closeRedirectModal,
  // } = useDisclosure();

  const handlePaymentFunc = () => {
    if (!isAvailableNow && !activeDate) {
      toast.error("Please select a date");
      return;
    }

    if (!isAvailableNow && !activeTime) {
      toast.error("Please select a time");
      return;
    }
    if (!patient) {
      toast.error("Please select a patient");
      return;
    }
    if (!doctor) {
      toast.error("Please select a doctor");
      return;
    }

    const payload = {
      doctor: doctor._id,
      patient: patient._id,
      // doctorCode: doctor.doctorCode,
      name: patient.name,
      email: patient.email,
      phone: patient.phone,

      // schedule: isAvailableNow
      //   ? new Date().toISOString()
      //   : activeDate + "T" + activeTime + ":00Z",
      schedule: isAvailableNow
        ? moment().format() // current time in local timezone as ISO 8601 string
        : moment(`${activeDate} ${activeTime}`, "YYYY-MM-DD HH:mm").format(),
      appointmentType: "online" as TAppointmentType,
      amount,
      paymentMethod,
      status: isAvailableNow ? "confirmed" : "pending",
    };

    // return;

    initPayment(payload, {
      onSuccess: (data) => {
        console.log(data);
        if (data?.success) {
          toast.success(data?.message || "Payment successful!");
          console.log(data, data?.data?.payment_url);
          window.location.href = data?.data?.payment_url;

          // Open redirect confirmation modal
          // refetchAppointments();
          // onOpenChange();

          // openRedirectModal();
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
        {paymentType === "bKash"
          ? "Pay with bKash"
          : paymentType === "SSLCOMMERZ"
          ? "Pay with SSLCOMMERZ"
          : paymentType === "aamarPay"
          ? "Pay with Aamar Pay"
          : "Pay Now"}
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="opaque"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
        className="max-w-3xl"
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
              <ModalHeader className="flex flex-col gap-1 border-b pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <DollarOutlined className="text-2xl text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Confirm Payment
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Review details before proceeding
                    </p>
                  </div>
                </div>
              </ModalHeader>

              {/* Modal Body */}
              <ModalBody className="py-6 space-y-4">
                {/* Appointment Details */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Appointment Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Doctor:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {doctor.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Patient:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {patient.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Schedule:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {isAvailableNow
                          ? "Now (Instant Consultation)"
                          : `${moment(activeDate).format(
                              "DD MMM, YYYY"
                            )} at ${activeTime}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Type:
                      </span>
                      <span className="font-medium text-primary">
                        Online Consultation
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Breakdown */}
                <div className="bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-lg p-4 space-y-3 border border-primary/10">
                  <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Payment Breakdown
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Consultation Fee:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        ৳{amount.consultationFee}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Platform Fee:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        ৳{amount.platformFee}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        VAT (15%):
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        ৳{amount.vat}
                      </span>
                    </div>
                    <Divider className="my-2" />
                    <div className="flex justify-between text-base font-bold">
                      <span className="text-gray-900 dark:text-white">
                        Total Amount:
                      </span>
                      <span className="text-primary text-lg">
                        ৳{amount.total}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2">
                    <DollarOutlined className="text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      Payment Method:
                    </span>
                  </div>
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    {paymentType}
                  </span>
                </div>

                {/* Info Alert */}
                <Alert
                  color="warning"
                  variant="flat"
                  title="Payment Notice"
                  description="You will be redirected to the payment gateway to complete your transaction securely."
                  className="text-xs"
                />
              </ModalBody>

              {/* Modal Footer */}
              <ModalFooter className="border-t pt-4 flex justify-between">
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    handlePaymentFunc();
                  }}
                  isLoading={isLoadingInitPayment}
                  className="text-white font-semibold px-8"
                  size="lg"
                  startContent={!isLoadingInitPayment && <DollarOutlined />}
                >
                  {isLoadingInitPayment
                    ? "Processing..."
                    : `Pay ৳${amount.total}`}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Redirect modal -- unused */}
      {/* <Modal isOpen={isRedirectModalOpen} onOpenChange={closeRedirectModal}>
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
                {isAvailableNow ? (
                  <p>
                    You can now start your consultation. <br />
                    <br />
                    <Divider className="mb-6" />
                    <Alert
                      color={"danger"}
                      className="text-warning bg-warning bg-opacity-5"
                      title={`*This will open Jitsi Meet in a new tab. Doctor
                      should be start the call first for control.`}
                    />
                  </p>
                ) : (
                  <p className="text-sm">
                    Your appointment has been confirmed. Would you like to view
                    your upcoming appointments now?
                  </p>
                )}
              </ModalBody>

              <ModalFooter>
                {isAvailableNow ? (
                  <VideoCall from="patient" doctor={doctor} patient={patient} />
                ) : (
                  <div className="flex justify-center gap-4">
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
                  </div>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal> */}
    </>
  );
};

export default PaymentModal;
