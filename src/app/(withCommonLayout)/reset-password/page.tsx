"use client";

import { useResetPassword } from "@/src/hooks/auth.hook";
import { Button } from "@heroui/button";
import { useSearchParams, useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import signinBG from "@/src/assets/img/Sign/signinBG.jpg";
import DEForm from "@/src/components/ui/Form/DEForm";
import Container from "@/src/components/ui/Container";
import MyInp from "@/src/components/ui/Form/MyInp";
import { Alert } from "@heroui/alert";
import { useState } from "react";
import { CheckCircleFilled, CloseCircleOutlined } from "@ant-design/icons";

type TResetPassFieldType = {
  newPassword: string;
};


const ResetPasswordPage = () => {
  const [success, setSuccess] = useState("");
  const [err, setErr] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { mutate: resetPassword, isPending: isPendingResetPassword } =
    useResetPassword();

  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const defaultValues = {
    email: email,
    newPassword: "",
  };

  const checks = {
    length: newPassword.length >= 8,
    number: /\d/.test(newPassword),
    letter: /[A-Za-z]/.test(newPassword),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword),
  };

  const allChecksPassed = Object.values(checks).every(Boolean);

  const clearSuccessAndErr = () => {
    setErr("");
    setSuccess("");
  };
  const handleResetPassword: SubmitHandler<TResetPassFieldType> = async (
    data
  ) => {
    clearSuccessAndErr();
    if (!email || !token) {
      toast("Email and token required!");
      return;
    }
    if (!allChecksPassed) {
      setErr("Please meet all password requirements.");
      return;
    }

    const loadingToastId = toast.loading("Password reset in progress...");

    const payload = {
      newPassword: data?.newPassword,
      email,
      token: `Bearer ${token}`,
    };

    resetPassword(payload, {
      onSuccess: (res) => {
        toast.dismiss(loadingToastId);
        setSuccess(res?.message);
        toast.success(res?.message || "Password reset successfully!");

        router.push("/signin");
      },
      onError: (error: any) => {
        setErr(error?.message);

        toast.dismiss(loadingToastId);
        toast.error(error?.message || "Password reset failed!");
      },
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-slate-800 bg-blend-overlay my-28 md:my-0"
      style={{ backgroundImage: `url(${signinBG.src})` }}
    >
      <Container className="w-full xl:w-2/6 mx-auto">
        <DEForm onSubmit={handleResetPassword} defaultValues={defaultValues}>
          <div className="shadow bg-background px-8 py-14 rounded space-y-4">
            <div className="mb-8 space-y-1">
              <h2 className="text-primary font-semibold">Reset Password</h2>
              <p className="dark:text-gray-300 text-sm">
                Reset your password to get access
              </p>
            </div>
            {/* Success Alert */}
            {success && (
              <Alert
                description={success || "Password reset successfully!"}
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

            {email && (
              <MyInp
                type="email"
                name="email"
                label="Email"
                defaultValue={email}
                disabled
              />
            )}
            <MyInp
              type="password"
              name="newPassword"
              label="New Password"
              placeholder="Enter your new password"
              onChange={(e) => setNewPassword(e.target.value)}
              defaultValue={newPassword}
            />

            <Button
              type="submit"
              color="primary"
              isLoading={isPendingResetPassword}
              disabled={isPendingResetPassword || !allChecksPassed}
              className={`gradient-btn my-4`}
            >
              Reset Password
            </Button>

            {/* Password Requirements Card */}
            <div className="bg-gray-50 dark:bg-slate-800/70 rounded-xl p-5 border border-gray-200 dark:border-slate-700">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Your password must include:
              </p>
              <div className="space-y-2 text-sm">
                {[
                  { check: checks.length, label: "At least 8 characters" },
                  { check: checks.number, label: "At least one number" },
                  { check: checks.letter, label: "At least one letter" },
                  {
                    check: checks.special,
                    label: "At least one special character (!@#$% etc.)",
                  },
                ].map(({ check, label }) => (
                  <div
                    key={label}
                    className={`flex items-center gap-2 ${
                      check
                        ? "text-green-600 dark:text-green-400"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {check ? (
                      <CheckCircleFilled className="text-lg" />
                    ) : (
                      <CloseCircleOutlined className="text-lg" />
                    )}
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DEForm>
      </Container>
    </div>
  );
};

export default ResetPasswordPage;
