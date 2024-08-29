import express from "express";
import { createService, getServices, getReport } from "../controllers/service.js";
import {  authenticateJWT, authorizeClerk } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.post("/service/create/:id", authenticateJWT, authorizeClerk, createService)
router.post("/service/list/:id", authenticateJWT, authorizeClerk, getServices)
router.post("/service/reports/:id", authenticateJWT, authorizeClerk, getReport)

export default router