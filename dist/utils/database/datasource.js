"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var ormconfig_1 = __importDefault(require("./ormconfig"));
var appDataSource = new typeorm_1.DataSource(ormconfig_1.default);
exports.default = appDataSource;
