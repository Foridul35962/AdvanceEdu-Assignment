import express from 'express'
import cors from 'cors'
import cookies from 'cookie-parser'
import errorHandler from './utils/errorHandler.js'
import authRouter from './routes/auth.route.js'
import productRouter from './routes/product.route.js'
import orderRouter from './routes/order.route.js'
import webhooksRouter from './routes/webhook.router.js'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(cookies())

//routers
app.use('/api/auth', authRouter)
app.use('/api/product', productRouter)
app.use('/api/order', orderRouter)
app.use("/api/webhook", webhooksRouter)

app.get('/', (req, res)=>{
    res.send('advance edu server is running...')
})


//Global error handler
app.use(errorHandler)

export default app