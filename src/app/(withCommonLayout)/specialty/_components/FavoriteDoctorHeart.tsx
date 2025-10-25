"use client";
import { HeartFilledIcon } from "@/src/components/ui/icons";
import {
  useGetPatientById,
  useUpdateFavoriteDoctors,
} from "@/src/hooks/patient.hook";
import useUserData from "@/src/hooks/user.hook";
import { TDoctor } from "@/src/types/user";
import { HeartOutlined } from "@ant-design/icons";
import { Spinner } from "@heroui/spinner";
import React from "react";

const FavoriteDoctorHeart = ({
  doctor,
  className,
}: {
  doctor: TDoctor;
  className?: string;
}) => {
  const { user, isLoading, setIsLoading } = useUserData();

  const {
    data: patient,
    isLoading: isPatientLoading,
    refetch,
  } = useGetPatientById(user?.role === "patient" ? user?._id : null);
  const {
    mutate: handleFavoriteDoctors,

    isPending: isHandleFavoriteDoctorsLoading,
  } = useUpdateFavoriteDoctors();

  //   console.log({ user, isLoading, setIsLoading, patient, isPatientLoading });

  const handleFavDoctorsFunc = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("test");
    handleFavoriteDoctors(
      { doctorId: doctor?._id },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  return (
    <div className={`${className}`}>
      {isPatientLoading || isHandleFavoriteDoctorsLoading ? (
        <Spinner className="" color="current" />
      ) : (
        user?.role === "patient" && (
          <div
            className=" text-red-500 cursor-pointer"
            onClick={handleFavDoctorsFunc}
          >
            {patient?.data?.favoriteDoctors?.find(
              (doctorRes: TDoctor) => doctorRes?._id == doctor?._id
            ) ? (
              <HeartFilledIcon />
            ) : (
              <HeartOutlined className="text-2xl" />
            )}
          </div>
        )
      )}
    </div>
  );
};

export default FavoriteDoctorHeart;
