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
import { MessageOutlined } from "@ant-design/icons";
import { io, Socket } from "socket.io-client";
import { Card } from "@heroui/card";
import { Textarea } from "@heroui/input";
import { TDoctor, TPatient, TUserRole } from "@/src/types/user";
import { Avatar } from "@heroui/avatar";

type TMessage = {
  appointmentId: string;
  text: string;
  from: TUserRole;
  fromUserId: string;
  timestamp: number;
};

type ChatProps = {
  from: TUserRole;
  appointmentId: string;
  doctor: TDoctor;
  patient: TPatient;
};

const Chat: React.FC<ChatProps> = ({
  from,
  doctor,
  patient,
  appointmentId,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const socketRef = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [message, setMessage] = useState("");

  // Get sender info
  const senderInfo = from === "doctor" ? doctor : patient;
  const receiverInfo = from === "doctor" ? patient : doctor;

  console.log({ senderInfo, receiverInfo, messages, appointmentId });

  useEffect(() => {
    const socket = io("http://localhost:5500", {
      transports: ["websocket"],
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      socket.emit("join_room", appointmentId);
    });

    socket.on("receive_message", (data: TMessage) => {
      if (data.appointmentId === appointmentId) {
        setMessages((prev) => [...prev, data]);
      }
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [appointmentId]);

  const sendMessage = useCallback(() => {
    if (!message.trim() || !socketRef.current) return;

    const msg: TMessage = {
      appointmentId,
      text: message.trim(),
      from,
      fromUserId: senderInfo._id,
      timestamp: Date.now(),
    };

    socketRef.current.emit("send_message", msg);
    // setMessages((prev) => [...prev, msg]); // optional
    setMessage("");
  }, [message, from, senderInfo, appointmentId]);

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
              <ModalHeader className="flex flex-col text-center items-center gap-1">
                <Avatar
                  showFallback
                  size="lg"
                  src={receiverInfo?.profileImg}
                  name={receiverInfo?.name}
                />
                <div className="text-xl font-bold">
                  Chat with {receiverInfo?.name}
                </div>
              </ModalHeader>
              <ModalBody>
                <Card className="p-4">
                  {/* MESSAGES */}
                  <div className="max-h-[300px] overflow-y-auto mb-3 space-y-2 text-left">
                    {messages.length === 0 ? (
                      <p className="text-gray-400">No messages yet</p>
                    ) : (
                      messages.map((msg, idx) => (
                        <div
                          key={idx}
                          className={`w-fit max-w-[75%] px-4 py-2 rounded shadow-sm break-words ${
                            msg.from === from
                              ? "ml-auto bg-green-500 text-white"
                              : "mr-auto bg-gray-200 text-black"
                          }`}
                        >
                          <div className="text-sm">{msg.text}</div>
                          <div className="text-[10px] mt-1 text-right text-opacity-70">
                            {new Date(msg.timestamp).toLocaleTimeString()}
                          </div>
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
                    className="mb-2"
                  />
                  <Button
                    onPress={sendMessage}
                    disabled={!message.trim()}
                    fullWidth
                    color="success"
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
