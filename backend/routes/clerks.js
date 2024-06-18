import express from "express";
import { getClerks } from "../controllers/clerk.js";

const router = express.Router()

router.post("/atendente", getClerks)

export default router