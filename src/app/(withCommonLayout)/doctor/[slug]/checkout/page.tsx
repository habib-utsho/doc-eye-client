"use client";
import Container from "@/src/components/ui/Container";
import {
  ArrowLeftOutlined,
  DollarCircleOutlined,
  UserAddOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { Badge } from "@heroui/badge";
import Image from "next/image";
import React, { useState } from "react";

import Appointments from "../_components/Appointments";
import { Button } from "@heroui/button";
import bKashLogo from "@/src/assets/img/payment/bkash_logo.png";
import sslcommerzLogo from "@/src/assets/img/payment/sslcommerz_logo.png";
import { Radio, RadioGroup } from "@heroui/radio";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useGetDoctorByDoctorCode } from "@/src/hooks/doctor.hook";
import useUserData from "@/src/hooks/user.hook";
import Loading from "@/src/components/ui/Loading";
import { TDoctor } from "@/src/types/user";
import PaymentModal from "../_components/PaymentModal";
import { useGetAllAppointments } from "@/src/hooks/appointment.hook";
import Link from "next/link";
import { Alert } from "@heroui/alert";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { FaUserDoctor } from "react-icons/fa6";
import { CiMedicalCross } from "react-icons/ci";
import { useGetPatientById } from "@/src/hooks/patient.hook";

