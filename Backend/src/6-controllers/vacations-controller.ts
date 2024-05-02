import express, { NextFunction, Request, Response } from "express";
import { vacationsService } from "../5-services/vacations-service";
import { StatusCode } from "../3-models/enums";
import { VacationModel } from "../3-models/vacation-model";
import { securityMiddleware } from "../4-middleware/security-middleware";
import { fileSaver } from "uploaded-file-saver";
import { LikeModel } from "../3-models/like-model";

// Vacations controller - listens to vacation requests:
class VacationsController {

    // Create a router object for listening to HTTP requests:
    public readonly router = express.Router();

    // Register routes once: 
    public constructor() { this.registerRoutes() };

    private registerRoutes(): void {
        this.router.get("/vacations/:userId(\\d+)", securityMiddleware.verifyLoggedIn, this.getAllVacations);
        this.router.get("/vacations/vacation/:vacationId(\\d+)", securityMiddleware.verifyLoggedIn, this.getOneVacation); // \\d --> Digit, + --> One or more
        this.router.post("/vacations/likes", securityMiddleware.verifyLoggedIn, this.addLike);
        this.router.delete("/vacations/likes/:userId(\\d+)/:vacationId(\\d+)", securityMiddleware.verifyLoggedIn, this.removeLike);
        this.router.post("/vacations", securityMiddleware.verifyLoggedIn, securityMiddleware.verifyAdmin, this.addVacation);
        this.router.put("/vacations/:vacationId(\\d+)", securityMiddleware.verifyLoggedIn, securityMiddleware.verifyAdmin, this.updateVacation);
        this.router.delete("/vacations/:vacationId(\\d+)", securityMiddleware.verifyLoggedIn, securityMiddleware.verifyAdmin, this.deleteVacation);
        this.router.get("/vacations/images/:imageName", this.getImageFile);
    }

    // GET http://localhost:4000/api/vacations/:userId
    private async getAllVacations(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const userId = +request.params.userId;
            const vacations = await vacationsService.getAllVacations(userId);
            response.json(vacations); // status = 200
        }
        catch (err: any) { next(err); }
    }

    // GET http://localhost:4000/api/vacations/vacation/:vacationId
    private async getOneVacation(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const vacationId = +request.params.vacationId;
            const vacation = await vacationsService.getOneVacation(vacationId);
            response.json(vacation); // status = 200
        }
        catch (err: any) { next(err); }
    }

    // POST http://localhost:4000/api/vacations
    private async addVacation(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            request.body.image = request.files?.image;
            const vacation = new VacationModel(request.body);
            const addedVacation = await vacationsService.addVacation(vacation);
            response.status(StatusCode.Created).json(addedVacation);
        }
        catch (err: any) { next(err); }
    }

    // PUT http://localhost:4000/api/vacations/:vacationId
    private async updateVacation(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            request.body.vacationId = +request.params.vacationId;
            request.body.image = request.files?.image;
            const vacation = new VacationModel(request.body);
            const updatedVacation = await vacationsService.updateVacation(vacation);
            response.json(updatedVacation); // Status = 200
        }
        catch (err: any) { next(err); }
    }
    
    // DELETE http://localhost:4000/api/vacations/:vacationId
    private async deleteVacation(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const vacationId = +request.params.vacationId;
            await vacationsService.deleteVacation(vacationId);
            response.sendStatus(StatusCode.NoContent); // status + send
        }
        catch (err: any) { next(err); }
    }
    
    // GET http://localhost:4000/vacations/images/:imageName
    private async getImageFile(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const imageName = request.params.imageName;
            const imagePath = fileSaver.getFilePath(imageName, true);
            response.sendFile(imagePath); // Response the actual image file.
        }
        catch (err: any) { next(err); }
    }
    
    // POST http://localhost:4000/api/vacations/likes
    public async addLike(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const like = new LikeModel(request.body);
            const addedLike = await vacationsService.addLike(like);
            response.status(StatusCode.Created).json(addedLike);
        }
        catch(err: any) { next(err); }
    }
    
    // DELETE http://localhost:4000/api/vacations/likes/:userId/:vacationId
    public async removeLike(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const userId = +request.params.userId;
            const vacationId = +request.params.vacationId;
            await vacationsService.removeLike(userId, vacationId);
            response.sendStatus(StatusCode.NoContent);            
        }
        catch(err: any) { next(err); }
    }
}

const vacationsController = new VacationsController();
export const vacationsRouter = vacationsController.router;
