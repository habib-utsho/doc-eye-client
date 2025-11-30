"use client";
import React, { useEffect, useState } from "react";
import signinBG from "@/src/assets/img/Sign/signinBG.jpg";
import Link from "next/link";
import MyInp from "@/src/components/ui/Form/MyInp";
import { Button } from "@heroui/button";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bloodGroups, districts, genders } from "@/src/constant/user.constant";
import { authValidationSchema } from "@/src/schemas/auth.schema";
import { TDoctor, TPatient } from "@/src/types/user";
import { useDoctorRegister, useUserRegister } from "@/src/hooks/auth.hook";
import Container from "@/src/components/ui/Container";
import DEForm from "@/src/components/ui/Form/DEForm";
import { Tab, Tabs } from "@heroui/tabs";
import { doctorTitles, doctorTypes } from "@/src/constant/doctor.constant";
import { useGetAllSpecialties } from "@/src/hooks/specialty.hook";
import { TSpecialty } from "@/src/types/specialty";
import { Divider } from "@heroui/divider";
import { subtitle } from "@/src/components/primitives";
import { days } from "@/src/constant/index.constant";
import { PlusIcon } from "@/src/components/ui/icons";
import { toast } from "sonner";
import MyUpload from "@/src/components/ui/Form/MyUpload";
import {
  UserOutlined,
  MedicineBoxOutlined,
  SolutionOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import Empty from "@/src/components/shared/Empty";

type FormValues = Partial<TPatient & TDoctor>;

const SignupPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"patient" | "doctor">("patient");

  const { mutate: handleRegisterUser, isPending: isPendingUserRegister } =
    useUserRegister();
  const { mutate: handleRegisterDoctor, isPending: isPendingDoctorRegister } =
    useDoctorRegister();

  const { data: specialties, isLoading: isLoadingSpecialties } =
    useGetAllSpecialties([{ name: "limit", value: 5000 }]);

  // Working Experiences
  const formMethods = useForm<FormValues>({
    resolver: zodResolver(
      activeTab === "doctor"
        ? authValidationSchema.doctorSignupValidationSchema
        : authValidationSchema.patientSignupValidationSchema
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

  const reusableInp = (
    <div className="space-y-4">
      <MyUpload
        setSelectedFile={setSelectedFile}
        previewUrl={previewUrl}
        setPreviewUrl={setPreviewUrl}
        height={200}
        width={200}
      />
      <h2 className="font-semibold text-xl !mt-8 flex items-center gap-2 text-primary">
        <UserOutlined /> Basic Information
      </h2>
      <Divider />
      <div className="flex flex-col md:flex-row gap-4">
        <MyInp type="text" name="name" label="Name" />
        <MyInp type="email" name="email" label="Email" />
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <MyInp type="text" name="phone" label="Phone" />
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
      </div>
      <div className="flex flex-col md:flex-row gap-4">
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
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <MyInp type="password" name="password" label="Password" />
        <MyInp type="date" name="dateOfBirth" label="Date of Birth" />
      </div>
    </div>
  );

  const tabs = [
    {
      key: "patient",
      title: "Patient",
      content: <>{reusableInp}</>,
    },
    {
      key: "doctor",
      title: "Doctor",
      content: (
        <div className="space-y-4">
          {reusableInp}
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
          <h2 className="font-semibold text-xl !mt-8 flex items-center gap-2 text-primary">
            <MedicineBoxOutlined /> Medical Information
          </h2>
          <Divider />
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
              disabled={isLoadingSpecialties || specialties?.data?.length === 0}
              options={specialties?.data?.map((specialty: TSpecialty) => ({
                key: specialty._id,
                label: specialty.name,
              }))}
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
            />
            <MyInp
              type="text"
              name="bmdc"
              placeholder="e.g., 55754"
              label="BMDC"
            />
          </div>
          <h2 className="font-semibold text-xl !mt-8 flex items-center gap-2 text-primary">
            <SolutionOutlined /> Professional Information
          </h2>
          <Divider /> {/* Current workplace */}
          <div>
            <h2 className={`${subtitle()}`}>Current Workplace</h2>
            <Divider className="w-[200px] mb-3" />
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <MyInp
                  type="text"
                  name="currentWorkplace.workPlace"
                  label="Workplace"
                  placeholder="e.g., Dhaka Medical College"
                />
                <MyInp
                  type="text"
                  name="currentWorkplace.department"
                  label="Department"
                  placeholder="e.g., Orthopaedics"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <MyInp
                  type="text"
                  name="currentWorkplace.designation"
                  label="Designation"
                  placeholder="e.g., Assistant Professor"
                />
                <MyInp
                  type="date"
                  name="currentWorkplace.workingPeriodStart"
                  label="Working period start"
                />
                {/* <MyInp
                  type="date"
                  name="currentWorkplace.workingPeriodEnd"
                  label="Working period End"
                /> */}
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
                  <div className="shadow p-2 rounded-md mb-4" key={field.id}>
                    <h2 className="font-semibold text-primary dark:text-white">
                      Exp-{index + 1}
                    </h2>
                    <div className="text-right">
                      <Button
                        type="button"
                        size="sm"
                        variant="shadow"
                        className="my-2"
                        onPress={() => removeWorkingExperiences(index)}
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
      ),
    },
  ];

  const defaultValues = {
    name: "Habib Utsho",
    // email: "utsho926@gmail.com",
    // phone: "01706785160",
    dateOfBirth: "2000-05-05",
    gender: "Male",
    district: "Dhaka",
    bloodGroup: "AB-",
    password: "1234@@aA",
    bio: "I am a doctor",
    doctorTitle: "Dr.",
    doctorType: "Medical",
    totalExperienceYear: 7,
    currentWorkplace: {
      workPlace: "Dhaka Medical College",
      department: "Internal Medicine",
      designation: "Senior Physician",
      workingPeriodStart: "2022-05-05",
    },
    consultationFee: 1000,
    followupFee: 600,
    // nid: "663543434423",
    // bmdc: "55754",
    medicalDegree: "BCS(Health), MBBS",
    availability: {
      dayStart: "Saturday",
      dayEnd: "Thursday",
      timeStart: "13:00",
      timeEnd: "23:30",
    },
  };

  const onSubmit: SubmitHandler<TPatient> = async (
    payload: Partial<TPatient & TDoctor>
  ) => {
    const formData = new FormData();
    if (!previewUrl) {
      toast.error("Please upload your avatar");
      return;
    }
    const updatedValues = {
      ...payload,
      dateOfBirth: new Date(payload?.dateOfBirth ? payload?.dateOfBirth : ""),
    };

    formData.append("file", selectedFile as Blob);
    formData.append("data", JSON.stringify(updatedValues));

    const registerFunc =
      activeTab === "doctor" ? handleRegisterDoctor : handleRegisterUser;
    const loadingToastId = toast.loading("Signing up...");
    registerFunc(formData, {
      onSuccess: (data) => {
        console.log({ data, activeTab });
        toast.dismiss(loadingToastId);
        toast.success(
          data?.message ||
            (activeTab === "doctor"
              ? "Doctor registered successfully. Wait for admin approval!"
              : "User registered successfully!")
        );
      },
      onError: (error) => {
        toast.dismiss(loadingToastId);
        toast.error(error?.message || "Sign-up failed!");
      },
    });
  };

  // Default value for working experiences
  useEffect(() => {
    removeWorkingExperiences();
    appendWorkingExperiences({
      workPlace: "Rajshahi Medical College",
      department: "Medical",
      designation: "Sub-assistant professor",
      workingPeriodStart: "2021-05-05",
      workingPeriodEnd: "2024-05-05",
    });
  }, [appendWorkingExperiences, removeWorkingExperiences]);

  return (
    <div
      className="min-h-screen  flex items-center justify-center bg-cover bg-center bg-slate-800 bg-blend-overlay my-28 md:my-0"
      style={{ backgroundImage: `url(${signinBG.src})` }}
    >
      <Container className="w-full xl:w-4/6 mx-auto">
        <DEForm
          methods={formMethods}
          onSubmit={onSubmit}
          defaultValues={defaultValues}
        >
          <div className="shadow  my-5 md:my-32 rounded-md bg-background py-14 px-8">
            <div className="mb-8 space-y-1">
              <h2 className="text-primary font-semibold">
                Register your account
              </h2>
              <p className="text-gray-700 text-sm">
                Join Us to Unlock a World of Healthcare Opportunities
              </p>
            </div>

            <div className="space-y-4">
              <Tabs
                onSelectionChange={(tab) =>
                  setActiveTab(tab as "patient" | "doctor")
                }
                aria-label="Registration Tabs"
                color={"secondary"}
                radius="full"
              >
                {tabs.map((tab) => (
                  <Tab key={tab.key} title={tab.title}>
                    {tab.content}
                  </Tab>
                ))}
              </Tabs>

              <Button
                isLoading={isPendingUserRegister || isPendingDoctorRegister}
                type="submit"
                className="gradient-btn"
              >
                Signup
              </Button>

              <p className="text-slate-700">
                Already have an account?{" "}
                <Link href={"/signin"}>
                  <button className="text-primary cursor-pointer font-bold">
                    Signin
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </DEForm>
      </Container>
    </div>
  );
};

export default SignupPage;
