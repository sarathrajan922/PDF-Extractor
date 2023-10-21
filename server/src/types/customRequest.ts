import { Request } from "express";

export interface CustomRequest extends Request {
    payload?:{
        email: string,
        role: string,
        id:string
    }
}