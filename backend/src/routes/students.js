import express from "express";
import { getStudent, registerStudents, getAllStudents, updateStudent, removeStudent } from "../controllers/student.js";
import multer from "multer"
import path from "path";

const router = express.Router()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post("aluno/pesquisar/:registration", getStudent)
router.post("aluno/registrar", upload.single('photo'),registerStudents)
router.get("aluno/listar", getAllStudents)
router.put("aluno/atualizar/:registration", updateStudent)
router.delete("aluno/remover/:registration", removeStudent)

export default router