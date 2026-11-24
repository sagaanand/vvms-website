import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomBar from "@/components/MobileBottomBar";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";

export const metadata: Metadata = {
  metadataBase: new URL("https://imclass.co.in"),
  title: "Veedu Veettumanai Santhai Pvt Ltd | Trichy Real Estate & Turnkey Construction | Er. J. Vairavel",
  description:
    "Official portal of Veedu Veettumanai Santhai Pvt Ltd, founded by Er. J. Vairavel (Civil Engineer). Explore DTCP/RERA plots, luxury villas, and turnkey house construction across Tiruchirappalli (Trichy) with 1,900+ YouTube video walkthroughs.",
  keywords: [
    "Veedu Veettumanai Santhai",
    "Er J Vairavel Trichy",
    "Real Estate Trichy",
    "DTCP Approved Plots Trichy",
    "Individual House for sale Trichy",
    "KK Nagar Olaiyur Ring Road House",
    "Turnkey Construction Trichy",
    "House Construction cost per sqft Trichy",
    "Karumandapam House for sale",
    "Panjappur Bus Stand Plots",
    "Vayalur Road Villas",
  ],
  authors: [{ name: "Er. J. Vairavel", url: "https://imclass.co.in" }],
  openGraph: {
    title: "Veedu Veettumanai Santhai Pvt Ltd | Er. J. Vairavel (Civil Engineer)",
    description:
      "Trichy's most trusted real estate & turnkey construction firm. 125K+ YouTube subscribers, 1,900+ video walkthroughs, and 100% legal scrutiny.",
    url: "https://imclass.co.in",
    siteName: "Veedu Veettumanai Santhai Pvt Ltd",
    images: [
      {
        url: "/images/logo.png",
        width: 800,
        height: 800,
        alt: "Veedu Veettumanai Santhai Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Schemas for local Trichy SEO and AI Search Engines (GPTBot, Perplexity, ClaudeBot)
  const realEstateAgentSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": "https://imclass.co.in/#realestateagent",
    name: "Veedu Veettumanai Santhai Pvt Ltd",
    alternateName: ["வீடு வீட்டுமனை சந்தை", "VVMS", "VVMS Trichy"],
    founder: {
      "@type": "Person",
      name: "Er. J. Vairavel",
      jobTitle: "Founder & Chief Civil Consultant",
      knowsAbout: [
        "Civil Engineering",
        "DTCP Approvals",
        "Trichy Real Estate",
        "Turnkey Construction",
        "Land Due Diligence"
      ]
    },
    url: "https://imclass.co.in",
    logo: "https://imclass.co.in/images/logo.png",
    image: "https://imclass.co.in/images/logo.png",
    telephone: "+91-7305200754",
    email: "contact@veeduveettumanaisanthai.in",
    priceRange: "₹₹ - ₹₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, Cheque, Bank Transfer, Home Loan",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2nd Floor, Valli Tower, Upstairs to SBI Bank 2, Ring Road, K.K. Nagar, Olaiyur",
      addressLocality: "Tiruchirappalli",
      addressRegion: "Tamil Nadu",
      postalCode: "620021",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "10.7656",
      longitude: "78.6948",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "10:00",
      closes: "19:30",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "350",
    },
    sameAs: [
      "https://www.youtube.com/@Veeduveettumanaisandhai",
    ],
  };

  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who is the founder of Veedu Veettumanai Santhai?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Veedu Veettumanai Santhai was founded by Er. J. Vairavel, a registered civil engineer with 10+ years of construction experience and over 125,000 YouTube subscribers across Tamil Nadu."
        }
      },
      {
        "@type": "Question",
        name: "What turnkey construction packages are offered in Trichy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "VVMS offers three turnkey construction packages: Basic Package at ₹1,950/sq.ft, Standard Package at ₹2,250/sq.ft (most popular with 5-year structural warranty), and Premium Luxury at ₹2,650/sq.ft with 10-year warranty."
        }
      },
      {
        "@type": "Question",
        name: "What promoter and developer services does VVMS provide?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "VVMS provides 6 end-to-end B2B services: Channel Partner Representation, Targeted Digital Marketing, AI Lead Qualification, Accompanied Site-Visits, Broker Network Distribution, and Guided Home Construction & Bank Loan Advisory."
        }
      }
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://imclass.co.in/#website",
    url: "https://imclass.co.in",
    name: "Veedu Veettumanai Santhai Pvt Ltd",
    publisher: {
      "@id": "https://imclass.co.in/#realestateagent"
    }
  };

  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#202020" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="author" href="https://imclass.co.in/llms.txt" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateAgentSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-slate-50 text-slate-900 pb-16 md:pb-0">
        <LanguageProvider>
          <ScrollProgress />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <BackToTop />
          <FloatingWhatsApp />
          <MobileBottomBar />
        </LanguageProvider>
      </body>
    </html>
  );
}
