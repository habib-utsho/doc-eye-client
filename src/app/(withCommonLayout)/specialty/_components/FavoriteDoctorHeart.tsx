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
  const { user, isLoading: isUserLoading } = useUserData();

  const {
    data: patient,
    isLoading: isPatientLoading,
    refetch,
  } = useGetPatientById(user?.role === "patient" ? user?._id : null);
  const {
    mutate: handleFavoriteDoctors,

    isPending: isHandleFavoriteDoctorsLoading,
  } = useUpdateFavoriteDoctors();

  // console.log({ user, isLoading, setIsLoading, patient, isPatientLoading });

  const handleFavDoctorsFunc = (e: React.MouseEvent) => {
    e.preventDefault();
    handleFavoriteDoctors(
      { doctorId: doctor?._id },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  if (user?.role !== "patient") {
    return null;
  }

  return (
    <div className={`${className}`}>
      {isPatientLoading || isUserLoading || isHandleFavoriteDoctorsLoading ? (
        <Spinner className="" color="current" size="sm" />
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
              <HeartOutlined className="text-xl" />
            )}
          </div>
        )
      )}
    </div>
  );
};

export default FavoriteDoctorHeart;
