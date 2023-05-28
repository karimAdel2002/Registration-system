import { Schema, model } from "mongoose";
const pdf = new Schema(
    {
        subject_name: {
            type: String,
            required: false,
        },
        subject_id: {
            type: Schema.Types.ObjectId,
            required: false,
            ref: 'subject'
        },
        pdf1_name: {
            type: String,
            required: false,
        },
        pdf1: {
            type: String,
            required: false,
        },
    }, { timestamps: true });
export default model('pdf', pdf);
