import express from 'express'
import OrderController from '../Controller/OrderController.js'
const orderRoute=express.Router()
const orderInstance=new OrderController()

orderRoute.post('/',orderInstance.post)
orderRoute.get('/',orderInstance.get)

export default orderRoute