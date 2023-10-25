"use strict";
/**
 * @description authRouter
 * This module defines routes related to user registration
 *
 * @imports
 * Import the 'authControl' module which likely contains controller logic for authentication.
 *
 * @instance
 * crate an instance of an Express router for authentication routes (authRouter).
 * create an instance of the 'authControl' controller (controller)
 *
 * @exports
 * Exports the authRouter module
 *
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controller/authController"));
const authRouter = express_1.default.Router();
const controller = (0, authController_1.default)();
// Define a route for user registration, mapped to the 'userSignup' function in the controller.
authRouter.post("/register", controller.userSignup);
exports.default = authRouter;
