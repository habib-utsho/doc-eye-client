"use client";
import { useGetAllAppointments } from "@/src/hooks/appointment.hook";
import { useCreateReview, useGetAllReviews } from "@/src/hooks/reviews.hook";
import useUserData from "@/src/hooks/user.hook";
import { TAppointment } from "@/src/types/appointment";
import { TCreateReview, TReview } from "@/src/types/review";
import { TDoctor } from "@/src/types/user";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import DEForm from "@/src/components/ui/Form/DEForm";
import MyInp from "@/src/components/ui/Form/MyInp";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { StarIcon } from "lucide-react";
import { TResponse } from "@/src/types";
import Empty from "@/src/components/shared/Empty";
import Loading from "@/src/components/ui/Loading";
import { Skeleton } from "@heroui/skeleton";
import { ArrowRightIcon } from "@/src/components/ui/icons";
import Link from "next/link";
import { toast } from "sonner";
import { Pagination } from "@heroui/pagination";
import Image from "next/image";

const reviewValidationSchema = z.object({
  rating: z.string().refine((val) => ["1", "2", "3", "4", "5"].includes(val), {
    message: "Rating must be between 1 and 5",
  }),
  comment: z
    .string()
    .min(10, "Comment must be at least 10 characters")
    .max(1000, "Comment must not exceed 1000 characters"),
});

type TReviewForm = z.infer<typeof reviewValidationSchema>;

