import { z } from "zod";
import { doctorTitles } from "../constant/doctor.constant";

const signinValidationSchema = z.object({
  email: z.string().trim().email({ message: "Please provide a valid email!" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters!" }),
});

const commonSignupValidationSchema = z.object({
  name: z.string().min(1, "Name is required."),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters!" }),
  email: z.string().trim().email({ message: "Please provide a valid email!" }),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters long."),
  gender: z.enum(["Male", "Female", "Other"], {
    message: "Gender is required.",
  }),
  district: z.enum(
    [
      "Dhaka",
      "Faridpur",
      "Gazipur",
      "Gopalganj",
      "Jamalpur",
      "Kishoreganj",
      "Madaripur",
      "Manikganj",
      "Munshiganj",
      "Mymensingh",
      "Narayanganj",
      "Narsingdi",
      "Netrokona",
      "Rajbari",
      "Shariatpur",
      "Sherpur",
      "Tangail",
      "Bogra",
      "Joypurhat",
      "Naogaon",
      "Natore",
      "Chapainawabganj",
      "Pabna",
      "Rajshahi",
      "Sirajganj",
      "Dinajpur",
      "Gaibandha",
      "Kurigram",
      "Lalmonirhat",
      "Nilphamari",
      "Panchagarh",
      "Rangpur",
      "Thakurgaon",
      "Barguna",
      "Barishal",
      "Bhola",
      "Jhalokati",
      "Patuakhali",
      "Pirojpur",
      "Bandarban",
      "Brahmanbaria",
      "Chandpur",
      "Chattogram",
      "Cumilla",
      "Cox's Bazar",
      "Feni",
      "Khagrachari",
      "Lakshmipur",
      "Noakhali",
      "Rangamati",
      "Habiganj",
      "Moulvibazar",
      "Sunamganj",
      "Sylhet",
      "Bagerhat",
      "Chuadanga",
      "Jessore",
      "Jhenaidah",
      "Khulna",
      "Kushtia",
      "Magura",
      "Meherpur",
      "Narail",
      "Satkhira",
    ],
    { message: "District is required." }
  ),
  dateOfBirth: z.string().refine(
    (dob) => {
      return new Date(dob) < new Date();
    },
    { message: "Date of birth is required." }
  ),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O+"], {
    message: "Blood group is required.",
  }),
  weight: z.number().optional(), // Optional field
  height: z.number().optional(), // Optional field
  allergies: z.string().optional(), // Optional field
  isDeleted: z.boolean().default(false), // Default value
});

const patientSignupValidationSchema = commonSignupValidationSchema;

const doctorSignupValidationSchema = z.object({
  ...commonSignupValidationSchema.shape,
  doctorTitle: z
    .string(z.enum(["Dr.", "Prof. Dr.", "Assoc. Prof. Dr.", "Asst. Prof. Dr."]))
    .min(1, "Doctor title is required."),
  doctorType: z
    .string(z.enum(["Medical", "Dental", "Veterinary"]))
    .min(1, "Doctor type is required."),
  medicalSpecialty: z.string().min(1, "Medical Specialty is required."),
  medicalDegree: z.string().min(1, "Medical Degree is required."),
  totalExperienceYear: z.string().min(1, "Total Experience is required."),
  currentWorkplace: z.string().min(1, "Current Workplace is required."),
  consultationFee: z.string().min(1, "Consultation Fee is required."),
  followupFee: z.string().min(1, "Follow Up Fee is required."),
  nid: z.string().min(1, "NID is required."),
  bmdc: z.string().min(1, "BMDC is required."),
  experiences: z.array(
    z.object({
      workPlace: z.string().min(1, "Workplace is required."),
      department: z.string().min(1, "Department is required."),
      designation: z.string().min(1, "Designation is required."),
      workingPeriodStart: z
        .string()
        .min(1, "Working Period Start is required."),
      workingPeriodEnd: z.string().min(1, "Working Period End is required."),
    })
  ),
  availability: z.object({
    dayStart: z.string().min(1, "Day Start is required."),
    dayEnd: z.string().min(1, "Day End is required."),
    timeStart: z.string().min(1, "Time Start is required."),
    timeEnd: z.string().min(1, "Time End is required."),
  }),
});

export const authValidationSchema = {
  signinValidationSchema,
  patientSignupValidationSchema,
  doctorSignupValidationSchema,
};
