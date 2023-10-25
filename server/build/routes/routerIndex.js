"use strict";
/**
 * @description router index
 * This module defines the different types of routes
 * @import
 * import Application type from express
 * import the router for authentication (authRouter)
 * import the router for user-related routes (userRouter)
 *
 * @exports
 * Export the router function to be used in other parts of the application
 *
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authRouter_1 = __importDefault(require("./authRouter"));
const userRouter_1 = __importDefault(require("./userRouter"));
const router = (app) => {
    // Mount the 'authRouter' middleware for requests to '/api/auth' routes.
    app.use("/api/auth", authRouter_1.default);
    // Mount the 'userRouter' middleware for requests to '/api/user' routes.
    app.use("/api/user", userRouter_1.default);
};
exports.default = router;
