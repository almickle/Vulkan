import fs from "node:fs";
import path from "node:path";

class FileManager {
  private baseDir: string;

  constructor() {
    const dir = process.env.FILE_STORAGE_DIR;

    if (!dir) {
      throw new Error(
        `Environment variable FILE_STORAGE_DIR is not set. ` +
          `Please define it to point to your file storage directory.`
      );
    }

    this.baseDir = dir;
  }

  /** Ensure the base directory exists on disk */
  async init(): Promise<void> {
    await fs.promises.mkdir(this.baseDir, { recursive: true });
  }

  /** Build absolute path for a given file id */
  private getFilePath(id: string): string {
    // basic safety: strip leading slashes
    const safeId = id.replace(/^\//, "");
    return path.join(this.baseDir, safeId);
  }

  /** Save a file buffer under the given id */
  async save(id: string, fileBuffer: Buffer): Promise<void> {
    const filePath = this.getFilePath(id);
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
    await fs.promises.writeFile(filePath, fileBuffer);
  }

  /** Read file into a buffer */
  async read(id: string): Promise<Buffer> {
    const filePath = this.getFilePath(id);
    return fs.promises.readFile(filePath);
  }

  /** Check if a file exists */
  async exists(id: string): Promise<boolean> {
    const filePath = this.getFilePath(id);
    try {
      await fs.promises.access(filePath, fs.constants.F_OK);
      return true;
    } catch {
      return false;
    }
  }

  /** Delete a file (no error if missing) */
  async delete(id: string): Promise<void> {
    const filePath = this.getFilePath(id);
    await fs.promises.rm(filePath, { force: true });
  }
}

export const fileManager = new FileManager();
