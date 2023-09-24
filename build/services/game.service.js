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
exports.deleteGame = exports.updateGame = exports.createGame = exports.getGamesByUserID = exports.getGameByID = exports.getAllGames = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const gameModel_1 = __importDefault(require("../model/gameModel"));
//  Function to return all games.
function getAllGames() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield gameModel_1.default.find().lean();
    });
}
exports.getAllGames = getAllGames;
//  Function to return game by Id.
function getGameByID(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield gameModel_1.default.findById(id).lean();
    });
}
exports.getGameByID = getGameByID;
//  Function to return games by userId.
function getGamesByUserID(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield gameModel_1.default.find({ userId }).lean();
    });
}
exports.getGamesByUserID = getGamesByUserID;
//  Function to create a new game.
function createGame(input) {
    return __awaiter(this, void 0, void 0, function* () {
        return gameModel_1.default.create(input);
    });
}
exports.createGame = createGame;
//  Function to update a game.
function updateGame(id, userID, input) {
    return __awaiter(this, void 0, void 0, function* () {
        return gameModel_1.default.findOneAndUpdate({
            _id: new mongoose_1.default.Types.ObjectId(id),
            userId: new mongoose_1.default.Types.ObjectId(userID)
        }, input, { new: true });
    });
}
exports.updateGame = updateGame;
//  Function to delete a game.
function deleteGame(id, userID) {
    return __awaiter(this, void 0, void 0, function* () {
        return gameModel_1.default.deleteOne({
            _id: new mongoose_1.default.Types.ObjectId(id),
            userID: new mongoose_1.default.Types.ObjectId(userID)
        });
    });
}
exports.deleteGame = deleteGame;
