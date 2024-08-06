import express from "express";
import { createTodo, getTodo, putTodo, todoDelete, updateTodo, getTodoById } from "../controller/todoFunction.js";
import checkAutherization from "../middleWear/checkAutheraization.js";

const router = express.Router();

// create todo

router.post("/create", checkAutherization, createTodo);
router.get("/getTodo", checkAutherization, getTodo);
router.patch("/updateTodo/:id", checkAutherization, updateTodo);
router.put("/editTodo/:id", checkAutherization, putTodo);
router.delete("/deleteTodo/:id", checkAutherization, todoDelete);
router.get("/getTodoById/:id", checkAutherization, getTodoById);

export default router;