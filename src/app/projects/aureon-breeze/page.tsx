import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma, ensureDbInitialized } from "@/lib/prisma";
import AureonBreezeClient from "@/components/AureonBreezeClient";

export const dynamic = "force-dynamic";

const CANONICAL_URL = "https://veeduveettumanaisanthai.in/projects/aureon-breeze";

export async function generateMetadata(): Promise<Metadata> {
  try {
    await ensureDbInitialized();
    const project = await prisma.project.findUnique({
      where: { slug: "aureon-breeze" },
    });

    const title =
      project?.seoTitle ||
      "AUREON BREEZE – Premium Gated Community Villa Plots in Trichy | VVMS";
    const description =
      project?.seoDescription ||
      "Explore AUREON BREEZE at Fathima Nagar, Trichy–Madurai NH Road. Gated residential villa plots with 3 parks, wide roads, and bank loan support on VVMS.";
    const canonical = project?.canonicalUrl || CANONICAL_URL;
    const ogImage = project?.heroImage || "/images/projects/aureon-breeze/hero.jpg";

    return {
      title,
      description,
      alternates: { canonical },
      openGraph: {
        title,
        description,
        url: canonical,
        type: "website",
        images: [{ url: ogImage, width: 1296, height: 918, alt: "AUREON BREEZE Trichy" }],
      },
    };
  } catch {
    return {
      title: "AUREON BREEZE – Premium Gated Community Villa Plots in Trichy | VVMS",
      alternates: { canonical: CANONICAL_URL },
    };
  }
}

export default async function AureonBreezePage() {
  await ensureDbInitialized();
  const project = await prisma.project.findUnique({
    where: { slug: "aureon-breeze" },
    include: {
      plots: {
        orderBy: [{ phase: "asc" }, { plotNumber: "asc" }],
      },
    },
  });

  if (!project || !project.isVisible) {
    notFound();
  }

  let faqs: { question: string; answer: string }[] = [];
  try {
    faqs = JSON.parse(project.faqs || "[]");
  } catch {
    faqs = [];
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://veeduveettumanaisanthai.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "AUREON BREEZE",
        item: CANONICAL_URL,
      },
    ],
  };

  const faqJsonLd =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <AureonBreezeClient project={project} />
    </>
  );
}
