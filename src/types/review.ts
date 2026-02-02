import { TDoctor, TPatient } from "./user";


export type TCreateReview = {
    doctor: string
    patient: string
    rating: number
    comment: string
}

export type TReview = {
    _id: string;
    patient: TPatient;
    doctor: TDoctor;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
};