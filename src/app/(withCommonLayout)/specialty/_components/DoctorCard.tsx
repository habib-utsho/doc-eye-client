"use client";
import {
  AngleRightIcon,
} from "@/src/components/ui/icons";
import { TDoctor } from "@/src/types/user";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import FavoriteDoctorHeart from "./FavoriteDoctorHeart";

const DoctorCard = ({ doctor }: { doctor: TDoctor }) => {
  return (
    <Link
      href={`/doctor/${doctor.doctorCode}`}
      className="grid grid-cols-12 gap-4 justify-between items-center p-4 bg-white dark:bg-slate-800  rounded-md shadow hover:shadow-sm relative"
    >
      <FavoriteDoctorHeart
        doctor={doctor}
        className="absolute top-2 right-3 z-10"
      />
      <div className="flex items-center gap-2 col-span-8 border-r  dark:border-gray-700">
        {doctor?.profileImg ? (
          <Image
            src={doctor?.profileImg}
            alt={doctor?.name}
            width={48}
            height={48}
            className="w-14 h-16 rounded-lg"
          />
        ) : (
          <div className="rounded-lg w-14 h-16 bg-primary-500 bg-opacity-20 mr-2" />
        )}
        <div>
          <h3 className="text-lg font-semibold">
            {doctor?.doctorTitle} {doctor?.name}
          </h3>
          <p className="text-sm text-gray-500">{doctor?.doctorType}</p>
          <p className="text-sm text-primary-500 font-bold">
            {doctor?.medicalDegree}
          </p>
          <p className="text-sm bg-primary-500 text-white pl-1 pr-2 py-[1px] rounded-r-xl font-bold">
            {doctor?.medicalSpecialties
              ?.map((specialty) => specialty.name)
              ?.join(", ")}
          </p>
          <div className="">
            <p className="text-[12px] text-gray-500">Working in</p>
            <p className="text-sm text-gray-500 font-semibold">
              {doctor?.currentWorkplace?.workPlace} -{" "}
              {doctor?.currentWorkplace?.department}
            </p>
          </div>

          <p className="text-sm text-gray-500">
            {doctor?.totalExperienceYear} years of experience
          </p>
        </div>
      </div>
      <div className="col-span-4 flex justify-between items-center gap-2">
        <div>
          <p className="text-sm text-gray-500">
            <span className="font-bold text-lg text-primary-500">
              ৳{doctor?.consultationFee}
            </span>{" "}
            /per consultation
          </p>
          <p className="text-sm text-gray-500">
            {doctor.patientAttended} patients attended
          </p>
        </div>
        <span>
          <AngleRightIcon className="size-8" />
        </span>
      </div>
    </Link>
  );
};

export default DoctorCard;
