import { Schema, model } from "mongoose";
const department = new Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
},
    { timestamps: true }
);

export default model("department",department);