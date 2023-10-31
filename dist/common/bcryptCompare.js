"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = __importDefault(require("bcrypt"));
var compare = function (data_password, user_password) {
    return new Promise(function (resolve, reject) {
        bcrypt_1.default.compare(data_password, user_password, function (err, result) {
            if (err) {
                console.log("err");
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
};
exports.default = compare;
