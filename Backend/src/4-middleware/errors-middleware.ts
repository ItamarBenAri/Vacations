import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../3-models/enums";
import { RouteNotFoundError } from "../3-models/client-errors";
import { logger } from "../2-utils/logger";
import { appConfig } from "../2-utils/app-config";

class ErrorsMiddleware {

    public routeNotFound(request: Request, response: Response, next: NextFunction): void {
        const err = new RouteNotFoundError(request.originalUrl); 
        next(err); // Go to catch-all
    }
    
    public catchAll(err: any, request: Request, response: Response, next: NextFunction): void {
        console.log(err);
        logger.logError(err); // Log error to file
        const status = err.status || StatusCode.InternalServerError;
        const message = (status === StatusCode.InternalServerError && appConfig.isProduction) ? "Some error, please try again later." : err.message;
        response.status(status).send(message); // Response the error
    }
}

export const errorsMiddleware = new ErrorsMiddleware();
