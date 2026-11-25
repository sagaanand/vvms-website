export interface PropertyFaqItem {
  question: string;
  answer: string;
}

export interface PropertySeoInput {
  propertyId?: string;
  slug?: string;
  title: string;
  description?: string;
  propertyType: string;
  listingType?: string;
  city?: string;
  locality: string;
  address?: string;
  priceDisplay: string;
  plotAreaSqFt: number | string;
  builtUpAreaSqFt?: number | string | null;
  bedrooms?: number | string | null;
  facing?: string | null;
  roadWidthFt?: number | string | null;
  approvalStatus?: string;
  bankLoanEligible?: boolean;
}

const LOCALITY_COORDS: Record<string, { lat: number; lng: number; microMarket: string; landmarks: string }> = {
  "K.K. Nagar": {
    lat: 10.7686,
    lng: 78.6856,
    microMarket: "K.K. Nagar – Olaiyur Ring Road Residential Corridor",
    landmarks: "Olaiyur Ring Road (1.5 km), Panjappur Integrated Bus Terminus (4.5 km), Trichy International Airport (6.5 km)",
  },
  Olaiyur: {
    lat: 10.7495,
    lng: 78.6725,
    microMarket: "Olaiyur – Ring Road Expansion Zone",
    landmarks: "Panjappur Bus Terminus (3 km), K.K. Nagar (2.5 km), Madurai NH-38 Bypass (1.2 km)",
  },
  Panjappur: {
    lat: 10.7392,
    lng: 78.6594,
    microMarket: "Panjappur Integrated Bus Terminus & IT Park Growth Hub",
    landmarks: "Panjappur Integrated Bus Terminus (1 km), TIDEL Neo IT Park Zone (2 km), Madurai NH-38 (0.8 km)",
  },
  "Vayalur Road": {
    lat: 10.8185,
    lng: 78.6451,
    microMarket: "Vayalur Road – Somarasampettai Green Residential Belt",
    landmarks: "Bishop Heber College (3.5 km), Puthur Four Roads (4 km), Uyyakondan Canal Green Belt (0.5 km)",
  },
  Karumandapam: {
    lat: 10.7852,
    lng: 78.6761,
    microMarket: "Karumandapam – Central Trichy Urban Core",
    landmarks: "Trichy Railway Junction (2.8 km), Central Bus Stand (3 km), Dheeran Nagar (1.2 km)",
  },
  "No.1 Tollgate": {
    lat: 10.8698,
    lng: 78.7029,
    microMarket: "No.1 Tollgate – Chennai NH-45 North Trichy Corridor",
    landmarks: "Kollidam Bridge (1.5 km), Srirangam Temple (3.5 km), Samayapuram Highway (5 km)",
  },
  Mannachanallur: {
    lat: 10.9038,
    lng: 78.7031,
    microMarket: "Mannachanallur – North Trichy Villa & Plot Belt",
    landmarks: "No.1 Tollgate (4.5 km), Samayapuram (6 km), Srirangam (7 km)",
  },
  Thuvakudi: {
    lat: 10.7536,
    lng: 78.8211,
    microMarket: "Thuvakudi – NIT & BHEL Institutional Corridor",
    landmarks: "NIT Trichy (2 km), BHEL Township (1.5 km), Thanjavur NH-83 (0.6 km)",
  },
};

export function generatePropertySlug(title: string, locality: string, propertyId?: string): string {
  const base = `${title}-${locality}-${propertyId || ""}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base || `property-${Date.now()}`;
}

export function generatePropertyOptimization(input: PropertySeoInput) {
  const city = input.city || "Tiruchirappalli";
  const listingWord = input.listingType === "Rent" ? "for Rent" : "for Sale";
  const approval = input.approvalStatus || "DTCP & RERA Approved";
  const locData = LOCALITY_COORDS[input.locality] || {
    lat: 10.7905,
    lng: 78.7047,
    microMarket: `${input.locality}, ${city} Residential & Investment Corridor`,
    landmarks: `${input.locality} Main Road, Trichy City Center, NH Bypass Connectivity`,
  };

  const seoTitle = `${input.title} ${listingWord} in ${input.locality}, Trichy | ${input.priceDisplay}`.slice(0, 70);

  const seoDescription = `${approval} ${input.propertyType} ${listingWord} in ${input.locality}, ${city} at ${input.priceDisplay}. ${input.plotAreaSqFt} sq.ft${input.facing ? `, ${input.facing} facing` : ""}. Verified by Er. J. Vairavel (VVMS).`.slice(0, 160);

  const seoKeywords = [
    `${input.propertyType} in ${input.locality}`,
    `${input.locality} real estate Trichy`,
    `${approval} property Trichy`,
    `Veedu Veettumanai Santhai`,
    `Er J Vairavel`,
    input.propertyId || "",
  ]
    .filter(Boolean)
    .join(", ");

  const aeoSummary = `${input.title} (${input.propertyId || "VVMS Verified"}) is a ${approval} ${input.propertyType.toLowerCase()} ${listingWord.toLowerCase()} in ${input.locality}, ${city}, priced at ${input.priceDisplay} for ${input.plotAreaSqFt} sq.ft${input.builtUpAreaSqFt ? ` (${input.builtUpAreaSqFt} sq.ft built-up)` : ""}. ${input.bankLoanEligible !== false ? "Eligible for up to 80% bank loan with 30-year legal title verification by Er. J. Vairavel." : "Includes 30-year legal title scrutiny by Er. J. Vairavel."}`;

  const aeoFaqs: PropertyFaqItem[] = [
    {
      question: `What is the price and area of ${input.title} in ${input.locality}, Trichy?`,
      answer: `The asking price is ${input.priceDisplay} for a ${input.plotAreaSqFt} sq.ft plot${input.builtUpAreaSqFt ? ` with ${input.builtUpAreaSqFt} sq.ft built-up area` : ""}. Contact Veedu Veettumanai Santhai at +91 73052 00754 for direct owner-level pricing with 0% buyer brokerage.`,
    },
    {
      question: `Is this ${input.propertyType.toLowerCase()} in ${input.locality} DTCP/RERA approved and eligible for bank loan?`,
      answer: `Yes, this property holds ${approval} status with 30-year encumbrance certificate (EC) and parent deed verification by Er. J. Vairavel. ${input.bankLoanEligible !== false ? "Pre-approved bank loans up to 80% are available via SBI, HDFC, and LIC." : "Clear title documentation is available for inspection."}`,
    },
    {
      question: `What are the road width, facing, and nearby landmarks in ${input.locality}?`,
      answer: `This property features ${input.facing ? `${input.facing} facing` : "Vasthu-compliant orientation"}${input.roadWidthFt ? ` on a ${input.roadWidthFt}-ft road` : ""} within the ${locData.microMarket}. Key nearby landmarks include ${locData.landmarks}.`,
    },
    {
      question: `How can I schedule an accompanied site visit with Er. J. Vairavel's team?`,
      answer: `You can book a free accompanied site inspection directly on this page or via WhatsApp (+91 73052 00754). Original DTCP/Patta document copies are shown during the visit.`,
    },
  ];

  const geoSummary = `Located in the ${locData.microMarket} (${city}, Tamil Nadu), ${input.locality} offers strong residential demand and infrastructure appreciation near ${locData.landmarks}.`;

  return {
    seoTitle,
    seoDescription,
    seoKeywords,
    aeoSummary,
    aeoFaqs,
    latitude: locData.lat,
    longitude: locData.lng,
    microMarket: locData.microMarket,
    nearbyLandmarks: locData.landmarks,
    geoSummary,
  };
}
