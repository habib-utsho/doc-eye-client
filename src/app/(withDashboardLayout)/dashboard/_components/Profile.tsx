"use client";

import { subtitle } from "@/src/components/primitives";
import Empty from "@/src/components/shared/Empty";
import DEForm from "@/src/components/ui/Form/DEForm";
import MyInp from "@/src/components/ui/Form/MyInp";
import MyUpload from "@/src/components/ui/Form/MyUpload";
import { PlusIcon } from "@/src/components/ui/icons";
import Loading from "@/src/components/ui/Loading";
import { doctorTitles, doctorTypes } from "@/src/constant/doctor.constant";
import { days } from "@/src/constant/index.constant";
import { bloodGroups, districts, genders } from "@/src/constant/user.constant";
import { useGetAdminById, useUpdateAdminById } from "@/src/hooks/admin.hook";
import { useGetDoctorById, useUpdateDoctorById } from "@/src/hooks/doctor.hook";
import {
  useGetPatientById,
  useUpdatePatientById,
} from "@/src/hooks/patient.hook";
import { useGetAllSpecialties } from "@/src/hooks/specialty.hook";
import useUserData from "@/src/hooks/user.hook";
import { authValidationSchema } from "@/src/schemas/auth.schema";
import { TSpecialty } from "@/src/types/specialty";
import { TAdmin, TDoctor, TPatient, TUserRole } from "@/src/types/user";
import { convertTo12HourTime } from "@/src/utils/24FourHourTimeTo12HourTime";
import { MinusOutlined } from "@ant-design/icons";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
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
} from "react-icons/fa";
import { FaCamera } from "react-icons/fa6";
import { toast } from "sonner";

type FormValues = Partial<TPatient & TDoctor & TAdmin>;

