"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Users = /** @class */ (function () {
    function Users() {
    }
    Users.prototype.updateTimestamps = function () {
        this.updated_at = new Date();
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], Users.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: String, nullable: true })
    ], Users.prototype, "fullname", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: String, nullable: true, unique: true })
    ], Users.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: String, nullable: true, unique: true })
    ], Users.prototype, "phone_number", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: String, nullable: true })
    ], Users.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: String, nullable: false, default: "user" })
    ], Users.prototype, "role", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: String, nullable: true })
    ], Users.prototype, "country", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: String, nullable: true })
    ], Users.prototype, "country_tag", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: Boolean, nullable: false, default: 0 })
    ], Users.prototype, "verified_status", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: Date, nullable: true })
    ], Users.prototype, "last_login", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: String, nullable: true })
    ], Users.prototype, "verification_code", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: Date, nullable: true })
    ], Users.prototype, "verification_expire_time", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "timestamp", default: function () { return "CURRENT_TIMESTAMP"; } })
    ], Users.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({
            type: "timestamp",
            default: function () { return "CURRENT_TIMESTAMP"; },
            onUpdate: "CURRENT_TIMESTAMP",
        })
    ], Users.prototype, "updated_at", void 0);
    __decorate([
        (0, typeorm_1.BeforeUpdate)()
    ], Users.prototype, "updateTimestamps", null);
    Users = __decorate([
        (0, typeorm_1.Entity)()
    ], Users);
    return Users;
}());
exports.default = Users;
