import express from "express";
import { loginUser, registerUser,getUserProfile, uploadImage,updateUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get('/profile',protect,getUserProfile)
router.post('/upload-image',protect,upload.single('image'),uploadImage)
router.put("/profile", protect, updateUserProfile);

export default router;
