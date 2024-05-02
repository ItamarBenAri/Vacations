import express, { Request, Response, NextFunction } from "express";
import { UserModel } from "../3-models/user-model";
import { authService } from "../5-services/auth-service";
import { StatusCode } from "../3-models/enums";
import { CredentialsModel } from "../3-models/credentials-model";
import { fileSaver } from "uploaded-file-saver";

class AuthController {

    // Create a router object for listening to HTTP requests:
    public readonly router = express.Router();

    // Register routes once: 
    public constructor() { this.registerRoutes() };

    private registerRoutes(): void {
        this.router.post("/register", this.register);
        this.router.post("/login", this.login);
        this.router.get("/users/images/:imageName", this.getImageFile);
    }

    // POST http://localhost:4000/api/register --> Register new user, return token:
    private async register(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            request.body.image = request.files?.image;
            const user = new UserModel(request.body);
            const token = await authService.register(user);
            response.status(StatusCode.Created).json(token);
        }
        catch (err: any) { next(err); }
    }

    // POST http://localhost:4000/api/login --> Login existing user, return token:
    private async login(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const credentials = new CredentialsModel(request.body);
            const token = await authService.login(credentials);
            response.json(token);
        }
        catch (err: any) { next(err); }
    }

    // GET http://localhost:4000/api/users/images/:imageName
    private async getImageFile(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const imageName = request.params.imageName;
            const imagePath = fileSaver.getFilePath(imageName, false);
            response.sendFile(imagePath); // Response the actual image file.
        }
        catch (err: any) { next(err); }
    }
}

const authController = new AuthController();
export const authRouter = authController.router;
