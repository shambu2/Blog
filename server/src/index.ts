import express from "express"
const app = express();
import allRoutes from "./routes/routes"

app.use('/api',allRoutes)

app.listen(5000,()=>{
    console.log("server is started")
})