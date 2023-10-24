"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfModel = void 0;
const mongoose_1 = require("mongoose");
const pdfSchema = new mongoose_1.Schema({
    name: String,
    data: Buffer,
    contentType: String, // Content type (e.g., application/pdf)
});
exports.PdfModel = (0, mongoose_1.model)("Pdf", pdfSchema);
const UserPdfSchema = new mongoose_1.Schema({
    userId: String,
    originalPdfs: [pdfSchema],
    newPdfs: [pdfSchema],
});
const UserPDFsModel = (0, mongoose_1.model)("UserPDFs", UserPdfSchema, "userpdfs");
exports.default = UserPDFsModel;
