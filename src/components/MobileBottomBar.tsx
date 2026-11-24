"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n";
import { COMPANY_INFO } from "@/lib/constants";
import { Phone, MessageCircle, Building2, Calculator } from "lucide-react";

export default function MobileBottomBar() {
  const { t } = useLanguage();
  const pathname = usePathname();

  // If in admin dashboard, we can optionally hide or show simplified
  if (pathname.startsWith("/admin")) return null;

  const defaultWhatsappText = encodeURIComponent(
    `Hello Er. J. Vairavel & Team, I want to book a property site visit in Trichy.`
  );

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-navy-950/95 backdrop-blur-md border-t border-navy-800 py-2 px-3 shadow-floating safe-area-pb">
      <div className="grid grid-cols-4 gap-1.5 items-center">
        {/* Call Now */}
        <a
          href={`tel:${COMPANY_INFO.phoneRaw}`}
          className="flex flex-col items-center justify-center py-1 text-slate-300 hover:text-gold-400 active:scale-95 transition"
        >
          <Phone className="w-5 h-5 text-gold-400 mb-0.5" />
          <span className="text-[10px] font-bold">Call</span>
        </a>

        {/* WhatsApp Site Visit */}
        <a
          href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${defaultWhatsappText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-2 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs shadow-md active:scale-95 transition"
        >
          <MessageCircle className="w-4 h-4 fill-white text-emerald-700" />
          <span>WhatsApp Visit</span>
        </a>

        {/* Turnkey Estimator */}
        <Link
          href="/construction"
          className="flex flex-col items-center justify-center py-1 text-slate-300 hover:text-gold-400 active:scale-95 transition"
        >
          <Calculator className="w-5 h-5 text-gold-400 mb-0.5" />
          <span className="text-[10px] font-bold">Estimate</span>
        </Link>
      </div>
    </div>
  );
}
