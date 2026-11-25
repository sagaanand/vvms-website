import fs from "fs";
import os from "os";
import path from "path";

export function getUploadDir(): string {
  if (process.env.UPLOAD_DIR) {
    if (!fs.existsSync(process.env.UPLOAD_DIR)) {
      fs.mkdirSync(process.env.UPLOAD_DIR, { recursive: true });
    }
    return process.env.UPLOAD_DIR;
  }

  const primaryDir = path.join(os.homedir(), ".vvms-data", "uploads");
  try {
    if (!fs.existsSync(primaryDir)) {
      fs.mkdirSync(primaryDir, { recursive: true });
    }
    return primaryDir;
  } catch {
    const tmpDir = "/tmp/vvms-data/uploads";
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }
    return tmpDir;
  }
}

export const ALLOWED_IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

export const MIME_BY_EXT: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
};
