import express from "express";

// Import the 'authControl' module which likely contains controller logic for authentication.
import authControl from "../controller/authController";

// Create an instance of an Express router for authentication routes.
const authRouter = express.Router();

// Create an instance of the 'authControl' controller.
const controller = authControl();

// Define a route for user registration, mapped to the 'userSignup' function in the controller.
authRouter.post("/register", controller.userSignup);

export default authRouter;
