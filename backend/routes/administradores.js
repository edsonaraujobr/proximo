import express from "express";
import { getAdministradores } from "../controllers/administrador.js";

const router = express.Router()

router.post("/login", getAdministradores)

export default router