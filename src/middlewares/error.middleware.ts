import { Request,Response , NextFunction } from "express";
import HttpExceptions from "../utils/exceptions/http.exceptions";

function errorMiddleware (
    error:HttpExceptions,
    req:Request,
    res:Response,
    next:NextFunction
):void{
    const status = error.status || 500;
    const message = error.message || "Internal Server Error";
    console.log(error.message)
    res.status(status).send({
        status,
        message
    })
}

export default errorMiddleware;