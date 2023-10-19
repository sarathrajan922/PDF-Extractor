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

  const getPdf = asyncHandler(async(req:Request,res:Response)=>{
    const { userId, pdfId } = req.params;
    const result = await helper.getPDF(userId,pdfId);
    if(result){
        if(result === 'User not found' || result === 'PDF not found'){
            res.status(HttpStatus.NOT_FOUND).send({
                status:HttpStatus.NOT_FOUND,
                message: result
            });
        }else{
            // res.setHeader('Content-Type', result.contentType);
            // res.setHeader('Content-Disposition', `inline; filename="${result.name}"`);
            res.status(HttpStatus.OK).send({
                status:HttpStatus.OK,
                message:'pdf fetch successfully',
                data: result
            });
        }
        
    }
  });

  return {
    uploadPDF,
    getPdf
  }
}

export default userController;