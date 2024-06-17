import express from "express";
import { getAdministradores } from "../controllers/administrador.js";

const router = express.Router()

router.post("/administrador", getAdministradores)

export default router