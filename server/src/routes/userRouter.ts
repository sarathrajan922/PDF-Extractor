import express from 'express';
import userController from '../controller/userController'

const userRouter = express.Router();
const controller = userController();

userRouter.get('/test', ()=>{
    console.log('api hit userRouter..')
});


export default userRouter;