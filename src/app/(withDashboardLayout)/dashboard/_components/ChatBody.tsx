"use client";
import { useGetAllMessages } from "@/src/hooks/message.hook";
import { TAppointment } from "@/src/types/appointment";
import { TCreateMessage, TMessage } from "@/src/types/message";
import { TDoctor, TPatient, TUserRole } from "@/src/types/user";
import { firstLetterCapital } from "@/src/utils/firstLetterCapital";
import generateChatId from "@/src/utils/generateChatId";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Textarea } from "@heroui/input";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import AppointmentScheduleCountdown from "./Appointments/AppointmentScheduleCountdown";
import moment from "moment";
import { Avatar } from "@heroui/avatar";
import {
  CreditCardOutlined,
  MessageOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Skeleton } from "@heroui/skeleton";

type TChatProps = {
  from: TUserRole;
  appointment: TAppointment;
  doctor: TDoctor;
  patient: TPatient;
};
const ChatBody = ({ from, doctor, patient, appointment }: TChatProps) => {
  const chatId = generateChatId(appointment);

  //   console.log({ chatId, from, doctor, patient, appointment }, "chatId");

  const { data: chats, isLoading: isLoadingChats } = useGetAllMessages([
    { name: "chatId", value: chatId },
    { name: "limit", value: 1500 },
  ]);

  const [messages, setMessages] = useState<TMessage[]>([]);
  const [message, setMessage] = useState("");
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const senderInfo = from === "doctor" ? doctor : patient;
  const receiverInfo = from === "doctor" ? patient : doctor;

  // Populate messages state initially from DB
  useEffect(() => {
    if (chats?.data) {
      setMessages(chats.data);
    }
  }, [chats]);

  // Socket connection
  useEffect(() => {
    const socket = io(`${process.env.NEXT_PUBLIC_SOCKET_BASE_URL}`, {
      withCredentials: true, // If using cookies/auth
      transports: ["websocket", "polling"],
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      // console.log("Socket connected:", socket.id);
      socket.emit("join_room", appointment._id);
    });

    socket.on("receive_message", (data: TMessage) => {
      // console.log({ data, chatId });
      if (data.chatId === chatId) {
        setMessages((prev) => [...prev, data]);
      }
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [appointment._id]);

  // Auto scroll when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTo({
        top: messagesEndRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  });
  // }, [messages]);

  //   console.log(chats);

  const sendMessage = useCallback(() => {
    if (!message.trim() || !socketRef.current) return;
    const chatId = `${appointment._id}-${doctor._id}-${patient._id}-${new Date(
      appointment.schedule
    ).getTime()}`;

    const msg: TCreateMessage = {
      chatId,
      appointmentId: appointment._id,
      text: message.trim(),
      from,
      senderId: senderInfo._id,
      receiverId: receiverInfo._id,
    };
    socketRef.current.emit("send_message", msg);
    setMessage("");
  }, [message, from, senderInfo._id, appointment._id]);

  return (
    <>
      <div className="p-4 flex justify-between items-center gap-4 border-b">
        {/* Left: Appointment Time */}
        <div className="flex flex-col text-left text-sm text-gray-600">
          <span className="text-xs font-medium">Appointment</span>
          <span title={moment(appointment.schedule).format("LLLL")}>
            {<AppointmentScheduleCountdown schedule={appointment?.schedule} />}
          </span>
        </div>

        {/* Center: Receiver Info */}
        <div className="flex flex-col items-center text-center">
          <Avatar
            showFallback
            size="lg"
            src={receiverInfo?.profileImg}
            name={receiverInfo?.name}
          />
          <div className="font-semibold text-lg">
            Chat with{" "}
            {from === "doctor"
              ? receiverInfo.name
              : `${doctor.doctorTitle} ${receiverInfo.name}`}
          </div>
          {from === "patient" && (
            <span className="text-xs text-gray-500">
              {doctor?.currentWorkplace?.designation},{" "}
              {doctor?.currentWorkplace?.department}
            </span>
          )}
        </div>

        {/* Right: Payment Info */}
        <div className="flex flex-col text-right text-sm text-gray-600">
          <span className="font-medium flex items-center gap-1">
            <CreditCardOutlined /> {appointment.payment?.amount?.total} BDT
          </span>
          <span className="text-xs capitalize">
            {appointment.payment?.paymentMethod || "N/A"}
          </span>
          <span
            className={`text-xs font-bold ${
              appointment.status === "confirmed" ||
              appointment.status == "completed"
                ? "text-green-600"
                : appointment.status === "pending"
                ? "text-yellow-500"
                : "text-gray-500"
            }`}
          >
            {firstLetterCapital(appointment.status)}
          </span>
        </div>
      </div>

      <div className="h-[calc(100%-80px)]  overflow-hidden flex flex-col p-4">
        <div className="flex-1 overflow-hidden flex flex-col ">
          {/* Messages */}
          <Card
            className="flex-1 overflow-y-auto space-y-2 pr-2 p-2 border mb-6"
            ref={messagesEndRef}
          >
            {isLoadingChats ? (
              <Skeleton className="w-full h-full rounded-md" />
            ) : messages.length === 0 ? (
              <p className="text-gray-400 text-center my-5">
                No messages yet <MessageOutlined />
              </p>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-end w-fit max-w-[75%] gap-2 ${
                    msg.from === from ? "ml-auto" : "mr-auto flex-row-reverse"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded shadow-sm break-words ${
                      msg.from === from
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    <div className="text-sm">{msg.text}</div>
                    <div className="text-[10px] mt-1 text-right text-opacity-70">
                      {moment(msg.createdAt).fromNow()}
                    </div>
                  </div>
                  <Avatar
                    size="sm"
                    src={
                      msg.from === from
                        ? senderInfo?.profileImg
                        : receiverInfo?.profileImg
                    }
                  />
                </div>
              ))
            )}
          </Card>

          {/* Footer Controls */}
          <div className="">
            <Textarea
              fullWidth
              placeholder="Type your message…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              className="mb-2 "
            />
            <Button
              onPress={sendMessage}
              disabled={!message.trim() || isLoadingChats}
              fullWidth
              color="primary"
              className={`text-white font-bold ${
                !message.trim() ? "opacity-50 cursor-not-allowed" : ""
              }`}
              endContent={<SendOutlined />}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBody;
