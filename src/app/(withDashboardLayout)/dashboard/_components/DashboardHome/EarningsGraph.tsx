"use client";

import React from "react";
import { useGetEarnings } from "@/src/hooks/stats.hook";
import { Select, SelectItem } from "@heroui/select";
import { Skeleton } from "@heroui/skeleton";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@heroui/card";
import useUserData from "@/src/hooks/user.hook";

const EarningsGraph = () => {
  const { user, isLoading: isUserLoading } = useUserData();
  const role = user?.role;
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i); // 2025 → 2020

  const [selectedYear, setSelectedYear] = React.useState<number>(currentYear);

  const { data: earnings, isLoading } = useGetEarnings([
    {
      name: "year",
      value: selectedYear,
    },
  ]);

  const monthlyTrend = earnings?.data?.months?.map(
    (m: { month: string; totalAmount: number; totalPayments: number }) => ({
      month: m.month.slice(0, 3), // "Jan", "Feb", etc.
      earnings: m.totalAmount,
      appointments: m.totalPayments,
    })
  );

  const totalEarnings = earnings?.data?.totalAmount || 0;
  const totalAppointments = earnings?.data?.totalPayments || 0;

  console.log({ selectedYear, earnings });

  return (
    <Card className="shadow-2xl border-0 overflow-hidden">
      {/* Gradient Header */}
      <div className="bg-gradient-to-r from-primary via-purple-500 to-secondary text-white p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-2xl font-bold">
              {role === "patient" ? "Expenses" : "Earnings"} Overview
            </h3>
            <p className="text-white/80 mt-1">
              Monthly {role === "patient" ? "expense" : "revenue"} & appointment
              trends
            </p>
          </div>

          {/* Year Selector */}
          <Select
            label="Select Year"
            placeholder="Choose year"
            selectedKeys={[selectedYear.toString()]}
            onSelectionChange={(keys) => {
              const year = Array.from(keys)[0];
              if (year) setSelectedYear(Number(year));
            }}
            className="w-full sm:w-48"
            size="sm"
            variant="faded"
            color="primary"
            classNames={{
              trigger: "bg-white/20 backdrop-blur text-white border-white/30",
              value: "text-white font-semibold",
            }}
          >
            {years.map((year) => (
              <SelectItem key={year} value={year}>
                {year === currentYear ? `${year} (Current)` : year.toString()}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      {/* Chart Body */}
      <div className="p-6 bg-gray-50/50">
        {isLoading || isUserLoading ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              <Skeleton className="h-[80px] w-full rounded-lg" />
              <Skeleton className="h-[80px] w-full rounded-lg" />
            </div>
            <Skeleton className="h-[300px] w-full rounded-xl" />
            <Skeleton className="h-[80px] w-full rounded-xl" />
          </div>
        ) : !monthlyTrend || monthlyTrend.length === 0 ? (
          <div className="h-80 flex items-center justify-center">
            <p className="text-gray-500 text-lg">
              No {role === "patient" ? "expenses" : "earnings"} data available
              for {selectedYear}
            </p>
          </div>
        ) : (
          <>
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-5 shadow-md">
                <p className="text-sm text-gray-600">
                  Total {role === "patient" ? "Expenses" : "Earnings"}
                </p>
                <p className="text-3xl font-bold text-primary mt-2">
                  ৳{totalEarnings.toLocaleString()}
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-md">
                <p className="text-sm text-gray-600">Total Appointments</p>
                <p className="text-3xl font-bold text-secondary mt-2">
                  {totalAppointments}
                </p>
              </div>
            </div>

            {/* Line Chart */}
            <ResponsiveContainer width="100%" height={380}>
              <LineChart
                data={monthlyTrend}
                margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="4 6" stroke="#e0e0e0" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 13, fill: "#555" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  yAxisId="left"
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `৳${(value / 1000).toFixed(0)}k`}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgba(255, 255, 255, 0.97)",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                    padding: "12px",
                  }}
                  formatter={(value: number, name: string) =>
                    name === "earnings" ? `৳${value.toLocaleString()}` : value
                  }
                  labelStyle={{ fontWeight: "bold", color: "#333" }}
                />
                <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="line" />

                {/* Earnings/expenses Line */}
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="earnings"
                  stroke="#8b5cf6"
                  strokeWidth={4}
                  dot={{
                    fill: "#8b5cf6",
                    r: 7,
                    strokeWidth: 3,
                    stroke: "#fff",
                  }}
                  activeDot={{ r: 9 }}
                  name={role == "patient" ? "Expenses" : "Earnings"}
                />

                {/* Appointments Line */}
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="appointments"
                  stroke="#10b981"
                  strokeWidth={3}
                  strokeDasharray="10 6"
                  dot={{ fill: "#10b981", r: 5 }}
                  name="Appointments"
                />
              </LineChart>
            </ResponsiveContainer>

            {/* Current Month Highlight */}
            {monthlyTrend.length > 0 && (
              <div className="mt-8 text-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-200">
                <p className="text-sm text-gray-600">
                  Current Month Performance
                </p>
                <p className="text-2xl font-bold text-secondary mt-2">
                  {monthlyTrend[monthlyTrend.length - 1]?.month} {selectedYear}
                  {" - "}৳
                  {monthlyTrend[
                    monthlyTrend.length - 1
                  ]?.earnings.toLocaleString()}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  );
};

export default EarningsGraph;
