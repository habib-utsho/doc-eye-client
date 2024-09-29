import { z } from "zod";

const createSpecialtySchema = z.object({
  name: z.string().min(1, "Name is required."),
  description: z
    .string()
    .min(1, "Description is required.")
    .max(450, "Description must be less than 450 characters"),
});

export const specialtyValidationSchema = {
  createSpecialtySchema,
};
