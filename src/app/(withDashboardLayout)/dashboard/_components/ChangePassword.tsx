"use client";
import React, { useState } from "react";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { Button } from "@heroui/button";
import { Alert } from "@heroui/alert";
import DEForm from "@/src/components/ui/Form/DEForm";
import MyInp from "@/src/components/ui/Form/MyInp";
import { useChangePassword } from "@/src/hooks/auth.hook";

const ChangePasswordPage: React.FC = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { mutate: mutateChangePassword, isPending } = useChangePassword();

  // Password strength checks
  const checks = {
    length: newPassword.length >= 8,
    number: /\d/.test(newPassword),
    letter: /[A-Za-z]/.test(newPassword),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword),
  };

  const allChecksPassed = Object.values(checks).every(Boolean);
  const passwordsMatch = newPassword && newPassword === confirmPassword;

  const handleSubmit = async () => {
    setError(null);
    setSuccess(false);

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (!allChecksPassed) {
      setError("Please meet all password requirements.");
      return;
    }
    if (!passwordsMatch) {
      setError("New passwords do not match.");
      return;
    }

    mutateChangePassword(
      { oldPassword, newPassword },
      {
        onSuccess(data) {
          setSuccess(data?.message);
        },
        onError(e: any) {
          console.log(e);
          setError(e?.message);
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center px-4 py-12 transition-colors">
      <div className="w-full max-w-2xl">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-800 px-8 py-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 dark:bg-white/10 rounded-full mb-4">
              <SafetyCertificateOutlined className="text-4xl text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">
              Secure Account Update
            </h1>
            <p className="text-blue-100 dark:text-blue-200 mt-2 text-sm">
              Keep your doctor portal access protected with a strong password
            </p>
          </div>

          {/* Body */}
          <div className="p-8 lg:p-10 bg-white dark:bg-slate-900">
            {/* Success Alert */}
            {success && (
              <Alert
                description="Your password has been changed successfully."
                color="success"
                className="mb-6 border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300"
              />
            )}

            {/* Error Alert */}
            {error && (
              <Alert
                description={error || "Something went wrong"}
                color="danger"
                className="mb-6 border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300 justify-center items-center flex text-center"
              />
            )}

            <DEForm onSubmit={handleSubmit} className="space-y-6">
              {/* Current Password */}
              <MyInp
                name="oldPassword"
                label="Current Password"
                type="password"
                onChange={(e) => setOldPassword(e.target.value)}
                defaultValue={oldPassword}
              />

              {/* New Password */}
              <MyInp
                name="newPassword"
                label="New Password"
                type="password"
                onChange={(e) => setNewPassword(e.target.value)}
                defaultValue={newPassword}
              />

              {/* Confirm Password */}
              <MyInp
                name="confirmPassword"
                label="Confirm New Password"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                defaultValue={confirmPassword}
              />

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
                        <CloseCircleFilled className="text-lg" />
                      )}
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={
                  isPending ||
                  !allChecksPassed ||
                  !oldPassword ||
                  !passwordsMatch
                }
                isLoading={isPending}
                className={`gradient-btn`}
              >
                {isPending ? "Updating Password..." : "Change Password"}
              </Button>
            </DEForm>

            <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-8">
              Your session is encrypted with TLS 1.3 • Patient data is protected
              under HIPAA compliance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
