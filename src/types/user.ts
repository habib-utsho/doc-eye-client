import { TSpecialty } from "./specialty";

export type TDistrict =
  | "Dhaka"
  | "Faridpur"
  | "Gazipur"
  | "Gopalganj"
  | "Jamalpur"
  | "Kishoreganj"
  | "Madaripur"
  | "Manikganj"
  | "Munshiganj"
  | "Mymensingh"
  | "Narayanganj"
  | "Narsingdi"
  | "Netrokona"
  | "Rajbari"
  | "Shariatpur"
  | "Sherpur"
  | "Tangail"
  | "Bogra"
  | "Joypurhat"
  | "Naogaon"
  | "Natore"
  | "Chapainawabganj"
  | "Pabna"
  | "Rajshahi"
  | "Sirajganj"
  | "Dinajpur"
  | "Gaibandha"
  | "Kurigram"
  | "Lalmonirhat"
  | "Nilphamari"
  | "Panchagarh"
  | "Rangpur"
  | "Thakurgaon"
  | "Barguna"
  | "Barishal"
  | "Bhola"
  | "Jhalokati"
  | "Patuakhali"
  | "Pirojpur"
  | "Bandarban"
  | "Brahmanbaria"
  | "Chandpur"
  | "Chattogram"
  | "Cumilla"
  | "Cox's Bazar"
  | "Feni"
  | "Khagrachari"
  | "Lakshmipur"
  | "Noakhali"
  | "Rangamati"
  | "Habiganj"
  | "Moulvibazar"
  | "Sunamganj"
  | "Sylhet"
  | "Bagerhat"
  | "Chuadanga"
  | "Jessore"
  | "Jhenaidah"
  | "Khulna"
  | "Kushtia"
  | "Magura"
  | "Meherpur"
  | "Narail"
  | "Satkhira";
export type TBloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "AB+"
  | "AB-"
  | "O+"
  | "O-";
export type TGender = "Male" | "Female" | "Other";
export type TUserRole = "admin" | "doctor" | "patient";

export type TUser = {
  _id: string;
  email: string;
  password: string;
  needsPasswordChange: boolean;
  role: TUserRole;
  status: "active" | "inactive";
  isDeleted: boolean;
};
export type TDecodedUser = {
  userId: string;
  _id: string;
  email: string;
  role: TUserRole;
  name: string;
  profileImg?: string;
};

export type TSignin = {
  email: string;
  password: string;
};
export type TChangePassword = {
  oldPassword: string;
  newPassword: string;
};

// admin, doctor, patient

export type TCommonPatientAdminDoctor = {
  _id: string;
  user: TUser;
  name: string;
  email: string;
  phone: string;
  profileImg: string;
  gender: TGender;
  district: TDistrict;
  dateOfBirth: string;
  bloodGroup: TBloodGroup;
  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}


export type TPatient = TCommonPatientAdminDoctor & {
  weight?: number;
  height?: number;
  allergies?: string;
};
export type TAdmin = TCommonPatientAdminDoctor & {
  weight?: number;
  height?: number;
  allergies?: string;
};

export type TAvailability = {
  dayStart: string;
  dayEnd: string;
  timeStart: string;
  timeEnd: string;
};

export type TWorkingExperience = {
  workPlace: string;
  department: string;
  designation: string;
  workingPeriodStart: string;
  workingPeriodEnd: string;
  _id?: string;
};

export type TDoctor = TCommonPatientAdminDoctor & {
  availability: TAvailability;
  bio: string;
  doctorTitle: string;
  doctorType: string;
  medicalSpecialties: TSpecialty[];
  totalExperienceYear: number;
  medicalDegree: string;
  consultationFee: number;
  followupFee: number;
  workingExperiences: TWorkingExperience[];
  currentWorkplace: TWorkingExperience;
  nid: string;
  bmdc: string;
  patientAttended: number;
  doctorCode: string;
  status: string;
};
