import { Schema, model } from "mongoose";
import { PDFInterface, UserCreatedPdfInterface, UserPdfInterface } from "../../types/pdfType";

const pdfSchema: Schema = new Schema<PDFInterface>({
  name: String, // File name
  data: Buffer, // Binary data of the PDF file
  contentType: String, // Content type (e.g., application/pdf)
});

export const PdfModel = model('pdf', pdfSchema);

const UserPdfSchema: Schema = new Schema<UserPdfInterface>({
  userId: String,
  originalPdfs: [pdfSchema],
  // newPdfs: [pdfSchema],
});

const UserCreatedPdfSchema: Schema = new Schema<UserCreatedPdfInterface>({
 userId: String,
 createdPdfs: [pdfSchema],
});

export const UserCreatedPdfModel = model('userCreatedPdf', UserCreatedPdfSchema,'userCreatedPdf');



const UserPDFsModel = model("UserPDFs", UserPdfSchema, "uploadedPdfs");
export default UserPDFsModel;
