import fsPromises from "fs/promises";

class Logger {

    private filePath = "errors.log";

    public async logError(err: any): Promise<void> {
        const now = new Date();
        const content = `Time: ${now}\nMessage: ${err.message || "No Info"}\nStack: ${err.stack || "No Info"}\n---------------------------------------\n\n`
        fsPromises.appendFile(this.filePath, content); // Append to file or create if file not exist
    }
}

export const logger = new Logger();
