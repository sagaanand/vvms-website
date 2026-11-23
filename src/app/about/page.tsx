"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { COMPANY_INFO } from "@/lib/constants";
import {
  Award,
  ShieldCheck,
  HardHat,
  Phone,
} from "lucide-react";
import { Youtube } from "@/components/icons/YoutubeIcon";

export default function AboutPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section Styled with White & Gold Theme & Real Consultation Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 text-center lg:text-left">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border-2 border-amber-300 shadow-xl bg-white group">
              <Image
                src="/images/consulting.jpg"
                alt="Er. J. Vairavel Civil Engineering Consultation"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute top-3 left-3 flex items-center gap-2 bg-white/95 px-3 py-1.5 rounded-xl shadow-md border border-amber-200">
                <div className="relative w-7 h-7 rounded-full overflow-hidden border border-amber-400">
                  <Image src="/images/logo.png" alt="Logo" fill className="object-cover" />
                </div>
                <span className="text-xs font-black text-amber-900">Er. J. Vairavel</span>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs font-black text-amber-700 uppercase tracking-widest block">
                Founder & Chief Consultant
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                {COMPANY_INFO.founder}
              </h1>
              <p className="text-xs text-slate-600 font-bold">
                Civil Engineer • Real Estate Authority • YouTube Creator
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-brand-black text-gold-400 text-xs font-black uppercase tracking-wider border border-gold-500/40 shadow-sm">
              <Award className="w-4 h-4 text-cyan-400" />
              <span>Engineering Authority in Trichy</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-brand-black leading-tight">
              Transforming Real Estate & Construction Through Technical Integrity
            </h2>

            <p className="text-xs sm:text-base text-slate-700 leading-relaxed font-medium">
              Founded by <strong>Er. J. Vairavel (Civil Engineer)</strong>, Veedu Veettumanai Santhai Pvt Ltd has pioneered a new era of trust in Tiruchirappalli and Tamil Nadu&apos;s real estate ecosystem.
            </p>

            <p className="text-xs sm:text-base text-slate-700 leading-relaxed font-medium">
              With more than <strong>1,900+ on-site video walkthroughs</strong> and over <strong>125,000 subscribers</strong> on YouTube, Er. J. Vairavel has helped thousands of families and NRIs purchase 100% verified DTCP/RERA plots and build architect-supervised turnkey homes without broker gimmicks or hidden charges.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
              <div className="p-3.5 bg-white rounded-2xl border-2 border-gold-300 shadow-sm">
                <div className="text-xl font-black text-red-600">125K+</div>
                <div className="text-[11px] text-slate-500 font-bold">YouTube Family</div>
              </div>
              <div className="p-3.5 bg-white rounded-2xl border-2 border-cyan-300 shadow-sm">
                <div className="text-xl font-black text-cyan-700">1,900+</div>
                <div className="text-[11px] text-slate-500 font-bold">Video Walkthroughs</div>
              </div>
              <div className="p-3.5 bg-white rounded-2xl border-2 border-gold-300 shadow-sm">
                <div className="text-xl font-black text-gold-600">4.8★</div>
                <div className="text-[11px] text-slate-500 font-bold">Google Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-gold-300/60 shadow-card hover:shadow-gold transition space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-gold-50 text-gold-600 flex items-center justify-center border border-gold-200">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg text-brand-black">100% Legal Scrutiny</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Every property listed undergoes strict parent document verification, encumbrance certificate (EC) check, DTCP approval validation, and FSI check.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-cyan-300/60 shadow-card hover:shadow-cyan transition space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center border border-cyan-200">
              <HardHat className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg text-brand-black">Civil Engineering Rigor</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Turnkey construction is executed by qualified site engineers using branded Grade 53 cement, Fe 550D TMT steel, and strict machine-mix curing.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-red-300/60 shadow-card hover:shadow-md transition space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center border border-red-200">
              <Youtube className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg text-brand-black">Transparent Video Walkthroughs</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              No photoshopped images. We take buyers on honest, 4K camera walkthroughs displaying road widths, neighboring buildings, and ground reality.
            </p>
          </div>
        </div>

        {/* Dual Office Invitation Styled in White & Gold */}
        <div className="bg-gradient-to-r from-amber-50 via-white to-amber-50 text-slate-900 rounded-3xl p-8 sm:p-12 border-2 border-amber-300 shadow-xl text-center max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Meet Er. J. Vairavel in Person
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto font-medium">
            Visit our Olaiyur Ring Road Headquarters in Trichy. Our team is available 7 days a week from 10:00 AM to 7:30 PM.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/offices"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-xs uppercase tracking-wide transition shadow-gold border border-amber-400"
            >
              View Office Locations & Maps
            </Link>

            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="px-6 py-3.5 rounded-2xl bg-white hover:bg-amber-50 text-slate-900 font-bold text-xs border border-amber-300 transition flex items-center gap-2 shadow-sm"
            >
              <Phone className="w-4 h-4 text-amber-600" />
              <span>Call +91 73052 00754</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
