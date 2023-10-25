"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pdfModel_1 = __importStar(require("../database/model/pdfModel"));
const pdf_lib_1 = require("pdf-lib");
const userHelper = () => {
    //this function takes the file and userId and store it in the db
    const uploadPdf = (req, userId) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        let user = yield pdfModel_1.default.findOne({ userId });
        if (!user) {
            user = new pdfModel_1.default({ userId, originalPdfs: [], newPdfs: [] });
        }
        // Create a new PDF document and populate it with the uploaded file data
        const newPDF = new pdfModel_1.PdfModel({
            name: req.originalname,
            data: req.buffer,
            contentType: req.mimetype,
        });
        const pdfId = (_a = newPDF._id) === null || _a === void 0 ? void 0 : _a.toString();
        // Push the PDF to the user's array of PDFs
        user.originalPdfs.push(newPDF);
        // Save the user with the updated PDF array
        yield user.save();
        return pdfId;
    });
    //getPDF function return the PDF object
    const getPDF = (userId, pdfId) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield pdfModel_1.default.findOne({ userId });
        if (!user) {
            return "User not found";
        }
        // Find the PDF by its ID within the user's PDFs array
        const pdf = user.originalPdfs.id(pdfId);
        if (!pdf) {
            return "PDF not found";
        }
        return pdf;
    });
    //getPages function create a new pdf with the given pages and return
    const getPages = (userId, pdfId, pages) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield pdfModel_1.default.findOne({ userId });
        if (!user) {
            return "User not found";
        }
        const pdf = user.originalPdfs.id(pdfId);
        if (!pdf) {
            return "PDF not found";
        }
        // Convert the Buffer data to a PDF document
        const pdfDoc = yield pdf_lib_1.PDFDocument.load(pdf.data);
        // Create a new PDF document for selected pages
        const newPdfDoc = yield pdf_lib_1.PDFDocument.create();
        const selectedPageNumbers = pages
            .split(",")
            .map((page) => parseInt(page));
        // Iterate over the selected pages and copy them to the new PDF
        for (const pageNumber of selectedPageNumbers) {
            if (pageNumber >= 1 && pageNumber <= pdfDoc.getPageCount()) {
                const [copiedPage] = yield newPdfDoc.copyPages(pdfDoc, [
                    pageNumber - 1,
                ]);
                newPdfDoc.addPage(copiedPage);
            }
        }
        // Serialize the new PDF document to a Buffer
        const pdfBytesArray = yield newPdfDoc.save();
        // Serialize the new PDF document to a Buffer
        const pdfBytes = Buffer.from(pdfBytesArray); // Convert the array to a Buffer
        const combinedPDF = new pdfModel_1.PdfModel({
            name: "combined.pdf",
            data: pdfBytes,
            contentType: "application/pdf",
        });
        // Push the PDF to the user's array of PDFs
        user.newPdfs.push(combinedPDF);
        // Save the user with the updated PDF array
        yield user.save();
        return {
            pdfBytes,
            name: pdf.name,
        };
    });
    return {
        uploadPdf,
        getPDF,
        getPages,
    };
};
exports.default = userHelper;
