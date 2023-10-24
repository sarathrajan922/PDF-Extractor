"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, 'please provide a email']
    },
    name: {
        type: String,
        required: [true, 'please provide a username']
    }
});
const UserModel = (0, mongoose_1.model)('users', userSchema, 'user');
exports.default = UserModel;
