import { PrismaClient } from "@prisma/client";
import fs from "fs";
import os from "os";
import path from "path";
import {
  AUREON_BREEZE_EXTENSION_PLOTS,
  AUREON_BREEZE_PLOTS,
  AUREON_BREEZE_SEED,
} from "@/lib/aureonBreezeData";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  schemaReady: Promise<void> | undefined;
};

function resolveDatabaseUrl(): string {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }
  const dataDir = path.join(os.homedir(), ".vvms-data");
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
  } catch {
    const tmpDir = "/tmp/vvms-data";
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }
    return `file:${path.join(tmpDir, "vvms.db")}`;
  }
  return `file:${path.join(dataDir, "vvms.db")}`;
}

const resolvedUrl = resolveDatabaseUrl();

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: resolvedUrl,
      },
    },
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

const TABLE_STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS "Property" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "propertyId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "titleTa" TEXT,
    "description" TEXT NOT NULL,
    "descriptionTa" TEXT,
    "propertyType" TEXT NOT NULL,
    "listingType" TEXT NOT NULL DEFAULT 'Buy',
    "city" TEXT NOT NULL DEFAULT 'Tiruchirappalli',
    "locality" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "priceDisplay" TEXT NOT NULL,
    "downPayment" REAL,
    "downPaymentDisplay" TEXT,
    "plotAreaSqFt" REAL NOT NULL,
    "builtUpAreaSqFt" REAL,
    "bedrooms" INTEGER,
    "bathrooms" INTEGER,
    "facing" TEXT,
    "roadWidthFt" INTEGER,
    "approvalStatus" TEXT NOT NULL,
    "bankLoanEligible" BOOLEAN NOT NULL DEFAULT true,
    "youtubeUrl" TEXT,
    "youtubeVideoId" TEXT,
    "coverImage" TEXT NOT NULL,
    "images" TEXT NOT NULL,
    "features" TEXT NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isSold" BOOLEAN NOT NULL DEFAULT false,
    "viewsCount" INTEGER NOT NULL DEFAULT 0,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "seoKeywords" TEXT,
    "canonicalUrl" TEXT,
    "aeoSummary" TEXT,
    "aeoFaqs" TEXT,
    "latitude" REAL,
    "longitude" REAL,
    "microMarket" TEXT,
    "nearbyLandmarks" TEXT,
    "geoSummary" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "Property_propertyId_key" ON "Property"("propertyId")`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "Property_slug_key" ON "Property"("slug")`,
  `CREATE TABLE IF NOT EXISTS "Lead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "leadType" TEXT NOT NULL,
    "propertyId" TEXT,
    "propertyTitle" TEXT,
    "budget" TEXT,
    "preferredLocality" TEXT,
    "timeline" TEXT,
    "plotLocation" TEXT,
    "builtUpArea" REAL,
    "selectedPackage" TEXT,
    "message" TEXT,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "source" TEXT NOT NULL DEFAULT 'WEBSITE',
    "purpose" TEXT,
    "preferredPlotSize" TEXT,
    "preferredVisitDate" TEXT,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "landingPage" TEXT,
    "referrer" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS "ConstructionPackage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "nameTa" TEXT NOT NULL,
    "ratePerSqFt" REAL NOT NULL,
    "description" TEXT NOT NULL,
    "descriptionTa" TEXT,
    "cementBrand" TEXT NOT NULL,
    "steelBrand" TEXT NOT NULL,
    "flooringType" TEXT NOT NULL,
    "sanitaryware" TEXT NOT NULL,
    "electrical" TEXT NOT NULL,
    "woodwork" TEXT NOT NULL,
    "painting" TEXT NOT NULL,
    "ceilingHeight" TEXT NOT NULL,
    "features" TEXT NOT NULL,
    "isPopular" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS "PromotionRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ownerName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "propertyType" TEXT NOT NULL,
    "locality" TEXT NOT NULL,
    "city" TEXT NOT NULL DEFAULT 'Tiruchirappalli',
    "askingPrice" TEXT NOT NULL,
    "plotAreaSqFt" REAL,
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tagline" TEXT,
    "promoterName" TEXT NOT NULL DEFAULT 'VVMS Showcase Project',
    "category" TEXT NOT NULL DEFAULT 'Premium Gated Community Residential Villa Plots',
    "location" TEXT NOT NULL,
    "city" TEXT NOT NULL DEFAULT 'Tiruchirappalli',
    "approvals" TEXT NOT NULL DEFAULT '',
    "isFlagship" BOOLEAN NOT NULL DEFAULT false,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "heroImage" TEXT NOT NULL DEFAULT '',
    "masterLayoutImage" TEXT,
    "brochureUrl" TEXT,
    "galleryImages" TEXT NOT NULL DEFAULT '[]',
    "youtubeUrls" TEXT NOT NULL DEFAULT '[]',
    "overview" TEXT NOT NULL DEFAULT '',
    "highlights" TEXT NOT NULL DEFAULT '[]',
    "amenities" TEXT NOT NULL DEFAULT '[]',
    "nearbyLocations" TEXT NOT NULL DEFAULT '{}',
    "extensionInfo" TEXT NOT NULL DEFAULT '{}',
    "approvedBanks" TEXT NOT NULL DEFAULT '[]',
    "faqs" TEXT NOT NULL DEFAULT '[]',
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "canonicalUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "Project_slug_key" ON "Project"("slug")`,
  `CREATE TABLE IF NOT EXISTS "ProjectPlot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "phase" TEXT NOT NULL,
    "plotNumber" TEXT NOT NULL,
    "areaSqFt" REAL NOT NULL,
    "dimensions" TEXT,
    "facing" TEXT,
    "roadWidthFt" INTEGER,
    "category" TEXT,
    "availability" TEXT NOT NULL DEFAULT 'ENQUIRE',
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ProjectPlot_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "ProjectPlot_projectId_phase_plotNumber_key" ON "ProjectPlot"("projectId", "phase", "plotNumber")`,
];

