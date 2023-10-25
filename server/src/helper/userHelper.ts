/**
 * @description userHelper
 * This module defines some functions that deal with the database.
 *
 * @imports
 * import UserPDFsModel and PdfModel from database models
 * import PDFDocument from pdf-lib library
 *
 * @exports
 * Export the userHelper module
 *
 */

import UserPDFsModel, { PdfModel } from "../database/model/pdfModel";
import { PDFDocument } from "pdf-lib";

const userHelper = () => {
  //this function takes the file and userId and store it in the db
  const uploadPdf = async (req: any, userId: string) => {
    let user = await UserPDFsModel.findOne({ userId });

    if (!user) {
      user = new UserPDFsModel({ userId, originalPdfs: [], newPdfs: [] });
    }

    // Create a new PDF document and populate it with the uploaded file data
    const newPDF = new PdfModel({
      name: req.originalname,
      data: req.buffer,
      contentType: req.mimetype,
    });

    const pdfId = newPDF._id?.toString();

    // Push the PDF to the user's array of PDFs
    user.originalPdfs.push(newPDF);

    // Save the user with the updated PDF array
    await user.save();
    return pdfId;
  };

  //getPDF function return the PDF object
  const getPDF = async (userId: string, pdfId: string) => {
    const user = await UserPDFsModel.findOne({ userId });
    if (!user) {
      return "User not found";
    }
    // Find the PDF by its ID within the user's PDFs array
    const pdf = user.originalPdfs.id(pdfId);
    if (!pdf) {
      return "PDF not found";
    }
    return pdf;
  };

  //getPages function create a new pdf with the given pages and return
  const getPages = async (userId: string, pdfId: string, pages: any) => {
    const user = await UserPDFsModel.findOne({ userId });
    if (!user) {
      return "User not found";
    }
    const pdf = user.originalPdfs.id(pdfId);
    if (!pdf) {
      return "PDF not found";
    }

    // Convert the Buffer data to a PDF document
    const pdfDoc = await PDFDocument.load(pdf.data);

    // Create a new PDF document for selected pages
    const newPdfDoc = await PDFDocument.create();

    const selectedPageNumbers = pages
      .split(",")
      .map((page: string) => parseInt(page));

    // Iterate over the selected pages and copy them to the new PDF
    for (const pageNumber of selectedPageNumbers) {
      if (pageNumber >= 1 && pageNumber <= pdfDoc.getPageCount()) {
        const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [
          pageNumber - 1,
        ]);
        newPdfDoc.addPage(copiedPage);
      }
    }

    // Serialize the new PDF document to a Buffer
    const pdfBytesArray = await newPdfDoc.save();
    // Serialize the new PDF document to a Buffer
    const pdfBytes = Buffer.from(pdfBytesArray); // Convert the array to a Buffer

    const combinedPDF = new PdfModel({
      name: "combined.pdf",
      data: pdfBytes,
      contentType: "application/pdf",
    });

    // Push the PDF to the user's array of PDFs
    user.newPdfs.push(combinedPDF);

    // Save the user with the updated PDF array
    await user.save();

    return {
      pdfBytes,
      name: pdf.name,
    };
  };

  return {
    uploadPdf,
    getPDF,
    getPages,
  };
};

export default userHelper;
