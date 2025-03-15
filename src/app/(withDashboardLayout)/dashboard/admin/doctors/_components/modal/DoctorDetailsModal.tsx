import { EyeFilledIcon, UsersIcon } from "@/src/components/ui/icons";
import { TDoctor } from "@/src/types/user";
import { ClockCircleOutlined, SecurityScanOutlined } from "@ant-design/icons";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import moment from "moment";
import Image from "next/image";
import React, { ReactNode } from "react";
import { WorkingExperiencesTable } from "./WorkingExperiencesModal";
import { convertTo12HourTime } from "@/src/utils/24FourHourTimeTo12HourTime";

const DoctorDetailsModal = ({ doctor }: { doctor: TDoctor }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        color="primary"
        className="text-white hover:scale-[1.07]"
        startContent={<EyeFilledIcon />}
        onPress={onOpen}
        isIconOnly
      />
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="3xl"
        className="max-h-[80vh] overflow-y-auto"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Doctor Details
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4">
                  {/* Profile Section */}
                  <div className="flex gap-4 items-center">
                    <div>
                      {doctor.profileImg ? (
                        <Image
                          src={doctor.profileImg}
                          alt={doctor.name}
                          height={60}
                          width={60}
                          className="w-[60px] h-[60px] rounded-full"
                        />
                      ) : (
                        <div className="rounded-full h-[60px] w-[60px] bg-primary-500 bg-opacity-20 mr-2" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">
                        {doctor.doctorTitle} {doctor.name}
                      </h2>
                      <p className="text-gray-600">{doctor.doctorType}</p>
                      <p className="text-gray-600 flex items-center gap-1">
                        <SecurityScanOutlined /> {doctor.doctorCode}
                      </p>
                      <p className="text-gray-600 flex items-center gap-1">
                        <UsersIcon /> {doctor.patientAttended} patients attended
                      </p>
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <h3 className="text-lg font-semibold mt-4">Bio</h3>

                    <p className="text-gray-500">{doctor.bio}</p>
                  </div>
                  {/* General Information */}
                  <div>
                    <h3 className="text-lg font-semibold mt-4">
                      General Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <InfoItem label="Email" value={doctor.email} />
                      <InfoItem label="Phone" value={doctor.phone} />
                      <InfoItem label="Gender" value={doctor.gender} />
                      <InfoItem
                        label="Date of Birth"
                        value={moment(doctor?.dateOfBirth).format(
                          "DD-MMM-YYYY"
                        )}
                      />
                      <InfoItem
                        label="Blood Group"
                        value={doctor.bloodGroup || "N/A"}
                      />
                      <InfoItem
                        label="District"
                        value={doctor.district || "N/A"}
                      />
                    </div>
                  </div>

                  {/* Medical information */}
                  <div>
                    <h3 className="text-lg font-semibold mt-4">
                      Medical Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <InfoItem label="NID" value={`${doctor.nid}`} />
                      <InfoItem label="BMDC" value={`${doctor.bmdc}`} />
                      <InfoItem
                        label="Current Workplace"
                        value={
                          <div>
                            <p className="">
                              <span>{doctor?.currentWorkplace?.workPlace}</span>{" "}
                              - {doctor?.currentWorkplace?.department}
                            </p>
                            <p className="text-gray-500">
                              {doctor?.currentWorkplace?.designation},{" "}
                              <ClockCircleOutlined className="mr-1" />
                              {moment(
                                doctor?.currentWorkplace?.workingPeriodStart
                              ).format("YYYY")}{" "}
                              - Running
                            </p>
                          </div>
                        }
                      />
                      <InfoItem
                        label="Consultation Fee"
                        value={`${doctor.consultationFee} BDT`}
                      />
                      <InfoItem
                        label="Follow-up Fee"
                        value={`${doctor.followupFee} BDT`}
                      />
                      <InfoItem
                        label="Medical Degree"
                        value={doctor.medicalDegree}
                      />
                      <InfoItem
                        label="Experience"
                        value={`${doctor.totalExperienceYear} years`}
                      />
                      <InfoItem
                        label="Doctor Type"
                        value={`${doctor.doctorType}`}
                      />
                    </div>
                  </div>
                  {/* Medical Specialties */}
                  <div>
                    <h3 className="text-lg font-semibold mt-4">
                      Medical Specialties
                    </h3>
                    <div className="flex flex-wrap gap-3 mt-2">
                      {doctor.medicalSpecialties?.length === 0 ? (
                        <p className="text-danger">No specialties found!</p>
                      ) : (
                        doctor.medicalSpecialties.map((specialty: any) => (
                          <div
                            key={specialty._id}
                            className="flex items-center gap-2 border px-3 py-1 rounded-md"
                          >
                            <Image
                              src={specialty.icon}
                              alt={specialty.name}
                              width={24}
                              height={24}
                              className="w-6 h-6"
                            />
                            <span>{specialty.name}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                  {/* Availability */}
                  <div>
                    <h3 className="text-lg font-semibold mt-4">Availability</h3>
                    <p>
                      {doctor.availability.dayStart} -{" "}
                      {doctor.availability.dayEnd},{" "}
                      {convertTo12HourTime(doctor.availability.timeStart)} -{" "}
                      {convertTo12HourTime(doctor.availability.timeEnd)}
                    </p>
                  </div>

                  {/* Working experiences */}
                  <div>
                    <h3 className="text-lg font-semibold my-4">
                      Working Experiences
                    </h3>
                    <WorkingExperiencesTable
                      workingExperiences={doctor?.workingExperiences}
                    />
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

const InfoItem = ({
  label,
  value,
}: {
  label: string;
  value: string | ReactNode;
}) => (
  <div className="flex flex-col bg-gray-100 p-3 rounded-md">
    <span className="text-gray-500 text-sm">{label}</span>
    <span className="text-gray-800 font-medium">{value}</span>
  </div>
);

export default DoctorDetailsModal;
