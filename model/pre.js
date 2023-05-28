import { Schema, model } from "mongoose";
const pre = new Schema(
    {
        subjectName: {
            type: String,
            required: false,
        },
        pre_requisiteName: {
            type: String,
            required: false,
        },
        subject_id: {
            type: Schema.Types.ObjectId,
            required: false,
            ref: 'subject'
        },
        pre_requisite_id: {
            type: Schema.Types.ObjectId,
            required: false,
            ref: 'subject'
        },
    }, { timestamps: true });
export default model('pre', pre);
