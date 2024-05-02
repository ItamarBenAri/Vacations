import { UserModel } from "../3-models/user-model";
import jwt, { SignOptions } from "jsonwebtoken";
import { appConfig } from "./app-config";
import { RoleModel } from "../3-models/role-model";
import crypto from "crypto";

class Cyber {

    public getNewToken(user: UserModel): string {
        delete user.password;
        if(user.image) delete user.image;
        const container = { user };
        const options: SignOptions = { expiresIn: "5h" }; // Create options with expiry date
        const token = jwt.sign(container, appConfig.jwtSecretKey, options); // Create token
        return token;
    }

    public isTokenValid(token: string): boolean {
        try {
            if (!token) return false; // If no token
            jwt.verify(token, appConfig.jwtSecretKey); // Verify token
            return true; // All is good
        }
        catch (err: any) { // Token is not valid.
            return false;
        }
    }

    public isAdmin(token: string): boolean {
        const container = jwt.decode(token) as { user: UserModel }; // Extract container from token
        const user = container.user; // Extract user from container
        return user.roleId === RoleModel.Admin; // Return true if user is Admin
    }

    public hashPassword(plainText: string): string {
        // SHA = Secured Hashing Algorithm.
        // HMAC = Hash-Based Message Authentication Code 
        const hashedPassword = crypto.createHmac("sha512", appConfig.passwordSalt).update(plainText).digest("hex");
        return hashedPassword;
    }

}

export const cyber = new Cyber();
