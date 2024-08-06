import userModel from "../models/userSchema.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { imageUpload } from "../middleWear/imageUpload.js";
import { randomPassGen, sendMail } from "../middleWear/mail.js";


// sign up
export const userFunction = async (req, res) => {
    try {
        const userData = req.body;
        if (userData.password != userData.confirmPassword) {
            return res.status(404).json({ error: "Password didn't match !!" });
        }


        let profileImage;
        // check if image is icluded in the request
        if (req.files && req.files.image) {
            const imageName = uuid() + req.files.image.name;
            const fileUploadCheck = await imageUpload(imageName, req.files.image);
            if (!fileUploadCheck) {
                return res.status(400).json({
                    success: false,
                    message: "Failed to upload image please try again!"
                });
            }
            profileImage = imageName;//set profile image to the filename if upload is successful
        }

        // password confirmation

        const hashedPassword = await bcrypt.hash(userData.password, 2);
        const postUser = await userModel.create({
            ...userData,
            password: hashedPassword,
            profileImage: profileImage
        });
        res.status(200).send(postUser);
    }
    catch (e) {
        console.log(e);
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const getAll = await userModel.find();
        res.status(200).send(getAll);
    }
    catch (e) {
        console.log(e);
    }

};


export const getReq = async (req, res) => {
    try {
        const updatedSample = await userModel.findById(req.userId);
        res.status(200).send(updatedSample);
    } catch (e) {
        console.log(e);
    }
};

export const deleteById = async (req, res) => {
    // const id = req.params.id;
    // try {
    //     const getSample = await userModel.findByIdAndDelete(id);
    //     res.status(200).send(getSample);
    // } catch (e) {
    //     console.log(e);
    // }
    try {
        const getSample = await userModel.findByIdAndDelete(req.userId);
        res.status(200).send(getSample);
    } catch (e) {
        console.log(e);
    }
};

export const updateById = async (req, res) => {
    // const id = req.params.id;
    const update = req.body;
    try {
        const updatedSample = await userModel.findByIdAndUpdate(req.userId, update);
        res.status(200).send(updatedSample)

    } catch (e) {
        console.log(e);
        res.status(400).send("Error")

    }
};

export const putById = async (req, res) => {
    // const id = req.params.id;
    const update = req.body;
    try {
        const updatedSample = await userModel.findByIdAndUpdate(req.userId, update);
        res.status(200).send("success")

    } catch (e) {
        console.log(e);
        res.status(400).send("Error")

    }
};

export const deleteAll = async (req, res) => {
    try {
        const deleteResult = await userModel.deleteMany({})
        res.status(200).send(deleteResult);
    }
    catch (e) {
        console.log(e);
        send.status(500).send("Internal server error");
    }
};

export const forgotPassword = async (req, res, next) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("Mail does not exist");
        const pass = randomPassGen(6);
        const salt = bcrypt.genSaltSync(10);
        const pass2 = bcrypt.hashSync(pass, salt);
        const subject = "Forget password";
        const message = `Your password for email
        ${req.body.email} has been changed to ${pass}`;
        const mailStatus = await sendMail(req.body.email, subject, message);
        if (!mailStatus) return res.status(400).send("Please try again later");
        await userModel.findByIdAndUpdate(user._id, { password: pass2 });
        res.status(200).json("Password successfully changed and send");
    } catch (err) {
        console.log(err);
        res.status(400).send("Failed to change password");
    }
};