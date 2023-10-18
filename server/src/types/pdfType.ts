import {Document} from 'mongoose'

export interface PDFInterface extends Document {
    name: string;
    data: Buffer;
    contentType: string;
  }

export interface UserPdfInterface extends Document {
    userId: string;
    originalPdfs: PDFInterface[];
    newPdfs:PDFInterface[];
  }