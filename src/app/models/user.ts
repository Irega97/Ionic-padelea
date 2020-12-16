import { Chat } from "./chat";
import { Notification } from './notification'

export interface User {
    _id: string;
    name: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    image: string;
    email: string;
    online : boolean;
    public: boolean;
    provider: string;
    friends: [];
    chats: Chat[];
    notifications: Notification[];
}
