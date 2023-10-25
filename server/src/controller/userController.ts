/**
 * @description userController
 *
 *
 * @imports
 * import Response types from express
 * import HttpStatus from types folder
 * import asyncHandler for handling the request,response errors
 * import userHelper module
 * import customRequest type
 *
 * @instance
 * create an instance of the user Helper (helper)
 *
 *@exports
 Exports userController module
 *
 *
 */

import { Response } from "express";
import { HttpStatus } from "../types/httpStatus";
import asyncHandler from "express-async-handler";
import userHelper from "../helper/userHelper";
import { CustomRequest } from "../types/customRequest";

const helper = userHelper();
const userController = () => {
  // Define a function for uploading a PDF.
  const uploadPDF = asyncHandler(async (req: CustomRequest, res: Response) => {
    // Get the user ID from the request payload or set it as an empty string.
    const userId = req.payload?.id ?? "";
    // Upload the PDF using the user helper.
    const result = await helper.uploadPdf(req.file, userId);
    if (result) {
      // If the upload is successful, send a success response with the PDF ID.
      res.status(HttpStatus.OK).send({
        status: HttpStatus.OK,
        message: "pdf successfully uploaded",
        pdfId: result,
      });
    }
  });

  // Define a function for getting a PDF.
  const getPdf = asyncHandler(async (req: CustomRequest, res: Response) => {
    // Get the user ID from the request payload or set it as an empty string.
    const userId = req.payload?.id ?? "";
    const { pdfId } = req.params;
    // Get the PDF using the user helper.
    const result = await helper.getPDF(userId, pdfId);
    if (result) {
      if (result === "User not found" || result === "PDF not found") {
        // If the user or PDF is not found, send a not found response.
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
          data: result.data, // this is the PDF content
        });
      }
    }
  });

  // Define a function for getting  a PDF with the specified pages
  const getPages = asyncHandler(async (req: CustomRequest, res: Response) => {
    const userId = req.payload?.id ?? "";
    const { pdfId } = req.params;
    const { pages } = req.query;
    // Get the PDF using the user helper.
    const result = await helper.getPages(userId, pdfId, pages);
    if (result) {
      if (result === "User not found" || result === "PDF not found") {
        // If the user or PDF is not found, send a not found response.
        res.status(HttpStatus.NOT_FOUND).send({
          status: HttpStatus.NOT_FOUND,
          message: result,
        });
      } else {
        // Set response headers and send the PDF page data.
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
