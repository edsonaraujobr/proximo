import express from "express";
import { login, sendRecoveryCode, verifyRecoveryCode, updatePassword, updatePasswordId  } from "../controllers/administrator.js";

const router = express.Router()

router.post("/administrador", login)
router.post('/send-recovery-code/administrador', sendRecoveryCode);
router.post('/verify-recovery-code/administrador', verifyRecoveryCode);
router.post('/update-password/administrador', updatePassword);
router.post('/update-password-id/administrador', updatePasswordId);

export default router