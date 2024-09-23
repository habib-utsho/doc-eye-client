import { TBloodGroup, TDistrict, TGender } from ".";

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
