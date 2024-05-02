import { NextFunction, Request, Response } from "express";
import { cyber } from "../2-utils/cyber";
import { UnauthorizedError } from "../3-models/client-errors";

class SecurityMiddleware {

    public verifyLoggedIn(request: Request, response: Response, next: NextFunction): void { 
        const authorizationHeader = request.header("authorization"); // Get authorization header
        const token = authorizationHeader?.substring(7); // 7 --> token index
        if (!cyber.isTokenValid(token)) { // If token not valid
            const err = new UnauthorizedError("You are not logged in.");
            next(err);
        }
        else { // Is token valid 
            next(); // Continue next middleware or controller
        }
    }

    public verifyAdmin(request: Request, response: Response, next: NextFunction): void { 
        const authorizationHeader = request.header("authorization"); // Get authorization header
        const token = authorizationHeader?.substring(7); // 7 --> token index
        if (!cyber.isAdmin(token)) { // If user is not admin
            const err = new UnauthorizedError("You are not authorized.");
            next(err);
        }
        else { // User is admin
            next(); // Continue next middleware or controller
        }
    }
}

export const securityMiddleware = new SecurityMiddleware();
