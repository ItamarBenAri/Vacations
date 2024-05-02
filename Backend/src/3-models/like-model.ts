import Joi from "joi";
import { ValidationError } from "./client-errors";

export class LikeModel {
    public userId: number;
    public vacationId: number;
    public isLiked: number;

    public constructor(like: LikeModel) { 
        this.userId = like.userId;
        this.vacationId = like.vacationId;
        this.isLiked = like.isLiked;
    }

    // Create a schema for validating vacation insert:
    private static validationSchema = Joi.object({
        userId: Joi.number().integer().min(0).required(),
        vacationId: Joi.number().integer().min(0).required(),
        isLiked: Joi.number().integer().min(0).max(1).required()
    });

    // Validating current object against the insert schema:
    public validate(): void {
        const result = LikeModel.validationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }
}