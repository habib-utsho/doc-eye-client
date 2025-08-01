"use client";
import React, { useState } from "react";
import signinBG from "@/src/assets/img/Sign/signinBG.jpg";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { GithubIcon } from "@/src/components/ui/icons";
import MyInp from "@/src/components/ui/Form/MyInp";
import { Button } from "@heroui/button";
import { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authValidationSchema } from "@/src/schemas/auth.schema";
import { TSignin } from "@/src/types/user";
import { useUserSignin } from "@/src/hooks/auth.hook";
import Container from "@/src/components/ui/Container";
import DEForm from "@/src/components/ui/Form/DEForm";
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";

// Need to change password
const SigninPage = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const {
    mutate: handleSignin,
    isPending,
    isSuccess,
    data,
    error,
  } = useUserSignin({ redirect });

  const onSubmit: SubmitHandler<TSignin> = (payload: TSignin) => {
    handleSignin(payload);
  };

  const [defaultValues, setDefaultValues] = useState<TSignin>({
    email: "utsho926@gmail.com",
    password: "1234@@aA",
  });

  const rows = [
    {
      key: "1",
      email: "utsho926@gmail.com ",
      password: "1234@@aA",
      role: "Patient",
    },
    {
      key: "2",
      email: "habibutsho@gmail.com",
      password: "1234@@aA",
      role: "Doctor",
    },
    {
      key: "3",
      email: "john.doe@example.com",
      password: "1234@@aA",
      role: "Admin",
    },
  ];

  const columns = [
    {
      key: "email",
      label: "Email",
    },
    {
      key: "password",
      label: "Password",
    },
    {
      key: "role",
      label: "Role",
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
          resolver={zodResolver(authValidationSchema.signinValidationSchema)}
        >
          <div className="shadow block xl:flex flex-row my-5 md:my-32">
            <div className="w-full xl:w-3/6 bg-background px-8 py-14 rounded xl:rounded-none xl:rounded-l">
              {/* signin left */}
              <div className="mb-8 space-y-1">
                <h2 className="text-primary font-semibold">
                  Hello and welcome{" "}
                </h2>
                <p className="text-gray-700 text-sm">
                  Access Your Personalized Healthcare Services
                </p>
              </div>

              <div className="space-y-4">
                <MyInp type="email" name="email" label="Email" />
                <MyInp type="password" name="password" label="Password" />

                <Button
                  isLoading={isPending}
                  type="submit"
                  color="primary"
                  className="text-white"
                >
                  Signin
                </Button>

                <p className="text-slate-700">
                  New here?{" "}
                  <Link href={"/signup"}>
                    <span className="text-primary text-[14px] font-semibold">
                      Signup
                    </span>
                  </Link>
                </p>
                <div className="flex gap-3 items-center">
                  <hr className="h-px w-full bg-slate-500" />
                  <span className="text-slate-500">or</span>
                  <hr className="h-px w-full bg-slate-500" />
                </div>
                <div>
                  <p className="text-slate-700 flex items-center gap-2">
                    Continue with?{" "}
                    <span className="text-xl cursor-pointer hover:scale-110 transition text-primary hover:text-secondary">
                      <GithubIcon></GithubIcon>
                    </span>{" "}
                    <span className="text-xl cursor-pointer hover:scale-110 transition text-primary hover:text-secondary">
                      <GithubIcon></GithubIcon>
                    </span>{" "}
                  </p>
                </div>
              </div>

              <Table
                className="mt-5"
                defaultSelectedKeys={["1"]}
                selectionMode="single"
                color="primary"
                aria-label="Example static collection table"
              >
                <TableHeader columns={columns}>
                  {(column) => (
                    <TableColumn key={column.key}>{column.label}</TableColumn>
                  )}
                </TableHeader>
                <TableBody items={rows}>
                  {(item) => (
                    <TableRow
                      key={item.key}
                      onClick={() => {
                        setDefaultValues({
                          email: item?.email,
                          password: item?.password,
                        });
                      }}
                      className="cursor-pointer"
                    >
                      {(columnKey) => (
                        <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                      )}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* signin right */}
            <div className="bg-slate-800 bg-opacity-60 hidden xl:flex items-center justify-center text-white rounded-r flex-1 p-5">
              <div className="space-y-4">
                <h2 className="my-subtitle">
                  Welcome to <span className="text-secondary">DocEye</span>
                </h2>
                <p className="text-slate-400">Login to access your account</p>
              </div>
            </div>
          </div>
        </DEForm>
      </Container>
    </div>
  );
};

export default SigninPage;
