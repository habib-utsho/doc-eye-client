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
import { MinusOutlined } from "@ant-design/icons";
import { useCreateMedicalReport } from "@/src/hooks/medicalReport.hook";
import { TAppointment } from "@/src/types/appointment";
import { useFieldArray, useForm } from "react-hook-form";

const CompleteAppointmentsModal = ({
  isOpen,
  onOpen,
  onOpenChange,
  appointmentForModal,
  setAppointmentForModal,
}: {
  isOpen: boolean;
  onOpen: Dispatch<SetStateAction<boolean>>;
  onOpenChange: (isOpen: boolean) => void;
  appointmentForModal: TAppointment | null;
  setAppointmentForModal: Dispatch<SetStateAction<TAppointment | null>>;
}) => {
  const [problems, setProblems] = useState<string[]>([]);
  const [advices, setAdvices] = useState<string[]>([]);
  const [tests, setTests] = useState<string[]>([]);
  const [medications, setMedications] = useState<TMedication[]>([
    { name: "", dosage: "", frequency: "", duration: "" },
  ]);
  const {
    mutate: completeAppointmentAndCreateMedicalReport,
    isPending: isLoadingCompleteAppointmentAndCreateMedicalReport,
  } = useCreateMedicalReport();

  const handleSubmit = (data: any) => {
    const payload = {
      ...data,
      appointment: appointmentForModal?._id,
      doctor: appointmentForModal?.doctor?._id,
      patient: appointmentForModal?.patient?._id,
      problems,
      advices,
      tests,
    };

    completeAppointmentAndCreateMedicalReport(payload, {
      onSuccess: (data) => {
        toast.success("Medical report submitted successfully!");
      },
      onError: (e) => toast.error(e.message),
    });
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
            // TODO: should add
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

              {medications.map((medication, index) => {
                return (
                  <div className="shadow  p-2 rounded-md mb-4" key={index}>
                    <div className="text-right">
                      <Button
                        type="button"
                        size="sm"
                        variant="shadow"
                        className="my-2"
                        onPress={() =>
                          setMedications((prev) => {
                            return prev.filter((_, i) => {
                              // console.log({ prev, index, i });
                              return i != index;
                            });
                          })
                        }
                        aria-label="remove medication"
                      >
                        <MinusOutlined />
                      </Button>
                    </div>
                    <div key={index} className="grid grid-cols-2 gap-4 ">
                      <MyInp
                        name={`medications[${index}].name`}
                        type="text"
                        label="Name"
                        placeholder="Enter medication name"
                      />
                      <MyInp
                        name={`medications[${index}].dosage`}
                        type="text"
                        label="Dosage"
                        placeholder="Enter medication dosage"
                      />
                      <MyInp
                        name={`medications[${index}].frequency`}
                        type="text"
                        label="Frequency"
                        placeholder="Enter medication frequency"
                      />
                      <MyInp
                        name={`medications[${index}].duration`}
                        type="text"
                        label="Duration"
                        placeholder="Enter medication duration"
                      />
                    </div>
                  </div>
                );
              })}
              <Button
                type="button"
                size="sm"
                variant="shadow"
                className="mt-2"
                onPress={() =>
                  setMedications([
                    ...medications,
                    { name: "", dosage: "", frequency: "", duration: "" },
                  ])
                }
              >
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
              isLoading={isLoadingCompleteAppointmentAndCreateMedicalReport}
              disabled={isLoadingCompleteAppointmentAndCreateMedicalReport}
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
