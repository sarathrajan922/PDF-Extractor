"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the routers for authentication and user-related routes.
const authRouter_1 = __importDefault(require("./authRouter"));
const userRouter_1 = __importDefault(require("./userRouter"));
const router = (app) => {
    // Mount the 'authRouter' middleware for requests to '/api/auth' routes.
    app.use("/api/auth", authRouter_1.default);
    // Mount the 'userRouter' middleware for requests to '/api/user' routes.
    app.use("/api/user", userRouter_1.default);
};
// Export the 'router' function to be used in other parts of the application.
exports.default = router;
