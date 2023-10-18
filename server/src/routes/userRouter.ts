import express from 'express';
import userController from '../controller/userController'
import upload from '../middleware/multer';
const userRouter = express.Router();
const controller = userController();

userRouter.post('/upload-pdf',upload.single('pdf'),controller.uploadPDF);


export default userRouter;