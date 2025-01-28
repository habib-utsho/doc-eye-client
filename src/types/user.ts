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

export type TPatient = {
  _id: string;
  user: string;
  name: string;
  email: string;
  phone: string;
  profileImg?: string;
  gender: TGender;
  district: TDistrict;
  dateOfBirth: Date;
  bloodGroup: TBloodGroup;
  weight?: number;
  height?: number;
  allergies?: string;
  isDeleted: boolean;
};
export type TAdmin = {
  _id: string;
  user: TUser;
  name: string;
  email: string;
  phone: string;
  gender: string;
  profileImg: string;
  dateOfBirth: string;
  district: string;
  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type TUser = {
  id: string;
  email: string;
  password: string;
  needsPasswordChange: boolean;
  role: TUserRole;
  status: "active" | "inactive";
  isDeleted: boolean;
};
export type TDecodedUser = {
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
