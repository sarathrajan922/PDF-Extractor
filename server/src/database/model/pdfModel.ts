import { Model, Schema, model } from "mongoose";
import { PDFInterface, UserPdfInterface } from "../../types/pdfType";

const pdfSchema: Schema = new Schema<PDFInterface>({
  name: String, // File name
  data: Buffer, // Binary data of the PDF file
  contentType: String, // Content type (e.g., application/pdf)
});

export const PdfModel = model("pdfs", pdfSchema, "pdf");

const UserPdfSchema: Schema = new Schema<UserPdfInterface>({
  userId: String,
  originalPdfs: [pdfSchema],
  newPdfs: [pdfSchema],
});

const UserPDFsModel: Model<UserPdfInterface> = model(
  "pdfs",
  UserPdfSchema,
  "pdfs"
);
export default UserPDFsModel;
