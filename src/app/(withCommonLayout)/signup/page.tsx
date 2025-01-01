"use client";
import React from "react";
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

// Need to change password
const SignupPage = () => {
  const { mutate: handleRegisterUser, isPending } = useUserRegister();

  const { data: specialties, isLoading: isLoadingSpecialties } =
    useGetAllSpecialties();

  const onSubmit: SubmitHandler<TPatient> = async (payload: TPatient) => {
    const updatedValues = {
      ...payload,
      dateOfBirth: new Date(payload?.dateOfBirth),
    };

    handleRegisterUser(updatedValues);
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

  const reusableInp = (
    <div className="space-y-4">
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
              label="Email"
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
            <MyInp type="text" name="medicalDegree" label="Medical Degree" />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <MyInp
              type="text"
              name="totalExperienceYear"
              label="Total Exp Year"
            />
            <MyInp
              type="text"
              name="currentWorkplace"
              label="Current Workplace"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <MyInp
              type="text"
              name="consultationFee"
              label="Consultation Fee"
            />
            <MyInp type="text" name="followupFee" label="Followup Fee" />
          </div>
        </div>
      ),
    },
  ];

  console.log(specialties, "specialties");

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
