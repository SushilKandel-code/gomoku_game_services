"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const gameSchema = new mongoose_1.default.Schema({
    userID: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    size: Number,
    moves: [[Number]],
    date: String,
    result: String
});
exports.default = mongoose_1.default.model("Game", gameSchema);
