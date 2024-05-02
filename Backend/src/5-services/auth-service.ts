import { OkPacketParams } from "mysql2";
import { UserModel } from "../3-models/user-model";
import { dal } from "../2-utils/dal";
import { cyber } from "../2-utils/cyber";
import { CredentialsModel } from "../3-models/credentials-model";
import { UnauthorizedError, ValidationError } from "../3-models/client-errors";
import { RoleModel } from "../3-models/role-model";
import { fileSaver } from "uploaded-file-saver";
import { appConfig } from "../2-utils/app-config";

class AuthService {

    // Register new user:
    public async register(user: UserModel): Promise<string> {
        user.validateInsert(); // Validate
        const isTaken = await this.isEmailTaken(user.email); 
        if (isTaken) { // If email taken
            throw new ValidationError("Email already taken.");
        }
        const imageName = user.image ? await fileSaver.add(user.image) : null; // Save image to hard-disk if image exist
        user.roleId = RoleModel.User; // Init roleId as regular user
        user.password = cyber.hashPassword(user.password); // Hash password
        const sql = "INSERT INTO users(firstName, lastName, email, password, sendPromotionEmails, imageName, roleId) VALUES(?,?,?,?,?,?,?)";
        const info: OkPacketParams = await dal.execute(sql, [user.firstName, user.lastName, user.email, user.password, user.sendPromotionEmails, imageName, user.roleId]); // Execute
        user.id = info.insertId; // Set back auto increment id
        user.imageUrl = appConfig.baseUsersImageUrl + imageName; // Set imageUrl
        const token = cyber.getNewToken(user); // Create new token
        return token;
    }

    // Login existing user:
    public async login(credentials: CredentialsModel): Promise<string> {
        credentials.validate(); // Validate
        credentials.password = cyber.hashPassword(credentials.password); // Hash password for comparing the hashes
        const sql = "SELECT *, CONCAT(?, imageName) as imageUrl FROM users WHERE email = ? AND password = ?";
        const users = await dal.execute(sql, [appConfig.baseUsersImageUrl ,credentials.email, credentials.password]); // Execute
        const user = users[0]; // Extract single user
        if (!user) { // If no such user
            throw new UnauthorizedError("Incorrect email or password.");
        }
        const token = cyber.getNewToken(user); // Create new token
        return token;
    }

    // Is email taken:
    private async isEmailTaken(email: string): Promise<boolean> {
        const sql = "SELECT EXISTS(SELECT * FROM users WHERE email = ?) AS isTaken"; 
        const result = await dal.execute(sql, [email]); // Execute 
        const isTaken = result[0].isTaken; // Extract is taken
        return isTaken === 1;
    }
}

export const authService = new AuthService();
