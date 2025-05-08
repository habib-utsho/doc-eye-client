import React, { Dispatch, SetStateAction, useState } from "react";
import { Modal, ModalContent } from "@heroui/modal";
import DEForm from "@/src/components/ui/Form/DEForm";
import { medicalReportValidationSchema } from "@/src/schemas/medicalReport.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import MyInp from "@/src/components/ui/Form/MyInp";
import { Button } from "@heroui/button";
import { TMedication } from "@/src/types/medicalReport.type";
import { toast } from "sonner";
import { Divider } from "@heroui/divider";
import { PlusIcon } from "@/src/components/ui/icons";

const CompleteAppointmentsModal = ({
  isOpen,
  onOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpen: Dispatch<SetStateAction<boolean>>;
  onOpenChange: (isOpen: boolean) => void;
}) => {
  const [problems, setProblems] = useState<string[]>([]);
  const [advices, setAdvices] = useState<string[]>([]);
  const [tests, setTests] = useState<string[]>([]);
  const [medications, setMedications] = useState<TMedication[]>([]);

  const handleSubmit = (data: any) => {
    console.log({ ...data, problems, advices, tests, medications });
    toast.success("Medical report submitted successfully!");
  };
  return (
    <div>
      {/* Complete appointment modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="lg"
        className="!max-w-2xl"
        backdrop="opaque"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent className="py-12 px-8 overflow-auto h-[70%]">
          <DEForm
            onSubmit={handleSubmit}
            // resolver={zodResolver(
            //   medicalReportValidationSchema.createMedicalReportZodSchema
            // )}
            className="space-y-4"
          >
            <h2 className="font-semibold text-xl mb-4 text-center text-primary">
              Record Medical Report
            </h2>
            <MyInp
              name="diagnosis"
              type="text"
              label="Diagnosis"
              placeholder="Enter diagnosis"
            />
            <MyInp
              name="problems"
              type="array"
              label="Problems"
              placeholder="Enter problems and enter"
              arr={problems}
              setArr={setProblems}
            />
            <div className="shadow p-4 rounded-md">
              <h2 className="font-semibold">Medications</h2>
              <Divider className="mt-1 mb-6" />
              <div className="grid grid-cols-2 gap-4">
                <MyInp
                  name="medications.name"
                  type="text"
                  label="Name"
                  placeholder="Enter medications name"
                />
                <MyInp
                  name="medications.dosage"
                  type="text"
                  label="Dosage"
                  placeholder="Enter medications dosage"
                />
                <MyInp
                  name="medications.frequency"
                  type="text"
                  label="Frequency"
                  placeholder="Enter medications frequency"
                />
                <MyInp
                  name="medications.duration"
                  type="text"
                  label="Duration"
                  placeholder="Enter medications duration"
                />
              </div>
              <Button type="button">
                <PlusIcon />
              </Button>
            </div>
            <MyInp
              name="advices"
              type="array"
              label="Advices"
              placeholder="Enter advices and enter"
              arr={advices}
              setArr={setAdvices}
            />
            <MyInp
              name="tests"
              type="array"
              label="Tests"
              placeholder="Enter tests and enter"
              arr={tests}
              setArr={setTests}
            />
            <MyInp name="followUpDate" type="date" label="Follow Up Date" />

            <Button
              // isLoading={}
              type="submit"
              color="primary"
              className="text-white mt-3 w-full"
              variant="shadow"
            >
              Submit
            </Button>
          </DEForm>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CompleteAppointmentsModal;
