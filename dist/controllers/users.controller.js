"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var users_dto_1 = __importDefault(require("../dto/users.dto"));
var express_1 = require("express");
var validation_middleware_1 = __importDefault(require("../middlewares/validation.middleware"));
var users_service_1 = __importDefault(require("../services/users.service"));
var http_exceptions_1 = __importDefault(require("../utils/exceptions/http.exceptions"));
var bcryptHasher_1 = __importDefault(require("../common/bcryptHasher"));
var authentication_middleware_1 = __importDefault(require("../middlewares/authentication.middleware"));
var passport_1 = __importDefault(require("passport"));
require("../utils/passport.conf");
var UsersController = /** @class */ (function () {
    function UsersController() {
        var _this = this;
        this._userService = new users_service_1.default();
        this.router = (0, express_1.Router)();
        this.path = "/users";
        this.verification_code = Math.random().toString(36).substring(7);
        this.verification_expire_time = new Date(Date.now() + 3 * 60 * 1000); // 2 minutes from now
        this.registerByEmail = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, password, password_confirm, data, _b, token, error_1;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 3, , 4]);
                        _a = req.body, password = _a.password, password_confirm = _a.password_confirm;
                        if (password !== password_confirm) {
                            throw new http_exceptions_1.default(400, "Passwords Don't Match");
                        }
                        _b = [__assign({}, req.body)];
                        _c = {};
                        return [4 /*yield*/, (0, bcryptHasher_1.default)(req.body.password)];
                    case 1:
                        data = __assign.apply(void 0, _b.concat([(_c.password = _d.sent(), _c.verification_code = this.verification_code, _c.verification_expire_time = this.verification_expire_time, _c.last_login = new Date(Date.now()), _c)]));
                        delete data.password_confirm;
                        return [4 /*yield*/, this._userService.registerByEmail(data)];
                    case 2:
                        token = _d.sent();
                        res.status(201).json({ Message: "Account Created Successfully", token: token });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _d.sent();
                        // Catch and send the specific HttpExceptions
                        return [2 /*return*/, next(error_1)];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.emailVerification = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var email, verification;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = req.user.email;
                        return [4 /*yield*/, this._userService.confirmEmail(req.body.verification_code, email)];
                    case 1:
                        verification = _a.sent();
                        if (verification.Success) {
                            res
                                .status(200)
                                .json({ Message: "Email Verified Successfuly", Success: true });
                        }
                        else {
                            res.status(200).json({ Message: verification.error, Success: false });
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        this.registerByPhoneNumber = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, password, password_confirm, data, _b, token, error_2;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 3, , 4]);
                        _a = req.body, password = _a.password, password_confirm = _a.password_confirm;
                        if (password !== password_confirm) {
                            throw new http_exceptions_1.default(400, "Passwords Don't Match");
                        }
                        _b = [__assign({}, req.body)];
                        _c = {};
                        return [4 /*yield*/, (0, bcryptHasher_1.default)(req.body.password)];
                    case 1:
                        data = __assign.apply(void 0, _b.concat([(_c.password = _d.sent(), _c.verification_code = this.verification_code, _c.verification_expire_time = this.verification_expire_time, _c.last_login = new Date(Date.now()), _c)]));
                        return [4 /*yield*/, this._userService.registerByPhoneNumber(data)];
                    case 2:
                        token = _d.sent();
                        res.status(201).json({ Message: "Account Created Successfully", token: token });
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _d.sent();
                        // Catch and send the specific HttpExceptions
                        return [2 /*return*/, next(error_2)];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.resendVerification = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var email, strVerifExpTime, resend, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = req.user.email;
                        strVerifExpTime = new Date(this.verification_expire_time);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._userService.resendEmailVerification(email, this.verification_code, strVerifExpTime)];
                    case 2:
                        resend = _a.sent();
                        res.status(200).json({
                            Message: "Verification code has been resended successfully",
                            Success: true,
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        throw new http_exceptions_1.default(500, "Internal Server Error");
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getAllUsers = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var users, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._userService.getAllUsers()];
                    case 1:
                        users = _a.sent();
                        res.status(200).json({ users: users });
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        return [2 /*return*/, next(err_2)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.login = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var token, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._userService.login(req.body)];
                    case 1:
                        token = _a.sent();
                        if (token) {
                            res.status(200).json({ Message: "Welcome", Success: true, token: token });
                        }
                        else {
                            throw new http_exceptions_1.default(400, "Login Failed, Please Check Credentials");
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        return [2 /*return*/, next(err_3)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.googleAuth = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var token, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._userService.googleAuthRegister(req.user)];
                    case 1:
                        token = _a.sent();
                        res.status(200).json({ Message: "Welcome", Success: true, token: token });
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        return [2 /*return*/, next(err_4)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.initializeRouter();
    }
    UsersController.prototype.initializeRouter = function () {
        this.router.get("/redirect", passport_1.default.authenticate('google', { failureRedirect: "/", successRedirect: "/api/test" }));
        this.router.get("/register/google", passport_1.default.authenticate('google', { scope: ["profile", "email"] }));
        // this.router.get("/test",(req:Request,res:Response,next:NextFunction )=>{
        //   console.log(req.user)
        //   next()
        // }) 
        this.router.post("/register/email", (0, validation_middleware_1.default)(users_dto_1.default.registerWithEmail), this.registerByEmail);
        this.router.post("/register/phone", (0, validation_middleware_1.default)(users_dto_1.default.registerWithPhone), this.registerByPhoneNumber);
        this.router.post("/verification", (0, validation_middleware_1.default)(users_dto_1.default.verificationEmail), authentication_middleware_1.default, this.emailVerification);
        this.router.get("/verification/resend", authentication_middleware_1.default, this.resendVerification);
        this.router.get("/users", this.getAllUsers);
        this.router.post("/login", (0, validation_middleware_1.default)(users_dto_1.default.login), this.login);
        this.router.get("/test", this.googleAuth);
    };
    return UsersController;
}());
exports.default = UsersController;
