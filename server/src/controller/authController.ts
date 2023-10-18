import { Request, Response } from "express";
import { HttpStatus } from "../types/httpStatus";
import asyncHandler from "express-async-handler";

import authHelper from "../helper/authHelper";

const authentication = authHelper();

const authControl = () => {
  const userSignup = asyncHandler(async (req: Request, res: Response) => {
    const result = await authentication.userRegister(req.body);

    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      userToken: result,
    });
  });

  return {
    userSignup,
  };
};

export default authControl;
