import express from "express";
import { getAtendentes } from "../controllers/atendente.js";

const router = express.Router()

router.post("/atendente", getAtendentes)

export default router