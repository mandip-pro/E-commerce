import express from "express"
import AdminController from "../Controller/AdminController.js"

const adminRoute=express.Router()
const adminInstance=new AdminController()

adminRoute.post('/',adminInstance.post)
adminRoute.post('/login',adminInstance.login)
adminRoute.get('/logout',adminInstance.logout)



export default adminRoute