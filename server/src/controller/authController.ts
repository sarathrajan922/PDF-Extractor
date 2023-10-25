/**
 * @description authControl
 * This module defines the authentication control
 *
 * @imports
 * import Request,Response types from express module
 * import HttpStatus from types folder
 * import asyncHandler for handling the request,response errors
 *
 *
 * @instance
 * create an instance of the authentication helper (authHelper)
 *
 * @exports
 * Exports the authControl
 *
 */

import { Request, Response } from "express";
import { HttpStatus } from "../types/httpStatus";
import asyncHandler from "express-async-handler";

import authHelper from "../helper/authHelper";

const authentication = authHelper();

const authControl = () => {
  // Define a function for user signup.
  const userSignup = asyncHandler(async (req: Request, res: Response) => {
    // Call the userRegister method from the authentication helper to register a user.
    const result = await authentication.userRegister(req.body);
    // Send a response with a status code and user token upon successful registration.
    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      userToken: result,
    });
  });

  // Return the userSignup function to be used in the routes.
  return {
    userSignup,
  };
};

export default authControl;
