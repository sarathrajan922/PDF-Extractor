import express, { Application } from "express";
import http from "http";
import morgan from "morgan";
import cors from "cors";
import errorHandleMiddleware from "./middleware/errorHandleMiddleware";
import ConfigKeys from "./common/config";
import router from "./routes/routerIndex";
import connectDB from "./database/connection";

// Create an Express application instance.
const app: Application = express();

// Set up middleware for our Express app:
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Create an HTTP server that will use our Express app as its handler.
const sever = http.createServer(app);

// Define the port where our server will listen for incoming requests.
const PORT = ConfigKeys.PORT; // We use the 'PORT' value defined in our project's configuration.

// Start the server and listen on the specified port.
sever.listen(PORT, () => {
  console.log(`Server listening at PORT: ${PORT}`);
});

// Set up the routes for our Express app using the 'router' function.
router(app);

// Establish a database connection using the 'connectDB' function.
connectDB();

// Use our custom error handling middleware to handle errors in our application.
app.use(errorHandleMiddleware);
