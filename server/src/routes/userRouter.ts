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



import express from 'express';
import userController from '../controller/userController'
import upload from '../middleware/multer';
import authenticationMiddleware from '../middleware/authenticationMiddleware'; 
const userRouter = express.Router();
const controller = userController();


// Route for uploading a PDF (Requires authentication)
userRouter.post('/upload-pdf',authenticationMiddleware,upload.single('pdf'),controller.uploadPDF);
// Route for getting a specific PDF by PDF ID (Requires authentication)
userRouter.get('/get-pdf/:pdfId',authenticationMiddleware,controller.getPdf);
// Route for getting the pages of a specific PDF by PDF ID (Requires authentication)
userRouter.get('/get-pages/:pdfId',authenticationMiddleware,controller.getPages);


export default userRouter;