const ReviewTab = ({ doctor }: { doctor: TDoctor }) => {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });

  const { isLoading: isUserLoading, user } = useUserData();
  const { mutate: createReview, isPending: isLoadingCreateReview } =
    useCreateReview();
  const [showForm, setShowForm] = useState(false);

  const { data: appointmentsRes, isLoading: isAppointmentsLoading } =
    useGetAllAppointments([
      {
        name: "patient",
        value: user?._id,
      },
      {
        name: "doctor",
        value: doctor?._id,
      },
      {
        name: "status",
        value: "completed",
      },
    ]);
  const appointments = appointmentsRes as TResponse<TAppointment[]>;

  const {
    data: allReviewsRes,
    isLoading: isReviewsLoading,
    refetch: refetchAllReviews,
  } = useGetAllReviews([
    { name: "page", value: pagination.page },
    { name: "limit", value: pagination.limit },
    {
      name: "doctor",
      value: doctor?._id,
    },
  ]);
  const reviews = allReviewsRes as TResponse<TReview[]>;

  const {
    data: specificPatientReviewsRes,
    isLoading: isSpecificPatientReviewsLoading,
    refetch: refetchSpecificPatientReviewsRes,
  } = useGetAllReviews([
    {
      name: "doctor",
      value: doctor?._id,
    },
    {
      name: "patient",
      value: user?._id,
    },
  ]);
  const specificPatientReviews = specificPatientReviewsRes as TResponse<
    TReview[]
  >;

  // Check if user has completed appointment with this doctor
  const hasCompletedAppointment = appointments?.meta?.total > 0;

  // Check if user already reviewed this doctor
  const userHasReviewed = specificPatientReviews?.meta?.total > 0;

  const methods = useForm<TReviewForm>({
    resolver: zodResolver(reviewValidationSchema),
    defaultValues: {
      rating: "5",
      comment: "",
    },
  });

  const onSubmit = (data: TReviewForm) => {
    if (!hasCompletedAppointment) {
      return;
    }

    const createReviewData: TCreateReview = {
      doctor: doctor?._id,
      patient: user?._id as string,
      rating: Number(data?.rating),
      comment: data.comment,
    };

    createReview(createReviewData, {
      onSuccess: () => {
        methods.reset();
        refetchSpecificPatientReviewsRes();
        refetchAllReviews();
        setShowForm(false);
      },
    });
  };

  // console.log({
  //   reviews,
  //   specificPatientReviews,
  //   userHasReviewed,
  //   hasCompletedAppointment,
  // });

  if (
    isReviewsLoading ||
    isSpecificPatientReviewsLoading ||
    isAppointmentsLoading ||
    isUserLoading
  ) {
    return (
      <div className="space-y-4 gap-2 my-3">
        {Array.from({ length: 5 }).map((_, ind) => {
          return <Skeleton key={ind} className="rounded-lg h-[100px] w-full" />;
        })}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Write Review Section */}
      {user && user.role === "patient" && (
        <div>
          {hasCompletedAppointment && !userHasReviewed ? (
            <div>
              {!showForm ? (
                <div>
                  <Card className="mb-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-800 border border-blue-100 dark:border-gray-700">
                    <CardHeader className="flex flex-col items-start px-4 py-3 border-b border-blue-100 dark:border-gray-700">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Your Completed Appointment
                      </h3>
                    </CardHeader>
                    <CardBody className="px-4 py-4">
                      <div className="space-y-3">
                        {appointments.data.map((appointment: TAppointment) => (
                          <div
                            key={appointment._id}
                            className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                          >
                            {/* Appointment Header */}
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <p className="font-semibold text-gray-900 dark:text-white">
                                  {appointment.doctor?.doctorTitle}{" "}
                                  {appointment.doctor?.name}
                                </p>
                                <p className="text-sm bg-primary-500 text-white my-1 pl-1 pr-2 py-[1px] rounded-r-xl font-bold">
                                  {doctor?.medicalSpecialties
                                    ?.map((specialty) => specialty.name)
                                    ?.join(", ")}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-xs font-semibold">
                                  ✓ Completed
                                </span>
                                <Link
                                  href={`/dashboard/${user?.role || "patient"}/appointment/${appointment._id}`}
                                >
                                  <Button
                                    isIconOnly
                                    className="rounded-full bg-opacity-30 border border-dotted border-primary hover:scale-105 hover:animate-spin360"
                                  >
                                    <ArrowRightIcon className="text-primary -rotate-45" />
                                  </Button>
                                </Link>
                              </div>
                            </div>

                            {/* Appointment Details Grid */}
                            <div className="grid grid-cols-2 gap-3 mb-3">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">📅</span>
                                <div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">
                                    Date
                                  </p>
                                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {new Date(
                                      appointment.schedule,
                                    ).toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    })}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="text-lg">🕐</span>
                                <div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">
                                    Time
                                  </p>
                                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {new Date(
                                      appointment.schedule,
                                    ).toLocaleTimeString("en-US", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="text-lg">💬</span>
                                <div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">
                                    Type
                                  </p>
                                  <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                                    {appointment.appointmentType === "online"
                                      ? "🎥 Online"
                                      : "🏥 In-Person"}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="text-lg">💳</span>
                                <div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">
                                    Amount
                                  </p>
                                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    ৳{appointment.payment?.amount?.total}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Specialty */}
                            <div className="pt-3 border-t border-gray-200 dark:border-gray-600">
                              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                                Specialty
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {appointment.doctor?.medicalSpecialties &&
                                appointment.doctor.medicalSpecialties.length >
                                  0 ? (
                                  <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs font-medium">
                                    Medical Professional
                                  </span>
                                ) : (
                                  <span className="text-sm text-gray-500 dark:text-gray-400">
                                    -
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardBody>
                  </Card>
                  <Button
                    color="primary"
                    onPress={() => setShowForm(true)}
                    className="mb-4 text-white"
                    size="lg"
                  >
                    ⭐ Write a Review
                  </Button>
                </div>
              ) : (
                <Card className="mb-6">
                  <CardHeader className="flex flex-col items-start px-4 py-3">
                    <h3 className="text-lg font-semibold">Share Your Review</h3>
                  </CardHeader>
                  <Divider />
                  <CardBody className="px-4 py-4">
                    <DEForm
                      onSubmit={onSubmit}
                      resolver={zodResolver(reviewValidationSchema)}
                      defaultValues={{
                        rating: "5",
                        comment: "",
                      }}
                      methods={methods}
                      className="space-y-4"
                    >
                      <MyInp
                        name="rating"
                        type="select"
                        label="Rating"
                        options={[
                          { key: "1", label: "⭐ 1 - Poor" },
                          { key: "2", label: "⭐⭐ 2 - Fair" },
                          { key: "3", label: "⭐⭐⭐ 3 - Good" },
                          { key: "4", label: "⭐⭐⭐⭐ 4 - Very Good" },
                          { key: "5", label: "⭐⭐⭐⭐⭐ 5 - Excellent" },
                        ]}
                        placeholder="Select your rating"
                      />

                      <MyInp
                        name="comment"
                        type="textarea"
                        label="Your Review"
                        placeholder="Share your experience with this doctor (minimum 10 characters)"
                      />

                      <div className="flex gap-2 pt-4">
                        <Button
                          type="submit"
                          color="primary"
                          className="text-white"
                          isLoading={isLoadingCreateReview}
                          disabled={isLoadingCreateReview}
                        >
                          Submit Review
                        </Button>
                        <Button
                          variant="bordered"
                          onPress={() => setShowForm(false)}
                          disabled={isLoadingCreateReview}
                        >
                          Cancel
                        </Button>
                      </div>
                    </DEForm>
                  </CardBody>
                </Card>
              )}
            </div>
          ) : !hasCompletedAppointment ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800">
                ℹ️ You need to complete an appointment with this doctor to leave
                a review.
              </p>
            </div>
          ) : userHasReviewed ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-800">
                ✓ You have already reviewed this doctor.
              </p>
            </div>
          ) : null}
        </div>
      )}

      {/* All Reviews Section */}
      <div>
        <h3 className="text-xl font-semibold mb-4">
          Reviews ({reviews?.meta?.total})
        </h3>

        {reviews.meta?.total === 0 ? (
          <Empty description="No reviews available for this doctor." />
        ) : (
          <div className="space-y-4">
            {reviews?.data?.map((review: TReview) => (
              <Card key={review._id}>
                <CardBody className="py-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Image
                          src={review.patient?.profileImg}
                          height={60}
                          width={60}
                          alt={review.patient?.name}
                          className="h-[60px] w-[60px] rounded-full"
                        />
                        <p className="font-semibold text-md">
                          {review.patient?.name || "Anonymous"}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300 fill-current"
                          }`}
                        />
                      ))}
                      <span className="ml-2 font-semibold">
                        {review.rating}/5
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">{review.comment}</p>
                </CardBody>
              </Card>
            ))}
            <Pagination
              initialPage={pagination.page}
              size={"md"}
              color="secondary"
              className="flex justify-center gap-1 "
              onChange={(e) => setPagination({ ...pagination, page: e })}
              total={reviews?.meta?.totalPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewTab;
