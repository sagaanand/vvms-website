"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  ShieldCheck,
  ArrowRight,
  Map,
  Calendar,
  PhoneCall,
  Trees,
  Award,
} from "lucide-react";
import { trackAureonEvent } from "@/lib/analytics";

interface FlagshipProjectHeroProps {
  heroImage?: string;
  location?: string;
  approvals?: string;
}

export default function FlagshipProjectHero({
  heroImage = "/images/projects/aureon-breeze/hero.jpg",
  location = "Fathima Nagar, Trichy–Madurai NH Road",
  approvals = "DTCP & RERA Approved (Brochure Ref: DTCP - 76/2026, 96/2026)",
}: FlagshipProjectHeroProps) {
  return (
    <section className="relative bg-[#141414] text-[#F2F2F2] overflow-hidden border-b-2 border-[#B78D42]/50">
      {/* Background Hero Render */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="AUREON BREEZE - Premium Gated Community Residential Villa Plots in Fathima Nagar, Trichy"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/95 via-[#141414]/80 to-[#141414]/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-[#141414]/60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Flagship Content */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F9DB5C] text-[#202020] text-[11px] font-black uppercase tracking-wider shadow-gold">
                <Award className="w-3.5 h-3.5" />
                <span>VVMS Flagship Project</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#F6E785] text-[11px] font-bold">
                Gated Villa Plots • Trichy
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
                AUREON{" "}
                <span className="bg-gradient-to-r from-[#F6E785] via-[#F9DB5C] to-[#B78D42] bg-clip-text text-transparent">
                  BREEZE
                </span>
              </h1>
              <p className="text-base sm:text-xl font-bold text-[#22CDE1]">
                Premium Gated Community Residential Villa Plots
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-200 font-semibold">
              <span className="inline-flex items-center gap-1.5 bg-[#202020]/85 px-3.5 py-2 rounded-xl border border-[#B78D42]/40">
                <MapPin className="w-4 h-4 text-[#F9DB5C]" />
                <span>{location}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-emerald-950/80 px-3.5 py-2 rounded-xl border border-emerald-500/40 text-emerald-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{approvals}</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Showcased on Veedu Veettumanai Santhai (VVMS) — explore 258 residential villa plots across{" "}
              <strong className="text-white">Aureon Breeze</strong> &amp;{" "}
              <strong className="text-white">Aureon Breeze Extension</strong> with 3 landscaped parks, 40&apos;/33&apos;/30&apos; wide roads, and 600–2500 sq.ft Vaastu-compliant layouts (per promoter brochure).
            </p>

            {/* 4 Required Flagship CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/projects/aureon-breeze"
                onClick={() => trackAureonEvent("aureon_hero_cta", { cta: "Explore Project" })}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#F6E785] via-[#F9DB5C] to-[#B78D42] hover:brightness-105 text-[#202020] font-black text-xs sm:text-sm tracking-wide shadow-gold transition transform hover:-translate-y-0.5"
              >
                <span>Explore Project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/projects/aureon-breeze#master-layout"
                onClick={() => trackAureonEvent("aureon_hero_cta", { cta: "View Master Plan" })}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/25 backdrop-blur-md transition"
              >
                <Map className="w-4 h-4 text-[#22CDE1]" />
                <span>View Master Plan</span>
              </Link>

              <Link
                href="/projects/aureon-breeze#project-enquiry"
                onClick={() => trackAureonEvent("aureon_hero_cta", { cta: "Enquire Now" })}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#202020]/90 hover:bg-[#2A2A2A] text-[#F9DB5C] font-bold text-xs sm:text-sm border border-[#B78D42]/60 transition"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Enquire Now</span>
              </Link>

              <Link
                href="/projects/aureon-breeze?visit=1#project-enquiry"
                onClick={() => trackAureonEvent("aureon_hero_cta", { cta: "Schedule Site Visit" })}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-[#22CDE1] font-bold text-xs sm:text-sm border border-[#22CDE1]/50 transition"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Site Visit</span>
              </Link>
            </div>
          </div>

          {/* Right Brochure Visual Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#202020]/90 backdrop-blur-md rounded-3xl p-4 sm:p-5 border border-[#B78D42]/50 shadow-2xl space-y-4">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src={heroImage}
                  alt="AUREON BREEZE Entrance Gateway Render"
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover"
                />
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between bg-black/75 backdrop-blur-md px-3 py-2 rounded-xl text-[11px]">
                  <span className="font-black text-[#F9DB5C]">AUREON BREEZE</span>
                  <span className="text-slate-200 font-semibold">10 Mins to Panjappur</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-sm sm:text-base font-black text-[#F9DB5C]">600–2500</div>
                  <div className="text-[10px] text-slate-300 font-semibold">Sq.ft Villa Plots</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-sm sm:text-base font-black text-[#22CDE1] flex items-center justify-center gap-1">
                    <Trees className="w-3.5 h-3.5" />
                    <span>3 Parks</span>
                  </div>
                  <div className="text-[10px] text-slate-300 font-semibold">Inside Project</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-sm sm:text-base font-black text-emerald-400">40&apos;/33&apos;/30&apos;</div>
                  <div className="text-[10px] text-slate-300 font-semibold">Ft Wide Roads</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