export default function ProfilePage() {
  const { data: specialties, isLoading: isLoadingSpecialties } =
    useGetAllSpecialties([{ name: "limit", value: 5000 }]);

  const { mutate: updateDoctorMutate, isPending: isLoadingUpdateDoctor } =
    useUpdateDoctorById();
  const { mutate: updateAdminMutate, isPending: isLoadingUpdateAdmin } =
    useUpdateAdminById();
  const { mutate: updatePatientMutate, isPending: isLoadingUpdatePatient } =
    useUpdatePatientById();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { user, setLocalUserRefetch, localUserRefetch } = useUserData();
  const userRole = user?.role as TUserRole;

  const { data, isPending, refetch, isError } =
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

  const RoleIcon =
    userRole === "doctor"
      ? FaUserMd
      : userRole === "patient"
      ? FaUser
      : FaShieldAlt;

  // RHF

  const defaultValues = {
    name: myData?.name,
    email: myData?.email,
    phone: myData?.phone,
    dateOfBirth: myData?.dateOfBirth?.slice(0, 10),
    gender: myData?.gender,
    district: myData?.district,
    bloodGroup: myData?.bloodGroup,
    weight: myData?.weight,
    height: myData?.height,
    allergies: myData?.allergies,
    bio: myData?.bio,
    doctorTitle: myData?.doctorTitle,
    doctorType: myData?.doctorType,
    totalExperienceYear: myData?.totalExperienceYear,
    currentWorkplace: {
      workPlace: myData?.currentWorkplace?.workPlace,
      department: myData?.currentWorkplace?.department,
      designation: myData?.currentWorkplace?.designation,
      workingPeriodStart: myData?.currentWorkplace?.workingPeriodStart?.slice(
        0,
        10
      ),
      workingPeriodEnd: myData?.currentWorkplace?.workingPeriodEnd?.slice(
        0,
        10
      ),
    },
    consultationFee: myData?.consultationFee,
    followupFee: myData?.followupFee,
    nid: myData?.nid,
    bmdc: myData?.bmdc,
    medicalDegree: myData?.medicalDegree,
    medicalSpecialties: myData?.medicalSpecialties?.map((ms) => ms?._id),
    availability: myData?.availability,
    // workingExperiences: myData?.workingExperiences,
  };
  const formMethods = useForm<FormValues>({
    resolver: zodResolver(
      userRole === "doctor"
        ? authValidationSchema.doctorUpdateValidationSchema
        : authValidationSchema.patientUpdateValidationSchema
    ),
  });

  const {
    control,
    formState: { errors },
  } = formMethods;

  const {
    fields: workingExperiencesFields,
    append: appendWorkingExperiences,
    remove: removeWorkingExperiences,
  } = useFieldArray({
    control,
    name: "workingExperiences",
  });

  // console.log({ myData, patientData, doctorData, adminData });

  const onSubmit: SubmitHandler<TPatient> = async (payload: TPatient) => {
    let formData = new FormData();

    if (!previewUrl && !selectedFile) {
      toast.error("Profile image is required!");
      return;
    }

    formData.append("data", JSON.stringify(payload));

    if (previewUrl != myData?.profileImg && selectedFile) {
      formData.append("file", selectedFile as Blob);
    }

    // console.log(payload, selectedFile);
    // To display all entries
    // for (let [key, value] of payload.entries()) {
    //   console.log(key, value);
    // }

    if (myData._id) {
      let mutate =
        userRole === "doctor"
          ? updateDoctorMutate
          : userRole === "patient"
          ? updatePatientMutate
          : updateAdminMutate;

      mutate(
        { id: myData._id, payload: formData },
        {
          onSuccess: () => {
            refetch();
            setLocalUserRefetch(!localUserRefetch);
          },
        }
      );
    }
  };

  // Append working experiences and add previewURL
  useEffect(() => {
    if (myData && myData?.workingExperiences) {
      removeWorkingExperiences();
      myData?.workingExperiences?.forEach((we) => {
        appendWorkingExperiences({
          workPlace: we.workPlace,
          department: we.department,
          designation: we.designation,
          workingPeriodStart: we.workingPeriodStart?.slice(0, 10),
          workingPeriodEnd: we.workingPeriodEnd?.slice(0, 10),
        });
      });
    }

    if (myData && myData?.profileImg) {
      setPreviewUrl(myData?.profileImg);
    }
  }, [myData]);

  // console.log(workingExperiences);
  if (isPending) {
    return <Loading />;
  }

  // console.log({
  //   myDataWorkingExp: myData?.workingExperiences,
  //   localStateWX: workingExperiencesFields,
  //   myData,
  //   previewUrl,
  //   selectedFile,
  // });

  return (
    <div className="min-h-screen p-4">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white flex flex-col md:flex-row items-center gap-8 p-5 rounded-md shadow">
        {/* Avatar */}
        <div>
          {/* <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl"> */}
          <DEForm onSubmit={onSubmit} methods={formMethods}>
            <MyUpload
              setSelectedFile={setSelectedFile}
              previewUrl={previewUrl}
              setPreviewUrl={setPreviewUrl}
              height={200}
              width={200}
              isEditing={isEditing}
            />
          </DEForm>
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
            startContent={<FaEdit className="w-4 h-4" />}
            className=" bg-white/20 text-white hover:bg-white/30 transition"
          >
            Edit Profile
          </Button>
        )}
      </div>

      <section className="px-4 mt-8">
        <div className="max-w-4xl mx-auto">
          {!isEditing && (
            <div className="space-y-8">
              {/* Personal Info */}
              <div className=" rounded-xl shadow dark:bg-slate-900  p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
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
                      {myData?.bloodGroup || "N/A"}
                    </p>
                  </div>
                  {userRole == "patient" && (
                    <div>
                      <p className="text-sm text-gray-600">Weight</p>
                      <p className="font-medium flex items-center gap-2">
                        {myData?.weight ? `${myData.weight} kg` : "N/A"}
                      </p>
                    </div>
                  )}
                  {userRole == "patient" && (
                    <div>
                      <p className="text-sm text-gray-600">Height</p>
                      <p className="font-medium flex items-center gap-2">
                        {myData?.height ? `${myData.height} cm` : "N/A"}
                      </p>
                    </div>
                  )}
                  {userRole == "patient" && (
                    <div>
                      <p className="text-sm text-gray-600">Allergies</p>
                      <p className="font-medium flex items-center gap-2">
                        {myData?.allergies ? `${myData.allergies}` : "N/A"}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Doctor Details */}
              {userRole === "doctor" && doctorData && (
                <div className="shadow dark:bg-slate-900 rounded-xl  p-6 space-y-6">
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
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white  mb-3">
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
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white  mb-3">
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
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white  mb-3">
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
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white  mb-3">
                        Past Experiences
                      </h3>
                      <div className="space-y-4">
                        {doctorData.workingExperiences.map((exp) => (
                          <div
                            key={exp._id}
                            className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-700"
                          >
                            <p className="font-semibold">{exp.designation}</p>
                            <p className="text-sm text-gray-600 dark:text-slate-200">
                              {exp.department}, {exp.workPlace}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-slate-300">
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

          {isEditing && (
            <DEForm
              className="space-y-8"
              onSubmit={onSubmit}
              methods={formMethods}
              defaultValues={defaultValues}
              // resolver={zodResolver(
              //   userRole === "doctor"
              //     ? authValidationSchema.doctorUpdateValidationSchema
              //     : authValidationSchema.patientUpdateValidationSchema
              // )}
            >
              {/* Personal Info */}
              <div className="shadow dark:bg-slate-900 rounded-xl  p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                  Personal Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <MyInp
                    type="text"
                    name="name"
                    label="Full Name"
                    placeholder="Your name here"
                  />
                  <MyInp
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="Your email here"
                    disabled
                  />
                  <MyInp
                    type="text"
                    name="phone"
                    label="Phone"
                    placeholder="Your phone here"
                  />
                  <MyInp
                    type="select"
                    name="gender"
                    label="Gender"
                    placeholder="Select Gender"
                    options={genders?.map((gender) => ({
                      key: gender,
                      label: gender,
                    }))}
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
                  {userRole == "patient" && (
                    <>
                      <MyInp
                        type="number"
                        name="weight"
                        label="Weight (kg)"
                        placeholder="Your weight here"
                      />{" "}
                      <MyInp
                        type="number"
                        name="height"
                        label="Height (cm)"
                        placeholder="Your height here"
                      />{" "}
                      <MyInp
                        type="text"
                        name="allergies"
                        label="Allergies"
                        placeholder="Your allergies here"
                      />
                    </>
                  )}
                </div>
              </div>

              {/* Doctor Edit */}
              {userRole === "doctor" && doctorData && (
                <div className="shadow dark:bg-slate-900 rounded-xl  p-6 space-y-6">
                  <h2 className="flex items-center gap-2 text-xl font-semibold text-primary">
                    <FaStethoscope className="w-5 h-5" />
                    Doctor Details
                  </h2>
                  <div className="space-y-3">
                    <div className="flex flex-col md:flex-row gap-4">
                      <MyInp
                        type="select"
                        name="doctorTitle"
                        label="Doctor Title"
                        options={doctorTitles?.map((doctorTitle) => ({
                          key: doctorTitle,
                          label: doctorTitle,
                        }))}
                      />
                      <MyInp
                        type="select"
                        name="doctorType"
                        label="Doctor Type"
                        options={doctorTypes?.map((doctorType) => ({
                          key: doctorType,
                          label: doctorType,
                        }))}
                      />
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                      <MyInp
                        type="select"
                        name="medicalSpecialties"
                        label="Medical Specialties"
                        selectionMode="multiple"
                        disabled={
                          isLoadingSpecialties ||
                          specialties?.data?.length === 0
                        }
                        options={specialties?.data?.map(
                          (specialty: TSpecialty) => ({
                            key: specialty._id,
                            label: specialty.name,
                          })
                        )}
                      />
                      <MyInp
                        type="text"
                        name="medicalDegree"
                        placeholder="e.g., BCS (Health), MBBS"
                        label="Medical Degree"
                      />
                    </div>

                    {/* consultationFee , follow up fee and current exp year */}
                    <div className="flex flex-col md:flex-row gap-4">
                      <MyInp
                        type="number"
                        name="consultationFee"
                        placeholder="e.g., 1000"
                        label="Consultation Fee (BDT)"
                      />
                      <MyInp
                        type="number"
                        name="followupFee"
                        placeholder="e.g., 600"
                        label="Followup Fee (BDT)"
                      />
                      <MyInp
                        type="number"
                        name="totalExperienceYear"
                        placeholder="e.g., 15"
                        label="Total Exp Year"
                      />
                    </div>
                    {/* NID & BMDC */}
                    <div className="flex flex-col md:flex-row gap-4">
                      <MyInp
                        type="text"
                        name="nid"
                        placeholder="e.g., 663543434423"
                        label="NID"
                        disabled
                      />
                      <MyInp
                        type="text"
                        name="bmdc"
                        placeholder="e.g., 55754"
                        disabled
                        label="BMDC"
                      />
                    </div>

                    {/* Bio */}
                    <div>
                      <h2 className={`${subtitle()}`}>Bio</h2>
                      <Divider className="w-[200px] mb-3" />
                      <MyInp
                        type="textarea"
                        name="bio"
                        label="Bio"
                        placeholder="Write something about yourself"
                      />
                    </div>

                    {/* Current workplace */}
                    <div>
                      <h2 className={`${subtitle()}`}>Current Workplace</h2>
                      <Divider className="w-[200px] mb-3" />
                      <div className="space-y-4">
                        <div className="flex flex-col md:flex-row gap-4">
                          <MyInp
                            type="text"
                            name="currentWorkplace.workPlace"
                            label="Workplace"
                            // value={currentWorkplace.workPlace}
                            // onChange={(e) =>
                            //   onCurrentWorkplaceChange(
                            //     "workplace",
                            //     e.target.value
                            //   )
                            // }
                            placeholder="e.g., Dhaka Medical College"
                          />
                          <MyInp
                            type="text"
                            name="currentWorkplace.department"
                            label="Department"
                            placeholder="e.g., Orthopaedics"
                            // value={currentWorkplace.department}
                            // onChange={(e) =>
                            //   onCurrentWorkplaceChange(
                            //     "department",
                            //     e.target.value
                            //   )
                            // }
                          />
                          <MyInp
                            type="text"
                            name="currentWorkplace.designation"
                            label="Designation"
                            placeholder="e.g., Assistant Professor"
                            // value={currentWorkplace.designation}
                            // onChange={(e) =>
                            //   onCurrentWorkplaceChange(
                            //     "designation",
                            //     e.target.value
                            //   )
                            // }
                          />
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                          <MyInp
                            type="date"
                            name="currentWorkplace.workingPeriodStart"
                            label="Working period start"
                            // value={currentWorkplace.workingPeriodStart}
                            // onChange={(e) =>
                            //   onCurrentWorkplaceChange(
                            //     "workingPeriodStart",
                            //     e.target.value
                            //   )
                            // }
                          />
                          <MyInp
                            type="date"
                            name="currentWorkplace.workingPeriodEnd"
                            label="Working period End"
                            // value={currentWorkplace.workingPeriodEnd}
                            // onChange={(e) =>
                            //   onCurrentWorkplaceChange(
                            //     "workingPeriodEnd",
                            //     e.target.value
                            //   )
                            // }
                          />
                        </div>
                      </div>
                    </div>

                    {/* Working experiences */}
                    <div className="shadow p-4 rounded-md">
                      <h2 className="font-semibold">Working Experiences</h2>
                      <Divider className="mt-1 mb-6" />

                      {workingExperiencesFields.length == 0 ? (
                        <Empty
                          className="h-[80px] cursor-pointer"
                          description="Add Input First"
                          onClick={() =>
                            appendWorkingExperiences({
                              workPlace: "",
                              department: "",
                              designation: "",
                              workingPeriodStart: "",
                              workingPeriodEnd: "",
                            })
                          }
                        />
                      ) : (
                        <>
                          {workingExperiencesFields.map((field, index) => (
                            <div
                              className="shadow p-2 rounded-md mb-4"
                              key={field.id}
                            >
                              <h2 className="font-semibold text-primary dark:text-white">
                                Exp-{index + 1}
                              </h2>
                              <div className="text-right">
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="shadow"
                                  className="my-2"
                                  onPress={() =>
                                    removeWorkingExperiences(index)
                                  }
                                  aria-label="remove working exp"
                                >
                                  <MinusOutlined />
                                </Button>
                              </div>
                              <div className="space-y-4">
                                <div className="flex flex-col md:flex-row gap-4">
                                  <MyInp
                                    name={`workingExperiences[${index}].workPlace`}
                                    type="text"
                                    label="Workplace"
                                    placeholder="Enter workplace"
                                    defaultValue={field.workPlace}
                                  />
                                  <MyInp
                                    name={`workingExperiences[${index}].department`}
                                    type="text"
                                    label="Department"
                                    placeholder="Enter department"
                                    defaultValue={field.department}
                                  />
                                  <MyInp
                                    name={`workingExperiences[${index}].designation`}
                                    type="text"
                                    label="Designation"
                                    placeholder="Enter designation"
                                    defaultValue={field.designation}
                                  />
                                </div>
                                <div className="flex flex-col md:flex-row gap-4">
                                  <MyInp
                                    name={`workingExperiences[${index}].workingPeriodStart`}
                                    type="date"
                                    label="Working period start"
                                    placeholder="Enter working period start"
                                    defaultValue={field.workingPeriodStart}
                                  />
                                  <MyInp
                                    name={`workingExperiences[${index}].workingPeriodEnd`}
                                    type="date"
                                    label="Working period end"
                                    placeholder="Enter working period end"
                                    defaultValue={field.workingPeriodEnd}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                          <Button
                            type="button"
                            size="sm"
                            variant="shadow"
                            className="mt-2"
                            onPress={() =>
                              appendWorkingExperiences({
                                workPlace: "",
                                department: "",
                                designation: "",
                                workingPeriodStart: "",
                                workingPeriodEnd: "",
                              })
                            }
                          >
                            <PlusIcon />
                          </Button>
                        </>
                      )}
                    </div>

                    {/* Availability */}
                    <div>
                      <h2 className={`${subtitle()}`}>Availability</h2>
                      <Divider className="w-[200px] mb-3" />
                      <div className="space-y-4">
                        <div className="flex flex-col md:flex-row gap-4">
                          <MyInp
                            type="select"
                            name="availability.dayStart"
                            options={days?.map((day) => ({
                              key: day,
                              label: day,
                            }))}
                            label="Day Start"
                          />
                          <MyInp
                            type="select"
                            name="availability.dayEnd"
                            options={days?.map((day) => ({
                              key: day,
                              label: day,
                            }))}
                            label="Day End"
                          />
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                          <MyInp
                            type="time"
                            name="availability.timeStart"
                            label="Time Start"
                          />
                          <MyInp
                            type="time"
                            name="availability.timeEnd"
                            label="Time End"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <Button
                  onPress={() => setIsEditing(false)}
                  startContent={<FaTimes className="w-4 h-4" />}
                  className="font-medium"
                >
                  Cancel
                </Button>
                <Button
                  startContent={<FaSave className="w-4 h-4" />}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium  hover:from-blue-700 hover:to-purple-700 transition"
                  type="submit"
                  isLoading={
                    isLoadingUpdateDoctor ||
                    isLoadingUpdateAdmin ||
                    isLoadingUpdatePatient
                  }
                >
                  Save Changes
                </Button>
              </div>
            </DEForm>
          )}
        </div>
      </section>
    </div>
  );
}
