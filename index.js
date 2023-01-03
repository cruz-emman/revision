import express from "express";
import mongoose from 'mongoose'
import cors from 'cors'
import authRouter from './route/auth.js'
import userRouter from './route/user.js'
import productRouter from './route/product.js'
import cartRouter from './route/cart.js'
import orderRouter from './route/order.js'
const PORT = process.env.PORT || 5000

const app = express()
mongoose.set("strictQuery", false);

const dbConnect = async () =>{
    try {
        await mongoose.connect("mongodb+srv://admin:admin@tua.nqbq2xi.mongodb.net/Ecommerce?retryWrites=true&w=majority")
        console.log("Database is connected to MongoDB")

    } catch (error) {
        throw error
    }
}

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)




app.listen(PORT, () =>{
    dbConnect()
    console.log(`Connected to Backend on PORT: http://localhost:${PORT}`)
})