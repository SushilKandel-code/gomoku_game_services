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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const schemaValidate_1 = __importDefault(require("../middleware/schemaValidate"));
const auth_service_1 = require("../services/auth.service");
const authSchema_1 = require("../databaseSchema/authSchema");
const authHandler = express_1.default.Router();
//register new user
authHandler.post("/register", (0, schemaValidate_1.default)(authSchema_1.schemaRegister), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        console.log(req.body);
        //check whether user already exists in database or not
        const existingUser = yield (0, auth_service_1.getUserByUsername)(username);
        if (existingUser) {
            return res.status(409).send("User Already Exists. Please Login..");
        }
        //encrypting user password
        const encryptedPassword = yield bcryptjs_1.default.hash(password, 10);
        //creating user in database
        const newUser = yield (0, auth_service_1.createUser)({
            username,
            password: encryptedPassword
        });
        //creating token
        //const token = signJWT({ username, _id: newUser._id});
        //returning new user with jwt token
        res.status(200).send(newUser);
        console.log(newUser);
    }
    catch (err) {
        return res.status(500).send(err);
    }
}));
//Login as a user
authHandler.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //getting user input
        const { username, password } = req.body;
        //validating use either it is already exist in database or not
        const user = yield (0, auth_service_1.getUserByUsername)(username);
        console.log("User:" + { user });
        if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
            //token creating
            // const token = signJWT({username, _id: user._id});
            return res.status(200).json({ username, _id: user._id });
        }
        return res.status(400).send('Invalid Credentials');
    }
    catch (err) {
        return res.status(500).send(err);
    }
}));
exports.default = authHandler;
