"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Download,
  Phone,
  MessageCircle,
  Calendar,
  ChevronRight,
  ChevronDown,
  GraduationCap,
  HeartPulse,
  Bus,
  Factory,
  Landmark,
  School,
  Building2,
  Trees,
  Award,
  ExternalLink,
  HelpCircle,
  TrendingUp,
} from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";
import { extractYoutubeId, getWhatsAppUrl } from "@/lib/utils";
import { getAttributionParams, trackAureonEvent } from "@/lib/analytics";
import ProjectMasterLayout, { PlotItem } from "@/components/ProjectMasterLayout";

interface ProjectRecord {
  id: string;
  slug: string;
  name: string;
  tagline?: string | null;
  promoterName: string;
  category: string;
  location: string;
  city: string;
  approvals: string;
  heroImage: string;
  masterLayoutImage?: string | null;
  brochureUrl?: string | null;
  galleryImages: string;
  youtubeUrls: string;
  overview: string;
  highlights: string;
  amenities: string;
  nearbyLocations: string;
  extensionInfo: string;
  approvedBanks: string;
  faqs: string;
  plots: PlotItem[];
}

type NearbyTabKey = "schools" | "colleges" | "hospitals" | "transports" | "temples" | "industries";

const NEARBY_TABS: { key: NearbyTabKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "schools", label: "Schools", icon: School },
  { key: "colleges", label: "Colleges", icon: GraduationCap },
  { key: "hospitals", label: "Hospitals", icon: HeartPulse },
  { key: "transports", label: "Transports", icon: Bus },
  { key: "temples", label: "Temples & Worship", icon: Landmark },
  { key: "industries", label: "Industries & IT", icon: Factory },
];

