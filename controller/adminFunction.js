import userModel from "../models/userSchema.js";

export const deleteUser = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        res
            .status(200)
            .send(`user with ${req.params.id}has been permenently deleted from your project`);
    } catch (e) {
        console.log(e);
        res.status(500).send("Internal server error")
    }
};