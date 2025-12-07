"use client";
import React from "react";
import { Drawer, DrawerContent } from "@heroui/drawer";
import { useDisclosure } from "@heroui/modal";

import { Button } from "@heroui/button";
import ChatBody from "./ChatBody";
import { TDoctor, TPatient, TUserRole } from "@/src/types/user";
import { TAppointment } from "@/src/types/appointment";
import { MessageOutlined } from "@ant-design/icons";

type ChatProps = {
  from: TUserRole;
  appointment: TAppointment;
  doctor: TDoctor;
  patient: TPatient;
};

const Chat = ({ from, doctor, patient, appointment }: ChatProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        isIconOnly
        onPress={onOpen}
        startContent={<MessageOutlined />}
        color="success"
        className="text-white bg-primary bg-opacity-60 text-lg flex-1 rounded-r-none"
      />
      <Drawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="right"
        size="lg"
      >
        <DrawerContent className="h-full">
          {(onClose) => (
            <>
              <ChatBody
                from={from}
                doctor={doctor}
                patient={patient}
                appointment={appointment}
              />
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Chat;
