
export interface IUser {
    email: string;
    last_name: string;
    name: string;
}
abstract class User {

    email: string = "";
    last_name: string = "";
    name: string = "";


    protected constructor(email: string, last_name: string, name: string) {
        this.email = email;
        this.last_name = last_name;
        this.name = name;
    }

    abstract add(): void;
    abstract remove(): void;
    abstract update(): void;
    abstract validate(): void;
}

export default User;