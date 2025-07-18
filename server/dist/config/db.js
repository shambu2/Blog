"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDB = async () => {
    try {
        const conn = await mongoose_1.default.connect(process.env.DB_URL);
        console.log(`mongodb connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.log("error while connecting to db");
        process.exit(1);
    }
};
exports.default = connectDB;
