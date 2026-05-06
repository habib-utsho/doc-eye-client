"use client";

import SpecialtyLoadingCard from "@/src/app/(withCommonLayout)/specialty/_components/SpecialtyLoadingCard";
import Empty from "@/src/components/shared/Empty";
import AnimatedTotalDisplay from "@/src/components/ui/animation/AnimatedTotalDisplay";
import AnimatedTypeWriter from "@/src/components/ui/animation/AnimatedTypeWriter";
import { ArrowRightIcon, MessageIcon } from "@/src/components/ui/icons";
import {
  collectionFields,
  collectionFieldsObj,
  collectionFieldsRoute,
} from "@/src/constant";
import { useTalkToDB } from "@/src/hooks/analytics.hook";
import { TUserRole } from "@/src/types/user";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import Link from "next/link";
import React, { FormEvent, useMemo, useState } from "react";
import { toast } from "sonner";
import AdminAppointmentsPage from "../Appointments/AdminAppointments";
import ConsultationHistories from "../ConsultationHistory/ConsultationHistories";
import PaymentHistory from "../PaymentHistory";
import SpecialtyPage from "../../admin/specialty/page";
import AdminsPage from "../../admin/admins/page";
import PatientsPage from "../../admin/patients/page";
import DoctorsPage from "../../admin/doctors/page";

