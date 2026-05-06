export const protectedRoutes = [
  "/specialty",
  "/signin",
  "/profile",
  "/dashboard/:page*",
  "/profile/:page*",
] as const; //Need to add more from middleware.ts

export const collectionFields: {
  DOCTORS: "doctors",
  PATIENTS: "patients",
  ADMINS: "admins",
  MEDICAL_REPORTS: "medicalReports",
  APPOINTMENTS: "appointments",
  PAYMENTS: "payments",
  SPECIALTIES: "specialties",
  REVIEWS: "reviews",
} = {
  DOCTORS: "doctors",
  PATIENTS: "patients",
  ADMINS: "admins",
  MEDICAL_REPORTS: "medicalReports",
  APPOINTMENTS: "appointments",
  PAYMENTS: "payments",
  SPECIALTIES: "specialties",
  REVIEWS: "reviews",
};

export const collectionFieldsObj: { [key: string]: string } = {
  doctors: "Doctors",
  patients: "Patients",
  admins: "Admins",
  medicalReports: "Medical Reports",
  appointments: "Appointments",
  payments: "Payments",
  specialties: "Specialties",
  reviews: "Reviews",
};
export const collectionFieldsRoute: { [key: string]: string } = {
  doctors: "doctors",
  patients: "patients",
  admins: "admins",
  medicalReports: "consultation-history",
  appointments: "appointments",
  payments: "payment-history",
  specialties: "specialty",
  reviews: "reviews",
};
export const collectionFieldsArr = Object.keys(collectionFieldsObj);