"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaLogin = exports.schemaRegister = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        username: (0, zod_1.string)({
            required_error: "Username required",
        }),
        password: (0, zod_1.string)({
            required_error: "Password required",
        }),
    })
};
exports.schemaRegister = (0, zod_1.object)(Object.assign({}, payload));
exports.schemaLogin = (0, zod_1.object)(Object.assign({}, payload));
