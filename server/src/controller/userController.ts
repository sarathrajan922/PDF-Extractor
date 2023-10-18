import {Request ,Response} from 'express';
import { HttpStatus } from '../types/httpStatus';
import asyncHandler from 'express-async-handler';

const userController = ()=>{
  const uploadPDF = asyncHandler(async (req:Request,res:Response)=>{
      console.log(req.file)
      return 
  });

  return {
    uploadPDF
  }
}

export default userController;