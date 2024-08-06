import express from 'express';

import {
     deleteAll,
     deleteById,
     getReq,
     updateById,
     userFunction,
     getAllUsers,
     forgotPassword
} from '../controller/userFunction.js';

import { checkAdminAutherization } from '../middleWear/checkAutheraization.js';
import { deleteUser } from '../controller/adminFunction.js';
import checkAutherization from '../middleWear/checkAutheraization.js';


// Creating routes to each function using router function

const router = express.Router();

router.post("/create", userFunction);
router.get("/getAll", getAllUsers);
router.get("/getUserById", checkAutherization, getReq);
router.delete("/deleteById", checkAutherization, deleteById);
router.patch("/updateById", checkAutherization, updateById);
router.put("/putById", checkAutherization, updateById);
router.delete("/deleteAll", deleteAll);
// forgot password 
router.post("/forgot", forgotPassword);
// delete user as admin
router.delete("/deleteUser/:id",checkAdminAutherization,deleteUser)
export default router;