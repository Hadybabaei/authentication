"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var registerWithEmail = joi_1.default.object({
    email: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    password_confirm: joi_1.default.string().required()
});
var registerWithPhone = joi_1.default.object({
    phone_number: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    password_confirm: joi_1.default.string().required()
});
var login = joi_1.default.object({
    email: joi_1.default.string(),
    phone_number: joi_1.default.string(),
    password: joi_1.default.string().required(),
});
var verificationEmail = joi_1.default.object({
    verification_code: joi_1.default.string().required(),
});
exports.default = { login: login, registerWithEmail: registerWithEmail, verificationEmail: verificationEmail, registerWithPhone: registerWithPhone };
