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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var token_1 = require("../utils/token");
var http_exceptions_1 = __importDefault(require("../utils/exceptions/http.exceptions"));
var nodeMailer_1 = __importDefault(require("../common/nodeMailer"));
// import smsSender from "../common/smsSender";
var prismaclient_1 = __importDefault(require("../utils/database/prismaclient"));
var bcryptCompare_1 = __importDefault(require("../common/bcryptCompare"));
var UsersService = /** @class */ (function () {
    function UsersService() {
        var _this = this;
        this._userModel = prismaclient_1.default.users;
        this.registerByEmail = function (data) { return __awaiter(_this, void 0, void 0, function () {
            var users, createdUser, mailOptions, token, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this._userModel.findUnique({
                                where: { email: data.email },
                            })];
                    case 1:
                        users = _a.sent();
                        if (users) {
                            throw new http_exceptions_1.default(409, "Email already exists");
                        }
                        return [4 /*yield*/, this._userModel.create({ data: data })];
                    case 2:
                        createdUser = _a.sent();
                        mailOptions = {
                            to: createdUser.email,
                            subject: "Your Verification Code",
                            text: "Your TripTick Verification Code Is : ".concat(data.verification_code),
                        };
                        return [4 /*yield*/, (0, nodeMailer_1.default)(mailOptions)];
                    case 3:
                        _a.sent();
                        token = (0, token_1.createToken)(createdUser);
                        return [2 /*return*/, token];
                    case 4:
                        error_1 = _a.sent();
                        throw error_1; // Re-throw the caught HttpExceptions instance
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.registerByPhoneNumber = function (data) { return __awaiter(_this, void 0, void 0, function () {
            var users, createdUser, smsOptions, token, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this._userModel.findUnique({
                                where: {
                                    phone_number: data.phone_number,
                                },
                            })];
                    case 1:
                        users = _a.sent();
                        if (users) {
                            throw new http_exceptions_1.default(409, "Phone Number already exists");
                        }
                        return [4 /*yield*/, this._userModel.create({ data: data })];
                    case 2:
                        createdUser = _a.sent();
                        smsOptions = {
                            from: "+13012462816",
                            to: data.phone_number,
                            body: "Your TripTick Verification Code is : ".concat(data.verification_code),
                        };
                        token = (0, token_1.createToken)(createdUser);
                        return [2 /*return*/, token];
                    case 3:
                        error_2 = _a.sent();
                        throw error_2; // Re-throw the caught HttpExceptions instance
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.confirmEmail = function (verification_code, email) { return __awaiter(_this, void 0, void 0, function () {
            var verification, verificationExpireTimeStr, verificationExpireTime, currentTime, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, this._userModel.findUnique({
                                where: { email: email, verification_code: verification_code },
                            })];
                    case 1:
                        verification = _a.sent();
                        if (!verification) return [3 /*break*/, 5];
                        verificationExpireTimeStr = verification.verification_expire_time;
                        verificationExpireTime = new Date(verificationExpireTimeStr);
                        currentTime = new Date();
                        if (!(currentTime < verificationExpireTime)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._userModel.update({
                                where: {
                                    email: email,
                                },
                                data: {
                                    verified_status: true,
                                },
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { Success: true }];
                    case 3: return [2 /*return*/, { Success: false, error: "Verification Code Expired" }];
                    case 4: return [3 /*break*/, 6];
                    case 5: return [2 /*return*/, { Success: false, error: "Invalid Verification Code" }];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_3 = _a.sent();
                        throw error_3;
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.getUserByEmail = function (email) { return __awaiter(_this, void 0, void 0, function () {
            var user, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._userModel.findUnique({ where: { email: email } })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                    case 2:
                        err_1 = _a.sent();
                        throw new Error("Internal Server Error");
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.resendEmailVerification = function (email, verification_code, verification_expire_time) { return __awaiter(_this, void 0, void 0, function () {
            var user, mailOptions, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this._userModel.update({
                                where: {
                                    email: email,
                                },
                                data: {
                                    verification_code: verification_code,
                                    verification_expire_time: verification_expire_time,
                                },
                            })];
                    case 1:
                        user = _a.sent();
                        mailOptions = {
                            to: email,
                            subject: "Your Verification Code",
                            text: "Your TripTick Verification Code Is : ".concat(verification_code),
                        };
                        return [4 /*yield*/, (0, nodeMailer_1.default)(mailOptions)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("Internal Server Error");
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getAllUsers = function () { return __awaiter(_this, void 0, void 0, function () {
            var users, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._userModel.findMany()];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, users];
                    case 2:
                        err_3 = _a.sent();
                        throw new Error("Internal Server Error");
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.login = function (data) { return __awaiter(_this, void 0, void 0, function () {
            var user, _a, comparePassword, token, err_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        if (!data.email) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._userModel.findUnique({
                                where: { email: data.email },
                            })];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this._userModel.findUnique({
                            where: { phone_number: data.phone_number },
                        })];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4:
                        user = _a;
                        if (!user) {
                            throw new http_exceptions_1.default(409, "email or password is wrong, please check the credentials");
                        }
                        return [4 /*yield*/, (0, bcryptCompare_1.default)(data.password, user.password)];
                    case 5:
                        comparePassword = _b.sent();
                        if (comparePassword) {
                            token = (0, token_1.createToken)(user);
                            return [2 /*return*/, token];
                        }
                        else {
                            throw new http_exceptions_1.default(401, "email or password is wrong, please check the credentials"); // Change the HTTP status code to 401 for unauthorized access
                        }
                        return [3 /*break*/, 7];
                    case 6:
                        err_4 = _b.sent();
                        throw new http_exceptions_1.default(err_4.status, err_4.message || "internal server error"); // Handle other errors as Internal Server Errors
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.googleAuthRegister = function (data) { return __awaiter(_this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                try {
                    token = (0, token_1.createToken)(data);
                    return [2 /*return*/, token];
                }
                catch (error) {
                    console.log(error);
                    throw error; // Re-throw the caught HttpExceptions instance
                }
                return [2 /*return*/];
            });
        }); };
    }
    return UsersService;
}());
exports.default = UsersService;
