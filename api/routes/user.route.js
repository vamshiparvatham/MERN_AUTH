import express from 'express';
import { test } from '../controllers/user.controller.js';
import { verifytoken } from '../utils/Verifytoken.js';
import { updateUser } from '../controllers/user.controller.js';
import { deleteUser } from '../controllers/user.controller.js';
const router = express.Router();

router.get('/',test);
router.post("/update/:id", verifytoken, updateUser);
router.delete("/delete/:id", verifytoken, deleteUser);

export default router;