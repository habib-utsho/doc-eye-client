import { TUserRole } from "./user";

export type TMessage = {
    chatId: string;
    appointmentId: string;
    text: string;
    from: TUserRole;
    senderId: string;
    receiverId: string;
    timestamp: number;
};