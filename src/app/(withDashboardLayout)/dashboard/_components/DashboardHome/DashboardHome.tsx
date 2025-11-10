"use client";

import MyMotion from "@/src/components/ui/MyMotion";
import { useGetStats } from "@/src/hooks/stats.hook";
import {
  EyeOutlined,
  InfoCircleOutlined,
  ShopOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, CardBody } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";
import { Tab, Tabs } from "@heroui/tabs";
import { Divider } from "@heroui/divider";
import React from "react";
import mapImg from "@/src/assets/img/dashboard/world_map.png";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import Image from "next/image";
import { TUserRole } from "@/src/types/user";
import { firstLetterCapital } from "@/src/utils/firstLetterCapital";
import DoctorAppointmentsPage from "../Appointments/DoctorAppointments";
import PatientAppointmentsPage from "../Appointments/PatientAppointments";
import AdminAppointmentsPage from "../Appointments/AdminAppointments";
import Link from "next/link";
import { FaStethoscope } from "react-icons/fa6";
import { Badge } from "@heroui/badge";
import { TSpecialty } from "@/src/types/specialty";

const appointmentsSummaryCOLORS = ["#3b82f6", "#06b6d4", "#f97316"];
const satisfactionPatientSummaryCOLORS = ["#4CAF50", "#FFC107", "#F44336"];

