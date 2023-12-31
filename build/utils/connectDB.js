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
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const dbUri = "mongodb+srv://sushil:sushil@cluster0.j5geuwi.mongodb.net/Gomoku?retryWrites=true&w=majority";
    mongoose_1.default.set('strictQuery', false);
    console.log('[SERVER: Connecting to database....');
    try {
        yield mongoose_1.default.connect(dbUri);
    }
    catch (error) {
        console.log("[SERVER: Failed to connect to database");
        console.log(error);
        process.exit(1);
    }
});
exports.default = connectDB;
