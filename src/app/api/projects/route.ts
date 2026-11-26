import { NextResponse } from "next/server";
import { prisma, ensureDbInitialized } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await ensureDbInitialized();
    const projects = await prisma.project.findMany({
      where: isAdminAuthenticated() ? {} : { isVisible: true },
      orderBy: [{ isFlagship: "desc" }, { createdAt: "desc" }],
      include: {
        _count: {
          select: { plots: true },
        },
      },
    });
    return NextResponse.json({ success: true, projects });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch projects";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
