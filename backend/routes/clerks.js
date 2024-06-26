import express from "express";
import { getClerks, registerClerk } from "../controllers/clerk.js";
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
router.post("/registrar-atendente", upload.single('photoClerk'), registerClerk)

export default router