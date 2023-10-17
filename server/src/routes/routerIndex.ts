import { Application } from "express";

// Import the routers for authentication and user-related routes.
import authRouter from "./authRouter";
import userRouter from "./userRouter";

const router = (app: Application) => {
  // Mount the 'authRouter' middleware for requests to '/api/auth' routes.
  app.use("/api/auth", authRouter);

  // Mount the 'userRouter' middleware for requests to '/api/user' routes.
  app.use("/api/user", userRouter);
};

// Export the 'router' function to be used in other parts of the application.
export default router;
