"use client";
import React, { useState } from "react";
import signinBG from "@/src/assets/img/Sign/signinBG.jpg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DEForm from "@/src/components/form/DEForm";
import MyInp from "@/src/components/form/MyInp";
import { Button } from "@nextui-org/button";
import { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bloodGroups, districts, genders } from "@/src/constant/user.constant";
import { authValidationSchema } from "@/src/schemas/auth.schema";
import { TPatient } from "@/src/types/user";
import { registerPatient } from "@/src/services/authService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

// Need to change password
const SignupPage = () => {
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();
  const {
    mutate: handleRegisterUser,
    isPending,
    isSuccess,
    data,
    error,
  } = useMutation({
    mutationKey: ["registerPatient"],
    mutationFn: async (payload: TPatient) => await registerPatient(payload),
    onSuccess(data, variables, context) {
      if (data?.success) {
        toast.success(data?.message || "User registered successfully!");
      }
      console.log(
        data,
        variables,
        context,
        "data, variables, context after mutate"
      );
      // router.push("/signin");
    },
    onError(error, variables, context) {
      toast.error(error?.message || "Failed to register user!");
      console.log(
        error?.message,
        variables,
        context,
        "error, variables, context after mutate"
      );
    },
  });

  const onSubmit: SubmitHandler<TPatient> = async (payload: TPatient) => {
    console.log(
      { ...payload, dateOfBirth: new Date(payload?.dateOfBirth) },
      "form payload iso"
    );
    const updatedValues = {
      ...payload,
      dateOfBirth: new Date(payload?.dateOfBirth),
    };

    handleRegisterUser(updatedValues);
    // console.log(res, "res after mutate");
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

  console.log({ isPending, isSuccess, error, data });

  return (
    <div
      className="min-h-screen  flex items-center justify-center bg-cover bg-center bg-slate-800 bg-blend-overlay my-28 md:my-0"
      style={{ backgroundImage: `url(${signinBG.src})` }}
    >
      <DEForm
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        resolver={zodResolver(authValidationSchema.signupValidationSchema)}
      >
        <div className="shadow w-full xl:w-3/6 mx-auto my-5 md:my-32 rounded-md bg-white py-14 px-8">
          <div className="mb-8 space-y-1">
            <h2 className="text-primary font-semibold">
              Register your account
            </h2>
            <p className="text-gray-700 text-sm">
              Join Us to Unlock a World of Healthcare Opportunities
            </p>
          </div>

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

            <Button type="submit" color="primary" className="text-white">
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
    </div>
  );
};

export default SignupPage;