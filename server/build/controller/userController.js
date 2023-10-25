"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatus_1 = require("../types/httpStatus");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userHelper_1 = __importDefault(require("../helper/userHelper"));
const helper = (0, userHelper_1.default)();
const userController = () => {
    // Define a function for uploading a PDF.
    const uploadPDF = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        // Get the user ID from the request payload or set it as an empty string.
        const userId = (_b = (_a = req.payload) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : "";
        // Upload the PDF using the user helper.
        const result = yield helper.uploadPdf(req.file, userId);
        if (result) {
            // If the upload is successful, send a success response with the PDF ID.
            res.status(httpStatus_1.HttpStatus.OK).send({
                status: httpStatus_1.HttpStatus.OK,
                message: "pdf successfully uploaded",
                pdfId: result,
            });
        }
    }));
    // Define a function for getting a PDF.
    const getPdf = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _c, _d;
        // Get the user ID from the request payload or set it as an empty string.
        const userId = (_d = (_c = req.payload) === null || _c === void 0 ? void 0 : _c.id) !== null && _d !== void 0 ? _d : "";
        const { pdfId } = req.params;
        // Get the PDF using the user helper.
        const result = yield helper.getPDF(userId, pdfId);
        if (result) {
            if (result === "User not found" || result === "PDF not found") {
                // If the user or PDF is not found, send a not found response.
                res.status(httpStatus_1.HttpStatus.NOT_FOUND).send({
                    status: httpStatus_1.HttpStatus.NOT_FOUND,
                    message: result,
                });
            }
            else {
                // res.setHeader('Content-Type', result.pdf.contentType);
                res.setHeader("Content-Disposition", `inline; filename="${result.name}"`);
                res.status(httpStatus_1.HttpStatus.OK).send({
                    status: httpStatus_1.HttpStatus.OK,
                    message: "pdf fetch successfully",
                    data: result.data, // this is the PDF content
                });
            }
        }
    }));
    // Define a function for getting  a PDF with the specified pages
    const getPages = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _e, _f;
        const userId = (_f = (_e = req.payload) === null || _e === void 0 ? void 0 : _e.id) !== null && _f !== void 0 ? _f : "";
        const { pdfId } = req.params;
        const { pages } = req.query;
        // Get the PDF using the user helper.
        const result = yield helper.getPages(userId, pdfId, pages);
        if (result) {
            if (result === "User not found" || result === "PDF not found") {
                // If the user or PDF is not found, send a not found response.
                res.status(httpStatus_1.HttpStatus.NOT_FOUND).send({
                    status: httpStatus_1.HttpStatus.NOT_FOUND,
                    message: result,
                });
            }
            else {
                // Set response headers and send the PDF page data.
                res.setHeader("Content-Type", "application/pdf");
                res.setHeader("Content-Disposition", `inline; filename="${result.name}"`);
                res.status(httpStatus_1.HttpStatus.OK).send({
                    data: result.pdfBytes,
                });
            }
        }
    }));
    return {
        uploadPDF,
        getPdf,
        getPages,
    };
};
exports.default = userController;
