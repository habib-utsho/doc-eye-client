import { EyeFilledIcon } from "@/src/components/ui/icons";
import { TWorkingExperience } from "@/src/types/user";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import moment from "moment";
import React from "react";

const WorkingExperiencesModal = ({
  workingExperiences,
}: {
  workingExperiences: TWorkingExperience[];
}) => {
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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Working Experiences
              </ModalHeader>
              <ModalBody>
                <WorkingExperiencesTable
                  workingExperiences={workingExperiences}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export const WorkingExperiencesTable = ({
  workingExperiences,
}: {
  workingExperiences: TWorkingExperience[];
}) => {
  return (
    <Table aria-label="Working Experiences" fullWidth={true}>
      <TableHeader>
        <TableColumn>#</TableColumn>
        <TableColumn>Department</TableColumn>
        <TableColumn>Designation</TableColumn>
        <TableColumn>Workplace</TableColumn>
        <TableColumn>Period</TableColumn>
      </TableHeader>
      <TableBody>
        {workingExperiences.map((workingExperience, ind) => (
          <TableRow key={workingExperience._id}>
            <TableCell>{ind + 1}</TableCell>
            <TableCell>{workingExperience.department}</TableCell>
            <TableCell>{workingExperience.designation}</TableCell>
            <TableCell>{workingExperience.workPlace}</TableCell>
            <TableCell>
              {moment(workingExperience.workingPeriodStart).format(
                "DD-MMM-YYYY"
              )}{" "}
              -{" "}
              {moment(workingExperience.workingPeriodEnd).format("DD-MMM-YYYY")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default WorkingExperiencesModal;
