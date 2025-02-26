"use client";
import { CalendarOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Button } from "@heroui/button";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const BookingButton = ({
  params,
  isDoctorAvailableP,
}: {
  params: { slug: string };
  isDoctorAvailableP: boolean;
}) => {
  const router = useRouter();
  const queryParams = useSearchParams();
  const myParams = useParams();
  console.log({ queryParams, myParams }, "Booking Button");
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
          `/doctor/${params?.slug}/checkout${
            !isDoctorAvailableP ? "?isAvailableNow=true" : ""
          }`
        )
      }
    >
      {isDoctorAvailableP ? "Book now" : "Appointment"}
    </Button>
  );
};

export default BookingButton;
