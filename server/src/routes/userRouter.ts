import express from 'express';
import userController from '../controller/userController'
import upload from '../middleware/multer';
const userRouter = express.Router();
const controller = userController();

userRouter.post('/upload-pdf',upload.single('pdf'),controller.uploadPDF);
userRouter.get('/get-pdf/:userId/:pdfId',controller.getPdf);
userRouter.get('/get-pages/:userId/:pdfId',controller.getPages);


export default userRouter;