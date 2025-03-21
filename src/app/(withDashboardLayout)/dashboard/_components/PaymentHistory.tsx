"use client";
import useDebounce from "@/src/hooks/useDebounce";
import React, { useState } from "react";
import Image from "next/image";
import moment from "moment";
import { Input } from "@heroui/input";
import { SearchIcon, XMarkIcon } from "@/src/components/ui/icons";
import { Button } from "@heroui/button";
import { CheckCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { firstLetterCapital } from "@/src/utils/firstLetterCapital";
import { TPayment } from "@/src/types/payment";
import { useGetAllPayment } from "@/src/hooks/payment.hook";
import DETable from "./DETable";

const PaymentHistory = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearch = useDebounce(searchTerm, 500);

  const { data: payments, isLoading: isLoadingPayments } = useGetAllPayment([
    { name: "searchTerm", value: debounceSearch },
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
    createdAt: moment(payment?.createdAt).format("DD-MMM-YYYY"),
  }));

  const columns = [
    { key: "sl", label: "SL" },
    { key: "doctorInfo", label: "Doctor" },
    { key: "patientInfo", label: "Patient" },
    { key: "amount", label: "Amount" },
    { key: "paymentMethod", label: "Method" },
    { key: "status", label: "Status" },
    { key: "createdAt", label: "Date" },
  ];

  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center mb-4 xl:mb-6 gap-4">
        <div className="flex items-center gap-2">
          <Input
            name="search"
            startContent={<SearchIcon />}
            placeholder="Search payments..."
            onChange={(e) => setSearchTerm(e.target.value)}
            isClearable
            onClear={() => setSearchTerm("")}
          />
        </div>
      </div>

      <DETable
        data={payments}
        isLoading={isLoadingPayments}
        columns={columns}
        rows={rows}
        pagination={pagination}
        setPagination={setPagination}
        notFoundMessage="No payments found"
      />
    </div>
  );
};

export default PaymentHistory;
