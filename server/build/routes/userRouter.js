"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controller/userController"));
const multer_1 = __importDefault(require("../middleware/multer"));
const authenticationMiddleware_1 = __importDefault(require("../middleware/authenticationMiddleware"));
const userRouter = express_1.default.Router();
const controller = (0, userController_1.default)();
userRouter.post('/upload-pdf', authenticationMiddleware_1.default, multer_1.default.single('pdf'), controller.uploadPDF);
userRouter.get('/get-pdf/:pdfId', authenticationMiddleware_1.default, controller.getPdf);
userRouter.get('/get-pages/:pdfId', authenticationMiddleware_1.default, controller.getPages);
exports.default = userRouter;
