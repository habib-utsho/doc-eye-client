"use client";
import { useGetAllAppointments } from "@/src/hooks/appointment.hook";
import { useCreateReview, useGetAllReviews } from "@/src/hooks/reviews.hook";
import useUserData from "@/src/hooks/user.hook";
import { TAppointment } from "@/src/types/appointment";
import { TReview } from "@/src/types/review";
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

  const { data: allReviewsRes, isLoading: isReviewsLoading } = useGetAllReviews(
    [
      {
        name: "doctor",
        value: doctor?._id,
      },
    ],
  );
  const reviews = allReviewsRes as TResponse<TReview[]>;

  const {
    data: specificPatientReviewsRes,
    isLoading: isSpecificPatientReviewsLoading,
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

    const formData = new FormData();
    formData.append("patient", user?._id || "");
    formData.append("doctor", doctor?._id || "");
    formData.append("appointment", appointments.data[0]._id);
    formData.append("rating", data.rating);
    formData.append("comment", data.comment);

    createReview(formData, {
      onSuccess: () => {
        methods.reset();
        setShowForm(false);
      },
    });
  };

  console.log({
    reviews,
    specificPatientReviews,
    userHasReviewed,
    hasCompletedAppointment,
  });

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
                <Button
                  color="primary"
                  onPress={() => setShowForm(true)}
                  className="mb-4"
                >
                  Write a Review
                </Button>
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
          Reviews ({reviews.meta.total})
        </h3>

        {reviews.meta.total === 0 ? (
          <Empty description="No reviews available for this doctor." />
        ) : (
          <div className="space-y-4">
            {reviews?.data?.map((review: TReview) => (
              <Card key={review._id}>
                <CardBody className="py-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-md">
                        {review.patient?.name || "Anonymous"}
                      </p>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewTab;
