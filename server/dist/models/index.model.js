"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String
    },
    verified: {
        type: Boolean
    }
}, { timestamps: true });
exports.User = mongoose_1.default.model("User", userSchema);
const postSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    slug: {
        type: String,
        unique: true
    },
    tags: [String]
});
exports.Post = mongoose_1.default.model("Post", postSchema);
