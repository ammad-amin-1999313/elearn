import UserSignUp from "../../controllers/user/user.controller.js"
import express from "express"

const router = express.Router()

// Sign Up 
router.post('/sign-up',UserSignUp)

// Login
// router.post('/login')

export default router