const LEAD_EXTRA_COLUMNS = [
  "purpose",
  "preferredPlotSize",
  "preferredVisitDate",
  "utmSource",
  "utmMedium",
  "utmCampaign",
  "landingPage",
  "referrer",
];

async function seedFlagshipProjectIfMissing() {
  let project = await prisma.project.findUnique({
    where: { slug: "aureon-breeze" },
  });

  if (!project) {
    project = await prisma.project.create({
      data: AUREON_BREEZE_SEED,
    });
  } else if (
    !project.heroImage ||
    !project.overview ||
    project.promoterName.toLowerCase().includes("chozha") ||
    project.overview.toLowerCase().includes("chozha")
  ) {
    project = await prisma.project.update({
      where: { id: project.id },
      data: AUREON_BREEZE_SEED,
    });
  }

  const plotCount = await prisma.projectPlot.count({
    where: { projectId: project.id },
  });
  if (plotCount === 0) {
    const allPlots = [...AUREON_BREEZE_PLOTS, ...AUREON_BREEZE_EXTENSION_PLOTS];
    for (const p of allPlots) {
      await prisma.projectPlot.create({
        data: {
          projectId: project.id,
          phase: p.phase,
          plotNumber: p.plotNumber,
          areaSqFt: p.areaSqFt,
          category: p.category || null,
          availability: "ENQUIRE",
        },
      });
    }
  }
}

export async function ensureDbInitialized(): Promise<void> {
  if (!resolvedUrl.startsWith("file:")) return;
  if (!globalForPrisma.schemaReady) {
    globalForPrisma.schemaReady = (async () => {
      try {
        for (const stmt of TABLE_STATEMENTS) {
          await prisma.$executeRawUnsafe(stmt);
        }
        for (const col of LEAD_EXTRA_COLUMNS) {
          try {
            await prisma.$executeRawUnsafe(
              `ALTER TABLE "Lead" ADD COLUMN "${col}" TEXT`
            );
          } catch {
            // Column already exists
          }
        }
        await seedFlagshipProjectIfMissing();
      } catch (err) {
        globalForPrisma.schemaReady = undefined;
        console.error("Failed to initialize SQLite tables:", err);
      }
    })();
  }
  await globalForPrisma.schemaReady;
}

export default prisma;
