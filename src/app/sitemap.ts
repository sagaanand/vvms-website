import { MetadataRoute } from "next";
import { prisma, ensureDbInitialized } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://imclass.co.in";
  const now = new Date();

  const coreRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: "https://veeduveettumanaisanthai.in/projects/aureon-breeze", lastModified: now, changeFrequency: "daily", priority: 0.95 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/business-solutions`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/construction`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/intelligence`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/academy`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/properties`, lastModified: now, changeFrequency: "daily", priority: 0.95 },
    { url: `${baseUrl}/resources`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/offices`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/promote`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
  ];

  const serviceSlugs = [
    "30-year-title-deed-scrutiny",
    "patta-chitta-revenue-audit",
    "fmb-boundary-demarcation",
    "dtcp-rera-approval-verification",
    "soil-bearing-capacity-test",
    "groundwater-potability-audit",
    "property-valuation",
    "turnkey-architectural-vasthu-plan",
    "bank-loan-legal-clearance",
    "construction-boq-audit",
    "direct-negotiation-advisory",
  ];

  const serviceRoutes: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  let propertyRoutes: MetadataRoute.Sitemap = [];
  try {
    await ensureDbInitialized();
    const properties = await prisma.property.findMany({
      select: { slug: true, updatedAt: true },
    });
    propertyRoutes = properties.map((p) => ({
      url: `${baseUrl}/properties/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "daily",
      priority: 0.9,
    }));
  } catch {
    propertyRoutes = [];
  }

  return [...coreRoutes, ...serviceRoutes, ...propertyRoutes];
}
