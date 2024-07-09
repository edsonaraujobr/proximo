import express from "express";
import { getClerks, registerClerk } from "../controllers/clerk.js";
import { sendRecoveryCode} from '../controllers/clerk.js';
import { verifyRecoveryCode } from "../controllers/clerk.js";
import { updatePassword } from "../controllers/clerk.js";
import { updatePasswordId } from "../controllers/clerk.js";
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

router.post("/atendente", getClerks)
router.post("/registrar-atendente/atendente", upload.single('photoClerk'), registerClerk)
router.post('/send-recovery-code/atendente', sendRecoveryCode);
router.post('/verify-recovery-code/atendente', verifyRecoveryCode);
router.post('/update-password/atendente', updatePassword);
router.post('/update-password-id/atendente', updatePasswordId);


export default router