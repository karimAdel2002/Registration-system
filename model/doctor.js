import { Schema,model } from "mongoose";
const doctor = new Schema(
    {
name : {
    type : String,
    required: true,
},
username : {
    type : String,
    required: true,
},
password : {
    type : String,
    required: true,
},

}, { timestamps:true});
export default model('doctor',doctor);