import express from "express";
import { getAdministrators } from "../controllers/administrator.js";

const router = express.Router()

router.post("/administrador", getAdministrators)

export default router