"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import { COMPANY_INFO } from "@/lib/constants";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Award,
  CheckCircle2,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { Youtube } from "@/components/icons/YoutubeIcon";

export default function Footer() {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-brand-black text-slate-300 border-t-2 border-gold-500/40">
      {/* Upper Brand & Trust Bar Styled with Logo Colors */}
      <div className="border-b border-brand-dark bg-brand-dark/50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="p-3 bg-brand-card rounded-2xl border border-gold-500/40 text-gold-400 shadow-gold">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-white text-base">Er. J. Vairavel</div>
              <div className="text-xs text-gold-400 font-medium">Civil Engineer & Turnkey Consultant</div>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="p-3 bg-brand-card rounded-2xl border border-cyan-500/40 text-cyan-400 shadow-cyan">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-white text-base">DTCP & RERA Verified</div>
              <div className="text-xs text-cyan-400 font-medium">100% Legal Scrutiny & Clear Titles</div>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="p-3 bg-brand-card rounded-2xl border border-red-500/40 text-red-500 shadow-md">
              <Youtube className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-white text-base">125K+ Subscribers</div>
              <div className="text-xs text-red-400 font-medium">1,900+ YouTube Walkthroughs</div>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="p-3 bg-brand-card rounded-2xl border border-emerald-500/40 text-emerald-400 shadow-md">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-white text-base">4.8★ Google Rated</div>
              <div className="text-xs text-emerald-400 font-medium">5.0★ Justdial Highest Trust</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1: Brand & Founder */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gold-400 bg-brand-black flex-shrink-0 shadow-gold">
                <Image
                  src="/images/logo.png"
                  alt="Veedu Veettumanai Santhai Logo"
                  width={56}
                  height={56}
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-black text-base leading-tight flex items-center gap-1.5">
                  <span className="text-gold-400">வீடு</span>
                  <span className="text-cyan-400">வீட்டுமனை சந்தை</span>
                </div>
                <p className="text-xs text-slate-300 font-medium">
                  {COMPANY_INFO.name}
                </p>
                <p className="text-[10px] text-gold-400/90 font-bold">
                  {language === "ta" ? "உங்கள் கனவு இல்லம் எங்களுடன் சாத்தியமாகும்..." : "Your Dream Home Becomes Reality With Us"}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {t.footer.founderDisclaimer}
            </p>

            {/* Social Proof Channels matching Logo */}
            <div className="pt-2 flex flex-wrap gap-2">
              <a
                href={COMPANY_INFO.youtube.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-300 text-xs font-bold transition"
              >
                <Youtube className="w-3.5 h-3.5 text-red-500" />
                <span>YouTube ({COMPANY_INFO.youtube.subscribers})</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Column 2: Dual Office Locations */}
          <div className="space-y-4">
            <h4 className="text-gold-400 font-black text-xs uppercase tracking-wider border-b border-brand-card pb-2">
              {language === "ta" ? "எங்கள் திருச்சி அலுவலகங்கள்" : "Trichy Office Locations"}
            </h4>

            {/* HQ */}
            <div className="text-xs space-y-1.5 bg-brand-card p-3 rounded-xl border border-gold-500/30 shadow-sm">
              <div className="font-bold text-gold-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                <span>HQ (Olaiyur Ring Road)</span>
              </div>
              <p className="text-slate-400 pl-5 leading-relaxed text-[11px]">
                2nd Floor, Valli Tower, Upstairs to SBI Bank 2, Ring Road, K.K. Nagar, Olaiyur, Trichy - 620021
              </p>
            </div>

            {/* Branch */}
            <div className="text-xs space-y-1.5 bg-brand-card p-3 rounded-xl border border-cyan-500/30 shadow-sm">
              <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span>Branch (Karumandapam)</span>
              </div>
              <p className="text-slate-400 pl-5 leading-relaxed text-[11px]">
                Vision Properties Bldg, Ashok Nagar 2nd St, RMS Colony, Karumandapam, Trichy - 620001
              </p>
            </div>
          </div>

          {/* Column 3: Properties & Construction */}
          <div className="space-y-4">
            <h4 className="text-cyan-400 font-black text-xs uppercase tracking-wider border-b border-brand-card pb-2">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/properties" className="text-slate-400 hover:text-gold-400 transition font-medium">
                  • {t.nav.properties}
                </Link>
              </li>
              <li>
                <Link href="/construction" className="text-slate-400 hover:text-cyan-400 transition font-medium">
                  • {t.nav.construction} (₹1,950/sq.ft)
                </Link>
              </li>
              <li>
                <Link href="/promote" className="text-slate-400 hover:text-red-400 transition font-medium">
                  • {t.nav.promote}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-gold-400 transition font-medium">
                  • {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/offices" className="text-slate-400 hover:text-cyan-400 transition font-medium">
                  • {t.nav.offices}
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-slate-400 hover:text-white transition font-medium">
                  • Staff Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Advisory & Land Intelligence */}
          <div className="space-y-4">
            <h4 className="text-gold-400 font-black text-xs uppercase tracking-wider border-b border-brand-card pb-2">
              Advisory & Intelligence
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/services" className="text-slate-400 hover:text-gold-400 transition font-medium">
                  • All Advisory Services
                </Link>
              </li>
              <li>
                <Link href="/services/online-legal-opinion" className="text-slate-400 hover:text-cyan-400 transition font-medium">
                  • 30-Yr Legal Opinion (₹4,999)
                </Link>
              </li>
              <li>
                <Link href="/services/onsite-infrastructure-valuation" className="text-slate-400 hover:text-gold-400 transition font-medium">
                  • On-Site Water & Soil Audit (₹3,999)
                </Link>
              </li>
              <li>
                <Link href="/services/property-valuation" className="text-slate-400 hover:text-cyan-400 transition font-medium">
                  • Property & Land Valuation
                </Link>
              </li>
              <li>
                <Link href="/intelligence" className="text-slate-400 hover:text-gold-400 transition font-medium">
                  • Trichy SRO Guideline Comps
                </Link>
              </li>
              <li>
                <Link href="/academy" className="text-slate-400 hover:text-cyan-400 transition font-medium">
                  • 30-Yr Due Diligence Academy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Hours */}
          <div className="space-y-4">
            <h4 className="text-gold-400 font-black text-xs uppercase tracking-wider border-b border-brand-card pb-2">
              {t.nav.contact}
            </h4>

            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="text-slate-200 hover:text-gold-400 font-bold">
                  {COMPANY_INFO.phone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="text-slate-300 hover:text-cyan-300 font-medium">
                  {COMPANY_INFO.email}
                </a>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <Clock className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-200">
                    {language === "ta" ? "பணி நேரம்:" : "Office Hours:"}
                  </div>
                  <div className="text-slate-400 text-[11px]">{COMPANY_INFO.workingHours}</div>
                  <div className="text-[11px] text-emerald-400 font-bold">Open All 7 Days (Mon - Sun)</div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent(
                  "Hello Er. J. Vairavel, I would like to schedule an office consultation in Trichy."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md border border-emerald-400/30 transition"
              >
                <span>WhatsApp Appointment</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="mt-12 pt-6 border-t border-brand-card text-center text-xs text-slate-500 space-y-2">
          <p className="font-medium">© {new Date().getFullYear()} {COMPANY_INFO.name}. {t.footer.rights}</p>
          <p className="text-[11px] text-slate-500 max-w-4xl mx-auto">
            Veedu Veettumanai Santhai Pvt Ltd is an engineering and property consultancy firm founded by Er. J. Vairavel.
            Color theme: Brand Gold & Cyan derived from the official registered corporate trademark emblem.
          </p>
        </div>
      </div>
    </footer>
  );
}
