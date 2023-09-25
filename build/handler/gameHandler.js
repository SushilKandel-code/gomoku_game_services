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
const express_1 = __importDefault(require("express"));
const schemaValidate_1 = __importDefault(require("../middleware/schemaValidate"));
const gameSchema_1 = require("../databaseSchema/gameSchema");
const game_service_1 = require("../services/game.service");
const userDeserialize_1 = require("../middleware/userDeserialize");
const gameHandler = express_1.default.Router();
gameHandler.use(userDeserialize_1.userDeserialize);
//get games
gameHandler.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.userId;
    console.log(userID);
    const games = yield (0, game_service_1.getGamesByUserID)(userID);
    if (!games)
        return res.sendStatus(404);
    return res.status(200).json(games);
}));
//get games by id
gameHandler.get("/:id", (0, schemaValidate_1.default)(gameSchema_1.getGameByIDSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const gameID = req.params.id;
    const userID = req.userId;
    const game = yield (0, game_service_1.getGameByID)(gameID);
    if (!game)
        return res.sendStatus(404);
    return res.status(200).json(Object.assign({}, game));
}));
//creating game
gameHandler.post("/", (0, schemaValidate_1.default)(gameSchema_1.createGameSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.userId;
    const game = req.body;
    const newGame = yield (0, game_service_1.createGame)(Object.assign(Object.assign({}, game), { userID }));
    return res.status(200).send(newGame);
}));
//updating game
gameHandler.put("/:id", (0, schemaValidate_1.default)(gameSchema_1.updateGameSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = req.userId;
        const game = req.body;
        const gameID = req.params.id;
        const newGame = yield (0, game_service_1.updateGame)(gameID, userID, Object.assign(Object.assign({}, game), { userID }));
        console.log(newGame);
        if (!newGame)
            return res.sendStatus(400);
        return res.status(200).json(newGame);
    }
    catch (err) {
        console.log(err);
    }
}));
//delete game
gameHandler.delete("/:id", (0, schemaValidate_1.default)(gameSchema_1.deleteGameSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const gameID = req.params.id;
    const userID = req.userId;
    yield (0, game_service_1.deleteGame)(gameID, userID);
    return res.sendStatus(200);
}));
exports.default = gameHandler;
