import express from "express";
import { getStudent, registerStudents, getAllStudents, updateStudent, removeStudent } from "../controllers/student.js";
import {  authenticateJWT, authorizeAdmistrator, authorizeClerk } from "../middlewares/authMiddleware.js";
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

router.post("/student/search/:registration",authenticateJWT, authorizeClerk, getStudent)

router.post("/student/create", authenticateJWT, authorizeAdmistrator, upload.single('photo'),registerStudents)
router.get("/student/list", authenticateJWT, authorizeAdmistrator, getAllStudents)
router.put("/student/update/:registration", authenticateJWT, authorizeAdmistrator, updateStudent)
router.delete("/student/delete/:registration", authenticateJWT, authorizeAdmistrator, removeStudent)

export default router