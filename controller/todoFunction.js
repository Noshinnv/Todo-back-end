import todoModel from "../models/todoschema.js";

export const createTodo = async (req, res) => {
    try {
        const todo = await todoModel.create({
            ...req.body,
            userId: req.userId,
        });
        res.status(200).json({ success: true, message: "Successfully added todo" });
    }
    catch (e) {
        console.log(e);
        res.status(400).json({ success: false, message: "failed to add todo" });
    }
};

export const getTodo = async (req, res) => {
    try {
        const todos = await todoModel.find({ userId: req.userId }).populate("userId");
        res.status(200).json({ success: true, message: "Successfully retrieved todo", data: todos });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: "Failed to retieve todo" });
    }
};

export const updateTodo = async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    try {
        const updatedTodo = await todoModel.findByIdAndUpdate({ _id: id, userId: req.userId }, update);
        res.status(200).send(updatedTodo);
    }
    catch (e) {
        console.log(e);
        res.status(400).json({
            success: false,
            message: "Todo not found or unauthorized to update"
        });
    }
};

export const getTodoById = async (req, res) => {
    const id = req.params.id;
    const update = req.body
    try {
        const getTodooById=await todoModel.findById({_id: id, userId: req.userId }, update);
        res.status(200).send(getTodooById)
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Todo not found"
        });
    }
}

export const putTodo = async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    try {
        const putTodoo = await todoModel.findByIdAndUpdate({ _id: id, userId: req.userId }, update);
        res.status(200).send(putTodoo)
    }
    catch (e) {
        console.log(e);
        res.status(400).json({
            success: false,
            message: "Todo not found or unauthorized to update"
        });
    }
};

export const todoDelete = async (req, res) => {
    const id = req.params.id;
    const deletee = req.body
    try {
        const deleteTodoo = await todoModel.findOneAndDelete({ _id: id, userId: req.userId }, deletee);
        res.status(200).send(deleteTodoo)
    }
    catch (e) {
        console.log(e);
        res.status(400).json({
            success: false,
            message: "Todo not found or unauthorized to delete"
        });
    }
};
