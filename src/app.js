import express from 'express'
import cors from 'cors'
import cookies from 'cookie-parser'
import errorHandler from './utils/errorHandler.js'
import authRouter from './routes/auth.route.js'

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

app.get('/', (req, res)=>{
    res.send('advance edu server is running...')
})


//Global error handler
app.use(errorHandler)

export default app