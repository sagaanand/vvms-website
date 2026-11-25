import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { extractYoutubeId, formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const property = await prisma.property.findFirst({
      where: {
        OR: [{ id: params.id }, { slug: params.id }, { propertyId: params.id }],
      },
    });
    if (!property) {
      return NextResponse.json(
        { success: false, error: "Property not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, property });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch property";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const data: Record<string, unknown> = {};

    const stringFields = [
      "propertyId",
      "slug",
      "title",
      "titleTa",
      "description",
      "descriptionTa",
      "propertyType",
      "listingType",
      "city",
      "locality",
      "address",
      "priceDisplay",
      "downPaymentDisplay",
      "facing",
      "approvalStatus",
      "youtubeUrl",
      "youtubeVideoId",
      "coverImage",
      "seoTitle",
      "seoDescription",
      "seoKeywords",
      "canonicalUrl",
      "aeoSummary",
      "microMarket",
      "nearbyLandmarks",
      "geoSummary",
    ];

    for (const field of stringFields) {
      if (body[field] !== undefined) {
        data[field] = body[field] === "" ? null : String(body[field]).trim();
      }
    }

    if (body.price !== undefined && body.price !== "") {
      const parsedPrice = parseFloat(body.price);
      if (!isNaN(parsedPrice)) {
        data.price = parsedPrice;
        if (!data.priceDisplay) {
          data.priceDisplay = formatPrice(parsedPrice);
        }
      }
    }

    const floatFields = ["downPayment", "plotAreaSqFt", "builtUpAreaSqFt", "latitude", "longitude"];
    for (const field of floatFields) {
      if (body[field] !== undefined) {
        if (body[field] === "" || body[field] === null) {
          if (field !== "plotAreaSqFt") data[field] = null;
        } else {
          const val = parseFloat(body[field]);
          if (!isNaN(val)) data[field] = val;
        }
      }
    }

    const intFields = ["bedrooms", "bathrooms", "roadWidthFt"];
    for (const field of intFields) {
      if (body[field] !== undefined) {
        if (body[field] === "" || body[field] === null) {
          data[field] = null;
        } else {
          const val = parseInt(body[field], 10);
          if (!isNaN(val)) data[field] = val;
        }
      }
    }

    const boolFields = ["bankLoanEligible", "isFeatured", "isSold"];
    for (const field of boolFields) {
      if (body[field] !== undefined) {
        data[field] = Boolean(body[field]);
      }
    }

    if (body.images !== undefined) {
      data.images =
        typeof body.images === "string" ? body.images : JSON.stringify(body.images);
    }
    if (body.features !== undefined) {
      data.features =
        typeof body.features === "string"
          ? body.features
          : JSON.stringify(body.features);
    }
    if (body.aeoFaqs !== undefined) {
      data.aeoFaqs =
        typeof body.aeoFaqs === "string"
          ? body.aeoFaqs
          : JSON.stringify(body.aeoFaqs);
    }

    if (body.youtubeUrl && !body.youtubeVideoId) {
      const extracted = extractYoutubeId(String(body.youtubeUrl));
      if (extracted) data.youtubeVideoId = extracted;
    }

    const property = await prisma.property.update({
      where: { id: params.id },
      data,
    });
    return NextResponse.json({ success: true, property });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update property";
    console.error("Error updating property:", message);
    return NextResponse.json(
      { success: false, error: "Failed to update property", details: message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.property.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete property";
    console.error("Error deleting property:", message);
    return NextResponse.json(
      { success: false, error: "Failed to delete property", details: message },
      { status: 500 }
    );
  }
}
