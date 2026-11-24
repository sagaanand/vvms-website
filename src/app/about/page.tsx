"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { COMPANY_INFO } from "@/lib/constants";
import ScrollReveal from "@/components/ScrollReveal";
import { ParallaxLayer, ParallaxFloatingAccents } from "@/components/Parallax";
import {
  Award,
  ShieldCheck,
  HardHat,
  Phone,
  Compass,
  TrendingUp,
  Target,
  CheckCircle2,
} from "lucide-react";
import { Youtube } from "@/components/icons/YoutubeIcon";

export default function AboutPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 py-10 sm:py-16 relative overflow-hidden blueprint-grid-bg">
      <ParallaxFloatingAccents variant="gold" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 relative z-10">
        {/* Hero Section Styled with White & Gold Theme & Real Consultation Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-5 text-center lg:text-left">
            <ScrollReveal direction="right">
              <ParallaxLayer speed={0.12} clamp={50}>
                <div className="relative aspect-square rounded-3xl overflow-hidden border-2 border-amber-300 shadow-2xl bg-[#202020] group card-hover-lift">
                  <Image
                    src="/images/vairavel.jpg"
                    alt="Er. J. Vairavel - Founder & Chief Civil Consultant VVMS"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2 bg-[#202020]/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-amber-400/60">
                    <div className="relative w-6 h-6 rounded-full overflow-hidden border border-amber-400">
                      <Image src="/images/logo.png" alt="Logo" fill className="object-cover" />
                    </div>
                    <span className="text-xs font-black text-[#F9DB5C]">Er. J. Vairavel</span>
                  </div>
                </div>
                <div className="mt-3.5 space-y-0.5">
                  <span className="text-[11px] font-black text-amber-700 uppercase tracking-widest block">
                    Founder & Chief Consultant
                  </span>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                    {COMPANY_INFO.founder}
                  </h1>
                  <p className="text-xs text-slate-600 font-semibold">
                    Civil Engineer • Real Estate Authority • YouTube Creator
                  </p>
                </div>
              </ParallaxLayer>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <ScrollReveal direction="left">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-black text-gold-400 text-xs font-black uppercase tracking-wider border border-gold-500/40 shadow-sm">
                <Award className="w-3.5 h-3.5 text-cyan-400" />
                <span>Engineering Authority in Trichy</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-black leading-snug tracking-tight">
                Transforming Real Estate & Construction Through Technical Integrity
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                Founded by <strong>Er. J. Vairavel (Civil Engineer)</strong>, Veedu Veettumanai Santhai Pvt Ltd has pioneered a new era of trust in Tiruchirappalli and Tamil Nadu&apos;s real estate ecosystem.
              </p>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                With more than <strong>1,900+ on-site video walkthroughs</strong> and over <strong>125,000 subscribers</strong> on YouTube, Er. J. Vairavel has helped thousands of families and NRIs purchase 100% verified DTCP/RERA plots and build architect-supervised turnkey homes without broker gimmicks or hidden charges.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3">
                <div className="p-3 bg-white rounded-2xl border border-gold-300 shadow-sm">
                  <div className="text-lg sm:text-xl font-black text-red-600">125K+</div>
                  <div className="text-[11px] text-slate-500 font-bold">YouTube Family</div>
                </div>
                <div className="p-3 bg-white rounded-2xl border border-cyan-300 shadow-sm">
                  <div className="text-lg sm:text-xl font-black text-cyan-700">1,900+</div>
                  <div className="text-[11px] text-slate-500 font-bold">Video Walkthroughs</div>
                </div>
                <div className="p-3 bg-white rounded-2xl border border-gold-300 shadow-sm">
                  <div className="text-lg sm:text-xl font-black text-gold-600">4.8★</div>
                  <div className="text-[11px] text-slate-500 font-bold">Google Rating</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* The VVMS Brand Ethos: Vision | Value | Mission | Success */}
        <ScrollReveal direction="up">
          <div className="bg-[#202020] rounded-3xl p-6 sm:p-10 border-2 border-[#F9DB5C]/40 shadow-2xl space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[11px] font-black uppercase tracking-widest text-[#22CDE1] block">
                The VVMS Brand Creed
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#F9DB5C]">
                Vision • Value • Mission • Success
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Every decision we make, from on-camera YouTube reviews to turnkey construction, is guided by our four core institutional pillars.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:border-[#F9DB5C]/60 transition group space-y-2 card-hover-lift">
                <div className="w-9 h-9 rounded-xl bg-[#F9DB5C]/20 text-[#F9DB5C] flex items-center justify-center border border-[#F9DB5C]/40">
                  <Compass className="w-4 h-4" />
                </div>
                <div className="text-xs font-black uppercase tracking-wider text-[#F9DB5C]">
                  V • Vision
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Pioneering ethical, civil engineering-backed property standards across Tamil Nadu so families invest with total peace of mind.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:border-[#22CDE1]/60 transition group space-y-2 card-hover-lift">
                <div className="w-9 h-9 rounded-xl bg-[#22CDE1]/20 text-[#22CDE1] flex items-center justify-center border border-[#22CDE1]/40">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="text-xs font-black uppercase tracking-wider text-[#22CDE1]">
                  V • Value
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Uncompromising fair value with 0% buyer commission, transparent pricing, and direct-owner deals free of broker inflation.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:border-red-400/60 transition group space-y-2 card-hover-lift">
                <div className="w-9 h-9 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/40">
                  <Target className="w-4 h-4" />
                </div>
                <div className="text-xs font-black uppercase tracking-wider text-red-400">
                  M • Mission
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Rigorous parent deed verification, soil testing, BOQ estimation, and turnkey home construction built with structural excellence.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:border-[#F6E785]/60 transition group space-y-2 card-hover-lift">
                <div className="w-9 h-9 rounded-xl bg-[#F6E785]/20 text-[#F6E785] flex items-center justify-center border border-[#F6E785]/40">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="text-xs font-black uppercase tracking-wider text-[#F6E785]">
                  S • Success
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Over 125,000 YouTube community members and thousands of happy homeowners who built their lifetime dreams without conflict.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <ScrollReveal direction="up" delayMs={0}>
            <div className="h-full bg-white p-6 rounded-3xl border border-gold-300/60 shadow-sm hover:shadow-gold card-hover-lift transition space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-gold-50 text-gold-600 flex items-center justify-center border border-gold-200">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-black text-base sm:text-lg text-brand-black">100% Legal Scrutiny</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Every property listed undergoes strict parent document verification, encumbrance certificate (EC) check, DTCP approval validation, and FSI check.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delayMs={80}>
            <div className="h-full bg-white p-6 rounded-3xl border border-cyan-300/60 shadow-sm hover:shadow-cyan card-hover-lift transition space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center border border-cyan-200">
                <HardHat className="w-5 h-5" />
              </div>
              <h3 className="font-black text-base sm:text-lg text-brand-black">Civil Engineering Rigor</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Turnkey construction is executed by qualified site engineers using branded Grade 53 cement, Fe 550D TMT steel, and strict machine-mix curing.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delayMs={160}>
            <div className="h-full bg-white p-6 rounded-3xl border border-red-300/60 shadow-sm hover:shadow-md card-hover-lift transition space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center border border-red-200">
                <Youtube className="w-5 h-5" />
              </div>
              <h3 className="font-black text-base sm:text-lg text-brand-black">Transparent Video Walkthroughs</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                No photoshopped images. We take buyers on honest, 4K camera walkthroughs displaying road widths, neighboring buildings, and ground reality.
              </p>
            </div>
          </ScrollReveal>
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
