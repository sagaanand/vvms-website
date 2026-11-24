"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n";
import { COMPANY_INFO } from "@/lib/constants";
import {
  Phone,
  MessageCircle,
  Menu,
  X,
  Languages,
  Home,
  HardHat,
  Share2,
  UserCheck,
  MapPin,
  ShieldCheck,
  KeyRound,
  Layers,
  Briefcase,
  BarChart3,
  BookOpen,
  PhoneCall,
  ArrowRight,
} from "lucide-react";
import { Youtube } from "@/components/icons/YoutubeIcon";

export default function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t.nav.home, icon: Home },
    { href: "/services", label: t.nav.services, icon: Briefcase },
    { href: "/construction", label: t.nav.construction, icon: HardHat },
    { href: "/intelligence", label: t.nav.intelligence, icon: BarChart3 },
    { href: "/academy", label: t.nav.academy, icon: BookOpen },
    { href: "/business-solutions", label: t.nav.businessSolutions, icon: Layers },
    { href: "/about", label: t.nav.about, icon: UserCheck },
    { href: "/contact", label: t.nav.contact, icon: PhoneCall },
  ];

  const whatsappMessage = encodeURIComponent(
    `Hello Er. J. Vairavel & Team, I am visiting veeduveettumanaisanthai.in and would like to inquire about properties and turnkey construction in Trichy.`
  );

  return (
    <>
      {/* Top Notification Bar Styled in VVMS Charcoal & Antique Gold Palette */}
      <div className="bg-[#202020] text-[#F2F2F2] py-2 px-4 border-b border-[#B78D42]/30">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-4 xl:px-6 flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3 text-xs sm:text-sm">
            <span className="flex items-center gap-1.5 text-[#F9DB5C] font-bold">
              <ShieldCheck className="w-4 h-4 text-[#F9DB5C]" />
              <span>{COMPANY_INFO.ratings.google} Google • {COMPANY_INFO.ratings.justdial} Justdial</span>
            </span>
            <span className="hidden md:inline text-[#B78D42]/60">•</span>
            <span className="hidden md:flex items-center gap-1.5 text-white font-semibold">
              <span className="p-0.5 rounded bg-[#C20E10] text-white inline-flex items-center justify-center">
                <Youtube className="w-3.5 h-3.5 fill-white text-white" />
              </span>
              <span>{COMPANY_INFO.youtube.subscribers} Subscribers ({COMPANY_INFO.youtube.videos} Videos)</span>
            </span>
            <span className="hidden lg:inline text-[#B78D42]/60">•</span>
            <span className="hidden lg:flex items-center gap-1 text-[#22CDE1] font-medium">
              <ShieldCheck className="w-4 h-4 text-[#22CDE1]" />
              <span>Trichy’s Most Trusted Engineering & Construction Partner</span>
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto text-xs sm:text-sm">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="flex items-center gap-1.5 text-[#F2F2F2] hover:text-[#F9DB5C] transition font-bold"
            >
              <Phone className="w-3.5 h-3.5 text-[#F9DB5C]" />
              <span>{COMPANY_INFO.phone}</span>
            </a>
            <span className="text-[#B78D42]/50">|</span>
            <Link
              href="/admin"
              className="flex items-center gap-1 text-slate-300 hover:text-[#22CDE1] transition font-medium"
              title="Staff & Admin Portal"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#22CDE1]" />
              <span className="hidden sm:inline">{t.nav.admin}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Header with Dynamic Off-White & Antique Gold Glass Transition */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#F2F2F2]/95 backdrop-blur-2xl border-b border-[#B78D42]/40 shadow-[0_4px_25px_-5px_rgba(32,32,32,0.12)]"
            : "bg-white/95 backdrop-blur-xl border-b border-[#B78D42]/20 shadow-sm"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-4 xl:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo and Brand Title with VVMS Brand Colors */}
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#B78D42] shadow-gold bg-[#202020] flex-shrink-0 group-hover:scale-105 transition">
                <Image
                  src="/images/logo.png"
                  alt="Veedu Veettumanai Santhai Logo"
                  width={48}
                  height={48}
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex items-center gap-1.5 font-black text-base sm:text-xl tracking-tight">
                <span className="text-[#7C5A20] drop-shadow-sm font-black">வீடு</span>
                <span className="text-[#202020] drop-shadow-sm font-black">வீட்டுமனை சந்தை</span>
              </div>
            </Link>

            {/* Desktop Navigation Links with Crisp Typography */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 2xl:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-2 py-1.5 xl:px-2.5 xl:py-1.5 2xl:px-3 rounded-xl text-xs xl:text-[13px] 2xl:text-sm transition flex items-center gap-1.5 whitespace-nowrap ${
                      isActive
                        ? "text-[#202020] bg-white border border-[#B78D42]/60 shadow-sm font-black"
                        : "text-slate-700 hover:text-[#202020] hover:bg-white/70 font-semibold"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Header Right Actions: Primary CTA, Tamil Toggle & Mobile Menu */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Primary Header CTA */}
              <Link
                href="/properties"
                className="hidden xl:inline-flex items-center gap-1.5 px-3.5 py-2 2xl:px-4 2xl:py-2.5 rounded-xl bg-gradient-to-r from-[#F6E785] via-[#F9DB5C] to-[#B78D42] hover:brightness-105 text-[#202020] font-black text-xs uppercase tracking-wider shadow-sm border border-[#B78D42]/50 transition transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{t.nav.exploreCta}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#202020]" />
              </Link>

              {/* Language Selector: EN | தமிழ் */}
              <button
                onClick={toggleLanguage}
                aria-label="EN | தமிழ் - Toggle Language"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-[#B78D42]/40 text-xs font-bold transition shadow-sm active:scale-95 text-[#202020]"
              >
                <Languages className="w-3.5 h-3.5 text-[#22CDE1]" />
                <span className={language === "en" ? "text-[#202020] font-black" : "text-slate-600 font-semibold"}>EN</span>
                <span className="text-[#B78D42]/60">|</span>
                <span className={language === "ta" ? "text-[#202020] font-black" : "text-slate-600 font-semibold"}>தமிழ்</span>
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Open Navigation Menu"
                className="lg:hidden p-2 rounded-xl text-[#202020] hover:bg-white transition border border-[#B78D42]/30"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-[#C20E10]" /> : <Menu className="w-6 h-6 text-[#202020]" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#F2F2F2]/98 backdrop-blur-2xl border-b border-[#B78D42]/40 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top duration-200">
            <div className="grid grid-cols-1 gap-1.5">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold transition ${
                      isActive
                        ? "bg-white text-[#202020] border border-[#B78D42]/50 shadow-sm"
                        : "text-slate-700 hover:bg-white/60 hover:text-[#202020]"
                    }`}
                  >
                    <Icon className="w-4 h-4 text-[#B78D42]" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-2 border-t border-[#B78D42]/20 space-y-2">
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: {COMPANY_INFO.whatsapp}</span>
              </a>

              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white text-[#202020] hover:bg-slate-50 text-sm font-bold border border-[#B78D42]/40"
              >
                <Phone className="w-4 h-4 text-[#B78D42]" />
                <span>Call {COMPANY_INFO.phone}</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
