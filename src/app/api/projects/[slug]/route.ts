import { NextResponse } from "next/server";
import { prisma, ensureDbInitialized } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await ensureDbInitialized();
    const project = await prisma.project.findUnique({
      where: { slug: params.slug },
      include: {
        plots: {
          orderBy: [{ phase: "asc" }, { plotNumber: "asc" }],
        },
      },
    });

    if (!project || (!project.isVisible && !isAdminAuthenticated())) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, project });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch project";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { slug: string } }
) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await ensureDbInitialized();
    const body = await request.json();

    // Update individual plot availability / details if plotUpdate is passed
    if (body.plotUpdate && body.plotUpdate.id) {
      const { id, availability, dimensions, facing, roadWidthFt, notes, areaSqFt } =
        body.plotUpdate;
      const plotData: Record<string, unknown> = {};
      if (availability !== undefined) plotData.availability = String(availability);
      if (dimensions !== undefined) plotData.dimensions = dimensions ? String(dimensions) : null;
      if (facing !== undefined) plotData.facing = facing ? String(facing) : null;
      if (roadWidthFt !== undefined) {
        plotData.roadWidthFt = roadWidthFt ? parseInt(roadWidthFt, 10) : null;
      }
      if (notes !== undefined) plotData.notes = notes ? String(notes) : null;
      if (areaSqFt !== undefined && !isNaN(parseFloat(areaSqFt))) {
        plotData.areaSqFt = parseFloat(areaSqFt);
      }

      const plot = await prisma.projectPlot.update({
        where: { id },
        data: plotData,
      });
      return NextResponse.json({ success: true, plot });
    }

    // Bulk update plot availability for a list of plot IDs
    if (Array.isArray(body.bulkPlotIds) && body.bulkAvailability) {
      await prisma.projectPlot.updateMany({
        where: { id: { in: body.bulkPlotIds } },
        data: { availability: String(body.bulkAvailability) },
      });
      return NextResponse.json({ success: true });
    }

    // Update project fields
    const data: Record<string, unknown> = {};
    const stringFields = [
      "name",
      "tagline",
      "promoterName",
      "category",
      "location",
      "city",
      "approvals",
      "heroImage",
      "masterLayoutImage",
      "brochureUrl",
      "overview",
      "seoTitle",
      "seoDescription",
      "canonicalUrl",
    ];
    for (const f of stringFields) {
      if (body[f] !== undefined) {
        data[f] = body[f] === null ? null : String(body[f]);
      }
    }

    const jsonFields = [
      "galleryImages",
      "youtubeUrls",
      "highlights",
      "amenities",
      "nearbyLocations",
      "extensionInfo",
      "approvedBanks",
      "faqs",
    ];
    for (const f of jsonFields) {
      if (body[f] !== undefined) {
        data[f] = typeof body[f] === "string" ? body[f] : JSON.stringify(body[f]);
      }
    }

    if (body.isVisible !== undefined) data.isVisible = Boolean(body.isVisible);
    if (body.isFlagship !== undefined) data.isFlagship = Boolean(body.isFlagship);

    const project = await prisma.project.update({
      where: { slug: params.slug },
      data,
    });

    return NextResponse.json({ success: true, project });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update project";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
