"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var envalid_1 = require("envalid");
function validateEnv() {
    (0, envalid_1.cleanEnv)(process.env, {
        PORT: (0, envalid_1.port)({ default: 5001 }),
        JWT_SECRET: (0, envalid_1.str)(),
        DATABASE_NAME: (0, envalid_1.str)(),
        DATABASE_USER: (0, envalid_1.str)({ default: "root" }),
        DATABASE_PASSWORD: (0, envalid_1.str)(),
        NODE_ENV: (0, envalid_1.str)()
    });
}
exports.default = validateEnv;
