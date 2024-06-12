import express from "express";
import { getAdministradores } from "../controllers/administrador.js";

const router = express.Router()

router.get("/", getAdministradores)

export default router