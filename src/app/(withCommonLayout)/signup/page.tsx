"use client";
import React, { useState } from "react";
import signinBG from "@/src/assets/img/Sign/signinBG.jpg";
import Link from "next/link";
import MyInp from "@/src/components/ui/Form/MyInp";
import { Button } from "@nextui-org/button";
import { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bloodGroups, districts, genders } from "@/src/constant/user.constant";
import { authValidationSchema } from "@/src/schemas/auth.schema";
import { TPatient } from "@/src/types/user";
import { useUserRegister } from "@/src/hooks/auth.hook";
import Container from "@/src/components/ui/Container";
import DEForm from "@/src/components/ui/Form/DEForm";
import { Tab, Tabs } from "@nextui-org/tabs";
import { doctorTitles, doctorTypes } from "@/src/constant/doctor.constant";
import { useGetAllSpecialties } from "@/src/hooks/specialty.hook";
import { TSpecialty } from "@/src/types/specialty";
import { Divider } from "@nextui-org/divider";
import { subtitle, title } from "@/src/components/primitives";
import { days } from "@/src/constant/index.constant";
import {
  DeleteIcon,
  FileUploadIcon,
  PlusIcon,
  UploadIcon,
} from "@/src/components/ui/icons";
import { Avatar } from "@nextui-org/avatar";
import Image from "next/image";

