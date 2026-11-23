"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { COMPANY_INFO } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Share2,
  Bot,
  Database,
  BarChart3,
  Video,
  Send,
  MessageCircle,
  Phone,
  Layers,
  Check,
} from "lucide-react";
import { Youtube } from "@/components/icons/YoutubeIcon";

export default function BusinessSolutionsPage() {
  const { language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<"marketing" | "crm" | "whatsapp">("marketing");

  const solutions = [
    {
      id: "marketing",
      title: language === "ta" ? "ரியல் எஸ்டேட் வீடியோ & டிஜிட்டல் மார்க்கெட்டிங்" : "Real Estate Digital Marketing & Media",
      eyebrow: "125K+ Audience Network",
      tagline: language === "ta" ? "நேரடி யூடியூப் வீடியோக்கள் மற்றும் ட்ரோன் காட்சிகள்" : "High-Impact Walkthroughs & NRI Buyer Reach",
      desc: language === "ta"
        ? "வீடு வீட்டுமனை சந்தையின் 125,000+ சந்தாதாரர்கள் கொண்ட யூடியூப் தளம் மூலம் உங்கள் அப்ரூவ்டு வீட்டுமனைகள் மற்றும் வீடுகளை உண்மையான வாங்குபவர்களிடம் கொண்டு சேர்க்கிறோம்."
        : "Showcase approved layouts and builder projects to an active community of 125,000+ verified buyers and NRIs across Singapore, Malaysia, and the Gulf.",
      features: [
        language === "ta" ? "Er. J. வைரவேல் அவர்களின் நேரடி வீடியோ விளக்கம்" : "On-camera walkthrough presented by Er. J. Vairavel",
        language === "ta" ? "4K சினிமாட்டிக் ட்ரோன் காட்சிகள் & பகுதி வளர்ச்சி பகுப்பாய்வு" : "4K cinematic drone footage with corridor growth analysis",
        language === "ta" ? "வாட்ஸ்அப் மூலம் நேரடியாக பில்டர்களுக்கு லீட்ஸ் இணைப்பு" : "Direct buyer routing to developer sales desks",
        language === "ta" ? "மெட்டா மற்றும் கூகுள் விளம்பர ஒருங்கிணைப்பு" : "Targeted high-intent digital advertising campaigns",
      ],
      image: "/images/youtube-production.jpg",
      icon: Video,
      deliverable: "15-Min Walkthrough Video + Reels + Targeted Campaign",
    },
    {
      id: "crm",
      title: language === "ta" ? "ரியல் எஸ்டேட் CRM கட்டமைப்பு & லீட் மேலாண்மை" : "Real Estate CRM Implementation",
      eyebrow: "Structured Sales Pipelines",
      tagline: language === "ta" ? "ஒழுங்கமைக்கப்பட்ட லீட் கண்காணிப்பு & சைட் விசிட் பைப்லைன்" : "Zero Lead Leakage & Automated Site-Visit Workflows",
      desc: language === "ta"
        ? "வாட்ஸ்அப், யூடியூப் மற்றும் போர்ட்டல்கள் மூலம் வரும் அனைத்து விசாரணைகளையும் ஒரே தளத்தில் ஒருங்கிணைத்து, உங்கள் விற்பனை குழுவிற்கு உரிய நேரத்தில் பணிகளை ஒதுக்கும் தீர்வு."
        : "Eliminate spreadsheet chaos and lost buyer enquiries. We configure tailor-made real estate CRMs with stage-wise pipeline visibility, automated lead attribution, and agent performance tracking.",
      features: [
        language === "ta" ? "யூடியூப், வாட்ஸ்அப், இணையதள லீட்களின் உடனடி ஒருங்கிணைப்பு" : "Multi-channel lead ingestion (Website, WhatsApp, Meta, Portals)",
        language === "ta" ? "விற்பனை பிரதிநிதிகளுக்கான உடனடி SMS & வாட்ஸ்அப் எச்சரிக்கை" : "Instant rep alert and automated first-touch response",
        language === "ta" ? "சைட் விசிட் அட்டவணை மற்றும் வருகை உறுதிப்படுத்தல்" : "Site-visit scheduling and automated customer reminders",
        language === "ta" ? "மேலாண்மைக்கான விரிவான வணிக அறிக்கை டேஷ்போர்டு" : "Executive conversion dashboard and channel ROI analytics",
      ],
      image: "/images/villa-interior.jpg",
      icon: Database,
      deliverable: "Configured Real Estate CRM + Role SOPs + Staff Training",
    },
    {
      id: "whatsapp",
      title: language === "ta" ? "வாட்ஸ்அப் தானியங்கி & AI பணிப்பாய்வு" : "WhatsApp Automation & AI Workforce",
      eyebrow: "24/7 Buyer Concierge",
      tagline: language === "ta" ? "உடனடி பிரசுரங்கள், மனை வரைபடங்கள் மற்றும் வினாடி பதில்" : "Automated Brochure Dispatch & Intelligent Qualification",
      desc: language === "ta"
        ? "இரவு அல்லது விடுமுறை நாட்களிலும் வாங்குபவர்களின் கேள்விகளுக்கு உடனடி பதில் அளித்து, மனை வரைபடம் மற்றும் விலைப் பட்டியலை வாட்ஸ்அப்பில் அனுப்பும் நவீன தானியங்கி தீர்வு."
        : "Never miss an enquiry. Deploy intelligent conversational workflows to answer buyer FAQs, share approved layout maps, qualify purchase budgets, and schedule property walkthroughs around the clock.",
      features: [
        language === "ta" ? "மெட்டாவின் அதிகாரப்பூர்வ வாட்ஸ்அப் பிசினஸ் API ஒருங்கிணைப்பு" : "Official WhatsApp Business Cloud API setup & verification",
        language === "ta" ? "மனை வரைபடம் மற்றும் லொகேஷன் தானியங்கி அனுப்புதல்" : "Instant PDF brochure and Google Maps location dispatch",
        language === "ta" ? "வாங்குபவர் பட்ஜெட் மற்றும் பகுதி தேவையை உறுதி செய்யும் சர்வே" : "Interactive qualification survey before sales handover",
        language === "ta" ? "கூகுள் காலண்டர் மற்றும் CRM நேரடி ஒருங்கிணைப்பு" : "Seamless calendar syncing and pipeline deal creation",
      ],
      image: "/images/hero-villa.jpg",
      icon: Bot,
      deliverable: "Custom Flow Builder + Pre-approved Templates + AI Setup",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Visual Preview Notice Banner */}
      <div className="bg-amber-100 border-b border-amber-300 text-amber-950 py-2.5 px-4 text-xs font-semibold">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="bg-amber-600 text-white text-[10px] uppercase font-black px-2 py-0.5 rounded">
              UI/UX Preview
            </span>
            <span>
              {language === "ta"
                ? "வணிக தீர்வுகள் காட்சி முன்னோட்டம் • ஆலோசனை மற்றும் சேவை ஒப்பந்த மாதிரியாக மட்டுமே வழங்கப்படுகிறது."
                : "Business Solutions Visual Preview • Solutions are delivered as managed consulting services, not multi-tenant SaaS products."}
            </span>
          </div>
          <span className="hidden md:inline text-amber-800 text-[11px] font-bold">
            Custom Quotation Model
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-brand-black text-white py-14 sm:py-20 relative overflow-hidden border-b-2 border-amber-400/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-amber-400/50 text-amber-300 text-xs font-black uppercase tracking-wider backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>B2B Real Estate & Digital Solutions</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {language === "ta"
                ? "ரியல் எஸ்டேட் நிறுவனங்களுக்கான நவீன தொழில்நுட்ப தீர்வுகள்"
                : "Digital Marketing, CRM & AI Workflows for Real Estate"}
            </h1>

            <p className="text-xs sm:text-base text-slate-300 leading-relaxed font-medium">
              {language === "ta"
                ? "வீடு வீட்டுமனை சந்தையின் 125,000+ பார்வையாளர் பலம், சிவில் இன்ஜினியரிங் நம்பகத்தன்மை மற்றும் நவீன ஆட்டோமேஷன் தொழில்நுட்பங்கள் மூலம் உங்கள் திட்டங்களை வேகமாக விற்பனை செய்யுங்கள்."
                : "Accelerate property absorption with video walkthroughs on our 125K+ subscriber channel, structured CRM pipeline architectures, and 24/7 conversational WhatsApp automation."}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#solutions-overview"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-600/30 transition hover:-translate-y-0.5"
              >
                {language === "ta" ? "தீர்வுகளைக் காண்க" : "Explore 3 Core Solutions"}
              </a>
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent(
                  "Hello Er. J. Vairavel, I am interested in VVMS B2B Business Solutions (Marketing / CRM / WhatsApp). Please share consultation details."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs backdrop-blur-md transition"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>{language === "ta" ? "வாட்ஸ்அப் ஆலோசனை" : "Book B2B Consultation"}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Tabs & Detailed Breakdown */}
      <section id="solutions-overview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Solution Category Selector */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
          {solutions.map((sol) => {
            const Icon = sol.icon;
            const isActive = activeTab === sol.id;
            return (
              <button
                key={sol.id}
                onClick={() => setActiveTab(sol.id as any)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-black transition border-2 whitespace-nowrap ${
                  isActive
                    ? "bg-brand-black text-amber-400 border-amber-400 shadow-lg shadow-amber-500/10"
                    : "bg-white text-slate-700 border-amber-100 hover:border-amber-300"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-amber-400" : "text-amber-600"}`} />
                <span>{sol.title.split("&")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Solution Detail Card */}
        {solutions
          .filter((s) => s.id === activeTab)
          .map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden border-2 border-amber-200/90 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-0"
              >
                {/* Left Media Banner */}
                <div className="relative aspect-[16/10] lg:aspect-auto lg:col-span-5 bg-slate-900 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 bg-brand-black/90 text-amber-300 text-xs font-black px-3 py-1 rounded-xl border border-amber-400/40 backdrop-blur-md">
                    {item.eyebrow}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-xs uppercase font-bold text-amber-300">Deliverable Spec</div>
                    <div className="font-extrabold text-sm">{item.deliverable}</div>
                  </div>
                </div>

                {/* Right Content */}
                <div className="p-6 sm:p-10 lg:col-span-7 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-300 text-[11px] font-black uppercase">
                      <Icon className="w-3.5 h-3.5 text-amber-600" />
                      <span>{item.tagline}</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                      {item.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      {item.desc}
                    </p>

                    <div className="space-y-2.5 pt-2">
                      <div className="text-xs font-black uppercase text-slate-900 tracking-wider">
                        Key Capabilities & Deliverables:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {item.features.map((feat, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2 p-2.5 rounded-xl bg-amber-50/50 border border-amber-100 text-xs font-semibold text-slate-800"
                          >
                            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Consultation CTA */}
                  <div className="pt-4 border-t border-amber-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-slate-500 font-medium text-center sm:text-left">
                      Custom Quotation tailored to project scale & timeline.
                    </div>

                    <a
                      href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent(
                        `Hello Er. J. Vairavel, I would like to request a custom quotation for ${item.title}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-xs uppercase tracking-wider shadow-md transition"
                    >
                      <span>Request Custom Scope</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
      </section>

      {/* Why Choose VVMS for B2B Growth */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">
            Why Tamil Nadu Real Estate Firms Partner With VVMS
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            A combination of verified engineering credibility, high-intent audience, and practical digital automation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-amber-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Civil Engineering Authority</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every project promoted is verified by Er. J. Vairavel, giving buyers 100% confidence in road widths, approvals, and legal authenticity.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-amber-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 border border-red-200 flex items-center justify-center">
              <Youtube className="w-5 h-5 fill-red-600" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">125K+ Active NRI Audience</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Reach affluent Tamil families in Chennai, Bengaluru, Singapore, Malaysia, and the Middle East actively searching for verified land parcels.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-amber-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-700 border border-cyan-200 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">End-to-End Operational Fit</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              We do not sell fragile generic software. We configure operational workflows that fit the day-to-day realities of Indian property developers.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
