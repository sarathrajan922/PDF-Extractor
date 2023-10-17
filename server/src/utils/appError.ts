import { HttpStatus } from "../types/httpStatus";

class AppError extends Error{
    statusCode: number;
    status: string;
    isoperational: boolean | undefined;
    constructor(message:string,statuscode: HttpStatus){
        super(message);
        this.statusCode = statuscode;
        this.status= `${statuscode}`.startsWith('4') ? 'fail' : 'error';
        Error.captureStackTrace(this, this.constructor)
    }
}



export default AppError;