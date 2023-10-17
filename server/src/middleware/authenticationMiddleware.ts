import {Response, NextFunction } from "express";
import { HttpStatus } from "../types/httpStatus";
import AppError from "../utils/appError";
import jwtAuthentication from "./jwt";
import { CustomRequest } from "../types/customRequest";

const jwtTokens = jwtAuthentication();

const authenticationMiddleware = (
  req: CustomRequest,
  _res: Response,
  next: NextFunction
) => {
  let token: string | null = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    throw new AppError("Token not fount", HttpStatus.UNAUTHORIZED);
  }

  try {
    const payload: any = jwtTokens.verifyToken(token);
    req.payload = payload;
    next();
  } catch (error) {
    throw new AppError("unAuthorized user", HttpStatus.UNAUTHORIZED);
  }
};
export default authenticationMiddleware;