const DoctorCheckout = () => {
  const params = useParams() as { slug: string };
  const searchParams = useSearchParams();
  const isAvailableNow = searchParams.get("isAvailableNow") === "true";
  const { data: doctorRes, isLoading: isDoctorLoading } =
    useGetDoctorByDoctorCode(params?.slug);
  const doctor = doctorRes?.data as TDoctor;
  const { isLoading: isUserLoading, user } = useUserData();
  const pathname = usePathname();
  const router = useRouter();

  const [activePaymentMethod, setActivePaymentMethod] = useState<
    "bKash" | "SSLCOMMERZ"
  >("bKash");

  const [activeDate, setActiveDate] = useState<string | null>(null);
  const [activeTime, setActiveTime] = useState<string | null>(null);

  const {
    data: appointments,
    isLoading: isLoadingAppointments,
    refetch: refetchAppointments,
  } = useGetAllAppointments([
    { name: "doctor", value: doctor?._id },
    { name: "date", value: activeDate },
    { name: "limit", value: 250 }, //TODO: change this limit - break paginate or separate API
  ]);

  const { data: patient, isLoading: isPatientLoading } = useGetPatientById(
    user?._id || ""
  );

  // console.log({
  //   id: params.slug,
  //   activeDate,
  //   searchParams,
  //   isAvailableNow,
  //   isUserLoading,
  //   user,
  //   isDoctorLoading,
  //   doctor,
  // });

  if (isDoctorLoading || isUserLoading || isPatientLoading) return <Loading />;

  const vat5Percent = Math.round((doctor?.consultationFee / 100) * 5);
  const totalAmount =
    vat5Percent +
    doctor?.consultationFee +
    Number(process.env.NEXT_PUBLIC_PER_CONSULTATION_SERVICE_FEE!!);

  console.log(patient);

  return (
    <div className="py-6 bg-slate-50 dark:bg-gray-900">
      {user?.role && user?.role != "patient" && (
        <Container className="mb-4">
          <Alert
            color={"danger"}
            className="text-warning bg-warning bg-opacity-5"
            title={`Only patient can access this route`}
          />
        </Container>
      )}
      <div
        className={` space-y-4 md:space-y-8 bg-slate-50 dark:bg-gray-900
           ${
             user?.role && user?.role != "patient"
               ? "pointer-events-none opacity-50"
               : ""
           }
        `}
      >
        <Container className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-7 space-y-4">
            {/* Patient selection */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm space-y-3">
              <Button
                className="h-[30px] !w-[55px] min-w-0 !px-2 "
                startContent={<ArrowLeftOutlined />}
                onPress={() => router.back()}
              />
              <h1 className="font-semibold text-lg">
                <UserAddOutlined /> Patient Selection
              </h1>
              <div className="flex flex-wrap items-center gap-4">
                {user?.profileImg ? (
                  <Image
                    src={user?.profileImg}
                    alt={user?.name}
                    width={80}
                    height={80}
                    className="border-2 rounded-md h-[80px] w-[80px]"
                  />
                ) : (
                  ""
                )}
                <div>
                  <h2>{user?.name}</h2>
                </div>
              </div>
            </div>

            <Appointments
              appointments={appointments?.data}
              isLoadingAppointments={isLoadingAppointments}
              doctor={doctor}
              isAvailableNow={isAvailableNow}
              activeDate={activeDate}
              setActiveDate={setActiveDate}
              activeTime={activeTime}
              setActiveTime={setActiveTime}
            />

            {/* Type of consultation */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm space-y-3">
              <h1 className="font-semibold text-md flex gap-1 items-center">
                {" "}
                <CiMedicalCross className="text-xl" />
                Type of consultation
              </h1>
              {isAvailableNow ? (
                <div className="flex gap-4 items-center">
                  <FaUserDoctor />
                  <div>
                    <h2 className="font-semibold">
                      Instant Video Consultation
                    </h2>
                    <p className="text-sm">Consult within few minutes</p>
                  </div>
                </div>
              ) : (
                <div className="flex gap-4 items-center">
                  <RiCalendarScheduleLine />
                  <div>
                    <h2 className="font-semibold">Appointment schedule</h2>
                    <p className="text-sm">Select appointment time & date</p>
                  </div>
                </div>
              )}
            </div>
            {/* Payment Details */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm space-y-3">
              <h1 className="font-semibold text-md">
                <DollarCircleOutlined /> Payment Details
              </h1>
              <div className="space-y-1 ">
                <div className="flex justify-between items-center">
                  <p className="text-sm">Consultation Fee</p>
                  <p className="text-md">৳{doctor.consultationFee}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm">VAT (5% )</p>
                  <p className="text-md">৳{vat5Percent}</p>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <p className="text-sm">Platform Fee</p>
                  <p className="text-md">৳15</p>
                </div>
                <div className="flex justify-between items-center pt-2 border-t-4 border-dotted font-[500]">
                  <p className="text-md">Subtotal</p>
                  <p className="text-md">৳{totalAmount}</p>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm space-y-3">
              <h1 className="font-[500] text-md">
                <WalletOutlined /> Payment Methods
              </h1>
              <div className="space-y-1 ">
                <RadioGroup
                  className="pb-4"
                  defaultValue={activePaymentMethod}
                  onValueChange={(e) =>
                    setActivePaymentMethod(e as "bKash" | "SSLCOMMERZ")
                  }
                >
                  <Radio
                    value="bKash"
                    className="max-w-full payment-radio mb-2"
                  >
                    {" "}
                    <div className="flex justify-between items-center w-full">
                      <div className="text-sm">
                        <h2 className="font-[500]">bKash</h2>
                        <p className="font-thin">Pay via bKash</p>
                      </div>

                      <Image
                        src={bKashLogo}
                        alt="bKash"
                        width={35}
                        height={35}
                      />
                    </div>
                  </Radio>
                  <Radio
                    value="SSLCOMMERZ"
                    className="max-w-full payment-radio"
                  >
                    {" "}
                    <div className="flex justify-between items-center">
                      <div className="text-sm">
                        <h2 className="font-[500]">SSLCOMMERZ</h2>
                        <p className="font-thin">Other option to pay</p>
                      </div>
                      <Image
                        src={sslcommerzLogo}
                        alt="sslcommerzLogo"
                        width={100}
                        height={100}
                      />
                    </div>
                  </Radio>
                </RadioGroup>

                <div className="flex justify-between items-center pt-2 border-t-4 border-dotted font-[500] !my-2">
                  <p className="text-md">Payable Amount</p>
                  <p className="text-md">৳{totalAmount}</p>
                </div>

                {!patient ? (
                  <Link
                    href={`/signin?redirect=${pathname}`}
                    className="w-full"
                  >
                    <Button color="primary" className="w-full text-white">
                      You need to login to pay
                      <UserAddOutlined className="ml-1" />
                    </Button>{" "}
                  </Link>
                ) : (
                  <PaymentModal
                    paymentType={activePaymentMethod}
                    amount={{
                      consultationFee: doctor?.consultationFee,
                      vat: vat5Percent,
                      total: totalAmount,
                      platformFee: Number(
                        process.env.NEXT_PUBLIC_PER_CONSULTATION_SERVICE_FEE!!
                      ),
                    }}
                    isDisabled={
                      !isAvailableNow && (!activeDate || !activeTime || !user)
                    }
                    isAvailableNow={isAvailableNow}
                    doctor={doctor}
                    activeDate={activeDate}
                    activeTime={activeTime}
                    patient={patient?.data}
                    refetchAppointments={refetchAppointments}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right side for doctor info */}
          <div className="col-span-12 md:col-span-5 space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <div className="">
                <div className="flex items-center gap-4 ">
                  {doctor?.profileImg ? (
                    <div className="relative">
                      <Image
                        src={doctor?.profileImg}
                        alt={doctor?.name}
                        width={200}
                        height={200}
                        className="border-2 rounded-md h-[100px] w-[100px]"
                      />
                      <span className="flex justify-center items-center ">
                        <Badge
                          color={isAvailableNow ? "success" : "primary"}
                          className="text-white"
                          content={isAvailableNow ? "Online" : "Appointment"}
                          size="sm"
                        >
                          {" "}
                        </Badge>
                      </span>
                    </div>
                  ) : (
                    <div className="rounded-lg w-14 h-16 bg-primary-500 bg-opacity-20 mr-2" />
                  )}
                  <div>
                    <h1 className="font-semibold text-lg">
                      {doctor.doctorTitle} {doctor.name}
                    </h1>
                    <p className="text-sm text-gray-500">{doctor.doctorType}</p>
                    <p>{doctor.medicalDegree}</p>
                    <p className="text-sm bg-primary-500 text-white my-1 pl-1 pr-2 py-[1px] rounded-r-xl font-bold">
                      {doctor?.medicalSpecialties
                        ?.map((specialty) => specialty.name)
                        ?.join(", ")}
                    </p>
                  </div>
                </div>
                <div className="pt-6">
                  <p className="text-[12px] text-gray-500">Working in</p>
                  <p className="text-sm text-gray-500 font-semibold">
                    {doctor?.currentWorkplace?.workPlace} -{" "}
                    {doctor?.currentWorkplace?.department}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default DoctorCheckout;
