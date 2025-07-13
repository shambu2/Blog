"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
// import { requireAuth } from "../middlewares/authMiddleware";
// import { requireAuth } from "../middlewares/authMiddleware";
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.json("hello from users auth");
});
router.post('/register', auth_1.registerPost);
router.post('/verify', auth_1.verifyPost);
router.post('/login', auth_1.loginPost);
router.get('/me', auth_1.meGet);
router.post('/logout', auth_1.logoutPost);
exports.default = router;
