import { EyeFilledIcon, UsersIcon } from "@/src/components/ui/icons";
import { TDoctor } from "@/src/types/user";
import { SecurityScanOutlined } from "@ant-design/icons";
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
import React from "react";
import { WorkingExperiencesTable } from "./WorkingExperiencesModal";

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
                    <img
                      src={doctor.profileImg}
                      alt={doctor.name}
                      className="w-24 h-24 rounded-full"
                    />
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
                      <p className="text-gray-500">{doctor.bio}</p>
                    </div>
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
                        value={`${doctor.currentWorkplace}`}
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
                      {doctor.availability.timeStart} -{" "}
                      {doctor.availability.timeEnd}
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

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col bg-gray-100 p-3 rounded-md">
    <span className="text-gray-500 text-sm">{label}</span>
    <span className="text-gray-800 font-medium">{value}</span>
  </div>
);

export default DoctorDetailsModal;
