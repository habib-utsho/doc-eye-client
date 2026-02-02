// app/doctor/messages/page.tsx
"use client";

import { useState } from "react";
import moment from "moment";
import Link from "next/link";
import { useGetAllAppointments } from "@/src/hooks/appointment.hook";
import useDebounce from "@/src/hooks/useDebounce";
import useUserData from "@/src/hooks/user.hook";

// Hero UI Components
import { Card, CardBody } from "@heroui/card";
import { Avatar } from "@heroui/avatar";
import { Badge } from "@heroui/badge";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Skeleton } from "@heroui/skeleton";

// Icons
import { MessageCircle, CalendarDays, ArrowLeft } from "lucide-react";
import AppointmentScheduleCountdown from "./Appointments/AppointmentScheduleCountdown";
import generateChatId from "@/src/utils/generateChatId";
import ChatBody from "./ChatBody";
import { TUserRole } from "@/src/types/user";
import { TAppointment } from "@/src/types/appointment";
import { firstLetterCapital } from "@/src/utils/firstLetterCapital";
import { Pagination } from "@heroui/pagination";

export default function DoctorMessagesPage() {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const { user, isLoading: loadingUser } = useUserData();
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const { data: res, isLoading } = useGetAllAppointments([
    { name: "page", value: pagination.page }, //TODO
    { name: "limit", value: pagination.limit }, //TODO
    { name: "status", value: "confirmed" },
    { name: "status", value: "completed" },
  ]);

  const appointments = (res?.data || []) as TAppointment[];
  const selectedAppointment = appointments.find(
    (appt: any) => generateChatId(appt) === selectedChatId,
  );

  if (loadingUser || isLoading) {
    return (
      <div className="p-8 ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-screen">
          <div className="space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-20">
                <Skeleton className="h-full w-full rounded-xl" />
              </div>
            ))}
          </div>
          <div className="lg:col-span-2">
            <Skeleton className="h-full w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-screen flex flex-col lg:flex-row">
        {/* Left Sidebar - Chat List */}
        <div
          className={`w-full lg:w-96 border-r border-gray-200 bg-white flex flex-col ${
            selectedChatId ? "hidden lg:flex" : "flex"
          }`}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <MessageCircle className="w-8 h-8 text-primary" />
              Messages
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {res?.meta?.total} conversations
            </p>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {res?.meta?.total === 0 ? (
              <div className="p-12 text-center">
                <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No conversations yet</p>
              </div>
            ) : (
              <div className="space-y-2 px-4 py-2 pb-4">
                {appointments?.map((appt: any) => {
                  const chatId = generateChatId(appt);
                  const patient = appt.patient;
                  const isSelected = chatId === selectedChatId;

                  return (
                    <Card
                      key={appt._id}
                      isPressable
                      onPress={() => setSelectedChatId(chatId)}
                      className={`cursor-pointer w-full transition-all hover:shadow-md hover:scale-[0.98] border  ${
                        isSelected
                          ? "border-primary shadow-primary shadow"
                          : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <CardBody className="p-4">
                        <div className="flex items-center gap-4">
                          <Avatar
                            src={patient.profileImg}
                            className="h-14 w-14 ring-4 ring-blue-100 flex-shrink-0"
                          >
                            {patient.name
                              .split(" ")
                              .map((n: string) => n[0].toUpperCase())
                              .join("")
                              .slice(0, 2)}
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-gray-900 truncate">
                                {patient.name}
                              </h3>
                              <span className="text-xs text-gray-500">
                                {moment(appt.createdAt).fromNow()}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                              <div
                                className={`text-xs py-[2px] px-[6px] rounded ${
                                  appt.status === "completed"
                                    ? "bg-success/10 text-success"
                                    : "bg-primary/10 text-primary"
                                }`}
                              >
                                {firstLetterCapital(appt.status)}
                              </div>
                            </div>

                            <p className="text-sm text-gray-600 mt-2 flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <CalendarDays className="w-4 h-4" />
                                {
                                  <AppointmentScheduleCountdown
                                    schedule={appt.schedule}
                                  />
                                }
                              </span>
                            </p>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  );
                })}
                <Pagination
                  initialPage={pagination.page}
                  size={"md"}
                  color="secondary"
                  className="flex justify-center gap-1 "
                  onChange={(e) => setPagination({ ...pagination, page: e })}
                  total={res?.meta?.totalPage}
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Selected Chat */}
        <div
          className={`flex-1 flex flex-col bg-white ${
            selectedChatId ? "flex" : "hidden lg:flex"
          }`}
        >
          {selectedChatId && selectedAppointment ? (
            <>
              {/* Chat Header */}
              {/* <div className="border-b border-gray-200 p-4 lg:p-6 flex items-center gap-4"> */}
              <Button
                variant="ghost"
                size="md"
                isIconOnly
                className="lg:hidden m-2"
                onPress={() => setSelectedChatId(null)}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              {/* </div> */}

              <ChatBody
                from={user?.role as TUserRole}
                doctor={selectedAppointment?.doctor}
                patient={selectedAppointment?.patient}
                appointment={selectedAppointment}
              />
            </>
          ) : (
            /* Empty State when no chat selected (desktop) */
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <MessageCircle className="w-24 h-24 text-gray-200 mx-auto mb-6" />
                <h3 className="text-2xl font-medium text-gray-600">
                  Select a conversation
                </h3>
                <p className="text-gray-500 mt-2 max-w-sm mx-auto">
                  Choose a appointment from the list to view messages and
                  continue the conversation.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
