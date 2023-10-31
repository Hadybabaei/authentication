"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var users_entity_1 = __importDefault(require("../../entities/users.entity"));
var _1690796165205_create_users_table_1 = require("../../migrations/1690796165205-create_users_table");
dotenv_1.default.config();
var ormconfigs;
if (process.env.NODE_ENV === "development") {
    ormconfigs = {
        type: "mysql",
        host: process.env.MYSQL_URL,
        port: 3306,
        username: process.env.DATABASE_USER,
        password: "",
        database: process.env.DATABASE_NAME,
        synchronize: false,
        logging: true,
        entities: [users_entity_1.default],
        migrations: [_1690796165205_create_users_table_1.CreateUsersTable1690796165205],
        migrationsTableName: "custom_migration_table",
    };
}
else {
    ormconfigs = {
        "type": "mysql",
        "host": process.env.MYSQL_URL,
        "port": 3306,
        "username": process.env.DATABASE_USER,
        "password": process.env.DATABASE_PASSWORD,
        "database": process.env.DATABASE_NAME,
        "synchronize": true,
        "logging": true,
        "entities": [],
        "migrations": ["src/migrations/*.ts"],
        "subscribers": ["src/subscribers/*.ts"],
    };
}
exports.default = ormconfigs;
