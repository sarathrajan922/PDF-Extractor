"use strict";
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
const authHelper_1 = __importDefault(require("../helper/authHelper"));
const authentication = (0, authHelper_1.default)();
const authControl = () => {
    const userSignup = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield authentication.userRegister(req.body);
        res.status(httpStatus_1.HttpStatus.OK).send({
            status: httpStatus_1.HttpStatus.OK,
            userToken: result,
        });
    }));
    return {
        userSignup,
    };
};
exports.default = authControl;
