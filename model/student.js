import { Schema,model } from "mongoose";
const student = new Schema(
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
academic_number : {
    type : String,
    required: true,
},
department: {
    type: Schema.Types.ObjectId,
    required: false,
    ref : 'department'
},
passed_subjects1 : {
    type : Schema.Types.ObjectId,
    required: false,
    ref : 'subject'
},
passed_subjects2 : {
    type : Schema.Types.ObjectId,
    required: false,
    ref : 'subject'
},
passed_subjects3 : {
    type : Schema.Types.ObjectId,
    required: false,
    ref : 'subject'
},
passed_subjects4 : {
    type : Schema.Types.ObjectId,
    required: false,
    ref : 'subject'
},
passed_subjects5 : {
    type : Schema.Types.ObjectId,
    required: false,
    ref : 'subject'
},
passed_subjects6 : {
    type : Schema.Types.ObjectId,
    required: false,
    ref : 'subject'
},
passed_subjects7 : {
    type : Schema.Types.ObjectId,
    required: false,
    ref : 'subject'
},
passed_subjects8 : {
    type : Schema.Types.ObjectId,
    required: false,
    ref : 'subject'
},
passed_subjects9 : {
    type : Schema.Types.ObjectId,
    required: false,
    ref : 'subject'
},
passed_subjects10 : {
    type : Schema.Types.ObjectId,
    required: false,
    ref : 'subject'
},
passed_subjects11 : {
    type : Schema.Types.ObjectId,
    required: false,
    ref : 'subject'
},
passed_subjects12 : {
    type : Schema.Types.ObjectId,
    required: false,
    ref : 'subject'
},
passed_subjects13 : {
    type : Schema.Types.ObjectId,
    required: false,
    ref : 'subject'
},
passed_subjects14 : {
    type : Schema.Types.ObjectId,
    required: false,
    ref : 'subject'
},
passed_subjects15 : {
    type : Schema.Types.ObjectId,
    required: false,
    ref : 'subject'
},
registered_subjects1 : {
    type : Schema.Types.ObjectId,
    required: false,
    ref : 'subject'
},
registered_subjects2 : {
    type : Schema.Types.ObjectId,
    required: false,
    ref : 'subject'
},
registered_subjects3 : {
    type : Schema.Types.ObjectId,
    required: false,
    ref : 'subject'
},
registered_subjects4 : {
    type : Schema.Types.ObjectId,
    required: false,
    ref : 'subject'
},
registered_subjects5 : {
    type : Schema.Types.ObjectId,
    required: false,
    ref : 'subject'
},
registered_subjects6 : {
    type : Schema.Types.ObjectId,
    required: false,
    ref : 'subject'
},

}, { timestamps:true});
export default model('student',student);