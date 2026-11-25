import { notFound } from "next/navigation";
import { Metadata } from "next";
import { prisma, ensureDbInitialized } from "@/lib/prisma";
import PropertyDetailClient from "@/components/PropertyDetailClient";
import { PropertyFaqItem } from "@/lib/propertySeo";

export const dynamic = "force-dynamic";

interface PropertyDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  try {
    const properties = await prisma.property.findMany({
      select: { slug: true },
    });
    return properties.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

async function getProperty(slug: string) {
  try {
    await ensureDbInitialized();
    return await prisma.property.findUnique({
      where: { slug },
    });
  } catch (err: unknown) {
    console.error("Database query failed in PropertyDetailPage:", err);
    return null;
  }
}

export async function generateMetadata({
  params,
}: PropertyDetailPageProps): Promise<Metadata> {
  const property = await getProperty(params.slug);

  if (!property) {
    return {
      title: "Property Not Found | Veedu Veettumanai Santhai",
    };
  }

  const title =
    property.seoTitle ||
    `${property.title} | ${property.locality}, Trichy | ${property.priceDisplay}`;
  const description =
    property.seoDescription ||
    property.aeoSummary?.slice(0, 160) ||
    property.description.slice(0, 160);
  const keywords = property.seoKeywords
    ? property.seoKeywords.split(",").map((k) => k.trim())
    : [
        property.propertyType,
        `${property.locality} Trichy`,
        property.approvalStatus,
        "Veedu Veettumanai Santhai",
      ];
  const canonical =
    property.canonicalUrl ||
    `https://imclass.co.in/properties/${property.slug}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      images: [
        {
          url: property.coverImage,
          width: 1200,
          height: 630,
          alt: property.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [property.coverImage],
    },
  };
}

export default async function PropertyDetailPage({
  params,
}: PropertyDetailPageProps) {
  const property = await getProperty(params.slug);

  if (!property) {
    notFound();
  }

  let faqs: PropertyFaqItem[] = [];
  try {
    faqs = property.aeoFaqs ? JSON.parse(property.aeoFaqs) : [];
  } catch {
    faqs = [];
  }

  const baseUrl = "https://imclass.co.in";
  const propertyUrl = property.canonicalUrl || `${baseUrl}/properties/${property.slug}`;

  // 1. GEO & SEO: RealEstateListing + Place + GeoCoordinates JSON-LD
  const listingJsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.seoTitle || property.title,
    description: property.aeoSummary || property.description,
    url: propertyUrl,
    image: property.coverImage,
    datePosted: property.createdAt.toISOString(),
    about: {
      "@type": "SingleFamilyResidence",
      name: property.title,
      address: {
        "@type": "PostalAddress",
        streetAddress: property.address,
        addressLocality: property.locality,
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: property.latitude ?? 10.7905,
        longitude: property.longitude ?? 78.7047,
      },
      floorSize: property.builtUpAreaSqFt
        ? {
            "@type": "QuantitativeValue",
            value: property.builtUpAreaSqFt,
            unitCode: "FTK",
          }
        : undefined,
      numberOfRooms: property.bedrooms || undefined,
    },
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "INR",
      availability: property.isSold
        ? "https://schema.org/SoldOut"
        : "https://schema.org/InStock",
      url: propertyUrl,
    },
  };

  // 2. AEO: FAQPage JSON-LD for Answer Engines (Google AI, Perplexity, ChatGPT)
  const faqJsonLd =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs
            .filter((f) => f.question && f.answer)
            .map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: f.answer,
              },
            })),
        }
      : null;

  // 3. SEO: BreadcrumbList JSON-LD
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Property Marketplace",
        item: `${baseUrl}/properties`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: property.title,
        item: propertyUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listingJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PropertyDetailClient property={property} />
    </>
  );
}
