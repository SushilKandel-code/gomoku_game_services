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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDeserialize = void 0;
const auth_service_1 = require("../services/auth.service");
const jwt_1 = require("../utils/jwt");
const userDeserialize = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //getting token
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            return res.status(403).send("Token is Missing");
        }
        //validating access token
        const decode = (0, jwt_1.verifyJWT)(token);
        if (!decode) {
            return res.status(401).send("Invalid Token");
        }
        const user = yield (0, auth_service_1.getUserByID)(decode._id);
        if (!user) {
            return res.status(401).send("Invalid User");
        }
        //sending userid into request
        req.userId = user._id;
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.userDeserialize = userDeserialize;
