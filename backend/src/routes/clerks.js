import express from "express";
import { login, registerClerk, getAllClerks, updateClerk, removeClerk, sendRecoveryCode, verifyRecoveryCode, updatePassword} from "../controllers/clerk.js";
import multer from "multer"
import path from "path";
import {  authenticateJWT, authorizeAdmistrator } from "../middlewares/authMiddleware.js";

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

router.post("/clerk/login", login)

router.get("/clerk/list", authenticateJWT, authorizeAdmistrator, getAllClerks)
router.put("/clerk/update/:id", authenticateJWT, authorizeAdmistrator, updateClerk)
router.delete("/clerk/delete/:id", authenticateJWT, authorizeAdmistrator, removeClerk)
router.post("/clerk/create", authenticateJWT, authorizeAdmistrator, upload.single('photoClerk'), registerClerk)

router.post('/clerk/send-recovery-code',  sendRecoveryCode);
router.post('/clerk/verify-recovery-code',  verifyRecoveryCode);
router.post('/clerk/update-password', updatePassword);


export default router