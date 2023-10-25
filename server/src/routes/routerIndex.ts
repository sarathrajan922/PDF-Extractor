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

import { Application } from "express";

import authRouter from "./authRouter";
import userRouter from "./userRouter";

const router = (app: Application) => {
  // Mount the 'authRouter' middleware for requests to '/api/auth' routes.
  app.use("/api/auth", authRouter);
  // Mount the 'userRouter' middleware for requests to '/api/user' routes.
  app.use("/api/user", userRouter);
};

export default router;
