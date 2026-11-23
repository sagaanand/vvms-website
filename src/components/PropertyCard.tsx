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
  Sparkles,
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
    <div className="group bg-white rounded-3xl overflow-hidden border border-amber-200/80 hover:border-amber-400 shadow-[0_4px_20px_-2px_rgba(245,158,11,0.08)] hover:shadow-[0_12px_36px_-6px_rgba(245,158,11,0.18)] transition-all duration-300 flex flex-col justify-between">
      {/* Top Media & Badges Styled with White & Gold Luxury Glass */}
      <div>
        <div className="relative aspect-[16/10] overflow-hidden bg-amber-50/50">
          <Image
            src={property.coverImage}
            alt={displayTitle}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Sold / Available Overlay Badge */}
          {property.isSold ? (
            <div className="absolute top-3 left-3 bg-red-600/95 text-white text-xs font-black uppercase px-3 py-1 rounded-full shadow-md backdrop-blur-sm">
              {t.properties.soldOut}
            </div>
          ) : (
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              <span className="bg-white/95 text-amber-900 text-[11px] font-black px-2.5 py-1 rounded-lg backdrop-blur-md shadow-md border border-amber-300">
                {property.propertyId}
              </span>
              <span className="bg-emerald-700/95 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-lg backdrop-blur-md shadow-md flex items-center gap-1 border border-emerald-400/40">
                <ShieldCheck className="w-3 h-3 text-emerald-200" />
                <span>{property.approvalStatus}</span>
              </span>
            </div>
          )}

          {/* Sample Specimen Demonstration Badge */}
          <div className="absolute top-3 right-3 bg-slate-900/80 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm border border-amber-400/40 shadow-sm">
            {language === "ta" ? "மாதிரி முன்னோட்டம்" : "Sample Specimen"}
          </div>

          {/* YouTube Walkthrough Button Badge */}
          <button
            onClick={() => onWatchVideo && onWatchVideo(videoId, displayTitle)}
            aria-label="Watch Video Walkthrough"
            className="absolute bottom-3 right-3 bg-red-600/95 hover:bg-red-600 text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 transform hover:scale-105 transition group/btn border border-red-400/40 backdrop-blur-md"
          >
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
              <Play className="w-3 h-3 fill-white text-white ml-0.5" />
            </span>
            <span>{t.properties.watchWalkthrough}</span>
          </button>

          {/* Property Type Tag */}
          <div className="absolute top-3 right-3 bg-white/95 text-slate-800 text-[10px] font-black px-2.5 py-1 rounded-lg shadow-sm border border-amber-200 backdrop-blur-md">
            {property.propertyType}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5">
          {/* Locality & Facing in Logo Cyan */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="flex items-center gap-1 font-bold text-slate-800">
              <MapPin className="w-3.5 h-3.5 text-cyan-600" />
              <span>{property.locality}, Trichy</span>
            </span>
            {property.facing && (
              <span className="flex items-center gap-1 text-[11px] bg-cyan-50 border border-cyan-200 px-2 py-0.5 rounded text-cyan-900 font-bold">
                <Compass className="w-3 h-3 text-cyan-600" />
                <span>{property.facing} {t.properties.facing}</span>
              </span>
            )}
          </div>

          {/* Title */}
          <Link href={`/properties/${property.slug}`}>
            <h3 className="font-extrabold text-slate-900 text-base leading-snug line-clamp-2 hover:text-cyan-700 transition mb-3">
              {displayTitle}
            </h3>
          </Link>

          {/* Key Specs Pills with Logo Gold Borders */}
          <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-slate-50 rounded-2xl border border-slate-100 text-center mb-3">
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Plot Area</div>
              <div className="font-black text-slate-900 text-xs sm:text-sm">
                {formatIndianNumber(property.plotAreaSqFt)} <span className="text-[10px] text-slate-500 font-normal">sq.ft</span>
              </div>
            </div>
            {property.builtUpAreaSqFt && property.builtUpAreaSqFt > 0 ? (
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-bold">Built-Up</div>
                <div className="font-black text-slate-900 text-xs sm:text-sm">
                  {formatIndianNumber(property.builtUpAreaSqFt)} <span className="text-[10px] text-slate-500 font-normal">sq.ft</span>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-bold">Approval</div>
                <div className="font-black text-emerald-700 text-xs truncate">
                  DTCP / RERA
                </div>
              </div>
            )}
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Configuration</div>
              <div className="font-black text-slate-900 text-xs sm:text-sm flex items-center justify-center gap-1">
                {property.bedrooms ? `${property.bedrooms} BHK` : "Plots"}
              </div>
            </div>
          </div>

          {/* Downpayment deal callout in Logo Gold */}
          {property.downPaymentDisplay && (
            <div className="mb-3 px-3 py-1.5 rounded-xl bg-gold-50 border border-gold-300 flex items-center gap-1.5 text-xs text-gold-900 font-black">
              <Sparkles className="w-3.5 h-3.5 text-gold-600 flex-shrink-0" />
              <span>{property.downPaymentDisplay}</span>
            </div>
          )}

          {/* Price Highlight */}
          <div className="pt-1 flex items-baseline justify-between">
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Total Price</span>
              <span className="text-xl sm:text-2xl font-black text-amber-700 tracking-tight">
                {property.priceDisplay}
              </span>
            </div>
            {property.bankLoanEligible && (
              <span className="text-[11px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-600" />
                <span>Bank Loan Ready</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Actions Footer with White & Gold and Emerald Buttons */}
      <div className="p-4 pt-0 sm:p-5 sm:pt-0 grid grid-cols-2 gap-2 mt-2">
        <Link
          href={`/properties/${property.slug}`}
          className="flex items-center justify-center gap-1 py-2.5 px-3 rounded-xl bg-amber-50/80 hover:bg-amber-100 text-amber-900 font-bold text-xs transition border border-amber-200/80"
        >
          <span>{t.properties.viewDetails}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-sm hover:shadow transition border border-emerald-400/30"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-white text-emerald-600" />
          <span>{t.properties.bookSiteVisit}</span>
        </a>
      </div>
    </div>
  );
}
