export class UserModel {
    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public sendPromotionEmails: Boolean;
    public image: File;
    public imageUrl: string;
    public roleId: number;
}

