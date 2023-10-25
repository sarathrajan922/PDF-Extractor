"use strict";
/**
 * @description authHelper
 * This module defines some functions that deal with the database.
 *
 * @imports
 * import jwtAuthentication for generate token
 * import UserModel
 * import UserDataInterface
 *
 * @instance
 * create an instance of the jwtAuthentication (jwtTokens)
 *
 * @exports
 * Export the authHelper
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
const jwt_1 = __importDefault(require("../middleware/jwt"));
const userModel_1 = __importDefault(require("../database/model/userModel"));
const jwtTokens = (0, jwt_1.default)();
const authHelper = () => {
    //getUserByEmail this function check the user is Exist or not
    const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield userModel_1.default.find({ email });
        return data;
    });
    //userRegister this function takes the formData and check user is exist or
    // not.If user exist then create token else create user and return token
    const userRegister = (userData) => __awaiter(void 0, void 0, void 0, function* () {
        const userExist = yield getUserByEmail(userData.email);
        let id;
        //check user exists already
        if (userExist.length) {
            id = userExist[0]._id.toString();
        }
        else {
            const data = yield userModel_1.default.create(userData);
            id = data._id.toString();
        }
        //create payload object for token
        const payload = {
            email: userData.email,
            role: "user",
            id,
        };
        //call function for create token
        const token = jwtTokens.generateToken(payload);
        return token;
    });
    return {
        userRegister,
    };
};
exports.default = authHelper;
