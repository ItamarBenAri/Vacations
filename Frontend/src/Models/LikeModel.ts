export class LikeModel {
    public userId: number;
    public vacationId: number;
    public isLiked: number;

    public constructor(userId: number, vacationId: number, isLiked: number) {
        this.userId = userId;
        this.vacationId = vacationId;
        this.isLiked = isLiked;
    }
}