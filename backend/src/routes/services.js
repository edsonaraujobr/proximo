import express from "express";
import { createService, getServices, getReport } from "../controllers/service.js";

const router = express.Router()

router.post("/atendimento", createService)
router.post("/getAtendimentos", getServices)
router.post("/getRelatorios", getReport)

export default router