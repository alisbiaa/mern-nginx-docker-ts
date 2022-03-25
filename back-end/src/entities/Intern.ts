import User, {IUser} from "./User";
import {Error, model, Schema} from "mongoose";


interface IIntern extends IUser{
    passport: IPassport;
    start_date: Date;
}
interface IPassport {
    issue_date: Date;
    country: string;
    id: string;
    data_of_birth: Date;
}

const schema = new Schema<IIntern>({
    passport : {
        date_of_birth: {type: Date,required:true},
        issue_date:{type: Date,required:true},
        country:{type: String,required:true},
        id: {type: String,required:true},
    },
    name: {type: String,required:true},
    last_name: {type: String,required:true},
    email: {type: String,required:true,unique:true},
    start_date: {type: Date,required:true,unique:true},
})

const intern_model = model<IIntern>("interns", schema);

class Intern extends User implements IIntern {

    passport: IPassport;
    start_date: Date;


    constructor(intern : IIntern) {
        const {name,email,last_name,passport,start_date} = intern;
        super(email,last_name,name);
        this.passport = passport;
        this.start_date = start_date;
    }

    add(): void {

    }

    remove(): void {
    }

    update(): void {
    }

    validate(): boolean {
        const {email,last_name,name,passport,start_date} = this;
        const new_intern = new intern_model({email, last_name, name, passport, start_date});
        const errors = new_intern.validateSync()?.errors;
        return !errors;
    }


}

export default Intern;
