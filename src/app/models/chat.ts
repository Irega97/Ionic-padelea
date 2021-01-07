import { User } from "./user";

export interface Chat{
    _id: String;
    users: User[];
    mensajes: [];
    admin: User[];
}