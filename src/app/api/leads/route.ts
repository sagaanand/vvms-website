import { NextResponse } from "next/server";
import { prisma, ensureDbInitialized } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    await ensureDbInitialized();
    const body = await request.json();
    const {
      name,
      phone,
      email,
      leadType,
      propertyId,
      propertyTitle,
      budget,
      preferredLocality,
      timeline,
      plotLocation,
      builtUpArea,
      selectedPackage,
      message,
      source,
    } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and Phone number are required." },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        phone,
        email: email || null,
        leadType: leadType || "General Inquiry",
        propertyId: propertyId || null,
        propertyTitle: propertyTitle || null,
        budget: budget || null,
        preferredLocality: preferredLocality || null,
        timeline: timeline || null,
        plotLocation: plotLocation || null,
        builtUpArea: builtUpArea ? parseFloat(builtUpArea) : null,
        selectedPackage: selectedPackage || null,
        message: message || null,
        source: source || "WEBSITE",
        status: "NEW",
      },
    });

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { error: "Failed to submit lead", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    await ensureDbInitialized();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const leadType = searchParams.get("leadType");

    const where: any = {};
    if (status) where.status = status;
    if (leadType) where.leadType = leadType;

    const leads = await prisma.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, leads });
  } catch (error: any) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}
