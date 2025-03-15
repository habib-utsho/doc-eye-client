import {
  EyeFilledIcon,
  LocationIcon,
  PhoneIcon,
} from "@/src/components/ui/icons";
import { TPatient } from "@/src/types/user";
import { PhoneOutlined } from "@ant-design/icons";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import moment from "moment";
import React from "react";
import { FaLocationArrow, FaLocationPin } from "react-icons/fa6";

const PatientDetailsModal = ({ patient }: { patient: TPatient }) => {
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
                Patient Details
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4">
                  {/* Profile Section */}
                  <div className="flex gap-4 items-center">
                    <img
                      src={patient.profileImg}
                      alt={patient.name}
                      className="w-24 h-24 rounded-full"
                    />
                    <div className="space-y-[2px]">
                      <h2 className="font-semibold">{patient.name}</h2>
                      <h2 className="font-semibold flex items-center gap-[2px] ">
                        {" "}
                        <LocationIcon /> {patient.district}
                      </h2>
                      <p className="text-gray-600 flex items-center gap-[2px]">
                        {" "}
                        <PhoneIcon /> {patient.phone}
                      </p>
                      <p className="text-gray-500 flex items-center gap-[2px]">
                        <span>🩸</span> {patient.bloodGroup}
                      </p>
                    </div>
                  </div>

                  {/* General Information */}
                  <div>
                    <h3 className="font-semibold mt-4">General Information</h3>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <InfoItem label="Email" value={patient.email} />
                      <InfoItem label="Phone" value={patient.phone} />
                      <InfoItem label="Gender" value={patient.gender} />
                      <InfoItem
                        label="Date of Birth"
                        value={moment(patient?.dateOfBirth).format(
                          "DD-MMM-YYYY"
                        )}
                      />
                      <InfoItem
                        label="Blood Group"
                        value={patient.bloodGroup || "N/A"}
                      />
                      <InfoItem
                        label="District"
                        value={patient.district || "N/A"}
                      />
                      <InfoItem
                        label="Allergies"
                        value={patient.allergies || "N/A"}
                      />
                      <InfoItem
                        label="weight"
                        value={patient.weight || "N/A"}
                      />
                      <InfoItem
                        label="height"
                        value={patient.height || "N/A"}
                      />
                    </div>
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
  value: string | number;
}) => (
  <div className="flex flex-col bg-gray-100 p-3 rounded-md">
    <span className="text-gray-500 text-sm">{label}</span>
    <span className="text-gray-800 font-medium">{value}</span>
  </div>
);

export default PatientDetailsModal;
