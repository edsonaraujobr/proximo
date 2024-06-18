import express from "express";
import { getStudents } from "../controllers/student.js";

const router = express.Router()

router.post("/aluno", getStudents)

export default router