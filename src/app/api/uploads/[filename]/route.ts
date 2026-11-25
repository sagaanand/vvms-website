import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { getUploadDir, MIME_BY_EXT } from "@/lib/uploads";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: { filename: string } }
) {
  try {
    const safeName = path.basename(params.filename);
    const uploadDir = getUploadDir();
    const filePath = path.join(uploadDir, safeName);

    const buffer = await fs.readFile(filePath);
    const ext = path.extname(safeName).toLowerCase();
    const contentType = MIME_BY_EXT[ext] || "application/octet-stream";

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }
}