const DashboardHome = ({ role }: { role: TUserRole }) => {
  const { data, isLoading } = useGetStats(role);

  const satisfactionData = [
    {
      name: "Highly",
      value: data?.data?.highlySatisfiedPatients || 0,
    },
    {
      name: "Moderately",
      value: data?.data?.moderatelySatisfiedPatients || 0,
    },
    { name: "Dissatisfied", value: data?.data?.dissatisfiedPatients || 0 },
  ];

  const updatedStats = [
    {
      title: role == "patient" ? "Total Expense" : "Total Earnings",
      value: `${data?.data?.totalAmount} BDT`,
      icon: <ShopOutlined style={{ fontSize: "24px", color: "white" }} />,
      background: "rgb(255, 226, 229)",
      color: "rgb(250, 90, 125)",
    },
    {
      title: "Total Payments",
      value: data?.data?.totalPayments,
      icon: <ShopOutlined style={{ fontSize: "24px", color: "white" }} />,
      background: "rgb(220, 252, 231)",
      color: "rgb(60, 216, 86)",
    },
    {
      title: "Total Pending Appointments",
      value: data?.data?.totalPendingAppointments,
      icon: <ShopOutlined style={{ fontSize: "24px", color: "white" }} />,
      background: "rgb(255, 244, 222)",
      color: "rgb(255, 148, 122)",
    },
    {
      title: "Total Completed Appointments",
      value: data?.data?.totalCompletedAppointments,
      icon: <ShopOutlined style={{ fontSize: "24px", color: "white" }} />,
      background: "rgb(243,232, 255)",
      color: "rgb(191, 131, 255)",
    },
    {
      title:
        role == "doctor"
          ? "Total Patients Attended"
          : role == "admin"
          ? "Total Patients"
          : "Most Consulted Doctor",
      value:
        role == "doctor" ? (
          data?.data?.doctor?.patientAttended
        ) : role == "admin" ? (
          data?.data?.totalPatients
        ) : (
          <>
            <div className="flex items-center gap-2">
              <Image
                src={data?.data?.mostConsultedDoctor?.profileImg}
                alt={data?.data?.mostConsultedDoctor?.name}
                height={100}
                width={100}
                className=" h-10 w-10 rounded-full"
              />
              <h2 className="opacity-20 animate-pulse">
                {data?.data?.mostConsultedDoctor?.consultationCount || 0} times
                total{" "}
              </h2>
            </div>
            <Link
              href={`/doctor/${data?.data?.mostConsultedDoctor?.doctorCode}`}
              className="text-primary hover:underline block"
              target="_blank"
            >
              {data?.data?.mostConsultedDoctor?.doctorTitle}{" "}
              {data?.data?.mostConsultedDoctor?.name}
            </Link>
          </>
        ),
      icon: <ShopOutlined style={{ fontSize: "24px", color: "white" }} />,
      background: "rgb(240, 248, 255)",
      color: "rgb(0, 128, 128)",
    },
    {
      title:
        role == "doctor"
          ? "Total Experiences"
          : role == "admin"
          ? "Total Doctors"
          : "Total Doctors Consulted",
      value:
        role == "doctor"
          ? `${data?.data?.doctor?.totalExperienceYear} years`
          : role == "admin"
          ? data?.data?.totalDoctors
          : data?.data?.totalDoctorsConsulted,
      icon: <ShopOutlined style={{ fontSize: "24px", color: "white" }} />,
      background: "rgb(231, 237, 255)",
      color: "rgb(57, 106, 255)",
    },
  ];

  const appointmentsData = [
    {
      name: "Pending",
      value: data?.data?.totalPendingAppointments,
    },
    {
      name: "Completed",
      value: data?.data?.totalCompletedAppointments,
    },
    {
      name: "Canceled",
      value: data?.data?.totalCanceledAppointments,
    },
  ];

  return (
    <div className="p-6">
      {isLoading ? (
        <Skeleton className="h-[40px] w-[350px] md:w-[450px] rounded-xl mb-6" />
      ) : (
        <h2 className="font-bold text-xl md:text-2xl mb-6">
          Hi{" "}
          <strong className="text-primary">
            {role == "doctor"
              ? data?.data?.doctor?.name
              : role == "admin"
              ? data?.data?.admin?.name
              : data?.data?.patient?.name}
          </strong>
          , Welcome back in {firstLetterCapital(role)} Dashboard 👋
        </h2>
      )}

      <MyMotion y={50}>
        <Tabs aria-label="Options">
          <Tab
            key="Info"
            title={
              <div>
                <InfoCircleOutlined /> Overview
              </div>
            }
          >
            {/* Stats */}
            <Card className="mt-6 py-3 px-4">
              <h2 className="font-semibold text-xl md:text-2xl mb-2">
                Overall summary
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {isLoading
                  ? Array.from({ length: 6 }).map((_, index) => (
                      <Skeleton
                        key={index}
                        className="!h-[180px] !w-full rounded-xl"
                      />
                    ))
                  : updatedStats.map((stat, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-xl flex justify-between"
                        style={{ backgroundColor: stat.background }}
                      >
                        <div>
                          <div
                            className="rounded-full h-10 w-10 flex items-center justify-center  text-2xl mb-3"
                            style={{ backgroundColor: stat.color }}
                          >
                            {stat.icon}
                          </div>
                          <div className="text-xl font-semibold mb-1 text-black">
                            {stat.value}
                          </div>
                          <h3 className="text-md font-semibold text-black">
                            {stat.title}
                          </h3>
                        </div>
                      </div>
                    ))}
              </div>
            </Card>

            <Divider className="mt-[35px] mb-[20px]" />

            {/* Upcoming appointments */}
            <div>
              {role == "doctor" ? (
                <DoctorAppointmentsPage state="upcoming" />
              ) : role == "patient" ? (
                <PatientAppointmentsPage state="upcoming" />
              ) : (
                <AdminAppointmentsPage state="upcoming" />
              )}
            </div>

            <Divider className="mb-[35px]" />

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Appointments Summary */}
              <Card className="p-4 shadow">
                <h2 className="font-semibold text-xl mb-4">
                  Appointments Summary
                </h2>

                <ResponsiveContainer width="100%" height={320}>
                  <PieChart>
                    <Pie
                      data={appointmentsData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={3}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                      // labelLine={false}
                    >
                      {appointmentsData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            appointmentsSummaryCOLORS[
                              index % appointmentsSummaryCOLORS.length
                            ]
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    {/* <Legend verticalAlign="top" align="center" /> */}
                  </PieChart>
                </ResponsiveContainer>
              </Card>

              {/* Appointments by Areas */}
              <Card className="p-4 shadow">
                <h2 className="font-semibold text-xl mb-4">
                  {" "}
                  Appointments by Areas{" "}
                </h2>
                <Image src={mapImg} alt="map" className="w-full h-[280px]" />
              </Card>

              {/* Satisfy vs Fulfill */}
              {role == "patient" ? (
                <Card className="p-5 shadow">
                  <h2 className="font-semibold text-xl mb-4 flex items-center gap-2">
                    <FaStethoscope className="text-primary h-5 w-5" />
                    Most Consulted Doctor
                  </h2>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <figure className="relative h-28 w-28 sm:h-32 sm:w-32 overflow-hidden rounded-full ring-2 ring-primary/20">
                      <Image
                        src={data?.data?.mostConsultedDoctor?.profileImg}
                        alt={data?.data?.mostConsultedDoctor?.name}
                        height={150}
                        width={150}
                      />
                    </figure>

                    <div className="flex-1 text-center sm:text-left">
                      <Link
                        href={`/doctor/${data?.data?.mostConsultedDoctor?.doctorCode}`}
                        target="_blank"
                        className="text-lg font-semibold text-primary hover:underline block"
                      >
                        {data?.data?.mostConsultedDoctor?.doctorTitle}{" "}
                        {data?.data?.mostConsultedDoctor?.name}
                      </Link>

                      <p className="text-sm text-gray-500 mt-1">
                        {
                          data?.data?.mostConsultedDoctor?.currentWorkplace
                            ?.designation
                        }{" "}
                        at{" "}
                        {
                          data?.data?.mostConsultedDoctor?.currentWorkplace
                            ?.workPlace
                        }
                      </p>

                      <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
                        {data?.data?.mostConsultedDoctor?.medicalSpecialties?.map(
                          (spec: TSpecialty) => (
                            <Badge
                              key={spec._id}
                              variant="faded"
                              className="bg-primary/10 text-primary text-xs"
                            >
                              {spec.name}
                            </Badge>
                          )
                        )}
                      </div>

                      <p className="text-gray-500 text-sm mt-2">
                        Consulted{" "}
                        <span className="font-semibold text-gray-700">
                          {data?.data?.mostConsultedDoctor?.consultationCount ||
                            0}
                        </span>{" "}
                        times in total
                      </p>
                    </div>
                  </div>
                </Card>
              ) : (
                <Card className="p-4 shadow">
                  <h2 className="font-semibold text-xl mb-4 flex items-center gap-2">
                    Satisfy vs Dissatisfied Patients
                    <span className="flex items-center text-yellow-500">
                      <StarOutlined className="w-5 h-5 mr-1" />
                      {data?.data?.averageRating
                        ? data?.data?.averageRating
                        : "0.0"}{" "}
                      / 5
                    </span>
                  </h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={satisfactionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value">
                        {satisfactionData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              satisfactionPatientSummaryCOLORS[
                                index % satisfactionPatientSummaryCOLORS.length
                              ]
                            }
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              )}
            </div>
          </Tab>

          <Tab
            key="Analytics"
            title={
              <div>
                <EyeOutlined /> Analytics
              </div>
            }
          >
            <Card className="p-2">
              <CardBody>
                <h2 className="font-semibold text-xl my-4 text-center text-primary">
                  *Analytics section will be available soon. Stay tuned.
                </h2>
              </CardBody>
            </Card>
          </Tab>

          <Tab
            key="Reviews"
            title={
              <div>
                <StarOutlined /> Reviews & Ratings
              </div>
            }
          >
            <Card className="p-2">
              <CardBody>
                <h2 className="font-semibold text-xl my-4 text-center text-primary">
                  *Reviews and ratings will be available soon. Stay tuned.
                </h2>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </MyMotion>
    </div>
  );
};

export default DashboardHome;
