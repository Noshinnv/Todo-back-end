import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './router/userRoute.js';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import todoRoute from './router/todoRoute.js';
import authenticationRoute from './router/authenticationRoute.js';

// Creating server

const app = express();

dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("connected to MongoDB database");
    } catch (e) {
        console.log("Failed to connect", e);
    }
};

// middle Wear

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.static("public"));// for image upload
app.use(express.static("file")); //for image upload
app.use(fileUpload({ uriDecodeFileNames: true }));



// declaring routes

app.use("/images", express.static("images"))

app.use("/api/user", userRoute);
app.use("/api/todo", todoRoute);
app.use("/api/log", authenticationRoute);

// Assingning server to the port
app.listen(process.env.PORT, () => {
    connect();
    console.log("Server is running");
});