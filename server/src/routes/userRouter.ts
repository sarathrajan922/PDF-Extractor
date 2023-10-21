import express from 'express';
import userController from '../controller/userController'
import upload from '../middleware/multer';
import authenticationMiddleware from '../middleware/authenticationMiddleware';
const userRouter = express.Router();
const controller = userController();

userRouter.post('/upload-pdf',authenticationMiddleware,upload.single('pdf'),controller.uploadPDF);
userRouter.get('/get-pdf/:pdfId',authenticationMiddleware,controller.getPdf);
userRouter.get('/get-pages/:pdfId',authenticationMiddleware,controller.getPages);


export default userRouter;