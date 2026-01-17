import express from 'express'
import * as productController from '../controllers/product.controller.js'
import verifyJWT from '../middlewares/VerifyJWT.js'
import upload from '../middlewares/upload.js'

const product = express.Router()

product.get('/all-product', verifyJWT, checkAdmin, productController.getAllProduct)
product.post('/add-product', verifyJWT, checkAdmin, upload, productController.addProduct)
product.get('/id/:_id', productController.getProductById)


export default product