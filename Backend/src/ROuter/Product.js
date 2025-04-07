import express from 'express'
import ProductController from "../Controller/ProductController.js"
import ImageUploadMiddlewere from '../Middlewere/ImageUploadMiddlewere.js'
import RouteMiddlewere from '../Middlewere/RouteMiddlewere.js'
import AdminMiddlewere from '../Middlewere/AdminMiddlewere.js'
const productRoute=express.Router()
const productInstance=new ProductController()
const imageInstance=new ImageUploadMiddlewere();

const uploadImage=imageInstance.upload('products')

productRoute.get('/',productInstance.get)
productRoute.get('/:id',productInstance.getOneProduct)
productRoute.post('/',AdminMiddlewere.check,uploadImage.single('image'),productInstance.post)
productRoute.put('/:id', AdminMiddlewere.check,uploadImage.single('image'),productInstance.put)
productRoute.delete('/:id', AdminMiddlewere.check,productInstance.delete)

productRoute.get('/buy/:id',RouteMiddlewere.check,productInstance.buy)

export default productRoute