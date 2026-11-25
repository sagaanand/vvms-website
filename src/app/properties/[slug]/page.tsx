import { notFound } from "next/navigation";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { FALLBACK_PROPERTIES } from "@/lib/staticProperties";
import PropertyDetailClient from "@/components/PropertyDetailClient";

interface PropertyDetailPageProps {
  params: {
    slug: string;
  };
}

// Pre-render all known properties for instant loading and zero server error risk
export async function generateStaticParams() {
  return FALLBACK_PROPERTIES.map((p) => ({
    slug: p.slug,
  }));
}

async function getProperty(slug: string) {
  try {
    const prop = await prisma.property.findUnique({
      where: { slug },
    });
    if (prop) return prop;
  } catch (err: any) {
    console.warn("Database query failed in PropertyDetailPage, using static fallback:", err?.message || err);
  }
  return FALLBACK_PROPERTIES.find((p) => p.slug === slug) || null;
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

  return {
    title: `${property.title} | ${property.locality}, Trichy | Er. J. Vairavel`,
    description: property.description.slice(0, 160),
    openGraph: {
      title: `${property.title} - ${property.priceDisplay}`,
      description: property.description.slice(0, 160),
      images: [
        {
          url: property.coverImage,
          width: 1200,
          height: 630,
          alt: property.title,
        },
      ],
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

  // JSON-LD RealEstateListing schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SingleFamilyResidence",
    name: property.title,
    description: property.description,
    url: `https://imclass.co.in/properties/${property.slug}`,
    image: property.coverImage,
    address: {
      "@type": "PostalAddress",
      streetAddress: property.address,
      addressLocality: property.locality,
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "10.7905",
      longitude: "78.7047",
    },
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "INR",
      availability: property.isSold
        ? "https://schema.org/Sold"
        : "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PropertyDetailClient property={property} />
    </>
  );
}
