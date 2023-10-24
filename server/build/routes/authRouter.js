"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Import the 'authControl' module which likely contains controller logic for authentication.
const authController_1 = __importDefault(require("../controller/authController"));
// Create an instance of an Express router for authentication routes.
const authRouter = express_1.default.Router();
// Create an instance of the 'authControl' controller.
const controller = (0, authController_1.default)();
// Define a route for user registration, mapped to the 'userSignup' function in the controller.
authRouter.post("/register", controller.userSignup);
exports.default = authRouter;
