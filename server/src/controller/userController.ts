import { Request, Response } from "express";
import { HttpStatus } from "../types/httpStatus";
import asyncHandler from "express-async-handler";
import userHelper from "../helper/userHelper";
import { CustomRequest } from "../types/customRequest";

const helper = userHelper();
const userController = () => {
  const uploadPDF = asyncHandler(async (req: CustomRequest, res: Response) => {
    const userId = req.payload?.id ?? "";
    const result = await helper.uploadPdf(req.file, userId);
    if (result) {
      res.status(HttpStatus.OK).send({
        status: HttpStatus.OK,
        message: "pdf successfully uploaded",
        pdfId: result,
      });
    }
  });

  const getPdf = asyncHandler(async (req: CustomRequest, res: Response) => {
    const userId = req.payload?.id ?? "";
    const { pdfId } = req.params;
    const result = await helper.getPDF(userId, pdfId);
    if (result) {
      if (result === "User not found" || result === "PDF not found") {
        res.status(HttpStatus.NOT_FOUND).send({
          status: HttpStatus.NOT_FOUND,
          message: result,
        });
      } else {
        // res.setHeader('Content-Type', result.pdf.contentType);
        res.setHeader(
          "Content-Disposition",
          `inline; filename="${result.name}"`
        );
        res.status(HttpStatus.OK).send({
          status: HttpStatus.OK,
          message: "pdf fetch successfully",
          data: result.data, // this is pdf
        });
      }
    }
  });

  const getPages = asyncHandler(async (req: CustomRequest, res: Response) => {
    const userId = req.payload?.id ?? "";
    const { pdfId } = req.params;
    const { pages } = req.query;

    const result = await helper.getPages(userId, pdfId, pages);
    if (result) {
      if (result === "User not found" || result === "PDF not found") {
        res.status(HttpStatus.NOT_FOUND).send({
          status: HttpStatus.NOT_FOUND,
          message: result,
        });
      } else {
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
          "Content-Disposition",
          `inline; filename="${result.name}"`
        );
        res.status(HttpStatus.OK).send({
          data: result.pdfBytes,
        });
      }
    }
  });

  return {
    uploadPDF,
    getPdf,
    getPages,
  };
};

export default userController;
