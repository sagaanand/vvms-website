"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import { COMPANY_INFO } from "@/lib/constants";
import CostEstimator from "@/components/CostEstimator";
import HeroSlider, { HeroSlide } from "@/components/HeroSlider";
import {
  HardHat,
  MessageCircle,
} from "lucide-react";

export default function ConstructionPage() {
  const { language } = useLanguage();

  const comparisonSpecs = [
    {
      feature: "Civil Construction Rate",
      basic: "₹1,950 / sq.ft",
      standard: "₹2,250 / sq.ft (Popular)",
      premium: "₹2,650 / sq.ft (Luxury)",
    },
    {
      feature: "Cement Brands",
      basic: "Dalmia / Ramco / Chettinad (Grade 53/43)",
      standard: "Ultratech / Ramco Supergrade / Coromandel",
      premium: "Ultratech Super / TATA Tiscon Composite",
    },
    {
      feature: "Steel Rebars (TMT)",
      basic: "iSteel / ARS / Sun TMT (Fe 550D)",
      standard: "TATA Tiscon / JSW Neosteel (Fe 550D)",
      premium: "TATA Tiscon 550D Corrosion Resistant",
    },
    {
      feature: "Flooring Materials",
      basic: "Vitrified Tiles (₹45/sq.ft - 2x2 double charged)",
      standard: "Premium 4x2 GVT Tiles + Granite for staircase",
      premium: "Italian Marble / High-end 6x4 PGVT + Wooden floor",
    },
    {
      feature: "Main Entrance Door",
      basic: "Country Wood frame with flush skin shutter",
      standard: "1st Quality Teak Wood frame & designer door",
      premium: "Solid Burma Teak Wood with Biometric Smart Lock",
    },
    {
      feature: "Internal Windows",
      basic: "Padauk Country Wood frame with pinhead glass",
      standard: "Branded UPVC sliding windows with safety grills",
      premium: "German UPVC / System Aluminium + Mosquito mesh",
    },
    {
      feature: "Sanitaryware & CP",
      basic: "Parryware / Cera basic collection",
      standard: "Jaquar / Kohler sanitaryware & diverters",
      premium: "Kohler / Grohe wall-hung closets & rain showers",
    },
    {
      feature: "Electrical Wiring",
      basic: "Kundhan / Finolex with Anchor Roma switches",
      standard: "Finolex / Havells FR with Legrand/Schneider",
      premium: "Havells / Schneider automated smart touch switches",
    },
    {
      feature: "Interior & Exterior Paint",
      basic: "Asian Tractor Emulsion interior, Ace exterior",
      standard: "Asian Royale Luxury interior, Apex Ultima exterior",
      premium: "Asian Royale Aspira interior, Apex Protek 10-Yr",
    },
    {
      feature: "Clear Ceiling Height",
      basic: "10 Feet clear height",
      standard: "10 Feet 6 Inches clear height",
      premium: "11 Feet grandeur ceiling height",
    },
    {
      feature: "Underground Sump",
      basic: "4,000 Litres RCC Sump",
      standard: "6,000 Litres RCC Sump",
      premium: "10,000 Litres RCC Sump + Rainwater Harvesting",
    },
    {
      feature: "Structural Warranty",
      basic: "1 Year Complete Warranty",
      standard: "5 Years Structural Guarantee",
      premium: "10 Years Full Structural Warranty",
    },
  ];

  const executionSteps = [
    {
      step: "01",
      title: "Soil Test & Architectural 2D/3D Plan",
      desc: "Scientific bearing capacity test of your Trichy plot soil. Custom 2D layout planning by Er. J. Vairavel with 100% Vasthu alignment and 3D front elevation visualization.",
    },
    {
      step: "02",
      title: "DTCP / Corporation Building Approval",
      desc: "End-to-end municipal drawing approval through Trichy City Corporation / Local Planning Authority (LPA). Strict adherence to FSI and setback rules.",
    },
    {
      step: "03",
      title: "Engineered Structural Execution",
      desc: "Anti-termite treated substructure, column footing, plinth beams, and M20/M25 machine-mixed concrete roof slabs with rigorous cube testing and water curing.",
    },
    {
      step: "04",
      title: "Premium Brickwork & Finishing",
      desc: "Table-moulded red bricks or wire-cut bricks, river sand plastering, concealed Finolex conduit wiring, granite door frames, and precision tiling.",
    },
    {
      step: "05",
      title: "Quality Audit & Key Handover",
      desc: "Pre-handover 40-point engineering checklist inspection by Er. J. Vairavel, plumbing pressure test, deep clean, and traditional key handing over ceremony.",
    },
  ];

  const completedProjects = [
    {
      title: "Luxury Duplex Villa - K.K. Nagar",
      locality: "K.K. Nagar Ring Road, Trichy",
      area: "2,400 sq.ft (G+1)",
      package: "Standard Package",
      image: "/images/hero-villa.jpg",
    },
    {
      title: "Modern Contemporary Residence - Olaiyur",
      locality: "Olaiyur Main Road, Trichy",
      area: "1,850 sq.ft (G+1)",
      package: "Standard Package",
      image: "/images/turnkey-home.jpg",
    },
    {
      title: "Architectural Villa - Vayalur Road",
      locality: "Somarasampettai, Vayalur Road",
      area: "3,100 sq.ft (G+2)",
      package: "Premium Package",
      image: "/images/villa-interior.jpg",
    },
  ];

  const constructionHeroSlides: HeroSlide[] = [
    {
      image: "/images/turnkey-home.jpg",
      tag: "CIVIL ENGINEERING & TURNKEY HOMES",
      tagColor: "gold",
      title: "Architect-Supervised Construction • Zero Cost Escalations",
      subtitle:
        "Build your custom home on your plot or ours with total transparency. Stage-milestone billing, branded materials (TATA Tiscon, Ultratech), and 10-year structural warranty.",
      primaryCta: {
        label: "Estimate Construction Cost",
        href: "#cost-estimator",
      },
      secondaryCta: {
        label: "WhatsApp Er. J. Vairavel",
        href: `https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent(
          "Hello Er. J. Vairavel, I have a plot in Trichy and want to discuss turnkey construction quotation."
        )}`,
      },
      metrics: [
        { value: "₹1,950", label: "Basic Package / sq.ft" },
        { value: "₹2,250", label: "Standard / sq.ft" },
        { value: "₹2,650", label: "Luxury / sq.ft" },
        { value: "10 Yrs", label: "Structural Guarantee" },
      ],
    },
    {
      image: "/images/blueprint-audit.jpg",
      tag: "GEOTECHNICAL & SOIL AUDITS",
      tagColor: "cyan",
      title: "Scientific Soil Bearing Tests • 100% Vasthu 2D/3D Plans",
      subtitle:
        "Engineered foundations customized for Trichy soil conditions — red gravel, clay, and alluvial zones — with structural safety approvals.",
      metrics: [
        { value: "40 Pts", label: "Pre-Handover Audit" },
        { value: "Fe-550D", label: "Branded Steel" },
        { value: "Grade 53", label: "Portland Cement" },
        { value: "100%", label: "Vasthu Verified" },
      ],
    },
    {
      image: "/images/luxury-interior.jpg",
      tag: "LUXURY INTERIORS & FINISHING",
      tagColor: "emerald",
      title: "Teakwood Entrances & Modular Living • Key Handover on Schedule",
      subtitle:
        "Complete interior woodwork, UPVC sliding windows, Jaquar/Kohler bath fittings, and deep cleaned key handing over on promised dates.",
      metrics: [
        { value: "1st Quality", label: "Teak Wood Frame" },
        { value: "GVT", label: "4x2 Vitrified Tiles" },
        { value: "Jaquar", label: "Concealed Diverters" },
        { value: "On Time", label: "Key Handover" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Visual Preview Notice Banner */}
      <div className="bg-amber-100 border-b border-amber-300 text-amber-950 py-2.5 px-4 text-xs font-semibold">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="bg-amber-600 text-white text-[10px] uppercase font-black px-2 py-0.5 rounded">
              UI/UX Preview
            </span>
            <span>
              {language === "ta"
                ? "கட்டுமானப் பிரிவு முன்னோட்டம் • Er. J. வைரவேலின் சிவில் இன்ஜினியரிங் தர விவரங்கள்."
                : "Construction Division Visual Preview • Civil engineering specifications & turnkey estimation."}
            </span>
          </div>
          <span className="hidden md:inline text-amber-800 text-[11px] font-bold">
            Custom Quotation & BOQ
          </span>
        </div>
      </div>

      {/* Hero Visual Slider */}
      <HeroSlider
        slides={constructionHeroSlides}
        heightClass="min-h-[560px] sm:min-h-[620px] lg:min-h-[680px]"
      />

      {/* Side-by-Side Comparison Table of Packages */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-gold-600 font-black text-xs uppercase tracking-wider block mb-1">
            Material Specifications
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-brand-black tracking-tight">
            Compare Our Construction Packages
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">
            Every specification is explicitly documented in the legal construction contract with batch receipts and test certificates.
          </p>
        </div>

        {/* Responsive Comparison Table */}
        <div className="bg-white rounded-3xl border-2 border-gold-400/40 shadow-xl overflow-hidden overflow-x-auto touch-scroll">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-brand-black text-white">
                <th className="p-4 sm:p-5 font-black uppercase text-xs tracking-wider w-1/4">
                  Specification Item
                </th>
                <th className="p-4 sm:p-5 font-bold w-1/4 text-slate-200 bg-brand-dark">
                  <div className="text-sm sm:text-base font-black text-white">Basic Package</div>
                  <div className="text-xs text-gold-400 font-bold">₹1,950 / sq.ft</div>
                </th>
                <th className="p-4 sm:p-5 font-bold w-1/4 text-white bg-gold-500/20 border-x-2 border-gold-400 relative">
                  <span className="absolute top-2 right-2 bg-gradient-to-r from-gold-500 to-amber-500 text-brand-black text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow-md">
                    Most Popular
                  </span>
                  <div className="text-sm sm:text-base font-black text-white">Standard Package</div>
                  <div className="text-xs text-gold-400 font-black">₹2,250 / sq.ft</div>
                </th>
                <th className="p-4 sm:p-5 font-bold w-1/4 text-slate-200 bg-brand-dark">
                  <div className="text-sm sm:text-base font-black text-white">Premium Package</div>
                  <div className="text-xs text-cyan-400 font-bold">₹2,650 / sq.ft</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {comparisonSpecs.map((spec, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-slate-50/60" : "bg-white"}>
                  <td className="p-4 sm:p-5 font-black text-brand-black text-xs sm:text-sm">
                    {spec.feature}
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600 text-xs leading-relaxed font-medium">
                    {spec.basic}
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-slate-900 bg-gold-50/40 border-x-2 border-gold-200 text-xs leading-relaxed">
                    {spec.standard}
                  </td>
                  <td className="p-4 sm:p-5 text-slate-800 text-xs leading-relaxed font-semibold">
                    {spec.premium}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 5-Step Execution Timeline in Logo Brand Black */}
      <section className="py-14 sm:py-20 bg-brand-black text-white border-y-2 border-gold-500/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-gold-400 font-black text-xs uppercase tracking-wider block mb-1">
              Engineering Workflow
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              5-Step Construction Process
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 font-medium">
              From soil testing to key handover, Er. J. Vairavel personally supervises structural integrity and quality checks at every milestone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {executionSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-brand-dark rounded-3xl p-5 border border-slate-700 relative space-y-3 flex flex-col justify-between hover:border-gold-500 transition shadow-lg"
              >
                <div>
                  <div className="text-3xl font-black text-gold-400 mb-2">
                    {step.step}
                  </div>
                  <h3 className="font-black text-white text-sm leading-snug mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Completed Projects Showcase Gallery */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-cyan-600 font-black text-xs uppercase tracking-wider block mb-1">
            Proven Track Record
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-brand-black tracking-tight">
            Completed Turnkey Projects in Trichy
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">
            Explore homes built under our supervision across K.K. Nagar, Olaiyur, and Vayalur Road.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {completedProjects.map((proj, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-gold-400 shadow-card hover:shadow-gold transition flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] bg-slate-100">
                <Image
                  src={proj.image}
                  alt={proj.title}
                  fill
                  className="object-cover"
                />
                <span className="absolute top-3 left-3 bg-brand-black text-gold-400 text-xs font-black px-3 py-1 rounded-xl border border-gold-400/40">
                  {proj.package}
                </span>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="font-black text-slate-900 text-base">{proj.title}</h3>
                <div className="text-xs text-slate-500 font-medium">{proj.locality}</div>
                <div className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg inline-block border border-emerald-200">
                  Built-Up: {proj.area}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Turnkey Estimator */}
      <CostEstimator />
    </div>
  );
}
