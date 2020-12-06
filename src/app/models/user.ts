export interface User {
    name: string;
    username: string;
    password: string;
    image: string;
    email: string;
    online : boolean;
    provider: string;
    friends: User[];
}