const Analytics = ({ role }: { role: TUserRole }) => {
  const [prompt, setPrompt] = useState("");
  const [submittedPrompt, setSubmittedPrompt] = useState("");

  const query = useMemo(
    () =>
      submittedPrompt
        ? [
            {
              name: "prompt",
              value: submittedPrompt,
            },
          ]
        : undefined,
    [submittedPrompt],
  );

  const {
    data: analyticsResponse,
    isFetching,
    isLoading,
    isError,
    error,
    refetch,
  } = useTalkToDB(query, Boolean(submittedPrompt));

  const mappedData = Array.isArray(analyticsResponse?.data)
    ? analyticsResponse.data
    : [];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedPrompt = prompt.trim();

    if (!trimmedPrompt) {
      toast.error("Please enter a prompt before submitting.");
      return;
    }

    if (trimmedPrompt === submittedPrompt) {
      await refetch();
      return;
    }

    setSubmittedPrompt(trimmedPrompt);
  };

  console.log(analyticsResponse, "analyticsResponse");

  return (
    <div className="space-y-8 py-5">
      {/* Data assistant input */}
      <form onSubmit={handleSubmit} className="mx-auto w-full max-w-4xl">
        <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-r from-primary/10 to-cyan-100/40 p-5 shadow-md">
          <AnimatedTypeWriter
            text="Ask your data assistant"
            className="mb-3 text-center text-2xl"
          />
          <div className="flex flex-col items-center md:flex-row">
            <Input
              name="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ex: Give me doctors list last 2 month"
              className="w-full"
              classNames={{
                inputWrapper:
                  "h-14 border border-primary/30 bg-white/90 data-[hover=true]:border-primary rounded-r-none",
                input: "text-base",
              }}
            />
            <Button
              type="submit"
              color="primary"
              className="h-14 min-w-36 text-base font-semibold text-white rounded-l-none"
              isLoading={isFetching}
            >
              Run Query
            </Button>
          </div>
        </div>
      </form>

      {/* Analytics results */}
      {isLoading || isFetching ? (
        <SpecialtyLoadingCard />
      ) : isError ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {(error as Error)?.message ||
            "Something went wrong while fetching analytics."}
        </p>
      ) : (
        <div>
          {/* Message display */}
          {analyticsResponse?.message && (
            <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-slate-700 flex items-center gap-2">
              <MessageIcon className="text-xl" />
              <AnimatedTypeWriter text={`${analyticsResponse.message}`} />
            </div>
          )}

          {/* Highlighted total using modern text writing  animation  */}
          {analyticsResponse?.meta?.total ? (
            <div className="mt-4 rounded-lg border border-primary/30 bg-gradient-to-r from-primary/10 to-cyan-100/40 px-4 py-3 text-sm text-slate-700 mb-4 flex justify-between items-center gap-4">
              <h2>
                <span className="font-semibold text-primary">
                  Total{" "}
                  {collectionFieldsObj[analyticsResponse?.collection] ||
                    "Records"}
                  :{" "}
                </span>
                <span className="ml-1 animate-pulse text-lg font-bold text-primary">
                  <AnimatedTotalDisplay total={analyticsResponse.meta.total} />
                </span>
              </h2>

              <div className="flex items-center gap-2">
                {analyticsResponse?.collection === "appointments" ? (
                  <>
                    <Link href={`/dashboard/${role}/upcoming-appointments`}>
                      <Button
                        color="primary"
                        className="h-14 min-w-36 text-base font-semibold text-white rounded-l-none rounded-r-lg"
                      >
                        Upcoming Appointments{" "}
                        <ArrowRightIcon className="ml-1" />
                      </Button>
                    </Link>

                    <Link href={`/dashboard/${role}/expired-appointments`}>
                      <Button
                        color="primary"
                        className="h-14 min-w-36 text-base font-semibold text-white rounded-l-none rounded-r-lg"
                      >
                        Expired Appointments <ArrowRightIcon className="ml-1" />
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Link
                    href={`/dashboard/${role}/${collectionFieldsRoute[analyticsResponse?.collection]}`}
                  >
                    <Button
                      size="sm"
                      color="primary"
                      className="h-14 min-w-36 text-base font-semibold text-white rounded-l-none rounded-r-lg"
                    >
                      Show All{" "}
                      {collectionFieldsObj[analyticsResponse?.collection] ||
                        "Records"}{" "}
                      <ArrowRightIcon className="ml-1" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ) : null}

          {/* Data display */}
          {analyticsResponse?.meta?.total > 0 ? (
            <>
              {analyticsResponse?.collection ===
              collectionFields.APPOINTMENTS ? (
                <AdminAppointmentsPage
                  appointmentsProp={analyticsResponse}
                  isLoadingAppointmentsProp={isLoading || isFetching}
                  refetchAppointmentsProp={refetch}
                  state="all"
                />
              ) : analyticsResponse?.collection ===
                collectionFields.MEDICAL_REPORTS ? (
                <ConsultationHistories
                  from={role}
                  consultationHistoryProp={analyticsResponse}
                  isLoadingConsultationHistoryProp={isLoading || isFetching}
                />
              ) : analyticsResponse?.collection ===
                collectionFields.PAYMENTS ? (
                <PaymentHistory
                  paymentsProp={analyticsResponse}
                  isLoadingPaymentsProp={isLoading || isFetching}
                />
              ) : analyticsResponse?.collection ===
                collectionFields.SPECIALTIES ? (
                <SpecialtyPage
                  specialtiesProp={analyticsResponse}
                  isLoadingSpecialtiesProp={isLoading || isFetching}
                />
              ) : analyticsResponse?.collection === collectionFields.ADMINS ? (
                <AdminsPage
                  adminsProp={analyticsResponse}
                  isLoadingAdminsProp={isLoading || isFetching}
                  refetchAdminsProp={refetch}
                />
              ) : analyticsResponse?.collection ===
                collectionFields.PATIENTS ? (
                <PatientsPage
                  patientsProp={analyticsResponse}
                  isLoadingPatientsProp={isLoading || isFetching}
                  refetchPatientsProp={refetch}
                />
              ) : analyticsResponse?.collection === collectionFields.DOCTORS ? (
                <DoctorsPage
                  doctorsProp={analyticsResponse}
                  isLoadingDoctorsProp={isLoading || isFetching}
                  refetchDoctorsProp={refetch}
                />
              ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {mappedData.map(
                    (item: Record<string, unknown>, index: number) => (
                      <article
                        key={index}
                        className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                      >
                        <h3 className="mb-3 text-sm font-semibold text-primary">
                          Result #{index + 1}
                        </h3>
                        <div className="space-y-2 text-sm text-slate-700">
                          {Object.entries(item).map(([key, value]) => (
                            <div key={key} className="flex gap-2">
                              <span className="min-w-28 font-medium text-slate-500">
                                {key}:
                              </span>
                              <span className="break-all">
                                {typeof value === "object"
                                  ? JSON.stringify(value)
                                  : String(value)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </article>
                    ),
                  )}
                </div>
              )}
            </>
          ) : submittedPrompt && !isFetching ? (
            <Empty description="No records found for this prompt." />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Analytics;
