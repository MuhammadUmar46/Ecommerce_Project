import express from "express"
import dotenv from "dotenv"
import morgan from "morgan";
import dbConnection from "./database/connection.js"
import authRoutes from "./routes/authRoute.js" 
import categoryRoute from './routes/categoryRoute.js'
import productRoutes from './routes/productRoutes.js'
import cors from "cors"

dotenv.config();

dbConnection();


const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


//Routes
app.use("/auth", authRoutes)
app.use('/category', categoryRoute)
app.use('/product', productRoutes)




app.get("/", (req,res) => {
    res.send("<h1>Welcome to Ecommerce App</h1>")
})

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})