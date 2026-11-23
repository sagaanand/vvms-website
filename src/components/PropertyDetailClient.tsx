"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { COMPANY_INFO } from "@/lib/constants";
import {
  formatIndianNumber,
  formatPrice,
  getWhatsAppUrl,
  calculateEMI,
  extractYoutubeId,
} from "@/lib/utils";
import {
  MapPin,
  ShieldCheck,
  Play,
  Phone,
  MessageCircle,
  Calculator,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

interface PropertyDetailClientProps {
  property: {
    id: string;
    propertyId: string;
    slug: string;
    title: string;
    titleTa?: string | null;
    description: string;
    descriptionTa?: string | null;
    propertyType: string;
    locality: string;
    address: string;
    price: number;
    priceDisplay: string;
    downPayment?: number | null;
    downPaymentDisplay?: string | null;
    plotAreaSqFt: number;
    builtUpAreaSqFt?: number | null;
    bedrooms?: number | null;
    bathrooms?: number | null;
    facing?: string | null;
    roadWidthFt?: number | null;
    approvalStatus: string;
    bankLoanEligible: boolean;
    youtubeUrl?: string | null;
    youtubeVideoId?: string | null;
    coverImage: string;
    images?: string;
    features?: string;
  };
}

export default function PropertyDetailClient({ property }: PropertyDetailClientProps) {
  const { language } = useLanguage();
  const displayTitle = language === "ta" && property.titleTa ? property.titleTa : property.title;
  const displayDesc = language === "ta" && property.descriptionTa ? property.descriptionTa : property.description;

  const videoId = extractYoutubeId(property.youtubeVideoId || property.youtubeUrl);
  const images: string[] = JSON.parse(property.images || "[]");
  const features: string[] = JSON.parse(property.features || "[]");

  const [activeImage, setActiveImage] = useState<string>(property.coverImage);

  // EMI Calculator State
  const defaultLoanAmount = Math.round(property.price * 0.8);
  const [loanAmount, setLoanAmount] = useState<number>(defaultLoanAmount);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenureYears, setTenureYears] = useState<number>(20);

  const emiResult = calculateEMI(loanAmount, interestRate, tenureYears);

  // Lead Visit Form State
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const whatsappMessage = `Hello Er. J. Vairavel, I am interested in Property ID #${property.propertyId} ("${property.title}") located in ${property.locality}, Trichy for ${property.priceDisplay}. Please arrange a site inspection and share parent document copies.`;
  const whatsappUrl = getWhatsAppUrl(COMPANY_INFO.whatsappRaw, whatsappMessage);

  const handleSiteVisitSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadName,
          phone: leadPhone,
          leadType: "Property Site Visit",
          propertyId: property.propertyId,
          propertyTitle: property.title,
          preferredLocality: property.locality,
          budget: property.priceDisplay,
          message: `Site visit request for ${property.propertyId} (${property.title}). Preferred Date: ${preferredDate || "Immediate"}.`,
          source: "PROPERTY_DETAIL_PAGE",
        }),
      });

      setLeadSubmitted(true);

      const customMsg = `Hello Er. J. Vairavel, I booked a site visit on veeduveettumanaisanthai.in:\n\n• Property ID: ${property.propertyId}\n• Title: ${property.title}\n• Price: ${property.priceDisplay}\n• My Name: ${leadName}\n• Phone: ${leadPhone}\n• Preferred Date: ${preferredDate || "Earliest possible"}`;
      const url = getWhatsAppUrl(COMPANY_INFO.whatsappRaw, customMsg);

      setTimeout(() => {
        window.open(url, "_blank");
      }, 700);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24 lg:pb-16">
      {/* Breadcrumb Navigation Styled with Logo Theme */}
      <div className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-gold-600 transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/properties" className="hover:text-cyan-600 transition">Properties</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-bold truncate">{property.locality}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gold-600 font-black">{property.propertyId}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Visual Preview Notice */}
        <div className="mb-6 p-3 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="bg-amber-600 text-white text-[10px] uppercase font-black px-2 py-0.5 rounded">
              Visual Preview
            </span>
            <span className="font-semibold text-slate-700">
              {language === "ta"
                ? "இந்த சொத்து விவரங்கள் வடிவமைப்பு மாதிரி முன்னோட்டத்திற்காக மட்டுமே காட்டப்படுகின்றன."
                : "This property profile is presented as a realistic demonstration specimen for design review."}
            </span>
          </div>
          <span className="text-[11px] font-bold text-amber-800 hidden sm:inline">
            Sample Demonstration Specimen
          </span>
        </div>

        {/* Title & Price Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-brand-black text-gold-400 font-black text-xs px-3 py-1 rounded-lg border border-gold-400/40 shadow-sm">
                {property.propertyId}
              </span>
              <span className="bg-emerald-700 text-white font-bold text-xs px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-sm border border-emerald-500/30">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span>{property.approvalStatus}</span>
              </span>
              <span className="bg-cyan-50 text-cyan-800 border border-cyan-200 font-bold text-xs px-3 py-1 rounded-lg">
                {property.propertyType}
              </span>
            </div>

            <h1 className="text-xl sm:text-3xl font-black text-brand-black tracking-tight leading-snug">
              {displayTitle}
            </h1>

            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 mt-2 font-medium">
              <MapPin className="w-4 h-4 text-cyan-600 flex-shrink-0" />
              <span>{property.address}</span>
            </div>
          </div>

          {/* Price Box with Gold Accent */}
          <div className="bg-white p-4 sm:p-5 rounded-3xl border-2 border-gold-400/50 shadow-gold flex flex-col items-start lg:items-end">
            <span className="text-xs text-slate-400 uppercase font-black tracking-wider">Asking Price</span>
            <div className="text-2xl sm:text-4xl font-black text-brand-black tracking-tight">
              {property.priceDisplay}
            </div>
            {property.downPaymentDisplay && (
              <div className="mt-1 inline-flex items-center gap-1.5 text-xs text-gold-900 bg-gold-50 px-2.5 py-0.5 rounded-lg font-black border border-gold-300">
                <ShieldCheck className="w-3 h-3 text-gold-600" />
                <span>{property.downPaymentDisplay}</span>
              </div>
            )}
          </div>
        </div>

        {/* 1. RESPONSIVE YOUTUBE WALKTHROUGH VIDEO PLAYER WITH LOGO RED & GOLD */}
        {videoId && (
          <div className="mb-8 rounded-3xl overflow-hidden border-2 border-gold-500/40 shadow-2xl bg-black">
            <div className="bg-brand-black px-4 py-3 text-xs text-slate-300 flex items-center justify-between border-b border-brand-card">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 fill-red-500 text-red-500" />
                <span className="font-black text-white">Official Video Walkthrough by Er. J. Vairavel</span>
              </div>
              <span className="text-[11px] text-gold-400 font-bold">@Veeduveettumanaisandhai</span>
            </div>
            <div className="relative aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                title={property.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        )}

        {/* Photo Gallery Grid */}
        <div className="mb-10 space-y-3">
          <div className="relative aspect-[16/9] max-h-[480px] w-full rounded-3xl overflow-hidden bg-brand-black border border-slate-200 shadow-md">
            <Image
              src={activeImage}
              alt={property.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2 touch-scroll">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-24 h-16 rounded-2xl overflow-hidden border-2 flex-shrink-0 transition ${
                    activeImage === img ? "border-gold-500 ring-2 ring-gold-400/50 shadow-gold" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt={`Photo ${i + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Specs, Description, EMI Calculator (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Key Specs Grid Styled with Logo Accents */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <h2 className="text-base font-black text-brand-black mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-gold-500 inline-block" />
                <span>Key Property Specifications</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-slate-400 uppercase font-bold text-[10px]">Plot Area</div>
                  <div className="text-sm font-black text-brand-black mt-0.5">
                    {formatIndianNumber(property.plotAreaSqFt)} sq.ft
                  </div>
                </div>

                {property.builtUpAreaSqFt && property.builtUpAreaSqFt > 0 && (
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="text-slate-400 uppercase font-bold text-[10px]">Built-Up Area</div>
                    <div className="text-sm font-black text-brand-black mt-0.5">
                      {formatIndianNumber(property.builtUpAreaSqFt)} sq.ft
                    </div>
                  </div>
                )}

                {property.bedrooms && (
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="text-slate-400 uppercase font-bold text-[10px]">Bedrooms</div>
                    <div className="text-sm font-black text-brand-black mt-0.5">
                      {property.bedrooms} BHK
                    </div>
                  </div>
                )}

                {property.bathrooms && (
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="text-slate-400 uppercase font-bold text-[10px]">Bathrooms</div>
                    <div className="text-sm font-black text-brand-black mt-0.5">
                      {property.bathrooms} Baths
                    </div>
                  </div>
                )}

                {property.facing && (
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="text-slate-400 uppercase font-bold text-[10px]">Direction Facing</div>
                    <div className="text-sm font-black text-cyan-800 mt-0.5">
                      {property.facing}
                    </div>
                  </div>
                )}

                {property.roadWidthFt && (
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="text-slate-400 uppercase font-bold text-[10px]">Approach Road</div>
                    <div className="text-sm font-black text-brand-black mt-0.5">
                      {property.roadWidthFt} Feet Tar Road
                    </div>
                  </div>
                )}

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-slate-400 uppercase font-bold text-[10px]">Approval Status</div>
                  <div className="text-sm font-black text-emerald-700 mt-0.5">
                    {property.approvalStatus}
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-slate-400 uppercase font-bold text-[10px]">Bank Loan Guidance</div>
                  <div className="text-sm font-black text-emerald-700 mt-0.5">
                    {property.bankLoanEligible ? "Up to 85% Sanctioned" : "Direct Settlement"}
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-slate-400 uppercase font-bold text-[10px]">Consultant In-Charge</div>
                  <div className="text-sm font-black text-gold-700 mt-0.5">
                    Er. J. Vairavel
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3">
              <h2 className="text-base font-black text-brand-black pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block" />
                <span>Detailed Property Description</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line font-medium">
                {displayDesc}
              </p>
            </div>

            {/* Highlights & Features Pills */}
            {features.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                <h2 className="text-base font-black text-brand-black mb-3 pb-2 border-b border-slate-100">
                  Salient Highlights & Amenities
                </h2>
                <div className="flex flex-wrap gap-2">
                  {features.map((feat, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-50 text-cyan-900 text-xs font-bold border border-cyan-200"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" />
                      <span>{feat}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 2. INTERACTIVE HOME LOAN EMI CALCULATOR IN LOGO DARK THEME */}
            <div className="bg-brand-dark rounded-3xl p-6 sm:p-8 border-2 border-gold-500/40 shadow-2xl text-white space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-gold-400" />
                  <h2 className="text-base font-black text-white">
                    Home Loan EMI Calculator
                  </h2>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-brand-black px-3 py-1 rounded-full border border-emerald-500/40">
                  SBI & HDFC Pre-Approved
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Loan Amount Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-200 mb-1">
                    <span>Loan Amount</span>
                    <span className="text-gold-400 font-black">{formatPrice(loanAmount)}</span>
                  </div>
                  <input
                    type="range"
                    min="500000"
                    max={property.price * 0.9}
                    step="50000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-2.5 bg-brand-black rounded-lg accent-gold-500 cursor-pointer border border-slate-700"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>₹5L</span>
                    <span>90% of price</span>
                  </div>
                </div>

                {/* Interest Rate Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-200 mb-1">
                    <span>Interest Rate</span>
                    <span className="text-cyan-400 font-black">{interestRate}% p.a.</span>
                  </div>
                  <input
                    type="range"
                    min="7.5"
                    max="12.0"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full h-2.5 bg-brand-black rounded-lg accent-cyan-500 cursor-pointer border border-slate-700"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>7.5%</span>
                    <span>12%</span>
                  </div>
                </div>

                {/* Tenure Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-200 mb-1">
                    <span>Tenure (Years)</span>
                    <span className="text-gold-400 font-black">{tenureYears} Years</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="1"
                    value={tenureYears}
                    onChange={(e) => setTenureYears(Number(e.target.value))}
                    className="w-full h-2.5 bg-brand-black rounded-lg accent-gold-500 cursor-pointer border border-slate-700"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>5 Yrs</span>
                    <span>30 Yrs</span>
                  </div>
                </div>
              </div>

              {/* EMI Output Bar */}
              <div className="bg-brand-black rounded-2xl p-4 sm:p-5 border border-slate-700 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-black">Monthly EMI</div>
                  <div className="text-xl sm:text-2xl font-black text-gold-400 mt-0.5">
                    ₹{formatIndianNumber(emiResult.monthlyEMI)} <span className="text-xs font-normal text-slate-400">/mo</span>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-black">Total Interest</div>
                  <div className="text-sm sm:text-base font-bold text-cyan-300 mt-1">
                    {formatPrice(emiResult.totalInterest)}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-black">Total Payable</div>
                  <div className="text-sm sm:text-base font-bold text-emerald-400 mt-1">
                    {formatPrice(emiResult.totalPayment)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Site Visit Booking Form & Er. J. Vairavel Assurance (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Lead Capture Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-gold-400/50 shadow-xl space-y-4">
              <div className="space-y-1">
                <span className="text-gold-600 font-black text-xs uppercase tracking-wider">
                  Site Visit & Inspection
                </span>
                <h3 className="text-base sm:text-lg font-black text-brand-black">
                  Book a Site Visit with Er. J. Vairavel
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  We arrange direct transportation to inspect plot boundaries and verify original parent deeds.
                </p>
              </div>

              {leadSubmitted ? (
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <div className="font-bold text-slate-900 text-sm">Site Visit Requested!</div>
                  <div className="text-xs text-slate-600">
                    Connecting to WhatsApp for instant confirmation with our Trichy office team.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSiteVisitSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. S. Manikandan"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-gold-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98424 00000"
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-gold-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-gold-500 font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2 border border-emerald-400/30"
                  >
                    <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                    <span>{isSubmitting ? "Booking..." : "Book Site Visit on WhatsApp"}</span>
                  </button>

                  <a
                    href={`tel:${COMPANY_INFO.phoneRaw}`}
                    className="w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition flex items-center justify-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-gold-600" />
                    <span>Call Direct: {COMPANY_INFO.phone}</span>
                  </a>
                </form>
              )}
            </div>

            {/* Engineer Profile Card in Brand Black with Gold Border */}
            <div className="bg-brand-black text-white rounded-3xl p-5 border-2 border-gold-400/50 shadow-gold space-y-3">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gold-400 bg-brand-black flex-shrink-0">
                  <Image
                    src="/images/logo.png"
                    alt="Er. J. Vairavel"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-black text-sm text-white">{COMPANY_INFO.founder}</h4>
                  <p className="text-[11px] text-gold-400 font-bold">Civil Engineer & Consultant</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                &ldquo;We provide 100% legal scrutiny for all parent deeds, DTCP sketch maps, and survey numbers. No hidden brokerage.&rdquo;
              </p>
              <div className="pt-1 text-[11px] text-cyan-400 flex items-center gap-2 font-semibold">
                <span>Olaiyur Ring Road Headquarters</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. STICKY MOBILE BOTTOM BAR FOR INSTANT ACTIONS */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-brand-black/95 backdrop-blur-md border-t border-gold-500/40 p-3 shadow-2xl">
        <div className="grid grid-cols-2 gap-2">
          <a
            href={`tel:${COMPANY_INFO.phoneRaw}`}
            className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-brand-card hover:bg-slate-800 text-white font-bold text-xs border border-slate-700 active:scale-95 transition"
          >
            <Phone className="w-4 h-4 text-gold-400" />
            <span>Call +91 73052 00754</span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md border border-emerald-400/30 active:scale-95 transition"
          >
            <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
            <span>WhatsApp Visit</span>
          </a>
        </div>
      </div>
    </div>
  );
}
