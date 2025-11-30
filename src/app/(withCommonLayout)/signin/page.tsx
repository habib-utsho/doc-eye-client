"use client";
import React, { useState } from "react";
import signinBG from "@/src/assets/img/Sign/signinBG.jpg";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import MyInp from "@/src/components/ui/Form/MyInp";
import { Button } from "@heroui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authValidationSchema } from "@/src/schemas/auth.schema";
import { TSignin } from "@/src/types/user";
import { useForgetPassword, useUserSignin } from "@/src/hooks/auth.hook";
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
import { toast } from "sonner";
import { Alert } from "@heroui/alert";

// Need to change password
const SigninPage = () => {
  const [success, setSuccess] = useState("");
  const [err, setErr] = useState("");
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const isForgotPassword = searchParams.get("forgot-password");

  const { mutate: handleSignin, isPending } = useUserSignin({ redirect });
  const { mutate: handleForgetPassword, isPending: isPendingForgetPassword } =
    useForgetPassword();

  const [defaultValues, setDefaultValues] = useState<TSignin>({
    email: "utsho926@gmail.com",
    password: "1234@@aA",
  });

  const rows = [
    {
      key: "1",
      email: "utsho926@gmail.com",
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

  const formMethods = useForm<TSignin>({
    // resolver: zodResolver(
    //   userRole === "doctor"
    //     ? authValidationSchema.doctorUpdateValidationSchema
    //     : authValidationSchema.patientUpdateValidationSchema
    // ),
  });
  const { watch } = formMethods;

  const clearSuccessAndErr = () => {
    setErr("");
    setSuccess("");
  };

  const onSubmit: SubmitHandler<TSignin> = (payload: TSignin) => {
    clearSuccessAndErr();
    const loadingToastId = toast.loading("Signing in...");

    handleSignin(payload, {
      onSuccess: (data) => {
        setSuccess(data?.message);
        toast.dismiss(loadingToastId);
        toast.success(data?.message || "Signed in successfully!");
      },
      onError: (error) => {
        setErr(error?.message);
        toast.dismiss(loadingToastId);
        toast.error(error?.message || "Sign-in failed!");
      },
    });
  };

  const handleForgetPasswordFunc = () => {
    clearSuccessAndErr();
    const email = watch("email");
    const loadingToastId = toast.loading("Password reset link sending...");

    handleForgetPassword(
      { email },
      {
        onSuccess(data) {
          setSuccess(data?.message);
          toast.dismiss(loadingToastId);
          toast.success(
            data?.message ||
              "Password reset link sent to your email successfully!"
          );
        },
        onError(e: any) {
          toast.dismiss(loadingToastId);
          toast.error(e?.message || "Failed to sent password reset email!");
          setErr(e?.message);
        },
      }
    );
  };

  return (
    <div
      className="min-h-screen  flex items-center justify-center bg-cover bg-center bg-slate-800 bg-blend-overlay my-28 md:my-0"
      style={{ backgroundImage: `url(${signinBG.src})` }}
    >
      <Container
        className={`w-full ${
          isForgotPassword ? "xl:w-2/6" : "xl:w-4/6"
        }  mx-auto`}
      >
        <DEForm
          onSubmit={isForgotPassword ? () => {} : onSubmit}
          defaultValues={defaultValues}
          resolver={zodResolver(authValidationSchema.signinValidationSchema)}
          methods={formMethods}
        >
          <div className={`shadow block xl:flex flex-row my-5 md:my-32`}>
            <div
              className={`w-full xl:flex-1 bg-background px-8 py-14 rounded xl:rounded-none xl:rounded-l`}
            >
              {/* signin left */}
              <div className="mb-8 space-y-1">
                <h2 className="text-primary font-semibold">
                  {isForgotPassword ? "Forgot Password" : "  Hello and welcome"}
                </h2>
                <p className="dark:text-gray-300 text-sm">
                  {isForgotPassword
                    ? "Reset your password to get access"
                    : "  Access Your Personalized Healthcare Services"}
                </p>
              </div>

              {/* Success Alert */}
              {success && (
                <Alert
                  description={
                    success || "Password reset link sent successfully!"
                  }
                  color="success"
                  className="mb-6 border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                />
              )}

              {/* Error Alert */}
              {err && (
                <Alert
                  description={err || "Something went wrong"}
                  color="danger"
                  className="mb-6 border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300 justify-center items-center flex text-center"
                />
              )}

              <div className="space-y-4">
                <MyInp type="email" name="email" label="Email" />
                {!isForgotPassword && (
                  <MyInp type="password" name="password" label="Password" />
                )}
                {!isForgotPassword && (
                  <Link
                    href={"/signin?forgot-password=true"}
                    onClick={clearSuccessAndErr}
                    className="block"
                  >
                    <span className="text-primary text-[14px] font-semibold">
                      Forgot password?
                    </span>
                  </Link>
                )}

                {!isForgotPassword ? (
                  <Button
                    isLoading={isPending}
                    type={"submit"}
                    className={`gradient-btn`}
                  >
                    Signin
                  </Button>
                ) : (
                  <Button
                    isLoading={isPendingForgetPassword}
                    type={"button"}
                    onPress={() => handleForgetPasswordFunc()}
                    className={`gradient-btn`}
                  >
                    Get Password Recovery Email
                  </Button>
                )}

                {isForgotPassword ? (
                  <p className="text-slate-700">
                    <Link href={"/signin"} onClick={clearSuccessAndErr}>
                      <span className="text-primary text-[14px] font-semibold">
                        Signin with Email and Password ?
                      </span>
                    </Link>
                  </p>
                ) : (
                  <p className="text-slate-700">
                    New here?{" "}
                    <Link href={"/signup"}>
                      <span className="text-primary text-[14px] font-semibold">
                        Signup
                      </span>
                    </Link>
                  </p>
                )}
                {!isForgotPassword && (
                  <div className="flex gap-3 items-center">
                    <hr className="h-px w-full bg-slate-500" />
                    <span className="text-slate-500">or</span>
                    <hr className="h-px w-full bg-slate-500" />
                  </div>
                )}

                {/* Social login */}
                {/* <div>
                  <p className="text-slate-700 flex items-center gap-2">
                    Continue with?{" "}
                    <span className="text-xl cursor-pointer hover:scale-110 transition text-primary hover:text-secondary">
                      <GithubIcon></GithubIcon>
                    </span>{" "}
                    <span className="text-xl cursor-pointer hover:scale-110 transition text-primary hover:text-secondary">
                      <GithubIcon></GithubIcon>
                    </span>{" "}
                  </p>
                </div> */}
              </div>

              {!isForgotPassword && (
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
                          const newValues = {
                            email: item?.email?.trim(),
                            password: item?.password,
                          };
                          setDefaultValues(newValues);
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
              )}
            </div>

            {/* signin right */}
            {!isForgotPassword && (
              <div className="bg-slate-800 bg-opacity-60 hidden xl:flex items-center justify-center text-white rounded-r flex-1 p-5">
                <div className="space-y-4">
                  <h2 className="my-subtitle">
                    Welcome to <span className="text-secondary">DocEye</span>
                  </h2>
                  <p className="text-slate-400">Login to access your account</p>
                </div>
              </div>
            )}
          </div>
        </DEForm>
      </Container>
    </div>
  );
};

export default SigninPage;
