import {Request ,Response} from 'express';
import { HttpStatus } from '../types/httpStatus';
import asyncHandler from 'express-async-handler';
import userHelper from '../helper/userHelper';

const helper = userHelper();
const userController = ()=>{
  const uploadPDF = asyncHandler(async (req:Request,res:Response)=>{
    const result = await helper.uploadPdf(req.file)
      if(result){
        res.status(HttpStatus.OK).send({
            status: HttpStatus.OK,
            message: 'pdf successfully uploaded'
          });
      }
  });

  return {
    uploadPDF
  }
}

export default userController;