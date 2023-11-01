import { NextFunction, Request, Response } from "express";
import HttpExceptions from "../utils/exceptions/http.exceptions";
import UsersInterface from "../interfaces/user.interface";
import passport from "passport";
import token from "../utils/token";
require("../utils/passport.conf");

async function isLogged(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return next(new HttpExceptions(401, "Unauthorized"));
  }
  const splitedToken = bearer.split(" ")[1];
  await token
    .verifyToken(splitedToken)
    .then((user) => {
      if (user) {
        console.log(user)
        next();
      } else {
        return next(new HttpExceptions(401, "Unauthorized"));
      }
    })
    .catch((err) => {
      next(err);
    });
}

export default isLogged;
