import * as Helper from "./helper";
import fs from "fs";
import { format } from "date-fns";

/**
 * Express handler to backup a database and return the zip file.
 */
export const backupDatabase = async (req: any, res: any) => {
  try {
    const userId = req.user?.user_id;
    const dbName = `fortuna_${req.params.space}`;

    console.log(`User ${userId} requested backup for ${dbName}`);

    const zipFilePath = await Helper.backupDatabase(dbName);
    console.log("Backup created at:", zipFilePath);

    // Stream the zip file to the client
    const now = new Date();
    const timestamp = format(now, "yyyyMMddHHmm"); // Formats as 'yyyymmddhh24mi'

    res.download(zipFilePath, `${dbName}_${timestamp}.zip`, (err: any) => {
      if (err) {
        console.error("Error sending file:", err);
        res.status(500).json({ error: "Failed to send backup file" });
      }

      // Delete the zip file after sending
      fs.unlink(zipFilePath, (unlinkErr) => {
        if (unlinkErr) console.error("Error deleting temp file:", unlinkErr);
      });
    });
  } catch (error) {
    console.error("Backup failed:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Express handler to restore a database from a zip file.
 */
export const restoreDatabase = async (req: any, res: any) => {
  try {
    const userId = req.user.user_id;
    const dbName = `fortuna_${req.params.space}`;

    if (!req.file) {
      return res.status(400).json({ error: "Backup file is required" });
    }

    console.log(`User ${userId} is restoring backup for ${dbName}`);

    const message = await Helper.restoreDatabase(dbName, req.file.buffer);

    if (!message) {
      return res.status(500).json({ error: "Failed to restore database" });
    }

    res.status(200).json({ message });
  } catch (error) {
    console.error("Restore failed:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};