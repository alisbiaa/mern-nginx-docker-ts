import Intern from "../src/entities/Intern";
import {Error} from "mongoose";

test("validate" , ()=>{
    expect(fake_intern.validate()).toBe(false );
})
