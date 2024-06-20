import express from "express";
import { getStudents, registerStudents } from "../controllers/student.js";

const router = express.Router()

router.post("/aluno", getStudents)
router.post("/registrar-aluno", registerStudents)

export default router