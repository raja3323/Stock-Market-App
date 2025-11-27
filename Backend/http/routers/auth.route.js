import express from "express";
import { getMe, login, Signup } from "../controllers/auth.controller.js";
import { requireAuth } from "../middlewares/requireAuth.js";
const router = express.Router();


router.post('/signup', Signup);
router.post('/login', login);
router.get('/me', requireAuth, getMe);


export default router;