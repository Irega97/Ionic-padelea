export class User {
    name: string;
    username: string;
    password: string;
    image: string;
    email: string;
    online : boolean;
    provider: string;
    friends: User[];

    constructor (username: string, password: string, name?: string, image?: string, email?: string, online?: boolean, provider?: string){
        this.name = name;
        this.username = username;
        this.password = password;
        this.image = image;
        this.email = email;
        this.online = online;
        this.provider = provider;
    }
}
