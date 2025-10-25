import { TUserRole } from "./user";

export type TCreateMessage = {
    chatId: string;
    appointmentId: string;
    text: string;
    from: TUserRole;
    senderId: string;
    receiverId: string;
};
export type TMessage = {
    chatId: string; // One-to-one or group chat ID
    from: string;
    senderId: string;
    receiverId: string;
    messageType: "text" | "image" | "video";
    text?: string;
    mediaUrl?: string;
    isRead: boolean;
    isDelivered: boolean;
    isEdited: boolean;
    isDeleted: boolean;
    repliedTo?: string; // Reference to another message
    createdAt: Date;
    updatedAt: Date;
};