import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import archiver from "archiver";
import unzipper from "unzipper";
import os from "os";

/**
 * Creates a backup of all collections in the given MongoDB database.
 * @param dbName - The name of the database to backup.
 * @returns The path of the generated zip file.
 */
export const backupDatabase = async (dbName: string): Promise<string> => {
  if (!dbName) throw new Error("Database name is required");

  // Connect to the specified database
  const db = mongoose.connection.useDb(dbName);
  const collections = await db.db.listCollections().toArray();

  if (collections.length === 0) throw new Error("No collections found in database");

  // Use the system temp directory
  const backupDir = path.join(os.tmpdir(), "backups", dbName);
  if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });

  // Dump each collection into a JSON file
  for (const collection of collections) {
    const collName = collection.name;
    const data = await db.collection(collName).find().toArray();
    const filePath = path.join(backupDir, `${collName}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  }

  // Create ZIP file in the temp directory
  const zipPath = path.join(os.tmpdir(), `${dbName}.zip`);
  const output = fs.createWriteStream(zipPath);
  const archive = archiver("zip", { zlib: { level: 9 } });

  return new Promise<string>((resolve, reject) => {
    output.on("close", () => resolve(zipPath));
    archive.on("error", (err: any) => reject(err));

    archive.pipe(output);
    archive.directory(backupDir, false);
    archive.finalize();
  });
};


/**
 * Restores a MongoDB database from a zip file backup.
 * @param dbName - The name of the database to restore.
 * @param zipFilePath - Path to the uploaded zip file.
 * @returns A promise resolving to the success message or `undefined` if an error occurs.
 */
export const restoreDatabase = async (dbName: string, fileBuffer: Buffer): Promise<string | undefined> => {
  try {
    if (!fileBuffer) {
      throw new Error("No backup file provided");
    }

    // Connect to the target database
    const db = mongoose.connection.useDb(dbName);

    console.log(`Starting restore for database: ${dbName}`);

    // Extract JSON files from the zip buffer
    const directory = await unzipper.Open.buffer(fileBuffer);

    for (const file of directory.files) {
      if (!file.path.endsWith(".json")) continue; // Skip non-JSON files

      const collectionName = file.path.replace(".json", ""); // Extract collection name
      const collection = db.collection(collectionName);

      // Read file contents into memory
      const content = await file.buffer();
      const data = JSON.parse(content.toString("utf8"));

      console.log(`Restoring collection: ${collectionName} with ${data.length} documents`);

      // Clear existing collection data
      await collection.deleteMany({});

      // Insert new data if not empty
      if (data.length > 0) {
        await collection.insertMany(data);
      }
    }

    console.log("Database restore completed successfully");
    return `Database '${dbName}' restored successfully`;
  } catch (error) {
    console.error("Restore failed:", error);
    return undefined;
  }
};
