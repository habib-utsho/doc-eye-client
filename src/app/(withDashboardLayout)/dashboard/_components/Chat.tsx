"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import {
  CreditCardOutlined,
  MessageOutlined,
  SendOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { io, Socket } from "socket.io-client";
import { Card } from "@heroui/card";
import { Textarea } from "@heroui/input";
import { TDoctor, TPatient, TUserRole } from "@/src/types/user";
import { Avatar } from "@heroui/avatar";
import Empty from "@/src/components/shared/Empty";
import moment from "moment";
import { Spinner } from "@heroui/spinner";
import { TAppointment } from "@/src/types/appointment";
import { firstLetterCapital } from "@/src/utils/firstLetterCapital";

type TMessage = {
  appointmentId: string;
  text: string;
  from: TUserRole;
  fromUserId: string;
  timestamp: number;
};

type ChatProps = {
  from: TUserRole;
  appointment: TAppointment;
  doctor: TDoctor;
  patient: TPatient;
};

const Chat = ({ from, doctor, patient, appointment }: ChatProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const socketRef = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Get sender info
  const senderInfo = from === "doctor" ? doctor : patient;
  const receiverInfo = from === "doctor" ? patient : doctor;

  console.log({ senderInfo, receiverInfo, messages, appointment });

  useEffect(() => {
    const socket = io("http://localhost:5500", {
      transports: ["websocket"],
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      socket.emit("join_room", appointment._id);
    });

    socket.on("receive_message", (data: TMessage) => {
      if (data.appointmentId === appointment._id) {
        setMessages((prev) => [...prev, data]);
      }
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [appointment._id]);

  //   Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTo({
        top: messagesEndRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const sendMessage = useCallback(() => {
    if (!message.trim() || !socketRef.current) return;

    const msg: TMessage = {
      appointmentId: appointment._id,
      text: message.trim(),
      from,
      fromUserId: senderInfo._id,
      timestamp: Date.now(),
    };

    socketRef.current.emit("send_message", msg);
    // setMessages((prev) => [...prev, msg]); // optional
    setMessage("");
  }, [message, from, senderInfo, appointment._id]);

  return (
    <>
      <Button
        isIconOnly
        onPress={onOpen}
        startContent={<MessageOutlined />}
        color="success"
        className="text-white bg-primary bg-opacity-60 text-lg"
      />
      <Modal
        isOpen={isOpen}
        onOpenChange={onClose}
        placement="center"
        size="3xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-between items-center gap-4 p-4 border-b border-gray-200">
                {/* Left: Appointment Time */}
                <div className="flex flex-col text-left text-sm text-gray-600">
                  <span className="text-xs font-medium">Appointment</span>
                  <span title={moment(appointment.schedule).format("LLLL")}>
                    {moment(appointment.createdAt).format(
                      "DD-MMM-YYYY ⏰ hh:mm A"
                    )}
                  </span>
                  <span className="text-xs text-gray-400">
                    {moment(appointment.schedule).fromNow()}
                  </span>
                </div>

                {/* Center: Receiver Profile */}
                <div className="flex flex-col items-center text-center">
                  <Avatar
                    showFallback
                    size="lg"
                    src={receiverInfo?.profileImg}
                    name={receiverInfo?.name}
                  />
                  <div className="font-semibold text-lg ">
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
                    <CreditCardOutlined /> {appointment.payment?.amount?.total}{" "}
                    BDT
                  </span>
                  <span className="text-xs capitalize">
                    {appointment.payment?.paymentMethod || "N/A"}
                  </span>
                  <span
                    className={`text-xs font-bold ${
                      appointment.status === "confirmed"
                        ? "text-green-600"
                        : appointment.status === "pending"
                        ? "text-yellow-500"
                        : "text-gray-500"
                    }`}
                  >
                    {firstLetterCapital(appointment.status)}
                  </span>
                </div>
              </ModalHeader>
              <ModalBody>
                <Card className="p-4">
                  {/* MESSAGES */}
                  <div
                    className="max-h-[300px] overflow-y-auto mb-3 space-y-2 text-left"
                    ref={messagesEndRef}
                  >
                    {messages.length === 0 ? (
                      <p className="text-gray-400 text-center my-5">
                        No messages yet <MessageOutlined />
                      </p>
                    ) : (
                      messages.map((msg, idx) => (
                        <div
                          className={`flex items-center w-fit max-w-[75%] gap-2                                 ${
                            msg.from === from
                              ? "ml-auto "
                              : "mr-auto flex-row-reverse"
                          }`}
                          key={idx}
                        >
                          <div
                            className={` px-4 py-2 rounded shadow-sm break-words 
                                ${
                                  msg.from === from
                                    ? "bg-green-500 text-white"
                                    : "bg-gray-200 text-black"
                                }
                            `}
                          >
                            <div className="text-sm">{msg.text}</div>

                            <div className="text-[10px] mt-1 text-right text-opacity-70">
                              {moment(msg.timestamp).fromNow()}
                            </div>
                          </div>
                          <Avatar
                            src={
                              msg.from === from
                                ? senderInfo?.profileImg
                                : receiverInfo?.profileImg
                            }
                            size="sm"
                          />
                        </div>
                      ))
                    )}
                  </div>

                  {/* TEXTAREA */}
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
                    className="mb-2"
                  />
                  <Button
                    onPress={sendMessage}
                    disabled={!message.trim()}
                    fullWidth
                    color="primary"
                    className={`text-white font-bold ${
                      !message.trim() ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    endContent={<SendOutlined />}
                  >
                    Send
                  </Button>
                </Card>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Chat;
