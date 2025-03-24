"use client";
import React, { useState } from "react";
import Image from "next/image";
import moment from "moment";
import { XMarkIcon } from "@/src/components/ui/icons";
import { Button } from "@heroui/button";
import {
  CheckCircleOutlined,
  EyeOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { firstLetterCapital } from "@/src/utils/firstLetterCapital";
import { TPayment } from "@/src/types/payment";
import { useGetAllPayment } from "@/src/hooks/payment.hook";
import DETable from "./DETable";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { TAppointment } from "@/src/types/appointment";

const PaymentHistory = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [selectedAppointment, setSelectedAppointment] =
    useState<TAppointment | null>(null);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data: payments, isLoading: isLoadingPayments } = useGetAllPayment([
    { name: "page", value: pagination.page },
    { name: "limit", value: pagination.limit },
  ]);

  const rows = payments?.data?.map((payment: TPayment, ind: number) => ({
    _id: payment?._id,
    sl: ind + 1,
    doctorInfo: (
      <div className="flex items-center gap-1">
        <Image
          src={payment?.doctor?.profileImg}
          width={60}
          height={60}
          alt={payment?.doctor?.name}
          className="rounded-full h-[60px] w-[60px]"
        />
        <div>
          {payment?.doctor?.name} ({payment?.doctor?.doctorTitle})
        </div>
      </div>
    ),
    patientInfo: (
      <div className="flex items-center gap-1">
        <Image
          src={payment?.patient?.profileImg}
          width={50}
          height={50}
          alt={payment?.patient?.name}
          className="rounded-full h-[50px] w-[50px]"
        />
        <div>{payment?.patient?.name}</div>
      </div>
    ),
    amount: `${payment?.amount.toFixed(2)} BDT`,
    paymentMethod: payment?.paymentMethod,
    status: (
      <Button
        disabled
        startContent={
          payment.status === "confirmed" ? (
            <CheckCircleOutlined />
          ) : payment.status === "canceled" ? (
            <XMarkIcon />
          ) : (
            <WarningOutlined />
          )
        }
        color={
          payment.status === "confirmed"
            ? "success"
            : payment.status === "canceled"
            ? "danger"
            : "warning"
        }
        className="opacity-50 pointer-events-none text-white"
      >
        {firstLetterCapital(payment.status)}
      </Button>
    ),
    appointment: (
      <Button
        onPress={() => {
          setSelectedAppointment(payment.appointment);
          onOpen();
        }}
        isIconOnly
        startContent={<EyeOutlined />}
      />
    ),
    createdAt: moment(payment?.createdAt).format("DD-MMM-YYYY"),
  }));

  const columns = [
    { key: "sl", label: "SL" },
    { key: "doctorInfo", label: "Doctor" },
    { key: "patientInfo", label: "Patient" },
    { key: "amount", label: "Amount" },
    { key: "paymentMethod", label: "Method" },
    { key: "status", label: "Status" },
    { key: "appointment", label: "Appointment" },
    { key: "createdAt", label: "Date" },
  ];

  return (
    <div className="w-full p-4">
      <DETable
        data={payments}
        isLoading={isLoadingPayments}
        columns={columns}
        rows={rows}
        pagination={pagination}
        setPagination={setPagination}
        notFoundMessage="No payments found"
      />

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Appointment Details
          </ModalHeader>
          <ModalBody>
            {selectedAppointment ? (
              <div className="border rounded-lg p-6 space-y-4 bg-gray-50 dark:bg-gray-800 shadow-md">
                <div className="flex flex-col gap-2">
                  <div className="text-lg font-semibold">
                    {firstLetterCapital(selectedAppointment?.appointmentType)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Scheduled on{" "}
                    {moment
                      .utc(selectedAppointment?.schedule)
                      .format("DD-MMM-YYYY hh:mm A")}
                  </div>
                </div>
                <div className="flex items-center justify-between bg-white dark:bg-black p-4 rounded-md shadow-sm">
                  <strong>Status:</strong>
                  <span className="text-primary">
                    {firstLetterCapital(selectedAppointment?.status)}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white dark:bg-black rounded-md shadow-sm">
                  <strong>Symptoms:</strong>
                  <p className="text-gray-600 dark:text-gray-300">
                    {selectedAppointment?.symptoms || "N/A"}
                  </p>
                </div>
              </div>
            ) : (
              <p>No appointment details available.</p>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PaymentHistory;
