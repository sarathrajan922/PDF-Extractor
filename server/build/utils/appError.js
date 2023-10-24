"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// class AppError extends Error{
//     statusCode: number;
//     status: string;
//     isoperational: boolean | undefined;
//     constructor(message:string,statuscode: HttpStatus){
//         super(message);
//         this.statusCode = statuscode;
//         this.status= `${statuscode}`.startsWith('4') ? 'fail' : 'error';
//         Error.captureStackTrace(this, this.constructor)
//     }
// }
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        Error.captureStackTrace(this, this.constructor);
        this.isOperational = true; // You may want to set this property based on certain conditions.
    }
}
exports.default = AppError;
