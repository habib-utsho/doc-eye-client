import { TDoctor } from "@/src/types/user";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DoctorCard = ({ doctor }: { doctor: TDoctor }) => {

  console.log(doctor, 'doctor');
  return (
    <Link
      href={"/"}
      className="grid grid-cols-12 gap-4 justify-between items-center p-4 bg-white dark:bg-slate-800  rounded-md shadow hover:shadow-md"
    >
      <div className="flex items-center gap-2 col-span-8 border-r  dark:border-gray-700">
        <Image
          src={doctor?.profileImg}
          alt={doctor?.name}
          width={48}
          height={48}
          className="w-14 h-16 rounded-lg"
        />
        <div>
          <h3 className="text-lg font-semibold">
            {doctor?.doctorTitle} {doctor?.name}
          </h3>
          <p className="text-sm text-gray-500">{doctor?.doctorType}</p>
          <p className="text-sm text-primary-500 font-bold">
            {doctor?.medicalDegree}
          </p>
          <p className="text-sm text-gray-500">
            {doctor?.totalExperienceYear} years of experience
          </p>
        </div>
      </div>
      <div className="col-span-4 flex flex-col justify-center gap-2">
        <p className="text-sm text-gray-500">
          <span className="font-bold text-lg text-primary-500">
            ৳{doctor?.consultationFee}
          </span>{" "}
          per consultation
        </p>
        <p className="text-sm text-gray-500">
          {doctor.patientAttended} patients attended
        </p>
      </div>
    </Link>
  );
};

export default DoctorCard;
