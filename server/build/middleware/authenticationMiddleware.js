"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatus_1 = require("../types/httpStatus");
const appError_1 = __importDefault(require("../utils/appError"));
const jwt_1 = __importDefault(require("./jwt"));
const jwtTokens = (0, jwt_1.default)();
const authenticationMiddleware = (req, _res, next) => {
    let token = "";
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        throw new appError_1.default("Token not fount", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    try {
        const payload = jwtTokens.verifyToken(token);
        req.payload = payload;
        next();
    }
    catch (error) {
        throw new appError_1.default("unAuthorized user", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
};
exports.default = authenticationMiddleware;
