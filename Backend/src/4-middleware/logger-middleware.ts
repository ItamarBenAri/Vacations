import { NextFunction, Request, Response } from "express";

class LoggerMiddleware {

    public logToConsole(request: Request, response: Response, next: NextFunction): void {

        // Log request to console:
        console.log("Method: ", request.method);
        console.log("Route: ", request.originalUrl);
        console.log("Body: ", request.body);
        console.log("---------------------------------");
        next(); // Continue to next middleware or controller
    }
}

export const loggerMiddleware = new LoggerMiddleware();
