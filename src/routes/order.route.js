import express from 'express'
import verifyJWT from '../middleware/VerifyJWT.js'
import { createOrder, getMyOrders } from '../controller/order.controller.js'
import { checkoutOrder } from '../controller/checkout.controller.js'

const orderRouter = express.Router()

orderRouter.get('/', verifyJWT, getMyOrders)
orderRouter.post('/create-order', verifyJWT, createOrder)
orderRouter.post('/checkout', verifyJWT, checkoutOrder)

export default orderRouter