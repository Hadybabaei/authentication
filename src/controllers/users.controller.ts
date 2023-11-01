import usersDto from "../dto/users.dto";
import { NextFunction, Request, Response, Router } from "express";
import validationMiddleware from "../middlewares/validation.middleware";
import UsersService from "../services/users.service";
import HttpExceptions from "../utils/exceptions/http.exceptions";
import hashMaker from "../common/bcryptHasher";
import isLogged from "../middlewares/authentication.middleware";
import passport from "passport";
require("../utils/passport.conf");

class UsersController {
  private _userService = new UsersService();
  public router = Router();
  public path = "/users";
  private verification_code = Math.random().toString(36).substring(7);
  private verification_expire_time = new Date(Date.now() + 3 * 60 * 1000); // 2 minutes from now

  constructor() {
    this.initializeRouter();
  }

  initializeRouter(): void {
    this.router.get(
      "/redirect",
      passport.authenticate("google", {
        failureRedirect: "/",
        successRedirect: "/api/test",
      })
    );
    this.router.get(
      "/register/google",
      passport.authenticate("google", { scope: ["profile", "email"] })
    );
    this.router.post(
      "/register/email",
      validationMiddleware(usersDto.registerWithEmail),
      this.registerByEmail
    );
    this.router.post(
      "/register/phone",
      validationMiddleware(usersDto.registerWithPhone),
      this.registerByPhoneNumber
    );
    this.router.post(
      "/verification",
      validationMiddleware(usersDto.verificationEmail),
      isLogged,
      this.emailVerification
    );
    this.router.get("/verification/resend", isLogged, this.resendVerification);
    this.router.get("/users",isLogged,this.getAllUsers);
    this.router.post(
      "/login",
      validationMiddleware(usersDto.login),
      this.login
    );
    this.router.get("/test", this.googleAuth);
    this.router.put("/users/edit",isLogged,validationMiddleware(usersDto.editUser),this.editUserInfo)

  }

  private registerByEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { password, password_confirm } = req.body;
      if (password !== password_confirm) {
        throw new HttpExceptions(400, "Passwords Don't Match");
      }

      const data = {
        ...req.body,
        password: await hashMaker(req.body.password),
        verification_code: this.verification_code,
        verification_expire_time: this.verification_expire_time,
        last_login: new Date(Date.now()),
      };
      delete data.password_confirm;

      const token = await this._userService.registerByEmail(data);
      res.status(201).json({ Message: "Account Created Successfully", token });
    } catch (error: any) {
      // Catch and send the specific HttpExceptions
      return next(error);
    }
  };

  private emailVerification = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { email } = req.user as { email: string };
    const verification = await this._userService.confirmEmail(
      req.body.verification_code,
      email!
    );
    if (verification.Success) {
      res
        .status(200)
        .json({ Message: "Email Verified Successfuly", Success: true });
    } else {
      res.status(200).json({ Message: verification.error, Success: false });
    }
  };

  private registerByPhoneNumber = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { password, password_confirm } = req.body;
      if (password !== password_confirm) {
        throw new HttpExceptions(400, "Passwords Don't Match");
      }

      const data = {
        ...req.body,
        password: await hashMaker(req.body.password),
        verification_code: this.verification_code,
        verification_expire_time: this.verification_expire_time,
        last_login: new Date(Date.now()),
      };
      const token = await this._userService.registerByPhoneNumber(data);
      res.status(201).json({ Message: "Account Created Successfully", token });
    } catch (error: any) {
      // Catch and send the specific HttpExceptions
      return next(error);
    }
  };

  private resendVerification = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { email } = req.user as { email: string };
    const strVerifExpTime = new Date(this.verification_expire_time);
    try {
      const resend = await this._userService.resendEmailVerification(
        email!,
        this.verification_code,
        strVerifExpTime
      );
      res.status(200).json({
        Message: "Verification code has been resended successfully",
        Success: true,
      });
    } catch (err: any) {
      throw new HttpExceptions(500, "Internal Server Error");
    }
  };

  private getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const users = await this._userService.getAllUsers();
      res.status(200).json({ users });
    } catch (err: unknown) {
      return next(err);
    }
  };

  private login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const token = await this._userService.login(req.body);
      if (token) {
        res.status(200).json({ Message: "Welcome", Success: true, token });
      } else {
        throw new HttpExceptions(400, "Login Failed, Please Check Credentials");
      }
    } catch (err: unknown) {
      return next(err);
    }
  };

  private googleAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      // console.log(req.user)
      const token = await this._userService.googleAuthRegister(req.user);
      res.status(200).json({ Message: "Welcome", Success: true, token });
    } catch (err) {
      return next(err);
    }
  };

  private editUserInfo = async(req:Request,res:Response,next:NextFunction):Promise<Response|void>=>{
    try{
      const editedUser = await this._userService.editUserInfo(req.body);
      res.status(200).json({Message:"User Edited Successfuly",Succes:true})
    }catch (err:any){
      next(err)
    }
  }
}

export default UsersController;
