import express from 'express'
import * as authController from '../controller/auth.controller.js'
import verifyJWT from '../middleware/VerifyJWT.js'

const authRouter = express.Router()

authRouter.post('/register', authController.register)
authRouter.post('/register-verify-email', authController.verifyEmail)
authRouter.post('/login', authController.login)
authRouter.get('/profile', verifyJWT, authController.profile)
authRouter.post('/forget-pass', authController.forgetPassword)
authRouter.post('/forget-pass-verify', authController.verifyPassOtp)
authRouter.patch('/reset-pass', authController.resetPassword)

export default authRouter
