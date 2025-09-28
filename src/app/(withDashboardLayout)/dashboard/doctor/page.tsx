"use client";

import MyMotion from "@/src/components/ui/MyMotion";
import { useGetStats } from "@/src/hooks/stats.hook";
import {
  EyeOutlined,
  InfoCircleOutlined,
  ShopOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Card, CardBody } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";
import { Tab, Tabs } from "@heroui/tabs";
import { Divider } from "@heroui/divider";
import React from "react";
import DoctorAppointmentsPage from "../_components/Appointments/DoctorAppointments";
import mapImg from "@/src/assets/img/dashboard/world_map.png";

// 📊 Recharts imports
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import Image from "next/image";

const bookingsData = [
  { month: "Jan", bookings: 20 },
  { month: "Feb", bookings: 35 },
  { month: "Mar", bookings: 25 },
  { month: "Apr", bookings: 40 },
  { month: "May", bookings: 30 },
  { month: "Jun", bookings: 50 },
];

const appointmentsSummaryCOLORS = ["#3b82f6", "#06b6d4", "#f97316"];
const satisfactionPatientSummaryCOLORS = ["#4CAF50", "#FFC107", "#F44336"];

const DoctorsPage = () => {
  const { data, isLoading } = useGetStats("doctor");

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
      title: "Total Earnings",
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
      title: "Total Patients",
      value: data?.data?.doctor?.patientAttended,
      icon: <ShopOutlined style={{ fontSize: "24px", color: "white" }} />,
      background: "rgb(240, 248, 255)",
      color: "rgb(0, 128, 128)",
    },
    {
      title: "Total Experiences",
      value: `${data?.data?.doctor?.totalExperienceYear} years`,
      icon: <ShopOutlined style={{ fontSize: "24px", color: "white" }} />,
      background: "rgb(231, 237, 255)",
      color: "rgb(57, 106, 255)",
    },
  ];

  console.log(data);

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
          <strong className="text-primary">{data?.data?.doctor?.name}</strong>,
          Welcome back in Doctor Dashboard 👋
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
                            className="rounded-full h-10 w-10 flex items-center justify-center text-white text-2xl mb-3"
                            style={{ backgroundColor: stat.color }}
                          >
                            {stat.icon}
                          </div>
                          <div className="text-xl font-semibold mb-1">
                            {stat.value}
                          </div>
                          <h3 className="text-md font-semibold">
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
              <DoctorAppointmentsPage state="upcoming" />
            </div>

            <Divider className="mb-[35px]" />

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Appointments Summary */}
              <Card className="p-4 shadow">
                <h2 className="font-semibold text-xl mb-4">
                  Appointments Summary
                </h2>

                <ResponsiveContainer width="100%" height={300}>
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
                    <Legend verticalAlign="top" align="center" />
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

export default DoctorsPage;
