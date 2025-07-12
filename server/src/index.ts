import express from "express"
import cors from "cors"
const app = express();
import allRoutes from "./routes/routes"
import connectDB from "./config/db";
import cookieParser from 'cookie-parser'

app.use(express.json());
app.use(cors())
app.use(cookieParser());
app.use('/api',allRoutes)
connectDB();
app.listen(5000,()=>{
    console.log("server is started")
})