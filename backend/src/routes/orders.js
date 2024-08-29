import express from "express";
import { createOrder } from "../controllers/order.js";
import {  authenticateJWT, authorizeClerk } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.post("/order/create",authenticateJWT, authorizeClerk, createOrder)

export default router