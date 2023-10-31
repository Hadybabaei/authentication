import Users from "../../interfaces/user.interface"
import { Request } from "express"
import { Strategy as PassportStrategy } from "passport-strategy";


// interface Request_Two extends Request {
//     user:Users
// }
declare global {
    namespace Express {
        export interface Request {
            user:Users
        }
    }
}

