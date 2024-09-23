import { z } from "zod";

const signinValidationSchema = z.object({
  email: z.string().trim().email({ message: "Please provide a valid email!" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters!" }),
});
const signupValidationSchema = z.object({
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

export const authValidationSchema = {
  signinValidationSchema,
  signupValidationSchema,
};
