import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { ALLOWED_IMAGE_TYPES, getUploadDir } from "@/lib/uploads";

export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8 MB

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const rawFiles = formData.getAll("files");
    const singleFile = formData.get("file");

    const files: File[] = [];
    for (const item of rawFiles) {
      if (item instanceof File && item.size > 0) files.push(item);
    }
    if (singleFile instanceof File && singleFile.size > 0) {
      files.push(singleFile);
    }

    if (files.length === 0) {
      return NextResponse.json(
        { success: false, error: "No image files provided." },
        { status: 400 }
      );
    }

    const uploadDir = getUploadDir();
    const uploadedUrls: string[] = [];

    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { success: false, error: `${file.name} exceeds 8 MB limit.` },
          { status: 400 }
        );
      }

      const extFromMime = ALLOWED_IMAGE_TYPES[file.type];
      const extFromName = path.extname(file.name).replace(".", "").toLowerCase();
      const ext = extFromMime || (["jpg", "jpeg", "png", "webp", "avif"].includes(extFromName) ? extFromName : "");

      if (!ext) {
        return NextResponse.json(
          { success: false, error: `Unsupported image type for ${file.name}. Use JPG, PNG, WEBP, or AVIF.` },
          { status: 400 }
        );
      }

      const baseName = path
        .basename(file.name, path.extname(file.name))
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 40) || "property";

      const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}-${baseName}.${ext}`;
      const destPath = path.join(uploadDir, uniqueName);

      const arrayBuffer = await file.arrayBuffer();
      await fs.writeFile(destPath, Buffer.from(arrayBuffer));

      uploadedUrls.push(`/api/uploads/${uniqueName}`);
    }

    return NextResponse.json({
      success: true,
      url: uploadedUrls[0],
      urls: uploadedUrls,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Upload failed";
    console.error("Image upload error:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
