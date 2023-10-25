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

import express from "express";
import authControl from "../controller/authController";

const authRouter = express.Router();
const controller = authControl();

// Define a route for user registration, mapped to the 'userSignup' function in the controller.
authRouter.post("/register", controller.userSignup);

export default authRouter;
