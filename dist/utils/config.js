"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const API_KEY = process.env.POLYGON_API;
const config = {
    MONGODB_URI,
    PORT,
    API_KEY
};
exports.default = config;
