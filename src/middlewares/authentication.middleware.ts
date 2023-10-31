import { NextFunction, Request, Response } from 'express';
import HttpExceptions from '../utils/exceptions/http.exceptions';
import UsersService from '../services/users.service';

// Assuming you have Passport and Passport-JWT configured
// import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import UsersInterface from "../interfaces/user.interface";
import passport from 'passport';
require("../utils/passport.conf")




async function isLogged(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  // const _userService = new UsersService();
  // const bearer = req.headers.authorization;

  // if (!bearer || (!bearer.startsWith('Bearer ') && !bearer.startsWith('Google '))) {
  //   return next(new HttpExceptions(401, 'Unauthorized'));
  // }

  // if (bearer.startsWith('Bearer ')) {
  
  //   passport.authenticate('jwt', { session: false }, async (err:any, user:UsersInterface) => {
  //     if (err || !user) {
  //       return next(new HttpExceptions(401, 'Unauthorized'));
  //     }
  //     req.user = user;
  //     next();
  //   })(req, res, next);
  // }

  // if (bearer.startsWith('Google ')) {
  //   passport.authenticate('google', {
  //     scope: ['profile', 'email'],
  //     // accessType: 'offline',
  //     // approvalPrompt: 'force'
  //   })(req, res, next);
  //   // passport.authenticate('google', { session: false }, async (err:any, user:UsersInterface) => {
  //   //   if (err || !user) {
  //   //     return next(new HttpExceptions(401, 'Unauthorized'));
  //   //   }
  //   //   req.user = user;
  //   //   next();
  //   // })
  //   // If the request contains a "Google" token, it means it's a Google authentication request
  //   // You can use Passport's authenticate middleware here to handle Google authentication
  //   // For example, if you have a Google authentication strategy named 'google', you can use it like this:
  // }
}

export default isLogged;