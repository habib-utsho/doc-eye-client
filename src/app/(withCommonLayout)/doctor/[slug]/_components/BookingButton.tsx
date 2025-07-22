"use client";
import { CalendarOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import React from "react";

const BookingButton = async ({
  params,
  isDoctorAvailableP,
}: {
  params: { slug: string };
  isDoctorAvailableP: boolean;
}) => {
  const router = useRouter();
  const p = await params;

  return (
    <Button
      color={isDoctorAvailableP ? "success" : "primary"}
      className="text-white animate-pulse"
      size="lg"
      startContent={
        isDoctorAvailableP ? <VideoCameraOutlined /> : <CalendarOutlined />
      }
      onPress={() =>
        router.push(
          `/doctor/${p?.slug}/checkout${
            isDoctorAvailableP ? "?isAvailableNow=true" : ""
          }`
        )
      }
    >
      {isDoctorAvailableP ? "Book now" : "Appointment"}
    </Button>
  );
};

export default BookingButton;
