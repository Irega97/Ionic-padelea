export interface User {
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
    friends: User[];
}
