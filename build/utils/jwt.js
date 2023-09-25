"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.signJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signJWT = (payload, options = {}) => {
    const privateKey = process.env.accessTokenPrivateKey;
    return jsonwebtoken_1.default.sign(payload, privateKey, Object.assign(Object.assign({}, (options && options)), { expiresIn: '8h' }));
};
exports.signJWT = signJWT;
const verifyJWT = (token) => {
    try {
        const publicKey = process.env.accessTokenPrivateKey;
        return jsonwebtoken_1.default.verify(token, publicKey);
    }
    catch (error) {
        return null;
    }
};
exports.verifyJWT = verifyJWT;
