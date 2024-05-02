import { OkPacketParams } from "mysql2";
import { dal } from "../2-utils/dal";
import { VacationModel } from "../3-models/vacation-model";
import { CustomError, ResourceNotFoundError } from "../3-models/client-errors";
import { fileSaver } from "uploaded-file-saver";
import { appConfig } from "../2-utils/app-config";
import { LikeModel } from "../3-models/like-model";

// Vacations service - handling anything with vacations: 
class VacationsService {

    public async getAllVacations(userId: number): Promise<VacationModel[]> {
        const sql = `
            SELECT DISTINCT
            V.*,
            EXISTS(SELECT * FROM likes WHERE vacationId = L.vacationId AND userId = ?) AS isLiked,
            COUNT(L.userId) AS likesCount,
            DATE_FORMAT(startVacation, '%Y-%m-%d') AS startVacation,
            DATE_FORMAT(endVacation, '%Y-%m-%d') AS endVacation,
            CONCAT(? , imageName) as imageUrl
            FROM vacations as V LEFT JOIN likes as L
            ON V.id = L.vacationId
            GROUP BY id
            ORDER BY startVacation
        `;
        const vacations = await dal.execute(sql, [userId, appConfig.baseVacationsImageUrl]); // Execute
        return vacations;
    }

    public async getOneVacation(vacationId: number): Promise<VacationModel> {
        const sql = "SELECT *, DATE_FORMAT(startVacation, '%Y-%m-%d') AS startVacation, DATE_FORMAT(endVacation, '%Y-%m-%d') AS endVacation, CONCAT(? , imageName) as imageUrl FROM vacations WHERE id = ?";
        const vacations = await dal.execute(sql, [appConfig.baseVacationsImageUrl, vacationId]); // Execute
        const vacation = vacations[0]; // Extract single product
        if (!vacation) { // If vacation doesn't exist - go to catch-all
            throw new ResourceNotFoundError(vacationId);
        }
        return vacation;
    }

    public async addVacation(vacation: VacationModel): Promise<VacationModel> {
        vacation.validateInsert(); // Validate
        const imageName = await fileSaver.add(vacation.image); // Save image to hard-disk
        const sql = "INSERT INTO vacations(destination, description, startVacation, endVacation, price, imageName) VALUES(?,?,?,?,?,?)";
        const info: OkPacketParams = await dal.execute(sql, [vacation.destination, vacation.description, vacation.startVacation, vacation.endVacation, vacation.price, imageName]); // Execute
        vacation = await this.getOneVacation(info.insertId); // Get added vacation from the database
        return vacation;
    }

    public async updateVacation(vacation: VacationModel): Promise<VacationModel> {
        vacation.validateUpdate(); // Validate 
        const oldImageName = await this.getImageName(vacation.id); // Get old image name 
        const newImageName = vacation.image && oldImageName ? await fileSaver.update(oldImageName, vacation.image) : oldImageName; // Update image in the hard-disk and don't save the image while id does'nt exist
        const sql = "UPDATE vacations SET destination = ?, description = ?, startVacation = ?, endVacation = ?, price = ?, imageName = ? WHERE id = ?";
        const info: OkPacketParams = await dal.execute(sql, [vacation.destination, vacation.description, vacation.startVacation, vacation.endVacation, vacation.price, newImageName, vacation.id]); // Execute
        if (info.affectedRows === 0) { // If vacation doesn't exist - go to catch-all
            throw new ResourceNotFoundError(vacation.id);
        }
        vacation = await this.getOneVacation(vacation.id); // Get updated vacation from the database
        return vacation;
    }

    public async deleteVacation(vacationId: number): Promise<void> {
        const imageName = await this.getImageName(vacationId); // Get image name from database for later delete
        const sql = "DELETE FROM vacations WHERE id = ?";
        const info: OkPacketParams = await dal.execute(sql, [vacationId]); // Execute
        if (info.affectedRows === 0) { // If vacation doesn't exist - go to catch-all
            throw new ResourceNotFoundError(vacationId);
        }
        await fileSaver.delete(imageName); // Delete image from hard-disk
    }

    // Get image name from database: 
    private async getImageName(id: number): Promise<string> {
        const sql = "SELECT imageName FROM vacations WHERE id = ?"; 
        const vacations = await dal.execute(sql, [id]); // Execute 
        const vacation = vacations[0]; // Extract vacation
        if (!vacation) return null; // Return null if not found 
        const imageName = vacation.imageName; // Extract imageName
        return imageName;
    }

    public async addLike(like: LikeModel): Promise<LikeModel> {
        like.validate(); // Validate
        const likeExist = await this.isLikeExist(like.userId, like.vacationId);
        if(likeExist) { // If like exist - go to catch-all
            throw new CustomError("Like already exist for this vacation.");
        }
        const sql = "INSERT INTO likes(userId, vacationId) VALUES (?,?)"; 
        await dal.execute(sql, [like.userId, like.vacationId]);
        like = await this.getLikeOfUserVacation(like.userId, like.vacationId);
        return like;
    }
    
    public async removeLike(userId: number, vacationId: number): Promise<void> {
        const sql = "DELETE FROM likes WHERE (userId = ?) AND (vacationId = ?)";   
        const info: OkPacketParams = await dal.execute(sql, [userId, vacationId]); // Execute
        if (info.affectedRows === 0) { // If like doesn't exist - go to catch-all
            throw new CustomError("Like not found.");
        }
    }

    private async getLikeOfUserVacation(userId: number, vacationId: number): Promise<LikeModel> {
        const sql = "SELECT * FROM likes WHERE (userId = ?) AND (vacationId = ?)";
        const likes = await dal.execute(sql, [userId, vacationId]); // Execute
        const like = likes[0]; // Extract like
        if(!likes) { // If like doesn't exist - go to catch-all
            throw new CustomError("Like not found");
        }
        return like;
    }

    private async isLikeExist(userId: number, vacationId: number): Promise<boolean> {
        const sql = "SELECT * FROM likes WHERE (userId = ?) AND (vacationId = ?)";
        const likes = await dal.execute(sql, [userId, vacationId]); // Execute
        return likes.length !== 0;
    }
}

export const vacationsService = new VacationsService();
