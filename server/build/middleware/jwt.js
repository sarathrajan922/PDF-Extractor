"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../common/config"));
const jwtAuthentication = () => {
    const generateToken = (payload) => {
        const token = jsonwebtoken_1.default.sign(payload, config_1.default.JWT_SECRET, { expiresIn: "3d" });
        return token;
    };
    const verifyToken = (token) => {
        return jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
    };
    return {
        generateToken,
        verifyToken,
    };
};
exports.default = jwtAuthentication;
