"use client";
import DoctorCard from "@/src/app/(withCommonLayout)/specialty/_components/DoctorCard";
import Loading from "@/src/components/ui/Loading";
import {
  useGetPatientById,
  useUpdateFavoriteDoctors,
} from "@/src/hooks/patient.hook";
import useUserData from "@/src/hooks/user.hook";
import { TDoctor } from "@/src/types/user";
import React from "react";

const FavoriteDoctorsPage = () => {
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
  const favDoctors = patient?.data?.favoriteDoctors || [];

  if (isUserLoading || isPatientLoading || isHandleFavoriteDoctorsLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-semibold py-2 mb-2">Favorite Doctors</h2>
      {favDoctors.length > 0 ? (
        <div className="flex flex-col gap-6">
          {favDoctors.map((doctor: TDoctor) => (
            <DoctorCard doctor={doctor} />
          ))}
        </div>
      ) : (
        <h2 className=" font-bold text-2xl text-center py-2 h-[50vh] flex justify-center items-center text-danger">
          You have no favorite doctors yet.
        </h2>
      )}
    </div>
  );
};

export default FavoriteDoctorsPage;
