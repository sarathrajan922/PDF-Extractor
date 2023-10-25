"use strict";
/**
 * @description User Routes
 * This module defines routes related to user actions like uploading PDFs, getting PDFs, and getting pages.
 *
 * @imports
 * Import the user controller
 * Import the multer middleware for file uploads
 * Import authentication middleware
 *
 * @instance
 * Create an instance of the Express Router
 * Create an instance of the user controller
 *
 * @exports
 * Export the userRouter
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controller/userController"));
const multer_1 = __importDefault(require("../middleware/multer"));
const authenticationMiddleware_1 = __importDefault(require("../middleware/authenticationMiddleware"));
const userRouter = express_1.default.Router();
const controller = (0, userController_1.default)();
// Route for uploading a PDF (Requires authentication)
userRouter.post('/upload-pdf', authenticationMiddleware_1.default, multer_1.default.single('pdf'), controller.uploadPDF);
// Route for getting a specific PDF by PDF ID (Requires authentication)
userRouter.get('/get-pdf/:pdfId', authenticationMiddleware_1.default, controller.getPdf);
// Route for getting the pages of a specific PDF by PDF ID (Requires authentication)
userRouter.get('/get-pages/:pdfId', authenticationMiddleware_1.default, controller.getPages);
exports.default = userRouter;
