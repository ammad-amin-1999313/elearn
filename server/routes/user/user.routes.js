import { googleLogin, userLogin, userSignUp } from "../../controllers/user/user.controller.js"
import express from "express"

const router = express.Router()

// Sign Up 
router.post('/sign-up',userSignUp)

// Login
router.post('/login',userLogin)

// Google Login
router.post('/google-login',googleLogin)

export default router