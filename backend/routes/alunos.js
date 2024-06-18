import express from "express";
import { getAlunos } from "../controllers/aluno.js";

const router = express.Router()

router.post("/aluno", getAlunos)

export default router