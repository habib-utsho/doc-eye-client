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
import { PlusIcon, XMarkIcon } from "@/src/components/ui/icons";
import { MinusOutlined } from "@ant-design/icons";
import { useCreateMedicalReport } from "@/src/hooks/medicalReport.hook";
import { TAppointment } from "@/src/types/appointment";
import { useFieldArray, useForm } from "react-hook-form";

type FormValues = {
  medications: TMedication[];
  problems: string[];
  advices: string[];
  tests: string[];
  diagnosis?: string;
  followUpDate?: string;
};

const CompleteAppointmentsModal = ({
  isOpen,
  onOpen,
  onOpenChange,
  appointmentForModal,
  setAppointmentForModal,
  refetchAppointments,
}: {
  isOpen: boolean;
  onOpen: Dispatch<SetStateAction<boolean>>;
  onOpenChange: (isOpen: boolean) => void;
  appointmentForModal: TAppointment | null;
  setAppointmentForModal: Dispatch<SetStateAction<TAppointment | null>>;
  refetchAppointments: () => void;
}) => {
  // const [problems, setProblems] = useState<string[]>([]);
  // const [advices, setAdvices] = useState<string[]>([]);
  // const [tests, setTests] = useState<string[]>([]);
  // const [medications, setMedications] = useState<TMedication[]>([
  //   { name: "", dosage: "", frequency: "", duration: "" },
  // ]);
  const {
    mutate: completeAppointmentAndCreateMedicalReport,
    isPending: isLoadingCompleteAppointmentAndCreateMedicalReport,
  } = useCreateMedicalReport();

  const formMethods = useForm<FormValues>({
    resolver: zodResolver(
      medicalReportValidationSchema.createMedicalReportZodSchema
    ),
    defaultValues: {
      medications: [{ name: "", dosage: "", frequency: "", duration: "" }],
      problems: [""],
      advices: [""],
      tests: [""],
    },
  });

  const { control } = formMethods;
  console.log({ control });
  const {
    fields: medicationFields,
    append: appendMedication,
    remove: removeMedication,
  } = useFieldArray({
    control,
    name: "medications",
  });
  const {
    fields: problemFields,
    append: appendProblem,
    remove: removeProblem,
    // @ts-ignore
  } = useFieldArray({ control, name: "problems" });

  const {
    fields: adviceFields,
    append: appendAdvice,
    remove: removeAdvice,
    // @ts-ignore
  } = useFieldArray({ control, name: "advices" });

  const {
    fields: testFields,
    append: appendTest,
    remove: removeTest,
    // @ts-ignore
  } = useFieldArray({ control, name: "tests" });

  // TODO: If first time zod validation is not working, then form is not submitting
  const handleSubmit = (data: any) => {
    const payload = {
      ...data,
      appointment: appointmentForModal?._id,
      doctor: appointmentForModal?.doctor?._id,
      patient: appointmentForModal?.patient?._id,
    };

    // console.log({ payload });
    // return;
    completeAppointmentAndCreateMedicalReport(payload, {
      onSuccess: (data) => {
        refetchAppointments();
        toast.success("Medical report submitted successfully!");
        onOpenChange(false);
        setAppointmentForModal(null);
      },
      onError: (e) => toast.error(e.message),
    });
  };

  // console.log({ medicationFields, problemFields, adviceFields, testFields });

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
        <ModalContent className="py-12 px-8 overflow-auto h-[70%] w-full">
          <DEForm
            onSubmit={handleSubmit}
            // TODO: should add
            // resolver={zodResolver(
            //   medicalReportValidationSchema.createMedicalReportZodSchema
            // )}
            methods={formMethods}
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
              label="Problems"
              name="problems"
              type="array"
              fields={problemFields}
              placeholder="Enter problem and press enter"
              append={(val) => appendProblem(val)}
              remove={removeProblem}
            />

            <div className="shadow p-4 rounded-md">
              <h2 className="font-semibold">Medications</h2>
              <Divider className="mt-1 mb-6" />

              {medicationFields.map((field, index) => (
                <div className="shadow p-2 rounded-md mb-4" key={field.id}>
                  <div className="text-right">
                    <Button
                      type="button"
                      size="sm"
                      variant="shadow"
                      className="my-2"
                      onPress={() => removeMedication(index)}
                      aria-label="remove medication"
                    >
                      <MinusOutlined />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
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
                      placeholder="Enter dosage"
                    />
                    <MyInp
                      name={`medications[${index}].frequency`}
                      type="text"
                      label="Frequency"
                      placeholder="Enter frequency"
                    />
                    <MyInp
                      name={`medications[${index}].duration`}
                      type="text"
                      label="Duration"
                      placeholder="Enter duration"
                    />
                  </div>
                </div>
              ))}

              <Button
                type="button"
                size="sm"
                variant="shadow"
                className="mt-2"
                onPress={() =>
                  appendMedication({
                    name: "",
                    dosage: "",
                    frequency: "",
                    duration: "",
                  })
                }
              >
                <PlusIcon />
              </Button>
            </div>

            <MyInp
              label="Advices"
              name="advices"
              type="array"
              fields={adviceFields}
              placeholder="Enter advice and press enter"
              append={(val) => appendAdvice(val)}
              remove={removeAdvice}
            />
            <MyInp
              label="Tests"
              name="tests"
              type="array"
              fields={testFields}
              placeholder="Enter test and press enter"
              append={(val) => appendTest(val)}
              remove={removeTest}
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
