import {Request, Response} from 'express';
import { HttpStatus } from '../types/httpStatus';
import asyncHandler from "express-async-handler";

// import authHelper from "../helper/authHelper";

// const authentication = authHelper();

const authControl = ()=>{
   const userSignup = asyncHandler(async (req:Request,res:Response)=>{
    console.log(req.url)
    console.log('api hit authController')
    res.status(HttpStatus.OK).send({
     status: HttpStatus.OK,
     userToken: 'hfkhw8ihewfwsdfwhsiofhwisfh',
   });
   });

   return {
    userSignup
   }
}

export default authControl;