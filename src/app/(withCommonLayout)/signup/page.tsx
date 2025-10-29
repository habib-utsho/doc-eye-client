"use client";
import React, { useState } from "react";
import signinBG from "@/src/assets/img/Sign/signinBG.jpg";
import Link from "next/link";
import MyInp from "@/src/components/ui/Form/MyInp";
import { Button } from "@heroui/button";
import { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bloodGroups, districts, genders } from "@/src/constant/user.constant";
import { authValidationSchema } from "@/src/schemas/auth.schema";
import { TPatient } from "@/src/types/user";
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
import { DeleteIcon, PlusIcon } from "@/src/components/ui/icons";
import { toast } from "sonner";
import MyUpload from "@/src/components/ui/Form/MyUpload";

// Need to change password
const SignupPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"patient" | "doctor">("patient");

  const { mutate: handleRegisterUser, isPending: isPendingUserRegister } =
    useUserRegister();
  const {
    mutate: handleRegisterDoctor,
    isPending: isPendingDoctorRegister,
    error,
  } = useDoctorRegister();

  const { data: specialties, isLoading: isLoadingSpecialties } =
    useGetAllSpecialties([{ name: "limit", value: 5000 }]);

  // Working Experiences
  const [workingExperiences, setWorkingExperiences] = useState([
    {
      workPlace: "",
      department: "",
      designation: "",
      workingPeriodStart: "",
      workingPeriodEnd: "",
    },
  ]);
  const onAddExperience = () => {
    setWorkingExperiences([
      ...workingExperiences,
      {
        workPlace: "",
        department: "",
        designation: "",
        workingPeriodStart: "",
        workingPeriodEnd: "",
      },
    ]);
  };
  const onRemoveExperience = (index: number) => {
    setWorkingExperiences(workingExperiences.filter((_, i) => i !== index));
  };
  const onExperienceChange = (index: number, key: string, value: string) => {
    const updatedExperiences = workingExperiences.map((experience, i) => {
      return i === index ? { ...experience, [key]: value } : experience;
    });
    setWorkingExperiences(updatedExperiences);
  };

  const reusableInp = (
    <div className="space-y-4">
      <MyUpload
        setSelectedFile={setSelectedFile}
        previewUrl={previewUrl}
        setPreviewUrl={setPreviewUrl}
        height={200}
        width={200}
      />

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

          {/* Total exp and current workplace */}
          <div className="flex flex-col md:flex-row gap-4">
            <MyInp
              type="number"
              name="totalExperienceYear"
              placeholder="e.g., 15"
              label="Total Exp Year"
            />
            <MyInp
              type="text"
              name="currentWorkplace"
              placeholder="e.g., Dhaka Medical College"
              label="Current Workplace"
            />
          </div>
          {/* consultationFee and follow up fee */}
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

          {/* Working experiences */}
          <div>
            <h2 className={`${subtitle()}`}>Working Experiences</h2>
            <Divider className="w-[200px] mb-3" />

            <div className="space-y-4">
              {workingExperiences.map((experience, index) => (
                <div key={index} className="space-y-4 border p-4 rounded-md">
                  <div className="text-right">
                    <Button
                      size="sm"
                      variant="bordered"
                      className="text-danger"
                      onClick={() => onRemoveExperience(index)}
                      isIconOnly
                    >
                      <DeleteIcon />
                    </Button>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <MyInp
                      type="text"
                      name={`workingExperiences[${index}].workPlace`}
                      placeholder="e.g., Dhaka Medical College"
                      label="Work Place"
                      value={experience.workPlace}
                      onChange={(e) =>
                        onExperienceChange(index, "workPlace", e.target.value)
                      }
                    />
                    <MyInp
                      type="text"
                      name={`workingExperiences[${index}].department`}
                      placeholder="e.g., Orthopaedics"
                      label="Department"
                      value={experience.department}
                      onChange={(e) =>
                        onExperienceChange(index, "department", e.target.value)
                      }
                    />
                    <MyInp
                      type="text"
                      name={`workingExperiences[${index}].designation`}
                      placeholder="e.g., Assistant Professor"
                      label="Designation"
                      value={experience.designation}
                      onChange={(e) =>
                        onExperienceChange(index, "designation", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex flex-col md:flex-row gap-4">
                    <MyInp
                      type="date"
                      name={`workingExperiences[${index}].workingPeriodStart`}
                      label="Working Period Start"
                      value={experience.workingPeriodStart}
                      onChange={(e) =>
                        onExperienceChange(
                          index,
                          "workingPeriodStart",
                          e.target.value
                        )
                      }
                    />
                    <MyInp
                      type="date"
                      name={`workingExperiences[${index}].workingPeriodEnd`}
                      label="Working Period End"
                      value={experience.workingPeriodEnd}
                      onChange={(e) =>
                        onExperienceChange(
                          index,
                          "workingPeriodEnd",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              ))}

              <Button
                size="sm"
                color="primary"
                className="!text-white"
                onClick={onAddExperience}
                isIconOnly
              >
                <PlusIcon />
              </Button>
            </div>
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
    email: "utsho926@gmail.com",
    phone: "01706785160",
    dateOfBirth: "2000-05-05",
    // gender: "Male",
    district: "Dhaka",
    bloodGroup: "AB-",
    password: "1234@@aA",
    bio: "I am a doctor",
    // doctorTitle: "Dr.",
    // doctorType: "Medical",
    totalExperienceYear: 12,
    // currentWorkplace: "Dhaka Medical College",
    consultationFee: 1000,
    followupFee: 600,
    nid: "663543434423",
    bmdc: "55754",
    medicalDegree: "BCS(Health), MBBS",
    // availability: {
    //   dayStart: "Saturday",
    //   dayEnd: "Thursday",
    //   timeStart: "09:00",
    //   timeEnd: "17:00",
    // },
  };

  const onSubmit: SubmitHandler<TPatient> = async (payload: TPatient) => {
    const formData = new FormData();
    if (!previewUrl) {
      toast.error("Please upload your avatar");
      return;
    }
    const updatedValues = {
      ...payload,
      dateOfBirth: new Date(payload?.dateOfBirth),
    };

    // return;
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

  return (
    <div
      className="min-h-screen  flex items-center justify-center bg-cover bg-center bg-slate-800 bg-blend-overlay my-28 md:my-0"
      style={{ backgroundImage: `url(${signinBG.src})` }}
    >
      <Container className="w-full xl:w-4/6 mx-auto">
        <DEForm
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          resolver={zodResolver(
            activeTab === "doctor"
              ? authValidationSchema.doctorSignupValidationSchema
              : authValidationSchema.patientSignupValidationSchema
          )}
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
                color="primary"
                className="text-white"
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
