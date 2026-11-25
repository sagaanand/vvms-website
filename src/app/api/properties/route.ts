import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  generatePropertyOptimization,
  generatePropertySlug,
} from "@/lib/propertySeo";
import { formatPrice, extractYoutubeId } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locality = searchParams.get("locality");
    const propertyType = searchParams.get("propertyType");
    const listingType = searchParams.get("listingType");
    const city = searchParams.get("city");
    const featured = searchParams.get("featured");
    const maxPrice = searchParams.get("maxPrice");
    const minPrice = searchParams.get("minPrice");
    const search = searchParams.get("search")?.trim();
    const sort = searchParams.get("sort") || "newest";

    const where: Record<string, unknown> = {};
    if (locality && locality !== "All") where.locality = locality;
    if (propertyType && propertyType !== "All") where.propertyType = propertyType;
    if (listingType && listingType !== "All") where.listingType = listingType;
    if (city && city !== "All") where.city = city;
    if (featured === "true") where.isFeatured = true;

    if (minPrice || maxPrice) {
      const priceFilter: Record<string, number> = {};
      if (minPrice) priceFilter.gte = parseFloat(minPrice);
      if (maxPrice) priceFilter.lte = parseFloat(maxPrice);
      where.price = priceFilter;
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { locality: { contains: search } },
        { propertyId: { contains: search } },
        { address: { contains: search } },
        { microMarket: { contains: search } },
      ];
    }

    let orderBy: Record<string, "asc" | "desc"> = { createdAt: "desc" };
    if (sort === "price-asc") orderBy = { price: "asc" };
    if (sort === "price-desc") orderBy = { price: "desc" };

    const properties = await prisma.property.findMany({
      where,
      orderBy,
    });

    return NextResponse.json({ success: true, properties });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Database query failed";
    console.error("Error fetching properties:", message);
    return NextResponse.json(
      { success: false, properties: [], error: message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const title = String(body.title || "").trim();
    const locality = String(body.locality || "K.K. Nagar").trim();
    const propertyType = String(body.propertyType || "Individual Houses").trim();
    const rawPrice = parseFloat(body.price);
    const rawPlotArea = parseFloat(body.plotAreaSqFt || "0");

    if (!title || isNaN(rawPrice) || rawPrice <= 0) {
      return NextResponse.json(
        { success: false, error: "Title and a valid numeric price are required." },
        { status: 400 }
      );
    }

    const propertyId =
      String(body.propertyId || "").trim() ||
      `VVS-TRY-${Math.floor(100 + Math.random() * 900)}`;

    const slug =
      String(body.slug || "").trim() ||
      generatePropertySlug(title, locality, propertyId);

    const priceDisplay =
      String(body.priceDisplay || "").trim() || formatPrice(rawPrice);

    const youtubeUrl = body.youtubeUrl ? String(body.youtubeUrl).trim() : null;
    const youtubeVideoId =
      (body.youtubeVideoId ? String(body.youtubeVideoId).trim() : "") ||
      (youtubeUrl ? extractYoutubeId(youtubeUrl) : "") ||
      null;

    const coverImage =
      String(body.coverImage || "").trim() ||
      (youtubeVideoId
        ? `https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`
        : "/images/hero-villa.jpg");

    const builtUpAreaSqFt = body.builtUpAreaSqFt
      ? parseFloat(body.builtUpAreaSqFt) || null
      : null;
    const downPayment = body.downPayment
      ? parseFloat(body.downPayment) || null
      : null;
    const bedrooms = body.bedrooms ? parseInt(body.bedrooms, 10) || null : null;
    const bathrooms = body.bathrooms ? parseInt(body.bathrooms, 10) || null : null;
    const roadWidthFt = body.roadWidthFt
      ? parseInt(body.roadWidthFt, 10) || null
      : null;

    const approvalStatus = String(
      body.approvalStatus || "DTCP & RERA Approved"
    ).trim();
    const bankLoanEligible = body.bankLoanEligible !== false;

    const defaults = generatePropertyOptimization({
      propertyId,
      slug,
      title,
      description: body.description,
      propertyType,
      listingType: body.listingType || "Buy",
      city: body.city || "Tiruchirappalli",
      locality,
      address: body.address,
      priceDisplay,
      plotAreaSqFt: rawPlotArea || 1200,
      builtUpAreaSqFt,
      bedrooms,
      facing: body.facing,
      roadWidthFt,
      approvalStatus,
      bankLoanEligible,
    });

    const aeoFaqs =
      typeof body.aeoFaqs === "string"
        ? body.aeoFaqs
        : Array.isArray(body.aeoFaqs)
        ? JSON.stringify(body.aeoFaqs)
        : JSON.stringify(defaults.aeoFaqs);

    const images =
      typeof body.images === "string"
        ? body.images
        : Array.isArray(body.images)
        ? JSON.stringify(body.images)
        : JSON.stringify([coverImage]);

    const features =
      typeof body.features === "string"
        ? body.features
        : Array.isArray(body.features)
        ? JSON.stringify(body.features)
        : JSON.stringify([
            approvalStatus,
            body.facing ? `${body.facing} Facing` : "Vasthu Compliant",
            bankLoanEligible ? "Bank Loan Ready" : "Clear Title",
          ]);

    const property = await prisma.property.create({
      data: {
        propertyId,
        slug,
        title,
        titleTa: body.titleTa ? String(body.titleTa).trim() : null,
        description:
          String(body.description || "").trim() || defaults.aeoSummary,
        descriptionTa: body.descriptionTa
          ? String(body.descriptionTa).trim()
          : null,
        propertyType,
        listingType: String(body.listingType || "Buy").trim(),
        city: String(body.city || "Tiruchirappalli").trim(),
        locality,
        address:
          String(body.address || "").trim() ||
          `${locality}, Tiruchirappalli, Tamil Nadu`,
        price: rawPrice,
        priceDisplay,
        downPayment,
        downPaymentDisplay: body.downPaymentDisplay
          ? String(body.downPaymentDisplay).trim()
          : null,
        plotAreaSqFt: rawPlotArea || 1200,
        builtUpAreaSqFt,
        bedrooms,
        bathrooms,
        facing: body.facing ? String(body.facing).trim() : null,
        roadWidthFt,
        approvalStatus,
        bankLoanEligible,
        youtubeUrl,
        youtubeVideoId,
        coverImage,
        images,
        features,
        isFeatured: Boolean(body.isFeatured),
        isSold: Boolean(body.isSold),

        // Editable SEO
        seoTitle: String(body.seoTitle || "").trim() || defaults.seoTitle,
        seoDescription:
          String(body.seoDescription || "").trim() || defaults.seoDescription,
        seoKeywords:
          String(body.seoKeywords || "").trim() || defaults.seoKeywords,
        canonicalUrl: body.canonicalUrl
          ? String(body.canonicalUrl).trim()
          : null,

        // Editable AEO
        aeoSummary: String(body.aeoSummary || "").trim() || defaults.aeoSummary,
        aeoFaqs,

        // Editable GEO
        latitude:
          body.latitude !== undefined && body.latitude !== "" && body.latitude !== null
            ? parseFloat(body.latitude)
            : defaults.latitude,
        longitude:
          body.longitude !== undefined && body.longitude !== "" && body.longitude !== null
            ? parseFloat(body.longitude)
            : defaults.longitude,
        microMarket:
          String(body.microMarket || "").trim() || defaults.microMarket,
        nearbyLandmarks:
          String(body.nearbyLandmarks || "").trim() || defaults.nearbyLandmarks,
        geoSummary: String(body.geoSummary || "").trim() || defaults.geoSummary,
      },
    });

    return NextResponse.json({ success: true, property }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create property";
    console.error("Error creating property:", message);
    return NextResponse.json(
      { success: false, error: "Failed to create property", details: message },
      { status: 500 }
    );
  }
}
