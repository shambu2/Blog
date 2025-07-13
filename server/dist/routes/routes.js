"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const users_1 = __importDefault(require("./users"));
const posts_1 = __importDefault(require("./posts"));
const auth_1 = __importDefault(require("./auth"));
router.use('/v1/user', users_1.default);
router.use('/v1/post', posts_1.default);
router.use('/v1/auth', auth_1.default);
exports.default = router;
