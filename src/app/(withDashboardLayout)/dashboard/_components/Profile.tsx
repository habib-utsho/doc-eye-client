"use client";

import DEForm from "@/src/components/ui/Form/DEForm";
import MyInp from "@/src/components/ui/Form/MyInp";
import Loading from "@/src/components/ui/Loading";
import { bloodGroups, districts } from "@/src/constant/user.constant";
import { useGetAdminById } from "@/src/hooks/admin.hook";
import { useGetDoctorById } from "@/src/hooks/doctor.hook";
import { useGetPatientById } from "@/src/hooks/patient.hook";
import useUserData from "@/src/hooks/user.hook";
import { TAdmin, TDoctor, TPatient, TUserRole } from "@/src/types/user";
import { convertTo12HourTime } from "@/src/utils/24FourHourTimeTo12HourTime";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Form, SubmitHandler, useForm } from "react-hook-form";
import {
  FaUserMd,
  FaUser,
  FaShieldAlt,
  FaEdit,
  FaSave,
  FaTimes,
  FaEnvelope,
  FaPhone,
  FaStethoscope,
  FaCamera,
} from "react-icons/fa";

type FormValues = {
  name: string;
};

export default function ProfilePage() {
  const formMethods = useForm<FormValues>({
    // resolver: zodResolver(
    //   medicalReportValidationSchema.createMedicalReportZodSchema
    // ),
  });

  const { user } = useUserData();
  const userRole = user?.role as TUserRole;

  const { data, isPending, isError } =
    userRole === "patient"
      ? useGetPatientById(user?._id || "")
      : userRole === "doctor"
      ? useGetDoctorById(user?._id || "")
      : useGetAdminById(user?._id || "");

  const patientData =
    userRole === "patient" ? (data?.data as TPatient) : undefined;
  const doctorData =
    userRole === "doctor" ? (data?.data as TDoctor) : undefined;
  const adminData = userRole === "admin" ? (data?.data as TAdmin) : undefined;
  const myData = (patientData || doctorData || adminData) as Partial<
    TPatient & TDoctor & TAdmin
  >;

  const [isEditing, setIsEditing] = useState(false);
  const [preview, setPreview] = useState(user?.profileImg);

  const RoleIcon =
    userRole === "doctor"
      ? FaUserMd
      : userRole === "patient"
      ? FaUser
      : FaShieldAlt;

  // set profile img
  useEffect(() => {
    setPreview(user?.profileImg);
  }, [user]);

  if (isPending) {
    return <Loading />;
  }

  console.log({ myData, patientData, doctorData, adminData });

  const onSubmit: SubmitHandler<TPatient> = async (payload: TPatient) => {};

  return (
    <div className="min-h-screen p-4">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white flex flex-col md:flex-row items-center gap-8 p-5 rounded-md shadow">
        {/* Avatar */}
        <div className="relative group">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl">
            {preview ? (
              <Image
                src={preview}
                alt={user?.name || "Profile Image"}
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-500 to-purple-600 text-4xl font-bold text-white">
                {user?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            )}
          </div>

          {isEditing && (
            <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-60 group-hover:opacity-100 transition cursor-pointer rounded-full z-20">
              <FaCamera className="w-8 h-8 text-white" />
              {/* Your custom <Input type="file" /> goes here */}
            </label>
          )}

          <div className="absolute inset-0 w-40 h-40 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-3xl opacity-70 z-10 animate-pulse" />
        </div>

        {/* Name & Role */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{user?.name}</h1>
          <div className="flex items-center justify-center md:justify-start gap-2">
            <RoleIcon className="w-5 h-5" />
            <span className="capitalize font-medium">{user?.role}</span>
          </div>
        </div>

        {/* Edit Button */}
        {!isEditing && (
          <Button
            onPress={() => setIsEditing(true)}
            variant="solid"
            className=" bg-white/20 text-white hover:bg-white/30 transition"
          >
            <FaEdit className="w-4 h-4" />
            Edit Profile
          </Button>
        )}
      </div>

      <section className="px-4 mt-8">
        <div className="max-w-4xl mx-auto">
          {!isEditing && (
            <div className="space-y-8">
              {/* Personal Info */}
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Personal Information
                </h2>
                <Divider className="mb-4" />
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600">Full Name</p>
                    <p className="font-medium">{myData?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium flex items-center gap-2">
                      <FaEnvelope className="w-4 h-4 text-blue-600" />
                      {myData?.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium flex items-center gap-2">
                      <FaPhone className="w-4 h-4 text-green-600" />
                      {myData?.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Gender</p>
                    <p className="font-medium flex items-center gap-2">
                      {myData?.gender}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">District</p>
                    <p className="font-medium flex items-center gap-2">
                      {myData?.district}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date of Birth</p>
                    <p className="font-medium flex items-center gap-2">
                      {moment(myData?.dateOfBirth).format("MMMM D, YYYY")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Blood Group</p>
                    <p className="font-medium flex items-center gap-2">
                      {myData?.bloodGroup}
                    </p>
                  </div>
                  {userRole != "doctor" && (
                    <div>
                      <p className="text-sm text-gray-600">Weight</p>
                      <p className="font-medium flex items-center gap-2">
                        {myData?.weight ? `${myData.weight} kg` : "N/A"}
                      </p>
                    </div>
                  )}
                  {userRole != "doctor" && (
                    <div>
                      <p className="text-sm text-gray-600">Height</p>
                      <p className="font-medium flex items-center gap-2">
                        {myData?.height ? `${myData.height} kg` : "N/A"}
                      </p>
                    </div>
                  )}
                  {userRole != "doctor" && (
                    <div>
                      <p className="text-sm text-gray-600">Allergies</p>
                      <p className="font-medium flex items-center gap-2">
                        {myData?.allergies ? `${myData.allergies} kg` : "N/A"}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Doctor Details */}
              {userRole === "doctor" && doctorData && (
                <div className="bg-white rounded-xl shadow p-6 space-y-6">
                  {/* Section Header */}
                  <h2 className="flex items-center gap-2 text-xl font-semibold text-blue-700">
                    <FaStethoscope className="w-5 h-5" />
                    Professional Details
                  </h2>
                  <Divider className="mb-2" />

                  {/* Top Summary */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500">Doctor Code</p>
                      <p className="font-medium">{doctorData.doctorCode}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Doctor Type</p>
                      <p className="font-medium">{doctorData.doctorType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Title</p>
                      <p className="font-medium">{doctorData.doctorTitle}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">BMDC No.</p>
                      <p className="font-medium">{doctorData.bmdc}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Experience</p>
                      <p className="font-medium">
                        {doctorData.totalExperienceYear} years
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Medical Degree</p>
                      <p className="font-medium">{doctorData.medicalDegree}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Consultation Fee</p>
                      <p className="font-medium">
                        ৳{doctorData.consultationFee}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Follow-up Fee</p>
                      <p className="font-medium">৳{doctorData.followupFee}</p>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className=" p-3 rounded-md shadow mt-6">
                    <h3 className="text-lg font-semibold text-gray-800  mb-3">
                      Medical Specialties
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {doctorData.medicalSpecialties?.map((spec) => (
                        <div
                          className="px-3 py-1 rounded-full bg-blue-50 text-primary text-sm font-medium border shadow shadow-primary flex items-center gap-2"
                          key={spec._id}
                        >
                          <Image
                            height={20}
                            width={20}
                            alt={spec.name}
                            src={spec.icon}
                          />
                          <span className="">{spec.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <div className=" p-3 rounded-md shadow mt-6">
                    <h3 className="text-lg font-semibold text-gray-800  mb-3">
                      Availability
                    </h3>
                    <div className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-gray-500 animate-pulse inline-block"></span>
                      <span className="font-semibold">
                        {doctorData.availability?.dayStart} -{" "}
                        {doctorData.availability?.dayEnd}{" "}
                      </span>
                      {`(${convertTo12HourTime(
                        doctorData.availability?.timeStart
                      )} - ${convertTo12HourTime(
                        doctorData.availability?.timeEnd
                      )})`}
                    </div>
                  </div>

                  {/* Current Workplace */}
                  {doctorData.currentWorkplace && (
                    <div className=" p-3 rounded-md shadow mt-6">
                      <h3 className="text-lg font-semibold text-gray-800  mb-3">
                        Current Workplace
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Workplace</p>
                          <p className="font-medium">
                            {doctorData.currentWorkplace.workPlace}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Department</p>
                          <p className="font-medium">
                            {doctorData.currentWorkplace.department}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Designation</p>
                          <p className="font-medium">
                            {doctorData.currentWorkplace.designation}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            Working Period
                          </p>
                          <p className="font-medium">
                            {moment(
                              doctorData.currentWorkplace.workingPeriodStart
                            ).format("DD MMM, YYYY")}
                            -{" "}
                            {doctorData.currentWorkplace.workingPeriodEnd
                              ? moment(
                                  doctorData.currentWorkplace.workingPeriodEnd
                                ).format("DD MMM, YYYY")
                              : "Present"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Past Experiences */}
                  {doctorData.workingExperiences?.length > 0 && (
                    <div className=" p-3 rounded-md shadow mt-6">
                      <h3 className="text-lg font-semibold text-gray-800  mb-3">
                        Past Experiences
                      </h3>
                      <div className="space-y-4">
                        {doctorData.workingExperiences.map((exp) => (
                          <div
                            key={exp._id}
                            className="border rounded-lg p-4 bg-gray-50"
                          >
                            <p className="font-semibold">{exp.designation}</p>
                            <p className="text-sm text-gray-600">
                              {exp.department}, {exp.workPlace}
                            </p>
                            <p className="text-xs text-gray-500">
                              {moment(exp.workingPeriodStart).format(
                                "DD MMM, YYYY"
                              )}{" "}
                              -{" "}
                              {exp.workingPeriodEnd
                                ? moment(exp.workingPeriodEnd).format(
                                    "DD MMM, YYYY"
                                  )
                                : "Present"}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* EDIT MODE – Replace with your <Form> and <Input> */}
          {isEditing && (
            <DEForm
              className="space-y-8"
              methods={formMethods}
              onSubmit={onSubmit}
            >
              {/* Personal Info */}
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Personal Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <MyInp
                    type="text"
                    name="name"
                    defaultValue={myData?.name || ""}
                    label="Full Name"
                    placeholder="Your name here"
                  />
                  <MyInp
                    type="email"
                    name="email"
                    defaultValue={myData?.email || ""}
                    label="Email"
                    placeholder="Your email here"
                    disabled
                  />
                  <MyInp
                    type="text"
                    name="name"
                    defaultValue={myData?.phone || ""}
                    label="Phone"
                    placeholder="Your phone here"
                  />
                  <MyInp
                    type="text"
                    name="gender"
                    defaultValue={myData?.gender || ""}
                    label="Gender"
                    placeholder="Your gender here"
                  />
                  <MyInp
                    type="select"
                    name="district"
                    label="District"
                    placeholder="Select District"
                    options={districts?.map((district) => ({
                      key: district,
                      label: district,
                    }))}
                  />
                  <MyInp type="date" name="dateOfBirth" label="Date of Birth" />
                  <MyInp
                    type="select"
                    name="bloodGroup"
                    label="Blood Group"
                    placeholder="Select Blood Group"
                    options={bloodGroups?.map((bg) => ({
                      key: bg,
                      label: bg,
                    }))}
                  />
                  {userRole != "doctor" && (
                    <MyInp
                      type="number"
                      name="weight"
                      defaultValue={myData?.weight?.toString() || ""}
                      label="Weight (kg)"
                      placeholder="Your weight here"
                    />
                  )}
                  {userRole != "doctor" && (
                    <MyInp
                      type="number"
                      name="height"
                      defaultValue={myData?.height?.toString() || ""}
                      label="Height (cm)"
                      placeholder="Your height here"
                    />
                  )}
                  {userRole != "doctor" && (
                    <MyInp
                      type="text"
                      name="allergies"
                      defaultValue={myData?.allergies || ""}
                      label="Allergies"
                      placeholder="Your allergies here"
                    />
                  )}
                </div>
              </div>

              {/* Doctor Edit */}
              {userRole === "doctor" && doctorData && (
                <div className="bg-white rounded-xl shadow p-6 space-y-6">
                  <h2 className="flex items-center gap-2 text-xl font-semibold text-primary">
                    <FaStethoscope className="w-5 h-5" />
                    Doctor Details Details
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Specialty
                      </label>
                      <input
                        defaultValue={doctorData.medicalSpecialties?.[0]?.name}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  <FaTimes className="w-4 h-4" />
                  Cancel
                </button>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition">
                  <FaSave className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </DEForm>
          )}
        </div>
      </section>
    </div>
  );
}
