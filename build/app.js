"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB_1 = __importDefault(require("./utils/connectDB"));
const authHandler_1 = __importDefault(require("./handler/authHandler"));
const gameHandler_1 = __importDefault(require("./handler/gameHandler"));
dotenv_1.default.config();
//  Connect to database.
(0, connectDB_1.default)();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use('/api/auth', authHandler_1.default);
app.use('/api/games', gameHandler_1.default);
mongoose_1.default.connection.once('connected', () => {
    console.log('⚡️[server]: Connected to MongoDB.');
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
    });
});
