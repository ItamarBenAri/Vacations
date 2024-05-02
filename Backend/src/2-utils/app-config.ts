import dotenv from "dotenv";

// Load ".env" file into process.env object:
dotenv.config();

class AppConfig {
    public readonly isDevelopment = process.env.ENVIRONMENT === "development";
    public readonly isProduction = process.env.ENVIRONMENT === "production";
    public readonly port = process.env.PORT;
    public readonly mysqlHost = process.env.MYSQL_HOST;
    public readonly mysqlUser = process.env.MYSQL_USER;
    public readonly mysqlPassword = process.env.MYSQL_PASSWORD;
    public readonly mysqlDatabase = process.env.MYSQL_DATABASE;
    public readonly jwtSecretKey = process.env.JWT_SECRET_KEY;
    public readonly passwordSalt = process.env.PASSWORD_SALT;
    public readonly baseVacationsImageUrl = process.env.BASE_VACATIONS_IMAGE_URL;
    public readonly baseUsersImageUrl = process.env.BASE_USERS_IMAGE_URL;
}

export const appConfig = new AppConfig();
