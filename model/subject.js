import { Schema,model } from "mongoose";
const subject = new Schema(
    {
name : {
    type : String,
    required: true,
},
code : {
    type : String,
    required: true,
},
department: {
    type: Schema.Types.ObjectId,
    required: false,
    ref : 'department'
},
Pre_requisite : {
    type: Schema.Types.ObjectId,
    required: false,
    ref : 'pre'
},
doctor :{
    type: Schema.Types.ObjectId,
    required: false,
    ref : 'doctor'
},
pdf1 :{
    type: Schema.Types.ObjectId,
    required: false,
    ref : 'pdf'
},
pdf2 :{
    type: Schema.Types.ObjectId,
    required: false,
    ref : 'pdf'
},
pdf3 :{
    type: Schema.Types.ObjectId,
    required: false,
    ref : 'pdf'
},
pdf4 :{
    type: Schema.Types.ObjectId,
    required: false,
    ref : 'pdf'
},
}, { timestamps:true});
export default model('subject',subject);
