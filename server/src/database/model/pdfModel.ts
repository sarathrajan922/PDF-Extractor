import { Schema, model } from "mongoose";
import { PDFInterface, UserPdfInterface } from "../../types/pdfType";

const pdfSchema: Schema = new Schema<PDFInterface>({
  name: String, // File name
  data: Buffer, // Binary data of the PDF file
  contentType: String, // Content type (e.g., application/pdf)
});

export const PdfModel = model("Pdf", pdfSchema);

const UserPdfSchema: Schema = new Schema<UserPdfInterface>({
  userId: String,
  originalPdfs: [pdfSchema],
  newPdfs: [pdfSchema],
});

const UserPDFsModel = model("UserPDFs", UserPdfSchema, "userpdfs");
export default UserPDFsModel;
