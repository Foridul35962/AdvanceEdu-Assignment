import express from 'express'
import * as productController from '../controller/product.controller.js'
import verifyJWT from '../middleware/VerifyJWT.js'
import upload from '../middleware/upload.js'
import checkAdmin from '../middleware/checkAdmin.js'

const product = express.Router()

product.get('/all-product', verifyJWT, checkAdmin, productController.getAllProduct)
product.post('/add-product', verifyJWT, checkAdmin, upload, productController.addProduct)
product.get('/id/:_id', productController.getProductById)


export default product