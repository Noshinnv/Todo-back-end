import { Schema, model } from "mongoose";

const userSchema = Schema({
    username: {
        type: String,
        // unique : true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    profileImage: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true });

const userModel = model("user", userSchema);//(collection name,collection schema)

export default userModel;