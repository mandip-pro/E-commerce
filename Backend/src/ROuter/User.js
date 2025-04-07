import express from "express"
import UserConttroller from "../Controller/UserConttroller.js"
import RouteMiddlewere from "../Middlewere/RouteMiddlewere.js"
import AdminMiddlewere from '../Middlewere/AdminMiddlewere.js'

const userRoute=express.Router()
const userInstance=new UserConttroller()

userRoute.get('/',AdminMiddlewere.check,userInstance.get)
userRoute.post('/',userInstance.post)
userRoute.put('/:id',userInstance.put)
userRoute.delete('/:id',userInstance.delete)

userRoute.get('/purchase',RouteMiddlewere.check,userInstance.purchase)
userRoute.delete('/purchase/:id',RouteMiddlewere.check,userInstance.removePurchase)
userRoute.post('/purchase',RouteMiddlewere.check,userInstance.charge)

export default userRoute