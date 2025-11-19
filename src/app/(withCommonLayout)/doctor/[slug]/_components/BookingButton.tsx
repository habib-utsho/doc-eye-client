"use client";
import { CalendarOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import React from "react";

const BookingButton = ({
  params,
  isDoctorAvailableP,
}: {
  params: { slug: string };
  isDoctorAvailableP: boolean;
}) => {
  const router = useRouter();

  return (
    <div className="flex justify-end items-center gap-2 mt-2">
      {isDoctorAvailableP && (
        <Button
          color={"success"}
          className="text-white animate-pulse"
          size="lg"
          startContent={<VideoCameraOutlined />}
          onPress={() =>
            router.push(`/doctor/${params?.slug}/checkout?isAvailableNow=true`)
          }
        >
          Book now
        </Button>
      )}
      <Button
        color={"primary"}
        className="text-white"
        size="lg"
        startContent={<CalendarOutlined />}
        onPress={() =>
          router.push(`/doctor/${params?.slug}/checkout?isAvailableNow=false`)
        }
      >
        Appointment
      </Button>
    </div>
  );
};

export default BookingButton;
