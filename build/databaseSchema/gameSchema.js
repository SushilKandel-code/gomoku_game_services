"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGameSchema = exports.updateGameSchema = exports.createGameSchema = exports.getGameByIDSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        userID: (0, zod_1.string)({
            required_error: 'User ID required'
        }),
        size: (0, zod_1.number)({
            required_error: "Size Required"
        }),
        moves: (0, zod_1.array)((0, zod_1.array)((0, zod_1.number)({
            required_error: "Moves Required"
        }))),
        date: (0, zod_1.string)({
            required_error: "Date Required"
        }),
        result: (0, zod_1.string)({
            required_error: "Result required",
        })
    })
};
const getParams = {
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({
            required_error: "Game ID required",
        })
    })
};
const updateDeleteParams = {
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({
            required_error: "Game ID required"
        })
    })
};
exports.getGameByIDSchema = (0, zod_1.object)(Object.assign({}, getParams));
exports.createGameSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updateGameSchema = (0, zod_1.object)(Object.assign(Object.assign({}, payload), updateDeleteParams));
exports.deleteGameSchema = (0, zod_1.object)(Object.assign({}, updateDeleteParams));
