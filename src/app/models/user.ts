export class User {
    name: string;
    password: string;
    sex: string;
    image: string;
    email: string;
    friends: User[];

    constructor (name: string, password: string, sex?: string, image?: string, email?: string){
        this.name = name;
        this.password = password;
        this.sex = sex;
        this.image = image;
        this.email = email;
    }
}
