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

const CancelledPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("transactionId");
  const message = searchParams.get("message") || searchParams.get("reason");

  const CancelIcon = () => (
    <svg
      className="w-20 h-20 text-warning"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Circle */}
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
      />
      {/* Slash */}
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, ease: "easeInOut", delay: 0.15 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6"
      />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-warning-50 via-background to-default-50 flex items-center justify-center py-12 px-4">
      <Container className="max-w-2xl">
        <MyMotion scale={0.8}>
          <Card className="shadow border border-warning/20">
            <CardHeader className="flex flex-col items-center gap-4 pt-8 pb-4">
              <MyMotion scale={0} delay={0.2}>
                <div className="bg-warning/10 rounded-full p-4">
                  <CancelIcon />
                </div>
              </MyMotion>

              <MyMotion
                y={20}
                delay={0.4}
                duration={0.5}
                className="text-center"
              >
                <h1 className="text-3xl md:text-4xl font-bold text-warning mb-2">
                  Payment Cancelled
                </h1>
                <p className="text-default-600 text-lg">
                  You have cancelled the payment process
                </p>
              </MyMotion>
            </CardHeader>

            <Divider />

            <CardBody className="gap-6 py-8">
              <MyMotion y={20} delay={0.6} className="space-y-6">
                {(message || transactionId) && (
                  <div className="bg-warning-50 border border-warning/30 rounded-lg p-4 space-y-3">
                    {message && (
                      <div className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 text-warning mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM9 9.75a.75.75 0 011.5 0v3.5a.75.75 0 01-1.5 0v-3.5zM10 6.5a1 1 0 100 2 1 1 0 000-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div>
                          <p className="font-semibold text-warning mb-1">
                            Note:
                          </p>
                          <p className="text-warning-700 text-sm">{message}</p>
                        </div>
                      </div>
                    )}
                    {transactionId && (
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-default-600 font-medium text-sm">
                          Transaction ID:
                        </span>
                        <span className="text-default-900 font-semibold text-sm">
                          {transactionId}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                <div className="bg-default-100 dark:bg-default-50 rounded-lg border dark:border-gray-500 p-4">
                  <h3 className="font-semibold text-default-900 mb-2 flex items-center gap-2">
                    <InfoIcon />
                    What does cancellation mean?
                  </h3>
                  <ul className="space-y-2 text-sm text-default-700">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5">•</span>
                      <span>No charge was made for this attempt</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5">•</span>
                      <span>You can safely try again any time</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5">•</span>
                      <span>
                        Your appointment remains unconfirmed until payment
                        succeeds
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <h3 className="font-semibold text-primary dark:text-white mb-2 flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    What can you do next?
                  </h3>
                  <ul className="space-y-2 text-sm text-primary dark:text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5">→</span>
                      <span>Review your payment details and try again</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5">→</span>
                      <span>Use a different card or payment method</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5">→</span>
                      <span>Visit your dashboard to manage appointments</span>
                    </li>
                  </ul>
                </div>
              </MyMotion>
            </CardBody>

            <Divider />

            <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center py-6">
              <Button
                as={Link}
                href="/"
                color="default"
                variant="bordered"
                size="lg"
                className="w-full sm:w-auto min-w-[200px]"
              >
                Back to Home
              </Button>
              <Button
                onPress={() => router.back()}
                color="primary"
                variant="solid"
                size="lg"
                className="w-full sm:w-auto min-w-[200px] text-white"
              >
                Try Again
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

export default CancelledPage;
