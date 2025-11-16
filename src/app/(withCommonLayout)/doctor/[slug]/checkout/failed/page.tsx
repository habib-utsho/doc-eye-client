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

const FailedPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("message");
  const transactionId = searchParams.get("transactionId");

  const ErrorCircleIcon = () => (
    <svg
      className="w-20 h-20 text-danger"
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
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-danger-50 via-background to-warning-50 flex items-center justify-center py-12 md:px-4">
      <Container className="w-full md:w-[672px]">
        <MyMotion scale={0.8}>
          <Card className="shadow border border-danger/20">
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
                <div className="bg-danger/10 rounded-full p-4">
                  <ErrorCircleIcon />
                </div>
              </motion.div>
              <MyMotion
                y={20}
                delay={0.4}
                duration={0.5}
                className="text-center"
              >
                <h1 className="text-3xl md:text-4xl font-bold text-danger mb-2">
                  Payment Failed
                </h1>
                <p className="text-default-600 text-lg">
                  We couldn't process your payment
                </p>
              </MyMotion>
            </CardHeader>

            <Divider />

            <CardBody className="gap-6 py-8">
              <MyMotion y={20} delay={0.6} className="space-y-4">
                {(errorMessage || transactionId) && (
                  <div className="bg-danger-50 border border-danger/30 rounded-lg p-4 space-y-3">
                    {errorMessage && (
                      <div className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 text-danger mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div>
                          <p className="font-semibold text-danger mb-1">
                            Error Details:
                          </p>
                          <p className="text-danger-700 text-sm">
                            {errorMessage}
                          </p>
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

                <div className="bg-warning/20 border border-warning/30 rounded-lg p-4">
                  <h3 className="font-semibold text-warning-700 mb-3 flex items-center gap-2 ">
                    <InfoIcon />
                    Common Reasons for Payment Failure:
                  </h3>
                  <ul className="space-y-2 text-sm text-default-700">
                    <li className="flex items-start gap-2">
                      <span className="text-warning-600 mt-0.5">•</span>
                      <span>Insufficient funds in your account</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-warning-600 mt-0.5">•</span>
                      <span>Incorrect credentials</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-warning-600 mt-0.5">•</span>
                      <span>Payment limit exceeded</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-warning-600 mt-0.5">•</span>
                      <span>Bank security or fraud prevention measures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-warning-600 mt-0.5">•</span>
                      <span>Network or connectivity issues</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-primary/30 border border-primary/20 rounded-lg p-4">
                  <h3 className="font-semibold text-primary mb-2 flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                    </svg>
                    What Should You Do?
                  </h3>
                  <ul className="space-y-2 text-sm text-default-700">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">→</span>
                      <span>
                        Double-check your payment information and try again
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">→</span>
                      <span>Contact your bank to verify the transaction</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">→</span>
                      <span>Try using a different payment method</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">→</span>
                      <span>
                        If the issue persists, contact our support team
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
                href="/"
                color="default"
                variant="ghost"
                size="lg"
                className="w-full sm:w-auto min-w-[200px]"
              >
                Back to Home
              </Button>{" "}
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
              Contact Support
            </Link>{" "}
            or call us at{" "}
            <span className="font-semibold text-default-700">
              1-000-DOC-EYE
            </span>
          </p>
        </MyMotion>
      </Container>
    </div>
  );
};

export default FailedPage;
