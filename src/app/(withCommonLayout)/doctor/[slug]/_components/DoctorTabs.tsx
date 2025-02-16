"use client";
import { MessageIcon } from "@/src/components/ui/icons";
import MyMotion from "@/src/components/ui/MyMotion";
import { TDoctor, TWorkingExperience } from "@/src/types/user";
import { camelCaseToSpace } from "@/src/utils/camelCaseToSpace";
import {
  InfoCircleOutlined,
  MailOutlined,
  ShopOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Tab, Tabs } from "@heroui/tabs";
import moment from "moment";
import React from "react";

const DoctorTabs = ({ doctor }: { doctor: TDoctor }) => {
  console.log(doctor, "doctor");
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
          <Card className="p-2">
            <CardHeader className="pb-0 font-semibold text-lg md:text-xl">
              About {doctor.doctorTitle} {doctor.name}
            </CardHeader>
            <CardBody>{doctor.bio}</CardBody>
          </Card>
        </Tab>
        <Tab
          key="Experience"
          title={
            <div>
              <ShopOutlined /> Experience
            </div>
          }
        >
          <Card className="!shadow hover:!shadow-sm mb-4 bg-primary-500 bg-opacity-10">
            <CardHeader className="pb-0 font-semibold text-lg md:text-xl">
              {doctor.currentWorkplace?.workPlace}
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                <div>
                  <p className="text-gray-500 text-sm">Department</p>
                  <p className="text-font-semibold">
                    {doctor.currentWorkplace?.department}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Designation</p>
                  <p className="text-font-semibold">
                    {doctor.currentWorkplace?.designation}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Working Period</p>
                  <p className="text-font-semibold">
                    {moment(doctor.currentWorkplace?.workingPeriodStart).format(
                      "Do MMM, YYYY"
                    )}{" "}
                    -{" "}
                    {doctor.currentWorkplace?.workingPeriodEnd
                      ? moment(
                          doctor.currentWorkplace?.workingPeriodEnd
                        ).format("Do MMM, YYYY")
                      : "Running"}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {doctor?.workingExperiences?.map(
              (experience: TWorkingExperience) => {
                return (
                  <Card className="!shadow hover:!shadow-sm">
                    <CardHeader className="pb-0 font-semibold text-lg md:text-xl">
                      {experience.workPlace}
                    </CardHeader>
                    <CardBody>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.keys(experience).map((key) => {
                          if (
                            key === "workPlace" ||
                            key === "_id" ||
                            key === "workingPeriodStart" ||
                            key === "workingPeriodEnd"
                          )
                            return;
                          return (
                            <div>
                              <p className="text-gray-500 text-sm">
                                {camelCaseToSpace(key)}
                              </p>
                              <p className="text-font-semibold">
                                {experience[key as keyof TWorkingExperience]}
                              </p>
                            </div>
                          );
                        })}
                      </div>

                      <div>
                        <p className="text-gray-500 text-sm">Working Period</p>
                        <p className="text-font-semibold">
                          {moment(experience.workingPeriodStart).format(
                            "Do MMM, YYYY"
                          )}{" "}
                          -{" "}
                          {moment(experience.workingPeriodEnd).format(
                            "Do MMM, YYYY"
                          )}
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                );
              }
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
          <Card className="p-2">
            <CardBody>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </MyMotion>
  );
};

export default DoctorTabs;
