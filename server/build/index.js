"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const errorHandleMiddleware_1 = __importDefault(require("./middleware/errorHandleMiddleware"));
const config_1 = __importDefault(require("./common/config"));
const routerIndex_1 = __importDefault(require("./routes/routerIndex"));
const connection_1 = __importDefault(require("./database/connection"));
// Create an Express application instance.
const app = (0, express_1.default)();
// Set up middleware for our Express app:
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
// Create an HTTP server that will use our Express app as its handler.
const sever = http_1.default.createServer(app);
// Define the port where our server will listen for incoming requests.
const PORT = config_1.default.PORT; // We use the 'PORT' value defined in our project's configuration.
// Start the server and listen on the specified port.
sever.listen(PORT, () => {
    console.log(`Server listening at PORT: ${PORT}`);
});
// Set up the routes for our Express app using the 'router' function.
(0, routerIndex_1.default)(app);
// Establish a database connection using the 'connectDB' function.
(0, connection_1.default)();
// Use our custom error handling middleware to handle errors in our application.
app.use(errorHandleMiddleware_1.default);
