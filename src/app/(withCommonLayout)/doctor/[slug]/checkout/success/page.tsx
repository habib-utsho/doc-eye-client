"use client";

import React from "react";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Container from "@/src/components/ui/Container";
import { motion } from "framer-motion";
import MyMotion from "@/src/components/ui/MyMotion";
import { InfoIcon } from "@/src/components/ui/icons";
import useUserData from "@/src/hooks/user.hook";

const SuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("transactionId");
  const appointmentId = searchParams.get("appointmentId");
  const { user } = useUserData();

  const CheckCircleIcon = () => (
    <svg
      className="w-20 h-20 text-success"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-success-50 via-background to-primary-50 flex items-center justify-center py-12  md:px-4">
      <Container className="w-full md:w-[672px]">
        <MyMotion scale={0.8}>
          <Card className="shadow border border-success/20">
            <CardHeader className="flex flex-col items-center gap-4 pt-8 pb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.2,
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
              >
                <div className="bg-success/10 rounded-full p-4">
                  <CheckCircleIcon />
                </div>
              </motion.div>
              <MyMotion
                y={20}
                delay={0.4}
                duration={0.5}
                className="text-center"
              >
                <h1 className="text-3xl md:text-4xl font-bold text-success mb-2">
                  Payment Successful!
                </h1>
                <p className="text-default-600 text-lg">
                  Your appointment has been confirmed
                </p>
              </MyMotion>
            </CardHeader>

            <Divider />

            <CardBody className="gap-6 py-8">
              <MyMotion y={20} delay={0.6} className="space-y-6">
                <div className="bg-default-100 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-default-600 font-medium">
                      Transaction ID:
                    </span>
                    <span className="text-default-900 font-semibold">
                      {transactionId || "N/A"}
                    </span>
                  </div>
                  {appointmentId && (
                    <div className="flex justify-between items-center">
                      <span className="text-default-600 font-medium">
                        Appointment ID:
                      </span>
                      <span className="text-default-900 font-semibold">
                        {appointmentId}
                      </span>
                    </div>
                  )}
                </div>

                <div className="bg-primary/20 border border-primary/20 rounded-lg p-4">
                  <h3 className="font-semibold text-primary dark:text-white mb-2 flex items-center gap-2">
                    <InfoIcon />
                    What's Next?
                  </h3>
                  <ul className="space-y-2 text-sm text-primary dark:text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className=" mt-0.5">✓ </span>
                      <span>
                        You will receive a confirmation email shortly with your
                        appointment details
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className=" mt-0.5">✓</span>
                      <span>
                        Check your dashboard for appointment information and
                        updates
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className=" mt-0.5">✓</span>
                      <span>
                        Please arrive 10 minutes before your scheduled time
                      </span>
                    </li>
                  </ul>
                </div>
              </MyMotion>
            </CardBody>

            <Divider />

            <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center py-6">
              <Button
                as={Link}
                href={`/`}
                color="default"
                variant="ghost"
                size="lg"
                className="w-full sm:w-auto min-w-[200px]"
              >
                Back to Home
              </Button>{" "}
              <Button
                as={Link}
                href={`/dashboard/${
                  user?.role || "patient"
                }/appointment/${appointmentId}`}
                color="primary"
                variant="solid"
                size="lg"
                className="w-full sm:w-auto min-w-[200px] text-white"
              >
                Go to Appointment Details
              </Button>
            </CardFooter>
          </Card>
        </MyMotion>

        <MyMotion delay={1} className="text-center mt-8">
          <p className="text-default-500 text-sm">
            Need help?{" "}
            <Link
              href="/faq"
              className="text-primary hover:underline font-medium"
            >
              Visit our FAQ
            </Link>{" "}
            or contact support
          </p>
        </MyMotion>
      </Container>
    </div>
  );
};

export default SuccessPage;
