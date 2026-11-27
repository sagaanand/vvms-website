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
} from "lucide-react";
import { Youtube } from "@/components/icons/YoutubeIcon";

export default function Footer() {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-[#202020] text-slate-300 border-t-2 border-[#B78D42]">
      {/* Upper Brand & Trust Bar Styled with Official VVMS Brand Palette */}
      <div className="border-b border-[#2E2E2E] bg-[#252525] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="p-3 bg-[#2B2B2B] rounded-2xl border border-[#B78D42]/50 text-[#F9DB5C] shadow-gold">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-[#F2F2F2] text-base">Er. J. Vairavel</div>
              <div className="text-xs text-[#F9DB5C] font-semibold">Civil Engineer & Turnkey Consultant</div>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="p-3 bg-[#2B2B2B] rounded-2xl border border-[#22CDE1]/50 text-[#22CDE1] shadow-cyan">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-[#F2F2F2] text-base">DTCP & RERA Verified</div>
              <div className="text-xs text-[#22CDE1] font-semibold">100% Legal Scrutiny & Clear Titles</div>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="p-3 bg-[#2B2B2B] rounded-2xl border border-[#C20E10]/50 text-[#C20E10] shadow-md">
              <Youtube className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-[#F2F2F2] text-base">125K+ Subscribers</div>
              <div className="text-xs text-red-300 font-semibold">1,900+ YouTube Walkthroughs</div>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="p-3 bg-[#2B2B2B] rounded-2xl border border-emerald-500/40 text-emerald-400 shadow-md">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-[#F2F2F2] text-base">4.8★ Google Rated</div>
              <div className="text-xs text-emerald-400 font-semibold">5.0★ Justdial Highest Trust</div>
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
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#B78D42] bg-[#202020] flex-shrink-0 shadow-gold">
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
                  <span className="text-[#F9DB5C]">வீடு</span>
                  <span className="text-[#22CDE1]">வீட்டுமனை சந்தை</span>
                </div>
                <p className="text-xs text-[#F2F2F2] font-medium">
                  {COMPANY_INFO.name}
                </p>
                <p className="text-[10px] text-[#F6E785] font-bold">
                  {language === "ta" ? "உங்கள் கனவு இல்லம் எங்களுடன் சாத்தியமாகும்..." : "Your Dream Home Becomes Reality With Us"}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {t.footer.founderDisclaimer}
            </p>

            <div className="text-[11px] text-slate-300 space-y-1 pt-1 border-t border-[#2E2E2E]">
              <div><span className="text-[#F9DB5C] font-bold">Founder:</span> {COMPANY_INFO.founder}</div>
              <div><span className="text-[#F9DB5C] font-bold">Chairman:</span> {COMPANY_INFO.chairman}</div>
              <div><span className="text-[#F9DB5C] font-bold">Managing Director:</span> {COMPANY_INFO.managingDirector}</div>
            </div>

            {/* Social Proof Channels matching Logo */}
            <div className="pt-2 flex flex-wrap gap-2">
              <a
                href={COMPANY_INFO.youtube.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#C20E10]/20 hover:bg-[#C20E10]/30 border border-[#C20E10]/50 text-red-200 text-xs font-bold transition"
              >
                <Youtube className="w-3.5 h-3.5 text-[#C20E10]" />
                <span>YouTube ({COMPANY_INFO.youtube.subscribers})</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href={COMPANY_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-200 text-xs font-bold transition"
              >
                <svg className="w-3.5 h-3.5 text-blue-400 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
                <span>Facebook</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href={COMPANY_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-600/20 hover:bg-pink-600/30 border border-pink-500/40 text-pink-200 text-xs font-bold transition"
              >
                <svg className="w-3.5 h-3.5 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span>Instagram</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Column 2: Head Office Location */}
          <div className="space-y-4">
            <h4 className="text-[#F9DB5C] font-black text-xs uppercase tracking-wider border-b border-[#2E2E2E] pb-2">
              {language === "ta" ? "எங்கள் திருச்சி அலுவலகம்" : "Trichy Head Office"}
            </h4>

            {/* HQ Only */}
            <div className="text-xs space-y-2 bg-[#2B2B2B] p-3.5 rounded-xl border border-[#B78D42]/40 shadow-sm">
              <div className="font-bold text-[#F9DB5C] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#F9DB5C] flex-shrink-0" />
                <span>Head Office (Olaiyur Ring Road)</span>
              </div>
              <p className="text-slate-300 pl-5 leading-relaxed text-[11px]">
                2nd Floor, Valli Tower, Upstairs to SBI Bank 2, Ring Road, K.K. Nagar, Olaiyur, Trichy - 620021
              </p>
              <div className="pl-5 pt-1">
                <a
                  href="https://maps.google.com/?q=Valli+Tower+Olaiyur+Ring+Road+Trichy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#F9DB5C] hover:underline text-[11px] font-semibold"
                >
                  <span>Google Maps Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Properties & Construction */}
          <div className="space-y-4">
            <h4 className="text-[#22CDE1] font-black text-xs uppercase tracking-wider border-b border-[#2E2E2E] pb-2">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/properties" className="inline-block py-1 text-slate-200 hover:text-[#F9DB5C] transition font-medium">
                  • {t.nav.properties}
                </Link>
              </li>
              <li>
                <Link href="/construction" className="inline-block py-1 text-slate-200 hover:text-[#22CDE1] transition font-medium">
                  • {t.nav.construction}
                </Link>
              </li>
              <li>
                <Link href="/services" className="inline-block py-1 text-slate-200 hover:text-[#F9DB5C] transition font-medium">
                  • {t.nav.services}
                </Link>
              </li>
              <li>
                <Link href="/business-solutions" className="inline-block py-1 text-slate-200 hover:text-[#22CDE1] transition font-medium">
                  • {t.nav.businessSolutions}
                </Link>
              </li>
              <li>
                <Link href="/resources" className="inline-block py-1 text-slate-200 hover:text-[#F9DB5C] transition font-medium">
                  • {t.nav.resources}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="inline-block py-1 text-slate-200 hover:text-[#F2F2F2] transition font-medium">
                  • {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Advisory & Land Intelligence */}
          <div className="space-y-4">
            <h4 className="text-[#F9DB5C] font-black text-xs uppercase tracking-wider border-b border-[#2E2E2E] pb-2">
              Advisory & Intelligence
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/services" className="inline-block py-1 text-slate-200 hover:text-[#F9DB5C] transition font-medium">
                  • 11 Advisory Services
                </Link>
              </li>
              <li>
                <Link href="/services/online-legal-opinion" className="inline-block py-1 text-slate-200 hover:text-[#22CDE1] transition font-medium">
                  • 30-Yr Legal Due Diligence
                </Link>
              </li>
              <li>
                <Link href="/services/onsite-infrastructure-valuation" className="inline-block py-1 text-slate-200 hover:text-[#F9DB5C] transition font-medium">
                  • On-Site Technical & Water Audit
                </Link>
              </li>
              <li>
                <Link href="/services/property-valuation" className="inline-block py-1 text-slate-200 hover:text-[#22CDE1] transition font-medium">
                  • Independent Property Valuation
                </Link>
              </li>
              <li>
                <Link href="/intelligence" className="inline-block py-1 text-slate-200 hover:text-[#F9DB5C] transition font-medium">
                  • Trichy SRO Guideline Comps
                </Link>
              </li>
              <li>
                <Link href="/academy" className="inline-block py-1 text-slate-200 hover:text-[#22CDE1] transition font-medium">
                  • Due Diligence Academy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact & Hours */}
          <div className="space-y-4">
            <h4 className="text-[#22CDE1] font-black text-xs uppercase tracking-wider border-b border-[#2E2E2E] pb-2">
              {t.nav.contact}
            </h4>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#F9DB5C] flex-shrink-0" />
                <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="text-[#F2F2F2] hover:text-[#F9DB5C] font-bold">
                  {COMPANY_INFO.phone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#22CDE1] flex-shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="text-slate-300 hover:text-[#22CDE1] font-medium">
                  {COMPANY_INFO.email}
                </a>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <Clock className="w-4 h-4 text-[#F9DB5C] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#F2F2F2]">
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
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs shadow-md border border-emerald-500/30 transition"
              >
                <span>WhatsApp Appointment</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="mt-12 pt-6 border-t border-[#2E2E2E] text-center text-xs text-slate-400 space-y-2">
          <p className="font-medium">© {new Date().getFullYear()} {COMPANY_INFO.name}. {t.footer.rights}</p>
          <p className="text-[11px] text-slate-400 max-w-4xl mx-auto">
            Veedu Veettumanai Santhai Pvt Ltd is an engineering and property consultancy firm founded by Er. J. Vairavel.
          </p>
        </div>
      </div>
    </footer>
  );
}
