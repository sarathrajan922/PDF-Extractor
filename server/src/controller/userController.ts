import {Request ,Response} from 'express';
import { HttpStatus } from '../types/httpStatus';
import asyncHandler from 'express-async-handler';
import userHelper from '../helper/userHelper';
import { CustomRequest } from '../types/customRequest';


const helper = userHelper();
const userController = ()=>{
  const uploadPDF = asyncHandler(async (req:CustomRequest,res:Response)=>{
    const userId = req.payload?.email;
    console.log(userId)
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
            // res.setHeader('Content-Type', result.pdf.contentType);
            res.setHeader('Content-Disposition', `inline; filename="${result.name}"`);
            res.status(HttpStatus.OK).send({
                status:HttpStatus.OK,
                message:'pdf fetch successfully',
                data: result.data// this is pdf

            });
        }

    }
  });

  const getPages = asyncHandler(async(req:Request,res:Response)=>{
    const { userId, pdfId } = req.params;
    const { pages } = req.query;
    const result = await helper.getPages(userId,pdfId,pages);
    if(result){
        if(result === 'User not found' || result === 'PDF not found'){
            res.status(HttpStatus.NOT_FOUND).send({
                status:HttpStatus.NOT_FOUND,
                message: result
            });
        }else{
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `inline; filename="${result.name}"`);
            res.status(HttpStatus.OK).send(result.pdfBytes);
        }

    }
  })

  return {
    uploadPDF,
    getPdf,
    getPages
  }
}

export default userController;