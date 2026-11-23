import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomBar from "@/components/MobileBottomBar";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export const metadata: Metadata = {
  metadataBase: new URL("https://veeduveettumanaisanthai.in"),
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
  authors: [{ name: "Er. J. Vairavel", url: "https://veeduveettumanaisanthai.in" }],
  openGraph: {
    title: "Veedu Veettumanai Santhai Pvt Ltd | Er. J. Vairavel (Civil Engineer)",
    description:
      "Trichy's most trusted real estate & turnkey construction firm. 125K+ YouTube subscribers, 1,900+ video walkthroughs, and 100% legal scrutiny.",
    url: "https://veeduveettumanaisanthai.in",
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
  // JSON-LD RealEstateAgent Schema for local Trichy SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Veedu Veettumanai Santhai Pvt Ltd",
    alternateName: "வீடு வீட்டுமனை சந்தை",
    founder: {
      "@type": "Person",
      name: "Er. J. Vairavel",
      jobTitle: "Founder & Chief Civil Consultant",
    },
    url: "https://veeduveettumanaisanthai.in",
    logo: "https://veeduveettumanaisanthai.in/images/logo.png",
    image: "https://veeduveettumanaisanthai.in/images/logo.png",
    telephone: "+91-7305200754",
    email: "contact@veeduveettumanaisanthai.in",
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "2nd Floor, Valli Tower, Upstairs to SBI Bank 2, Ring Road, K.K. Nagar, Olaiyur",
        addressLocality: "Tiruchirappalli",
        addressRegion: "Tamil Nadu",
        postalCode: "620021",
        addressCountry: "IN",
      },
    ],
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

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-slate-50 text-slate-900 pb-16 md:pb-0">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingWhatsApp />
          <MobileBottomBar />
        </LanguageProvider>
      </body>
    </html>
  );
}
