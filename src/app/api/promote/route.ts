import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { ownerName, phone, email, propertyType, locality, askingPrice, plotAreaSqFt, notes } = body;

    if (!ownerName || !phone || !locality) {
      return NextResponse.json(
        { error: "Name, Phone and Locality are required." },
        { status: 400 }
      );
    }

    const promotion = await prisma.promotionRequest.create({
      data: {
        ownerName,
        phone,
        email: email || null,
        propertyType: propertyType || "Layout / Plots",
        locality,
        city: "Tiruchirappalli",
        askingPrice: askingPrice || "Contact for Price",
        plotAreaSqFt: plotAreaSqFt ? parseFloat(plotAreaSqFt) : null,
        notes: notes || null,
        status: "PENDING",
      },
    });

    return NextResponse.json({ success: true, promotion }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating promotion request:", error);
    return NextResponse.json(
      { error: "Failed to submit promotion request", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const promotions = await prisma.promotionRequest.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, promotions });
  } catch (error: any) {
    console.error("Error fetching promotions:", error);
    return NextResponse.json(
      { error: "Failed to fetch promotions" },
      { status: 500 }
    );
  }
}
