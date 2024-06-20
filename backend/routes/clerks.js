import express from "express";
import { getClerks, registerClerk } from "../controllers/clerk.js";

const router = express.Router()

router.post("/atendente", getClerks)
router.post("/registrar-atendente", registerClerk)

export default router