import express from "express";
import { login, sendRecoveryCode, verifyRecoveryCode, updatePassword  } from "../controllers/administrator.js";

const router = express.Router()

router.post('/administrator/login', login)

router.post('/administrator/send-recovery-code',sendRecoveryCode);
router.post('/administrator/verify-recovery-code', verifyRecoveryCode);
router.post('/administrator/update-password', updatePassword);

export default router