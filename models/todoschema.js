import { Schema, model } from "mongoose";

const todoSchema = Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,//connected to user collection (when the logged in user )
            ref: "user",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        status: {
           type:String,
            required: true
        }
    },
    { timestamps: true }
);

const todoModel = model("todo", todoSchema);
export default todoModel;


