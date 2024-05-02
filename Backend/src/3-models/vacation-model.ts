import Joi from "joi";
import { ValidationError } from "./client-errors";
import { UploadedFile } from "express-fileupload";

export class VacationModel {

    public id: number;
    public destination: string;
    public description: string;
    public startVacation: string;
    public endVacation: string;
    public price: number;
    public image: UploadedFile;
    public imageUrl: string;
    public isLiked: number;
    public likesCount: number;

    public constructor(vacation: VacationModel) { // Copy Constructor.
        this.id = vacation.id;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startVacation = vacation.startVacation;
        this.endVacation = vacation.endVacation;
        this.price = vacation.price;
        this.image = vacation.image;
        this.imageUrl = vacation.imageUrl;
        this.isLiked = vacation.isLiked;
        this.likesCount = vacation.likesCount;
    }

    // Create a schema for validating vacation insert:
    private static insertValidationSchema = Joi.object({
        id: Joi.number().forbidden(),
        destination: Joi.string().required().min(2).max(50),
        description: Joi.string().required().min(2).max(2000),
        startVacation: Joi.date().required(),
        endVacation: Joi.date().required(),
        price: Joi.number().required().min(0).max(10000),
        image: Joi.object().required(),
        imageUrl: Joi.string().optional().max(200),
        isLiked: Joi.number().forbidden(),
        likesCount: Joi.number().forbidden()
    });

    // Create a schema for validating vacation update:
    private static updateValidationSchema = Joi.object({
        id: Joi.number().required().min(1).integer(),
        destination: Joi.string().required().min(2).max(50),
        description: Joi.string().required().min(2).max(2000),
        startVacation: Joi.date().required(),
        endVacation: Joi.date().required(),
        price: Joi.number().required().min(0).max(10000),
        image: Joi.object().optional(),
        imageUrl: Joi.string().optional().max(200),
        isLiked: Joi.number().forbidden(),
        likesCount: Joi.number().forbidden()
    });

    // Validating current object against the insert schema:
    public validateInsert(): void {
        const result = VacationModel.insertValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }

    // Validating current object against the update schema:
    public validateUpdate(): void {
        const result = VacationModel.updateValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }
}
