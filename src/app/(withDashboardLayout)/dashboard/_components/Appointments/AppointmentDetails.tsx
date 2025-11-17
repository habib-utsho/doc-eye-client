"use client";
import { useGetAppointmentById } from "@/src/hooks/appointment.hook";
import { useParams, useRouter } from "next/navigation";
import React, { useRef } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Button } from "@heroui/button";
import { Avatar } from "@heroui/avatar";
import moment from "moment";
import MyMotion from "@/src/components/ui/MyMotion";
import Container from "@/src/components/ui/Container";
import Loading from "@/src/components/ui/Loading";
import { firstLetterCapital } from "@/src/utils/firstLetterCapital";
import {
  CalendarOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  MedicineBoxOutlined,
  PhoneOutlined,
  UserOutlined,
  MailOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { TAppointment } from "@/src/types/appointment";
import { useReactToPrint } from "react-to-print";
import { DownloadIcon } from "@/src/components/ui/icons";
import AppointmentPDF from "../AppointmentPDF";
import Chat from "../Chat";
import VideoCall from "../VideoCall";

const AppointmentDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data, isLoading } = useGetAppointmentById(id as string);

  const printAppointmentContentRef = useRef<HTMLDivElement>(null);

  const appointment = data?.data as TAppointment;
  const handleAppointmentPrint = useReactToPrint({
    contentRef: printAppointmentContentRef,
    documentTitle: `appointment-${appointment?.patient?.name}-${appointment?.payment?._id}`,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!appointment) {
    return (
      <Container className="py-12">
        <Card>
          <CardBody className="text-center py-12">
            <p className="text-xl text-default-500">Appointment not found</p>
            <Button
              className="mt-4 text-white w-[250px] mx-auto"
              color="primary"
              onPress={() => router.back()}
            >
              Go Back
            </Button>
          </CardBody>
        </Card>
      </Container>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "primary";
      case "completed":
        return "success";
      case "canceled":
        return "danger";
      default:
        return "warning";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "success";
      case "pending":
        return "warning";
      case "failed":
        return "danger";
      default:
        return "default";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-8 px-4 rounded-md">
      <Container className="max-w-6xl">
        {/* Header */}
        <MyMotion y={20} className="mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-default-900">
                Appointment Details
              </h1>
            </div>
            <Button
              color="default"
              variant="bordered"
              onPress={() => router.back()}
            >
              ← Back
            </Button>
          </div>
        </MyMotion>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Doctor & Patient Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Doctor Information */}
            <MyMotion y={20} delay={0.1}>
              <Card className="shadow-lg">
                <CardHeader className="bg-primary/10 pb-4">
                  <div className="flex items-center gap-3">
                    <MedicineBoxOutlined className="text-2xl text-primary" />
                    <h2 className="text-xl font-semibold text-primary">
                      Doctor Information
                    </h2>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody className="gap-4">
                  <div className="flex items-start gap-4">
                    <Avatar
                      src={appointment.doctor.profileImg}
                      alt={appointment.doctor.name}
                      className="w-24 h-24"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-default-900">
                        {appointment.doctor.doctorTitle}{" "}
                        {appointment.doctor.name}
                      </h3>
                      <p className="text-default-600 mb-2">
                        {appointment.doctor.doctorType} Doctor • Code:{" "}
                        {appointment.doctor.doctorCode}
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <MailOutlined className="text-primary" />
                          <span>{appointment.doctor.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <PhoneOutlined className="text-primary" />
                          <span>{appointment.doctor.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <EnvironmentOutlined className="text-primary" />
                          <span>{appointment.doctor.district}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Divider />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-default-500 mb-1">
                        Medical Degree
                      </p>
                      <p className="font-semibold">
                        {appointment.doctor.medicalDegree}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-default-500 mb-1">
                        Experience
                      </p>
                      <p className="font-semibold">
                        {appointment.doctor.totalExperienceYear} years
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-default-500 mb-1">
                        BMDC Registration
                      </p>
                      <p className="font-semibold">{appointment.doctor.bmdc}</p>
                    </div>
                    <div>
                      <p className="text-sm text-default-500 mb-1">
                        Patients Attended
                      </p>
                      <p className="font-semibold">
                        {appointment.doctor.patientAttended}
                      </p>
                    </div>
                  </div>

                  <Divider />

                  <div>
                    <p className="text-sm text-default-500 mb-2">
                      Current Workplace
                    </p>
                    <div className="bg-default-100 rounded-lg p-3 space-y-1">
                      <p className="font-semibold">
                        {appointment.doctor.currentWorkplace.workPlace}
                      </p>
                      <p className="text-sm">
                        {appointment.doctor.currentWorkplace.designation} •{" "}
                        {appointment.doctor.currentWorkplace.department}
                      </p>
                      <p className="text-xs text-default-500">
                        Since{" "}
                        {moment(
                          appointment.doctor.currentWorkplace.workingPeriodStart
                        ).format("MMM YYYY")}
                      </p>
                    </div>
                  </div>

                  {appointment.doctor.bio && (
                    <>
                      <Divider />
                      <div>
                        <p className="text-sm text-default-500 mb-2">Bio</p>
                        <p className="text-default-700">
                          {appointment.doctor.bio}
                        </p>
                      </div>
                    </>
                  )}
                </CardBody>
              </Card>
            </MyMotion>

            {/* Patient Information */}
            <MyMotion y={20} delay={0.2}>
              <Card className="shadow-lg">
                <CardHeader className="bg-secondary/10 pb-4">
                  <div className="flex items-center gap-3">
                    <UserOutlined className="text-2xl text-secondary" />
                    <h2 className="text-xl font-semibold text-secondary">
                      Patient Information
                    </h2>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody className="gap-4">
                  <div className="flex items-start gap-4">
                    <Avatar
                      src={appointment.patient.profileImg}
                      alt={appointment.patient.name}
                      className="w-20 h-20"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-default-900">
                        {appointment.patient.name}
                      </h3>
                      <div className="space-y-1 text-sm mt-2">
                        <div className="flex items-center gap-2">
                          <MailOutlined className="text-secondary" />
                          <span>{appointment.patient.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <PhoneOutlined className="text-secondary" />
                          <span>{appointment.patient.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Divider />

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-default-500 mb-1">Gender</p>
                      <p className="font-semibold">
                        {appointment.patient.gender}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-default-500 mb-1">
                        Blood Group
                      </p>
                      <p className="font-semibold">
                        {appointment.patient.bloodGroup}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-default-500 mb-1">Age</p>
                      <p className="font-semibold">
                        {moment().diff(
                          moment(appointment.patient.dateOfBirth),
                          "years"
                        )}{" "}
                        years
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-default-500 mb-1">Weight</p>
                      <p className="font-semibold">
                        {appointment.patient.weight} kg
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-default-500 mb-1">Height</p>
                      <p className="font-semibold">
                        {appointment.patient.height} ft
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-default-500 mb-1">District</p>
                      <p className="font-semibold">
                        {appointment.patient.district}
                      </p>
                    </div>
                  </div>

                  {appointment.patient.allergies && (
                    <>
                      <Divider />
                      <div className="bg-warning-50 border border-warning/30 rounded-lg p-3">
                        <p className="text-sm font-semibold text-warning-700 mb-1">
                          ⚠️ Allergies
                        </p>
                        <p className="text-sm text-default-700">
                          {appointment.patient.allergies}
                        </p>
                      </div>
                    </>
                  )}
                </CardBody>
              </Card>
            </MyMotion>
          </div>

          {/* Right Column - Appointment Details & Payment */}
          <div className="space-y-6">
            {/* Appointment Info */}
            <MyMotion y={20} delay={0.3}>
              <Card className="shadow-lg">
                <CardHeader className="pb-4 flex justify-between gap-2 items-center">
                  <div className="flex items-center gap-3">
                    <CalendarOutlined className="text-2xl text-primary" />
                    <h2 className="text-xl font-semibold">Appointment Info</h2>
                  </div>

                  {appointment.status === "confirmed" ||
                  appointment.status === "completed" ? (
                    <div className="flex  items-center rounded-md shadow shadow-primary">
                      <Chat
                        from={"patient"}
                        appointment={appointment}
                        doctor={appointment.doctor}
                        patient={appointment.patient}
                      />
                      <VideoCall
                        from={"patient"}
                        appointment={appointment}
                        doctor={appointment.doctor}
                        patient={appointment.patient}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </CardHeader>
                <Divider />
                <CardBody className="gap-4">
                  <div>
                    <p className="text-sm text-default-500 mb-2">Status</p>
                    <Button
                      color={getStatusColor(appointment.status)}
                      variant="flat"
                      size="lg"
                      startContent={<CheckCircleOutlined />}
                      disabled
                      className="opacity-100 cursor-default"
                    >
                      {firstLetterCapital(appointment.status)}
                    </Button>
                  </div>

                  <Divider />

                  <div>
                    <p className="text-sm text-default-500 mb-2">
                      Appointment Type
                    </p>
                    <Button
                      color="primary"
                      variant="bordered"
                      size="lg"
                      disabled
                      className="opacity-100 cursor-default"
                    >
                      {firstLetterCapital(appointment.appointmentType)}
                    </Button>
                  </div>

                  <Divider />

                  <div>
                    <div className="flex items-start gap-2 mb-2">
                      <ClockCircleOutlined className="text-primary mt-1" />
                      <div>
                        <p className="text-sm text-default-500">Schedule</p>
                        <p className="font-semibold text-lg">
                          {moment(appointment.schedule).format("DD MMM YYYY")}
                        </p>
                        <p className="text-default-600">
                          {moment(appointment.schedule).format("hh:mm A")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {appointment.symptoms && (
                    <>
                      <Divider />
                      <div>
                        <p className="text-sm text-default-500 mb-2">
                          Symptoms
                        </p>
                        <p className="text-default-700">
                          {firstLetterCapital(appointment.symptoms)}
                        </p>
                      </div>
                    </>
                  )}

                  <Divider />

                  <div>
                    <p className="text-sm text-default-500 mb-1">Created At</p>
                    <p className="text-sm">
                      {moment(appointment.createdAt).format(
                        "DD MMM YYYY, hh:mm A"
                      )}
                    </p>
                  </div>
                </CardBody>
              </Card>
            </MyMotion>

            {/* Payment Info */}
            <MyMotion y={20} delay={0.4}>
              <Card className="shadow-lg">
                <CardHeader className="bg-success/10 pb-4">
                  <div className="flex items-center gap-3">
                    <DollarOutlined className="text-2xl text-success" />
                    <h2 className="text-xl font-semibold text-success">
                      Payment Details
                    </h2>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody className="gap-4">
                  <div>
                    <p className="text-sm text-default-500 mb-2">
                      Payment Status
                    </p>
                    <Button
                      color={getPaymentStatusColor(appointment.payment.status)}
                      variant="flat"
                      size="lg"
                      disabled
                      className="opacity-100 cursor-default"
                    >
                      {firstLetterCapital(appointment.payment.status)}
                    </Button>
                  </div>

                  <Divider />

                  <div>
                    <p className="text-sm text-default-500 mb-2">
                      Transaction ID
                    </p>
                    <p className="text-xs font-mono bg-default-100 p-2 rounded">
                      {appointment.payment.trans_id}
                    </p>
                  </div>

                  <Divider />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-default-600">Consultation Fee</span>
                      <span className="font-semibold">
                        ৳{appointment.payment.amount.consultationFee}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-default-600">VAT</span>
                      <span className="font-semibold">
                        ৳{appointment.payment.amount.vat}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-default-600">Platform Fee</span>
                      <span className="font-semibold">
                        ৳{appointment.payment.amount.platformFee}
                      </span>
                    </div>
                    <Divider />
                    <div className="flex justify-between text-lg">
                      <span className="font-bold">Total Amount</span>
                      <span className="font-bold text-success">
                        ৳{appointment.payment.amount.total}
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </MyMotion>

            {/* Action Buttons */}
            <MyMotion y={20} delay={0.5}>
              <Card className="shadow-lg">
                <CardBody className="gap-3">
                  <Button
                    type="button"
                    // variant="shadow"
                    className="text-black text-center p-2 w-full h-[70px] !gap-4 bg-gray-100 border"
                    isIconOnly
                    onPress={handleAppointmentPrint}
                    aria-label="Print appointment details"
                    block
                  >
                    <DownloadIcon className="text-2xl" />
                    {/* <Image src={prescriptionIcon} alt="Prescription icon" /> */}
                    <h2 className={`font-semibold text-lg  mb-0`}>
                      Download Appointment
                    </h2>
                  </Button>
                </CardBody>
              </Card>
            </MyMotion>
          </div>
        </div>
      </Container>

      {/* Invoice PDF */}
      <AppointmentPDF
        appointment={appointment}
        printContentRef={printAppointmentContentRef}
      />
    </div>
  );
};

export default AppointmentDetailsPage;
