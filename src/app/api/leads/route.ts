import { NextResponse } from "next/server";
import { prisma, ensureDbInitialized } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/adminAuth";

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
      purpose,
      preferredPlotSize,
      preferredVisitDate,
      utmSource,
      utmMedium,
      utmCampaign,
      landingPage,
      referrer,
    } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and Phone number are required." },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.create({
      data: {
        name: String(name).trim(),
        phone: String(phone).trim(),
        email: email ? String(email).trim() : null,
        leadType: leadType || "General Inquiry",
        propertyId: propertyId || null,
        propertyTitle: propertyTitle || null,
        budget: budget || null,
        preferredLocality: preferredLocality || null,
        timeline: timeline || null,
        plotLocation: plotLocation || null,
        builtUpArea: builtUpArea ? parseFloat(builtUpArea) : null,
        selectedPackage: selectedPackage || null,
        message: message ? String(message).trim() : null,
        source: source || "WEBSITE",
        purpose: purpose || null,
        preferredPlotSize: preferredPlotSize || null,
        preferredVisitDate: preferredVisitDate || null,
        utmSource: utmSource || null,
        utmMedium: utmMedium || null,
        utmCampaign: utmCampaign || null,
        landingPage: landingPage || null,
        referrer: referrer || null,
        status: "NEW",
      },
    });

    return NextResponse.json({ success: true, leadId: lead.id }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to submit lead";
    console.error("Error creating lead:", message);
    return NextResponse.json(
      { error: "Failed to submit lead", details: message },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await ensureDbInitialized();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const leadType = searchParams.get("leadType");

    const where: Record<string, string> = {};
    if (status) where.status = status;
    if (leadType) where.leadType = leadType;

    const leads = await prisma.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, leads });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch leads";
    console.error("Error fetching leads:", message);
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}
