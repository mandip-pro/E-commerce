import express from 'express'
import AuthController from '../Controller/AuthController.js'
const authRoute=express.Router()
const authInstance=new AuthController()

authRoute.post('/login',authInstance.login)
authRoute.get('/logout',authInstance.logout)

export default authRoute