"use client";
import MyMotion from "@/src/components/ui/animation/MyMotion";
import { TDoctor, TWorkingExperience } from "@/src/types/user";
import { convertTo12HourTime } from "@/src/utils/24FourHourTimeTo12HourTime";
import { camelCaseToSpace } from "@/src/utils/camelCaseToSpace";
import {
  InfoCircleOutlined,
  ShopOutlined,
  StarOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Tab, Tabs } from "@heroui/tabs";
import moment from "moment";
import React from "react";
import ReviewTab from "./ReviewTab";
import InfoItem from "@/src/components/ui/InfoItem";

const DoctorTabs = ({ doctor }: { doctor: TDoctor }) => {
  console.log({ doctor });
  return (
    <MyMotion y={50}>
      <Tabs aria-label="Options">
        <Tab
          key="Info"
          title={
            <div>
              <InfoCircleOutlined /> Info
            </div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-2 bg-white dark:bg-gray-800">
              <CardHeader className="pb-0 font-semibold text-lg md:text-xl">
                About {doctor.doctorTitle} {doctor.name}
              </CardHeader>
              <CardBody>{doctor.bio}</CardBody>
            </Card>
            <div className="space-y-4">
              <Card className="p-2 bg-white dark:bg-gray-800">
                <CardHeader className="pb-0 font-semibold text-lg md:text-xl">
                  Availability
                </CardHeader>
                <CardBody>
                  <div className="">
                    <div>
                      <p className="text-gray-500 text-sm">
                        <VideoCameraOutlined /> Consultation time
                      </p>
                      <div className="flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-gray-500 animate-pulse inline-block"></span>
                        <span className="font-semibold">
                          {doctor.availability?.dayStart} -{" "}
                          {doctor.availability?.dayEnd}{" "}
                        </span>
                        {`(${convertTo12HourTime(
                          doctor.availability?.timeStart,
                        )} - ${convertTo12HourTime(
                          doctor.availability?.timeEnd,
                        )})`}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <Card className="p-2 bg-white dark:bg-gray-800">
                <CardHeader className="pb-0 font-semibold text-lg md:text-xl">
                  General Information
                </CardHeader>
                <CardBody>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <p className="text-gray-500 text-sm">Consultation Fee</p>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">
                          ৳ {doctor.consultationFee}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Followup Fee</p>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">
                          ৳ {doctor.followupFee}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Patients Attended</p>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">
                          {doctor.patientAttended}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Joined DocEye</p>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">
                          {moment(doctor.createdAt).format("Do MMM, YYYY")}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">
                        Avg. Consultation Time
                      </p>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">10 minutes</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Doctor Code</p>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">
                          {doctor.doctorCode}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </Tab>
        <Tab
          key="Experience"
          title={
            <div>
              <ShopOutlined /> Experience
            </div>
          }
        >
          <Card className="!shadow hover:!shadow-sm mb-4 md:mb-6 bg-white dark:bg-gray-800 w-full !flex-1 relative pt-4 sm:pt-0">
            <h2 className="font-bold text-sm mb-2 absolute right-0 w-full text-center sm:w-auto top-0 bg-primary text-white px-2 py-[2px] rounded-tr-md">
              Current Workplace
            </h2>
            <CardHeader className="pb-0 font-semibold text-lg md:text-xl">
              {doctor.currentWorkplace?.workPlace}
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem
                  label={"Department"}
                  value={doctor.currentWorkplace?.department}
                />
                <InfoItem
                  label={"Designation"}
                  value={doctor.currentWorkplace?.designation}
                />
              </div>
              <InfoItem
                label={"Working Period"}
                value={`${moment(doctor.currentWorkplace?.workingPeriodStart).format("Do MMM, YYYY")} - ${
                  doctor.currentWorkplace?.workingPeriodEnd
                    ? moment(doctor.currentWorkplace?.workingPeriodEnd).format(
                        "Do MMM, YYYY",
                      )
                    : "Running"
                }`}
              />
            </CardBody>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 ">
            {doctor?.workingExperiences?.map(
              (experience: TWorkingExperience, ind: number) => {
                return (
                  <Card
                    key={ind}
                    className="shadow-sm bg-white dark:bg-gray-800 relative pt-4 sm:pt-0"
                  >
                    <h2 className="font-bold text-sm mb-2 absolute right-0 top-0 opacity-30 bg-primary text-white px-2 py-[2px] rounded-tr-md w-full text-center sm:w-auto">
                      Past Experience
                    </h2>
                    <CardHeader className="pb-0 font-semibold text-lg md:text-xl">
                      {experience.workPlace}
                    </CardHeader>
                    <CardBody className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.keys(experience).map((key) => {
                          if (
                            key === "workPlace" ||
                            key === "_id" ||
                            key === "workingPeriodStart" ||
                            key === "workingPeriodEnd"
                          )
                            return;
                          return (
                            <InfoItem
                              key={key}
                              label={camelCaseToSpace(key)}
                              value={
                                experience[key as keyof TWorkingExperience]
                              }
                              compact
                            />
                          );
                        })}
                      </div>

                      <InfoItem
                        label={"Working Period"}
                        value={`${moment(experience?.workingPeriodStart).format("Do MMM, YYYY")} - ${
                          experience?.workingPeriodEnd
                            ? moment(experience?.workingPeriodEnd).format(
                                "Do MMM, YYYY",
                              )
                            : "Running"
                        }`}
                      />
                    </CardBody>
                  </Card>
                );
              },
            )}
          </div>
        </Tab>
        <Tab
          key="Reviews"
          title={
            <div>
              <StarOutlined /> Reviews & Ratings
            </div>
          }
        >
          <Card className="p-2 bg-white dark:bg-gray-800">
            <CardBody>
              <ReviewTab doctor={doctor} />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </MyMotion>
  );
};

export default DoctorTabs;
