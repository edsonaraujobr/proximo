import express from "express";
import { getAdministrators } from "../controllers/administrator.js";
import { sendRecoveryCode} from '../controllers/administrator.js';
import { verifyRecoveryCode } from "../controllers/administrator.js";
import { updatePassword } from "../controllers/administrator.js";
import { updatePasswordId } from "../controllers/administrator.js";

const router = express.Router()

router.post("/administrador", getAdministrators)
router.post('/send-recovery-code/administrador', sendRecoveryCode);
router.post('/verify-recovery-code/administrador', verifyRecoveryCode);
router.post('/update-password/administrador', updatePassword);
router.post('/update-password-id/administrador', updatePasswordId);

export default router