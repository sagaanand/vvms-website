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
  Building2,
  Home,
  HardHat,
  Share2,
  UserCheck,
  MapPin,
  ShieldCheck,
  KeyRound,
  Sparkles,
  Briefcase,
  BarChart3,
  BookOpen,
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
    { href: "/properties", label: t.nav.properties, icon: Building2 },
    { href: "/services", label: t.nav.services, icon: Briefcase },
    { href: "/intelligence", label: t.nav.intelligence, icon: BarChart3 },
    { href: "/academy", label: t.nav.academy, icon: BookOpen },
    { href: "/construction", label: t.nav.construction, icon: HardHat },
    { href: "/promote", label: t.nav.promote, icon: Share2 },
    { href: "/about", label: t.nav.about, icon: UserCheck },
    { href: "/offices", label: t.nav.offices, icon: MapPin },
  ];

  const whatsappMessage = encodeURIComponent(
    `Hello Er. J. Vairavel & Team, I am visiting veeduveettumanaisanthai.in and would like to inquire about properties and turnkey construction in Trichy.`
  );

  return (
    <>
      {/* Top Notification Bar Styled in White & Gold Luxury Palette */}
      <div className="bg-amber-50 text-amber-950 text-xs py-1.5 px-4 border-b border-amber-200/80">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-4 xl:px-6 flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-amber-800 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>{COMPANY_INFO.ratings.google} Google • {COMPANY_INFO.ratings.justdial} Justdial</span>
            </span>
            <span className="hidden md:inline text-amber-300">•</span>
            <span className="hidden md:flex items-center gap-1.5 text-red-700 font-semibold">
              <Youtube className="w-3.5 h-3.5 text-red-600" />
              <span>{COMPANY_INFO.youtube.subscribers} Subscribers ({COMPANY_INFO.youtube.videos} Videos)</span>
            </span>
            <span className="hidden lg:inline text-amber-300">•</span>
            <span className="hidden lg:flex items-center gap-1 text-amber-900 font-medium">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>Trichy’s Most Trusted Construction Partner</span>
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto text-[11px] sm:text-xs">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="flex items-center gap-1.5 text-slate-900 hover:text-amber-700 transition font-bold"
            >
              <Phone className="w-3 h-3 text-amber-600" />
              <span>{COMPANY_INFO.phone}</span>
            </a>
            <span className="text-amber-300">|</span>
            <Link
              href="/admin"
              className="flex items-center gap-1 text-slate-600 hover:text-amber-700 transition font-medium"
              title="Staff & Admin Portal"
            >
              <KeyRound className="w-3 h-3 text-amber-600" />
              <span className="hidden sm:inline">{t.nav.admin}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Header with Dynamic White & Gold Glass Transition */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-amber-300/80 shadow-md"
            : "bg-white/85 backdrop-blur-xl border-b border-amber-100/90 shadow-sm"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-4 xl:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo and Brand Title with White & Gold Theme */}
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-amber-400 shadow-gold bg-white flex-shrink-0 group-hover:scale-105 transition">
                <Image
                  src="/images/logo.png"
                  alt="Veedu Veettumanai Santhai Logo"
                  width={48}
                  height={48}
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex items-center gap-1.5 font-extrabold text-lg sm:text-xl tracking-tight">
                <span className="text-amber-600 drop-shadow-sm font-black">வீடு</span>
                <span className="text-slate-900 drop-shadow-sm font-black">வீட்டுமனை சந்தை</span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-0.5 2xl:gap-1.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-1.5 py-1 xl:px-2 xl:py-1.5 2xl:px-2.5 rounded-lg text-[11px] xl:text-xs 2xl:text-[13px] transition flex items-center gap-1 whitespace-nowrap ${
                      isActive
                        ? "text-amber-800 bg-amber-50 border border-amber-300 shadow-sm font-bold"
                        : "text-slate-700 hover:text-amber-700 hover:bg-amber-50/70 font-semibold"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Header Right Actions: Tamil Toggle & Mobile Menu */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Language Selector: EN | தமிழ் */}
              <button
                onClick={toggleLanguage}
                aria-label="Toggle Language"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50/90 hover:bg-amber-100 border border-amber-300/80 text-xs font-bold transition shadow-sm active:scale-95 text-slate-800"
              >
                <Languages className="w-3.5 h-3.5 text-amber-600" />
                <span className={language === "en" ? "text-amber-700 font-black" : "text-slate-500"}>EN</span>
                <span className="text-amber-300">|</span>
                <span className={language === "ta" ? "text-amber-700 font-black" : "text-slate-500"}>தமிழ்</span>
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Open Navigation Menu"
                className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-amber-800 hover:bg-amber-50 transition border border-amber-200"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-amber-600" /> : <Menu className="w-6 h-6 text-slate-800" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/98 backdrop-blur-2xl border-b border-amber-300 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top duration-200">
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
                        ? "bg-amber-50 text-amber-800 border border-amber-300 shadow-sm"
                        : "text-slate-700 hover:bg-amber-50/60 hover:text-amber-800"
                    }`}
                  >
                    <Icon className="w-4 h-4 text-amber-600" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-2 border-t border-amber-100 space-y-2">
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
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-50 text-slate-900 hover:bg-amber-100 text-sm font-bold border border-amber-300"
              >
                <Phone className="w-4 h-4 text-amber-600" />
                <span>Call {COMPANY_INFO.phone}</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
