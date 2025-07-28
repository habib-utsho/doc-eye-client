import { z } from "zod";

const createMedicalReportZodSchema = z.object({
  // appointment: z.string().min(1, "Appointment ID is required"),
  // doctor: z.string().min(1, "Doctor ID is required"),
  // patient: z.string().min(1, "Patient ID is required"),
  diagnosis: z.string().min(1, "Diagnosis is required"),
  problems: z
    .array(z.string().min(1, "Problem cannot be empty"))
    .nonempty("At least one problem is required"),
  medications: z
    .array(
      z.object({
        name: z.string().min(1, "Medication name is required"),
        dosage: z.string().min(1, "Dosage is required"),
        frequency: z.string().min(1, "Frequency is required"),
        duration: z.string().min(1, "Duration is required"),
      })
    )
    .optional(),
  advices: z
    .array(z.string().min(1, "Advices cannot be empty"))
    .nonempty("At least one advice is required").optional(),
  tests: z
    .array(z.string().min(1, "Tests cannot be empty"))
    .nonempty("At least one test is required").optional(),
  followUpDate: z.coerce.date().optional(),
});

export const medicalReportValidationSchema = {
  createMedicalReportZodSchema,
};
