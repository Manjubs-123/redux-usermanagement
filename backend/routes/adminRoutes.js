import express from "express"

import { adminLogin,getUsers,createUser,updateUser,deleteUser } from "../controllers/adminController.js"
import adminProtect from "../middleware/adminMiddleware.js"

const router = express.Router()

router.post("/login",adminLogin)
router.get('/users',adminProtect,getUsers)
router.post("/user",adminProtect,createUser)
router.put("/user/:id",adminProtect,updateUser)
router.delete("/user/:id",adminProtect,deleteUser)

export default router
