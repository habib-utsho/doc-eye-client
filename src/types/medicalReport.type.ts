import { TAppointment } from "./appointment";
import { TDoctor, TPatient } from "./user";

export type TMedication = {
  name: string; // "Paracetamol"
  dosage: string; // "500mg"
  frequency: string; // "Twice a day"
  duration: string; // "5 days"
};
export type TCreateMedicalReport = {
  appointment: string;
  doctor: string;
  patient: string;
  problems: string[]; // "Blood in sputum" , "Chest pain"
  diagnosis: string; // Cough fissure
  medications: TMedication[] | null;
  advices: string[] | null; // "Take rest and drink plenty of fluids"
  tests: string[] | null; // "Blood test, X-ray"
  followUpDate: Date | null; // 2023-10-01
};
export type TMedicalReport = {
  appointment: TAppointment;
  doctor: TDoctor;
  patient: TPatient;
  problems: string[]; // "Blood in sputum" , "Chest pain"
  diagnosis: string; // Cough fissure
  medications: TMedication[] | null;
  advices: string[] | null; // "Take rest and drink plenty of fluids"
  tests: string[] | null; // "Blood test, X-ray"
  followUpDate: Date | null; // 2023-10-01
};
