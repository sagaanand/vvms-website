import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locality = searchParams.get("locality");
    const propertyType = searchParams.get("propertyType");
    const city = searchParams.get("city");
    const featured = searchParams.get("featured");
    const maxPrice = searchParams.get("maxPrice");
    const minPrice = searchParams.get("minPrice");
    const sort = searchParams.get("sort") || "newest";

    const where: any = {};
    if (locality && locality !== "All") where.locality = locality;
    if (propertyType && propertyType !== "All") where.propertyType = propertyType;
    if (city && city !== "All") where.city = city;
    if (featured === "true") where.isFeatured = true;

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    let orderBy: any = { createdAt: "desc" };
    if (sort === "price-asc") orderBy = { price: "asc" };
    if (sort === "price-desc") orderBy = { price: "desc" };

    const properties = await prisma.property.findMany({
      where,
      orderBy,
    });

    return NextResponse.json({ success: true, properties });
  } catch (error: any) {
    console.error("Error fetching properties:", error);
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      propertyId,
      slug,
      title,
      titleTa,
      description,
      descriptionTa,
      propertyType,
      listingType,
      city,
      locality,
      address,
      price,
      priceDisplay,
      downPayment,
      downPaymentDisplay,
      plotAreaSqFt,
      builtUpAreaSqFt,
      bedrooms,
      bathrooms,
      facing,
      roadWidthFt,
      approvalStatus,
      bankLoanEligible,
      youtubeUrl,
      youtubeVideoId,
      coverImage,
      images,
      features,
      isFeatured,
    } = body;

    const property = await prisma.property.create({
      data: {
        propertyId,
        slug: slug || propertyId.toLowerCase().replace(/[^a-z0-9]/g, "-"),
        title,
        titleTa: titleTa || null,
        description,
        descriptionTa: descriptionTa || null,
        propertyType,
        listingType: listingType || "Buy",
        city: city || "Tiruchirappalli",
        locality,
        address,
        price: parseFloat(price),
        priceDisplay,
        downPayment: downPayment ? parseFloat(downPayment) : null,
        downPaymentDisplay: downPaymentDisplay || null,
        plotAreaSqFt: parseFloat(plotAreaSqFt),
        builtUpAreaSqFt: builtUpAreaSqFt ? parseFloat(builtUpAreaSqFt) : null,
        bedrooms: bedrooms ? parseInt(bedrooms) : null,
        bathrooms: bathrooms ? parseInt(bathrooms) : null,
        facing: facing || null,
        roadWidthFt: roadWidthFt ? parseInt(roadWidthFt) : null,
        approvalStatus: approvalStatus || "DTCP Approved",
        bankLoanEligible: bankLoanEligible !== false,
        youtubeUrl: youtubeUrl || null,
        youtubeVideoId: youtubeVideoId || null,
        coverImage: coverImage || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
        images: images || "[]",
        features: features || "[]",
        isFeatured: Boolean(isFeatured),
      },
    });

    return NextResponse.json({ success: true, property }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating property:", error);
    return NextResponse.json(
      { error: "Failed to create property", details: error.message },
      { status: 500 }
    );
  }
}
