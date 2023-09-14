"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB_1 = __importDefault(require("./utils/connectDB"));
dotenv_1.default.config();
//connect to database
(0, connectDB_1.default)();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
//need to do
mongoose_1.default.connection.once('connected', () => {
    console.log('[SERVER]: Connected to MongoDB...');
    app.listen(port, () => {
        console.log('[SERVER]: Server is running at https://localhost:${port}');
    });
});
