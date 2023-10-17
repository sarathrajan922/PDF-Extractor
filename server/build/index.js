"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const errorHandleMiddleware_1 = __importDefault(require("./middleware/errorHandleMiddleware"));
const app = (0, express_1.default)();
const config_1 = __importDefault(require("./common/config"));
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
const sever = http_1.default.createServer(app);
const PORT = config_1.default.PORT;
sever.listen(PORT, () => {
    console.log(`Server listening at PORT: ${PORT}`);
});
app.use(errorHandleMiddleware_1.default);
