import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL as string);
        console.log(`mongodb connected: ${conn.connection.host}`)
    } catch (error) {
        console.log("error while connecting to db")
        process.exit(1);
    }
};

export default connectDB;