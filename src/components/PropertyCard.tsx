"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import { formatIndianNumber, getWhatsAppUrl, extractYoutubeId } from "@/lib/utils";
import { COMPANY_INFO } from "@/lib/constants";
import {
  MapPin,
  Play,
  ShieldCheck,
  Compass,
  ArrowRight,
  MessageCircle,
  CheckCircle,
} from "lucide-react";

export interface PropertyData {
  id: string;
  propertyId: string;
  slug: string;
  title: string;
  titleTa?: string | null;
  description: string;
  propertyType: string;
  listingType?: string;
  locality: string;
  city: string;
  price: number;
  priceDisplay: string;
  downPayment?: number | null;
  downPaymentDisplay?: string | null;
  plotAreaSqFt: number;
  builtUpAreaSqFt?: number | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  facing?: string | null;
  approvalStatus: string;
  bankLoanEligible: boolean;
  youtubeUrl?: string | null;
  youtubeVideoId?: string | null;
  coverImage: string;
  isFeatured?: boolean;
  isSold?: boolean;
}

interface PropertyCardProps {
  property: PropertyData;
  onWatchVideo?: (videoId: string, title: string) => void;
}

export default function PropertyCard({ property, onWatchVideo }: PropertyCardProps) {
  const { language, t } = useLanguage();
  const displayTitle = language === "ta" && property.titleTa ? property.titleTa : property.title;
  const videoId = extractYoutubeId(property.youtubeVideoId || property.youtubeUrl);

  const whatsappMessage = `Hello Er. J. Vairavel, I saw Property #${property.propertyId} (${property.title}) on veeduveettumanaisanthai.in and would like to book a site visit. Please share details.`;
  const whatsappUrl = getWhatsAppUrl(COMPANY_INFO.whatsappRaw, whatsappMessage);

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-[#B78D42]/35 hover:border-[#B78D42] shadow-[0_4px_20px_-2px_rgba(32,32,32,0.06)] hover:shadow-[0_12px_36px_-6px_rgba(183,141,66,0.22)] glass-card-interactive flex flex-col justify-between">
      {/* Top Media & Badges Styled with VVMS Brand Colors */}
      <div>
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <Image
            src={property.coverImage}
            alt={displayTitle}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Sold / Available Overlay Badge */}
          {property.isSold ? (
            <div className="absolute top-3 left-3 bg-[#C20E10] text-white text-xs font-black uppercase px-3 py-1 rounded-full shadow-md backdrop-blur-sm border border-white/20">
              {t.properties.soldOut}
            </div>
          ) : (
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              <span className="bg-[#202020]/95 text-[#F9DB5C] text-[11px] font-black px-2.5 py-1 rounded-lg backdrop-blur-md shadow-md border border-[#B78D42]/50">
                {property.propertyId}
              </span>
              <span className="bg-emerald-700/95 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-lg backdrop-blur-md shadow-md flex items-center gap-1 border border-emerald-400/40">
                <ShieldCheck className="w-3 h-3 text-emerald-200" />
                <span>{property.approvalStatus}</span>
              </span>
            </div>
          )}

          {/* Sample Specimen Demonstration Badge */}
          <div className="absolute top-3 right-3 bg-[#202020]/90 text-[#F6E785] text-[10px] font-bold px-2.5 py-1 rounded-md backdrop-blur-sm border border-[#B78D42]/40 shadow-sm">
            {language === "ta" ? "மாதிரி முன்னோட்டம்" : "Sample Specimen"}
          </div>

          {/* YouTube Walkthrough Button Badge */}
          <button
            onClick={() => onWatchVideo && onWatchVideo(videoId, displayTitle)}
            aria-label="Watch Video Walkthrough"
            className="absolute bottom-3 right-3 bg-[#C20E10] hover:bg-[#9E0A0C] text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 transform hover:scale-105 transition group/btn border border-white/25 backdrop-blur-md"
          >
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
              <Play className="w-3 h-3 fill-white text-white ml-0.5" />
            </span>
            <span>{t.properties.watchWalkthrough}</span>
          </button>

          {/* Property Type Tag */}
          <div className="absolute bottom-3 left-3 bg-white/95 text-[#202020] text-xs font-black px-3 py-1 rounded-lg shadow-sm border border-[#B78D42]/30 backdrop-blur-md">
            {property.propertyType}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 space-y-2.5">
          {/* Locality & Facing in Turquoise */}
          <div className="flex items-center justify-between text-sm text-slate-600 mb-1">
            <span className="flex items-center gap-1.5 font-bold text-[#202020]">
              <MapPin className="w-4 h-4 text-[#22CDE1]" />
              <span>{property.locality}, Trichy</span>
            </span>
            {property.facing && (
              <span className="flex items-center gap-1 text-xs bg-[#22CDE1]/10 border border-[#22CDE1]/30 px-2.5 py-0.5 rounded-lg text-[#0891B2] font-bold">
                <Compass className="w-3.5 h-3.5 text-[#22CDE1]" />
                <span>{property.facing} {t.properties.facing}</span>
              </span>
            )}
          </div>

          {/* Title with Responsive Font Size */}
          <Link href={`/properties/${property.slug}`}>
            <h3 className="font-black text-[#202020] text-base sm:text-lg leading-snug line-clamp-2 hover:text-[#B78D42] transition mb-2.5">
              {displayTitle}
            </h3>
          </Link>

          {/* Key Specs Pills with Off-White Surface */}
          <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-[#F2F2F2] rounded-2xl border border-[#B78D42]/20 text-center mb-2.5">
            <div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 uppercase font-bold">Plot Area</div>
              <div className="font-black text-[#202020] text-xs sm:text-sm mt-0.5">
                {formatIndianNumber(property.plotAreaSqFt)} <span className="text-[10px] text-slate-500 font-normal">sq.ft</span>
              </div>
            </div>
            {property.builtUpAreaSqFt && property.builtUpAreaSqFt > 0 ? (
              <div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 uppercase font-bold">Built-Up</div>
                <div className="font-black text-[#202020] text-xs sm:text-sm mt-0.5">
                  {formatIndianNumber(property.builtUpAreaSqFt)} <span className="text-[10px] text-slate-500 font-normal">sq.ft</span>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 uppercase font-bold">Approval</div>
                <div className="font-black text-emerald-700 text-xs sm:text-sm mt-0.5 truncate">
                  DTCP / RERA
                </div>
              </div>
            )}
            <div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 uppercase font-bold">Config</div>
              <div className="font-black text-[#202020] text-xs sm:text-sm mt-0.5 flex items-center justify-center gap-1">
                {property.bedrooms ? `${property.bedrooms} BHK` : "Plots"}
              </div>
            </div>
          </div>

          {/* Downpayment deal callout in Primary Gold */}
          {property.downPaymentDisplay && (
            <div className="mb-2.5 px-3 py-1.5 rounded-xl bg-[#F9DB5C]/15 border border-[#B78D42]/40 flex items-center gap-2 text-xs text-[#202020] font-black">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B78D42] flex-shrink-0" />
              <span>{property.downPaymentDisplay}</span>
            </div>
          )}

          {/* Price Highlight */}
          <div className="pt-2 flex items-baseline justify-between border-t border-slate-100">
            <div>
              <span className="text-[11px] text-slate-500 block uppercase font-bold">Total Price</span>
              <span className="text-xl sm:text-2xl font-black text-[#202020] tracking-tight">
                {property.priceDisplay}
              </span>
            </div>
            {property.bankLoanEligible && (
              <span className="text-xs text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Bank Loan</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Actions Footer with Off-White and Emerald Buttons */}
      <div className="p-4 pt-0 sm:p-5 sm:pt-0 grid grid-cols-2 gap-2 mt-2">
        <Link
          href={`/properties/${property.slug}`}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#F2F2F2] hover:bg-white text-[#202020] font-black text-xs transition border border-[#B78D42]/35 shadow-sm"
        >
          <span>{t.properties.viewDetails}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#202020] hover:bg-emerald-700 text-[#F9DB5C] hover:text-white font-black text-xs shadow-sm transition border border-[#B78D42]/50"
        >
          <MessageCircle className="w-3.5 h-3.5 text-[#22CDE1]" />
          <span>{t.properties.bookSiteVisit}</span>
        </a>
      </div>
    </div>
  );
}