export default function AureonBreezeClient({ project }: { project: ProjectRecord }) {
  const highlights: string[] = JSON.parse(project.highlights || "[]");
  const amenities: { title: string; desc: string }[] = JSON.parse(project.amenities || "[]");
  const nearby: Record<string, { name: string; time: string }[]> = JSON.parse(
    project.nearbyLocations || "{}"
  );
  const extensionInfo: {
    name?: string;
    plotCount?: number;
    park?: string;
    roads?: string[];
    categories?: { label: string; count: number; range: string; color: string }[];
    note?: string;
  } = JSON.parse(project.extensionInfo || "{}");
  const approvedBanks: string[] = JSON.parse(project.approvedBanks || "[]");
  const galleryImages: string[] = JSON.parse(project.galleryImages || "[]");
  const youtubeUrls: string[] = JSON.parse(project.youtubeUrls || "[]");
  const faqs: { question: string; answer: string }[] = JSON.parse(project.faqs || "[]");

  const [activeNearbyTab, setActiveNearbyTab] = useState<NearbyTabKey>("schools");
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Enquiry & Site Visit Form State
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    preferredPlotSize: "1200–1500 sq.ft",
    budget: "Contact for Price / Custom Quote",
    purpose: "Self-use",
    interestedProject: "AUREON BREEZE",
    preferredVisitDate: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    trackAureonEvent("aureon_page_view", { slug: project.slug });
  }, [project.slug]);

  const handleEnquirePlot = (plot: PlotItem) => {
    setForm((prev) => ({
      ...prev,
      interestedProject: `${plot.phase} – Plot #${plot.plotNumber}`,
      preferredPlotSize: `${plot.areaSqFt} sq.ft`,
      message: `Enquiry for ${plot.phase}, Plot #${plot.plotNumber} (${plot.areaSqFt} sq.ft). Please confirm live availability and pricing.`,
    }));
    const el = document.getElementById("project-enquiry");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!form.name.trim() || !form.phone.trim()) {
      setFormError("Please enter your name and mobile number.");
      return;
    }

    setSubmitting(true);
    try {
      const attribution = getAttributionParams();
      const isVisit = Boolean(form.preferredVisitDate);

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email || null,
          leadType: isVisit ? "Project Site Visit" : "Project Enquiry",
          propertyId: "AUREON-BREEZE",
          propertyTitle: form.interestedProject,
          preferredLocality: project.location,
          budget: form.budget,
          purpose: form.purpose,
          preferredPlotSize: form.preferredPlotSize,
          preferredVisitDate: form.preferredVisitDate || null,
          message: form.message || `Enquiry for ${form.interestedProject}`,
          source: "AUREON_BREEZE_PAGE",
          ...attribution,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        setFormError(data.error || "Unable to submit enquiry. Please try again.");
        return;
      }

      setSubmitted(true);
      trackAureonEvent("aureon_enquiry_submit", {
        interestedProject: form.interestedProject,
        purpose: form.purpose,
      });
      if (isVisit) {
        trackAureonEvent("aureon_site_visit_request", {
          visitDate: form.preferredVisitDate,
        });
      }
    } catch {
      setFormError("Network error while submitting enquiry.");
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappUrl = getWhatsAppUrl(
    COMPANY_INFO.whatsappRaw,
    `Hello VVMS Team, I would like details, plot availability, and site visit scheduling for ${form.interestedProject} (Promoted by ${project.promoterName}) at ${project.location}.`
  );

  return (
    <div className="min-h-screen bg-[#F2F2F2] text-[#202020]">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-[#B78D42] transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-600">Flagship Project</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#202020] font-black">{project.name}</span>
        </div>
      </div>

      {/* 1. PROJECT HERO */}
      <section className="relative bg-[#141414] text-white overflow-hidden border-b-2 border-[#B78D42]/50">
        <div className="absolute inset-0 z-0">
          <Image
            src={project.heroImage || "/images/projects/aureon-breeze/hero.jpg"}
            alt={`${project.name} - ${project.category} in ${project.location}`}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/95 via-[#141414]/80 to-[#141414]/45" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-[#F9DB5C] text-[#202020] text-[11px] font-black uppercase tracking-wider inline-flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                <span>VVMS Flagship Showcase</span>
              </span>
              <span className="px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[#F6E785] text-[11px] font-bold">
                Fathima Nagar • Trichy–Madurai NH
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              {project.name}
            </h1>
            <p className="text-base sm:text-xl font-bold text-[#22CDE1]">{project.category}</p>

            <div className="flex flex-wrap gap-3 text-xs sm:text-sm font-semibold">
              <span className="inline-flex items-center gap-1.5 bg-[#202020]/90 px-3.5 py-2 rounded-xl border border-[#B78D42]/40">
                <MapPin className="w-4 h-4 text-[#F9DB5C]" />
                <span>{project.location}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-emerald-950/85 px-3.5 py-2 rounded-xl border border-emerald-500/40 text-emerald-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{project.approvals}</span>
              </span>
            </div>

            <div className="pt-3 flex flex-wrap gap-3">
              <a
                href="#master-layout"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#F6E785] via-[#F9DB5C] to-[#B78D42] text-[#202020] font-black text-xs sm:text-sm shadow-gold"
              >
                View Master Layout &amp; Plots
              </a>
              <a
                href="#project-enquiry"
                className="px-5 py-3 rounded-xl bg-[#202020] hover:bg-slate-800 text-[#F9DB5C] border border-[#B78D42]/60 font-bold text-xs sm:text-sm inline-flex items-center gap-1.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Site Visit</span>
              </a>
              {project.brochureUrl && (
                <a
                  href={project.brochureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAureonEvent("aureon_brochure_request")}
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/25 font-bold text-xs sm:text-sm inline-flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4 text-[#22CDE1]" />
                  <span>Download Brochure (PDF)</span>
                </a>
              )}
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#202020]/90 backdrop-blur-md rounded-3xl p-5 border border-[#B78D42]/50 space-y-3 text-xs">
            <div className="font-black text-[#F9DB5C] uppercase tracking-wider">
              Quick Facts (Per Promoter Brochure)
            </div>
            <div className="space-y-2 text-slate-200">
              <div className="flex justify-between border-b border-white/10 pb-1.5">
                <span className="text-slate-400">Discovery Platform</span>
                <span className="font-bold text-[#F9DB5C]">VVMS</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-1.5">
                <span className="text-slate-400">Phase 1 (Aureon Breeze)</span>
                <span className="font-bold">Plots 1 – 169</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-1.5">
                <span className="text-slate-400">Extension Phase</span>
                <span className="font-bold">Plots 1 – 89</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-1.5">
                <span className="text-slate-400">Road Widths</span>
                <span className="font-bold">40&apos;, 33&apos;, 30&apos; &amp; 24&apos; ft</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Parks</span>
                <span className="font-bold text-emerald-400">3 Parks Inside Project</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
        {/* 2 & 3. PROJECT OVERVIEW + HIGHLIGHTS */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#B78D42]/30 shadow-sm space-y-4">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#B78D42]">
              Project Overview
            </span>
            <h2 className="text-2xl font-black text-[#202020]">
              About {project.name} at {project.location}
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">{project.overview}</p>
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 leading-relaxed">
              <strong>Platform &amp; Source Disclosure:</strong> Veedu Veettumanai Santhai (VVMS) is the discovery, advisory, and marketing platform showcasing {project.name}. Project specs, drive times, and approval references are presented from the supplied project brochure; buyers are encouraged to verify original documents during an accompanied site visit.
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#B78D42]/30 shadow-sm space-y-4">
            <span className="text-[11px] font-black uppercase tracking-wider text-cyan-700">
              Key Project Highlights
            </span>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-800">
              {highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 4–8. STRATEGIC LOCATION ADVANTAGES (SCHOOLS, COLLEGES, HOSPITALS, TRANSPORTS, TEMPLES, INDUSTRIES) */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#B78D42]/30 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#B78D42] block">
                Strategic Location Advantages (Brochure-Listed Drive Times)
              </span>
              <h2 className="text-2xl font-black text-[#202020]">
                Well Connected to Schools, Colleges, Hospitals &amp; Transport
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {NEARBY_TABS.map((tab) => {
              const Icon = tab.icon;
              const active = activeNearbyTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveNearbyTab(tab.key)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black inline-flex items-center gap-2 transition border ${
                    active
                      ? "bg-[#202020] text-[#F9DB5C] border-[#B78D42]"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:border-cyan-400"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {(nearby[activeNearbyTab] || []).map((loc, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#F2F2F2] border border-slate-200 flex items-center justify-between gap-3"
              >
                <span className="text-xs sm:text-sm font-bold text-[#202020]">{loc.name}</span>
                <span className="px-2.5 py-1 rounded-lg bg-[#202020] text-[#F9DB5C] text-[11px] font-black whitespace-nowrap">
                  {loc.time}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 9. LOCATION & ROUTE MAP */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#B78D42]/30 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-cyan-700 block">
                Route Map &amp; NH Connectivity
              </span>
              <h2 className="text-2xl font-black text-[#202020]">
                Location Map — {project.location}
              </h2>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Fathima+Nagar+Trichy+Madurai+NH+Road+Tiruchirappalli"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#202020] text-[#F9DB5C] font-black text-xs"
            >
              <span>Open Corridor in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-slate-200">
            <Image
              src="/images/projects/aureon-breeze/route-map.jpg"
              alt="AUREON BREEZE Route Map on Trichy Madurai National Highway"
              width={1728}
              height={1224}
              className="w-full h-auto"
            />
          </div>
        </section>

        {/* 10. AMENITIES & INFRASTRUCTURE */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#B78D42]/30 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#B78D42] block">
                Development &amp; Infrastructure
              </span>
              <h2 className="text-2xl font-black text-[#202020]">
                12 Gated Community Amenities &amp; 3 Parks
              </h2>
            </div>
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-black inline-flex items-center gap-1.5">
              <Trees className="w-4 h-4 text-emerald-600" />
              <span>Park I, Park II &amp; Park III Inside Project</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {amenities.map((am, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#F2F2F2] border border-[#B78D42]/25 space-y-1"
              >
                <div className="text-xs sm:text-sm font-black text-[#202020]">{am.title}</div>
                <p className="text-xs text-slate-600 leading-relaxed">{am.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-slate-500">
            *3 years maintenance by promoters is subject to promoter terms as noted in the project brochure.
          </p>
        </section>

        {/* 11 & 12. MASTER LAYOUT & SEPARATE PLOT INVENTORY */}
        <ProjectMasterLayout
          masterLayoutImage={
            project.masterLayoutImage || "/images/projects/aureon-breeze/master-layout.jpg"
          }
          plots={project.plots}
          onEnquirePlot={handleEnquirePlot}
        />

        {/* 13. AUREON BREEZE EXTENSION INFORMATION */}
        {extensionInfo.name && (
          <section className="bg-[#202020] text-white rounded-3xl p-6 sm:p-8 border-2 border-[#B78D42]/50 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-[#22CDE1] block">
                  Separate Phase Inventory
                </span>
                <h2 className="text-2xl font-black text-[#F9DB5C]">
                  {extensionInfo.name} ({extensionInfo.plotCount} Plots • {extensionInfo.park})
                </h2>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">{extensionInfo.note}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(extensionInfo.categories || []).map((cat, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <div className="text-sm font-black text-[#F9DB5C]">{cat.label}</div>
                  <div className="text-xs text-white font-bold">{cat.count} Plots</div>
                  <div className="text-xs text-slate-300">Area Range: {cat.range}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 14. INVESTMENT CONSIDERATIONS (BROCHURE CORRIDOR HEADLINES) */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#B78D42]/30 shadow-sm space-y-5">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-[#B78D42] block">
              Investment Considerations (Brochure-Provided Growth Context)
            </span>
            <h2 className="text-2xl font-black text-[#202020] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <span>Trichy–Madurai NH Corridor Infrastructure Highlights</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-slate-200">
              <Image
                src="/images/projects/aureon-breeze/growth-corridor.jpg"
                alt="Brochure-provided Trichy to Madurai NH Road infrastructure headlines and indicative appreciation chart"
                width={1296}
                height={918}
                className="w-full h-auto"
              />
            </div>
            <div className="lg:col-span-6 space-y-3 text-xs sm:text-sm text-slate-700">
              <p className="font-bold text-[#202020]">
                Key corridor catalysts cited in the project brochure:
              </p>
              <ul className="space-y-2">
                <li>• Panjappur Integrated Bus Terminus (40 acres, ₹246.1 crore, 401 bus bays)</li>
                <li>• Proposed TIDEL Park Trichy at Panjappur (14.16 acres IT/ITES development)</li>
                <li>• Integrated Wholesale Vegetable &amp; Fruit Market (22 acres, ₹236 crore)</li>
                <li>• Private / Omni Bus Terminus, Multi-Utility Facility Centre &amp; Truck Terminal</li>
              </ul>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600">
                <strong>Disclaimer:</strong> Any appreciation percentages or proposed developments shown in the brochure graphic are indicative market trends and brochure-provided highlights. Actual property values depend on exact plot location, approvals, and market conditions. VVMS does not guarantee future returns.
              </div>
            </div>
          </div>
        </section>

        {/* 15 & 16. VVMS ADVISORY & APPROVALS / BANK LOANS */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#B78D42]/30 shadow-sm space-y-4">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#B78D42] block">
              End-to-End Buyer Support
            </span>
            <h2 className="text-2xl font-black text-[#202020] flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#B78D42]" />
              <span>VVMS Advisory &amp; Handover Assistance</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              <strong>Veedu Veettumanai Santhai (VVMS)</strong> provides end-to-end buyer guidance for {project.name}, from accompanied site visits and document verification to registration and turnkey home construction planning.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs font-bold text-[#202020]">
              <div className="p-3 rounded-xl bg-[#F2F2F2] border border-slate-200">Patta Transfer Support</div>
              <div className="p-3 rounded-xl bg-[#F2F2F2] border border-slate-200">Home Construction Assistance</div>
              <div className="p-3 rounded-xl bg-[#F2F2F2] border border-slate-200">Bank Loan Assistance</div>
              <div className="p-3 rounded-xl bg-[#F2F2F2] border border-slate-200">Registration &amp; Smooth Handover</div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#B78D42]/30 shadow-sm space-y-4">
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700 block">
              Approvals, Documentation &amp; Bank Loans
            </span>
            <h2 className="text-2xl font-black text-[#202020]">
              Clear Title &amp; Bank Loan Facilitation
            </h2>
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-950 font-semibold">
              Brochure Approval Reference: {project.approvals}
            </div>
            <div className="space-y-2">
              <div className="text-xs font-black uppercase text-slate-500">
                Brochure-Listed Approving Banks
              </div>
              <div className="flex flex-wrap gap-2">
                {approvedBanks.map((bank) => (
                  <span
                    key={bank}
                    className="px-3.5 py-2 rounded-xl bg-[#F2F2F2] border border-slate-200 text-xs font-black text-[#202020]"
                  >
                    {bank}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-1.5 text-xs text-slate-700 pt-2">
              <div className="font-black text-[#202020]">End-to-End Assistance Listed in Brochure:</div>
              <p>Patta Transfer • Home Construction Assistance • Bank Loan Assistance • Registration Assistance • Smooth Handover</p>
            </div>
          </div>
        </section>

        {/* 17. PROJECT IMAGE GALLERY */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#B78D42]/30 shadow-sm space-y-5">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-[#B78D42] block">
              Brochure Visuals &amp; Renders
            </span>
            <h2 className="text-2xl font-black text-[#202020]">Project Gallery</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((src, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setLightboxImage(src)}
                className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-slate-200 hover:border-[#B78D42] transition group"
              >
                <Image
                  src={src}
                  alt={`AUREON BREEZE Gallery Image ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </button>
            ))}
          </div>
        </section>

        {/* 18. YOUTUBE VIDEOS (IF AVAILABLE IN CMS) */}
        {youtubeUrls.length > 0 && (
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#B78D42]/30 shadow-sm space-y-5">
            <h2 className="text-2xl font-black text-[#202020]">Project Video Walkthroughs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {youtubeUrls.map((url, idx) => {
                const vid = extractYoutubeId(url);
                if (!vid) return null;
                return (
                  <div key={idx} className="aspect-video rounded-2xl overflow-hidden bg-black">
                    <iframe
                      src={`https://www.youtube.com/embed/${vid}`}
                      title={`AUREON BREEZE Video ${idx + 1}`}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 19. FREQUENTLY ASKED QUESTIONS */}
        {faqs.length > 0 && (
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#B78D42]/30 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-[#202020] flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-cyan-600" />
              <span>Frequently Asked Questions</span>
            </h2>
            <div className="space-y-2.5">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div key={idx} className="rounded-2xl border border-slate-200 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full px-4 py-3.5 text-left flex items-center justify-between gap-3 bg-slate-50 hover:bg-slate-100 transition"
                    >
                      <span className="text-xs sm:text-sm font-black text-[#202020]">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 flex-shrink-0 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 py-3 bg-white text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 20. ENQUIRY & SITE-VISIT BOOKING */}
        <section
          id="project-enquiry"
          className="bg-[#202020] text-white rounded-3xl p-6 sm:p-10 border-2 border-[#B78D42] shadow-2xl scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          <div className="lg:col-span-5 space-y-5">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#F9DB5C] block">
              Enquiry &amp; Site-Visit Booking
            </span>
            <h2 className="text-2xl sm:text-3xl font-black">
              Request Pricing, Plot Availability or Schedule a Site Visit
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Connect with our Trichy advisory desk for live plot availability, verified DTCP/RERA document inspection, and accompanied site visits to {project.name} ({project.location}).
            </p>

            <div className="space-y-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackAureonEvent("aureon_whatsapp_click")}
                className="w-full py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Project Advisor</span>
              </a>

              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                onClick={() => trackAureonEvent("aureon_phone_click")}
                className="w-full py-3.5 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-[#F9DB5C] border border-[#B78D42]/50 font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition"
              >
                <Phone className="w-4 h-4" />
                <span>Call {COMPANY_INFO.phone}</span>
              </a>

              {project.brochureUrl && (
                <a
                  href={project.brochureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAureonEvent("aureon_brochure_request")}
                  className="w-full py-3 px-5 rounded-xl bg-transparent hover:bg-white/10 text-slate-200 border border-white/20 font-bold text-xs flex items-center justify-center gap-2 transition"
                >
                  <Download className="w-4 h-4 text-[#22CDE1]" />
                  <span>Download E-Brochure PDF</span>
                </a>
              )}
            </div>
          </div>

          <div className="lg:col-span-7 bg-white text-[#202020] rounded-2xl p-5 sm:p-7">
            {submitted ? (
              <div className="py-10 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-xl font-black">Enquiry Received!</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Thank you, {form.name}. Our advisory team will reach out shortly with verified availability for{" "}
                  <strong>{form.interestedProject}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#202020] text-[#F9DB5C] font-black text-xs"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-3.5 text-xs">
                {formError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 font-bold">
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your Name"
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email (Optional)</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Interested Project / Phase</label>
                    <input
                      type="text"
                      value={form.interestedProject}
                      onChange={(e) => setForm({ ...form, interestedProject: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Preferred Plot Size</label>
                    <select
                      value={form.preferredPlotSize}
                      onChange={(e) => setForm({ ...form, preferredPlotSize: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium"
                    >
                      <option value="600–1000 sq.ft">600–1000 sq.ft</option>
                      <option value="1200–1500 sq.ft">1200–1500 sq.ft</option>
                      <option value="1500–2500 sq.ft">1500–2500 sq.ft</option>
                      <option value="Corner / Custom">Corner / Custom</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Budget Range</label>
                    <select
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium"
                    >
                      <option value="Contact for Price / Custom Quote">Request Latest Quote</option>
                      <option value="Under ₹15 Lakhs">Under ₹15 Lakhs</option>
                      <option value="₹15L – ₹30 Lakhs">₹15L – ₹30 Lakhs</option>
                      <option value="₹30L – ₹50 Lakhs">₹30L – ₹50 Lakhs</option>
                      <option value="Above ₹50 Lakhs">Above ₹50 Lakhs</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Purpose</label>
                    <select
                      value={form.purpose}
                      onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium"
                    >
                      <option value="Self-use">Self-use (Home Build)</option>
                      <option value="Investment">Investment</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Preferred Site-Visit Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={form.preferredVisitDate}
                    onChange={(e) => setForm({ ...form, preferredVisitDate: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Message</label>
                  <textarea
                    rows={2}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Plot number preference, bank loan question, or pickup request..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-medium"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#F6E785] via-[#F9DB5C] to-[#B78D42] text-[#202020] font-black uppercase tracking-wider shadow-gold disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Submit Enquiry / Book Site Visit"}
                </button>
              </form>
            )}
          </div>
        </section>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-5xl w-full">
            <Image
              src={lightboxImage}
              alt="AUREON BREEZE Fullscreen Preview"
              width={1728}
              height={1224}
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
