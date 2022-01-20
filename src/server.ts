import "reflect-metadata";
import {createConnection} from "typeorm";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from 'cors'

dotenv.config()

import authRoutes from "./routes/auth"
import productRoutes from "./routes/products"

import trim from "./middleware/trim"

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))
app.use(trim)
app.use(cookieParser())

app.get("/", (req, res) => res.send("Hello World!"))
app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)

app.listen(PORT, async () => {
    console.log(`Server running at https://localhost:${PORT}`)

    try{
        await createConnection()
        console.log("Database Connected !!")
    }catch(e){
        console.log(e)
    }
})