// Need to change password
const SignupPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { mutate: handleRegisterUser, isPending } = useUserRegister();

  const { data: specialties, isLoading: isLoadingSpecialties } =
    useGetAllSpecialties();

  const onSubmit: SubmitHandler<TPatient> = async (payload: TPatient) => {
    const updatedValues = {
      ...payload,
      dateOfBirth: new Date(payload?.dateOfBirth),
    };

    console.log(updatedValues);

    handleRegisterUser(updatedValues);
  };

  // Working Experiences
  const [experiences, setExperiences] = useState([
    {
      workPlace: "",
      department: "",
      designation: "",
      workingPeriodStart: "",
      workingPeriodEnd: "",
    },
  ]);
  const onAddExperience = () => {
    setExperiences([
      ...experiences,
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
    setExperiences(experiences.filter((_, i) => i !== index));
  };
  const onExperienceChange = (index: number, key: string, value: string) => {
    const updatedExperiences = experiences.map((experience, i) => {
      return i === index ? { ...experience, [key]: value } : experience;
    });
    setExperiences(updatedExperiences);
  };

  const defaultValues = {
    name: "Habib Utsho",
    email: "utsho926@gmail.com",
    phone: "01706785160",
    dateOfBirth: "2000-05-05",
    gender: "Male",
    district: "Dhaka",
    bloodGroup: "AB-",
    password: "1234@@aA",
  };

  console.log(previewUrl, "previewUrl");

  const reusableInp = (
    <div className="space-y-4">
      <div>
        {previewUrl ? (
          <div className="relative w-[300px] h-[300px] rounded overflow-hidden">
            <Image
              alt="test"
              src={previewUrl}
              height={500}
              width={500}
              className="object-cover"
            />
            <span className="bg-white bg-opacity-40 border border-danger p-2 rounded inline-block absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 cursor-pointer">
              <DeleteIcon
                className=" text-danger scale-150"
                onClick={() => {
                  setSelectedFile(null);
                  setPreviewUrl(null);
                }}
              />
            </span>
          </div>
        ) : (
          <div
            className="w-[300px] h-[300px] border flex items-center justify-center rounded-lg cursor-pointer relative"
            style={{ backgroundImage: `url(${signinBG.src})` }}
          >
            <MyInp
              type="file"
              name="file"
              label="Profile Picture"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const validImageTypes = [
                    "image/jpg",
                    "image/jpeg",
                    "image/png",
                    "image/gif",
                  ];
                  if (!validImageTypes.includes(file.type)) {
                    alert(
                      "Please select a valid image file (JPEG, JPG, PNG, or GIF)"
                    );
                    return;
                  }

                  // Set the selected file state
                  setSelectedFile(file);

                  // Read the file for preview
                  const fileReader = new FileReader();
                  fileReader.onload = () => {
                    setPreviewUrl(fileReader.result as string);
                  };
                  fileReader.readAsDataURL(file);
                } else {
                  setSelectedFile(null);
                  setPreviewUrl(null);
                }
              }}
              className="opacity-0 absolute top-0 left-0 w-full h-full"
            />

            <Button isIconOnly className="h-full w-full bg-opacity-50">
              <FileUploadIcon />
            </Button>
          </div>
        )}
      </div>

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
              name="medicalSpecialty"
              label="Medical Specialty"
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

          <div className="flex flex-col md:flex-row gap-4">
            <MyInp
              type="text"
              name="totalExperienceYear"
              placeholder="e.g., 15 years"
              label="Total Exp Year"
            />
            <MyInp
              type="text"
              name="currentWorkplace"
              placeholder="e.g., Dhaka Medical College"
              label="Current Workplace"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <MyInp
              type="text"
              name="consultationFee"
              placeholder="e.g., 1000"
              label="Consultation Fee (BDT)"
            />
            <MyInp
              type="text"
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

          {/* Working experiences */}
          <div>
            <h2 className={`${subtitle()}`}>Working Experiences</h2>
            <Divider className="w-[200px] mb-3" />
            {/* <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <MyInp
                  type="text"
                  name="workPlace"
                  placeholder="e.g., Dhaka Medical College"
                  label="Work Place"
                />
                <MyInp
                  type="text"
                  name="department"
                  placeholder="e.g., Orthopaedics"
                  label="Department"
                />
                <MyInp
                  type="text"
                  name="designation"
                  placeholder="e.g., Assistant Professor"
                  label="Designation"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <MyInp
                  type="date"
                  name="workingPeriodStart"
                  label="Working Period Start"
                />
                <MyInp
                  type="date"
                  name="workingPeriodEnd"
                  label="Working Period End"
                />
              </div>
            </div> */}

            <div className="space-y-4">
              {experiences.map((experience, index) => (
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
                      name={`experiences[${index}].workPlace`}
                      placeholder="e.g., Dhaka Medical College"
                      label="Work Place"
                      value={experience.workPlace}
                      onChange={(e) =>
                        onExperienceChange(index, "workPlace", e.target.value)
                      }
                    />
                    <MyInp
                      type="text"
                      name={`experiences[${index}].department`}
                      placeholder="e.g., Orthopaedics"
                      label="Department"
                      value={experience.department}
                      onChange={(e) =>
                        onExperienceChange(index, "department", e.target.value)
                      }
                    />
                    <MyInp
                      type="text"
                      name={`experiences[${index}].designation`}
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
                      name={`experiences[${index}].workingPeriodStart`}
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
                      name={`experiences[${index}].workingPeriodEnd`}
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
                  name="dayStart"
                  options={days?.map((day) => ({
                    key: day,
                    label: day,
                  }))}
                  label="Day Start"
                />
                <MyInp
                  type="select"
                  name="dayEnd"
                  options={days?.map((day) => ({
                    key: day,
                    label: day,
                  }))}
                  label="Day End"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <MyInp type="time" name="timeStart" label="Time Start" />
                <MyInp type="time" name="timeEnd" label="Time End" />
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div
      className="min-h-screen  flex items-center justify-center bg-cover bg-center bg-slate-800 bg-blend-overlay my-28 md:my-0"
      style={{ backgroundImage: `url(${signinBG.src})` }}
    >
      <Container className="w-full xl:w-4/6 mx-auto">
        <DEForm
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          resolver={zodResolver(authValidationSchema.signupValidationSchema)}
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
              <Tabs aria-label="Registration" color={"secondary"} radius="full">
                {tabs.map((tab) => (
                  <Tab key={tab.key} title={tab.title}>
                    {tab.content}
                  </Tab>
                ))}
              </Tabs>

              <Button
                isLoading={isPending}
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
