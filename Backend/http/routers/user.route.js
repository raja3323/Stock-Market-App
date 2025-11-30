import express from "express";
import { requireAuth } from "../middlewares/requireAuth";
const router = express.Router();


router.get('/', requireAuth, home)


export default router;