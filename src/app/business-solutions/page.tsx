"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { COMPANY_INFO } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";
import HeroSlider, { HeroSlide } from "@/components/HeroSlider";
import ScrollReveal from "@/components/ScrollReveal";
import { ParallaxFloatingAccents } from "@/components/Parallax";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Share2,
  MessageSquareCode,
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
      icon: MessageSquareCode,
      deliverable: "Custom Flow Builder + Pre-approved Templates + AI Setup",
    },
  ];

  const businessSlides: HeroSlide[] = [
    {
      image: "/images/youtube-production.jpg",
      tag: "125K+ SUBSCRIBER YOUTUBE NETWORK",
      tagColor: "red",
      title: "4K Drone Walkthroughs • Direct NRI & Tamil Buyers",
      subtitle:
        language === "ta"
          ? "வீடு வீட்டுமனை சந்தையின் 125,000+ பார்வையாளர் பலம், Er. J. வைரவேலின் நேரடி கள விளக்கம் மற்றும் சினிமாட்டிக் ட்ரோன் காட்சிகள்."
          : "Showcase approved layouts and builder projects to an active community of 125,000+ verified buyers and NRIs across Singapore, Malaysia, and the Gulf.",
      primaryCta: {
        label: language === "ta" ? "தீர்வுகளைக் காண்க" : "Explore Solutions",
        href: "#solutions-overview",
      },
      secondaryCta: {
        label: language === "ta" ? "வீடியோ பதிவு செய்ய" : "Book Video Shoot",
        href: `https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent(
          "Hello Er. J. Vairavel, I want to feature my layout/villa project on your YouTube channel."
        )}`,
      },
      metrics: [
        { value: "125K+", label: "Subscribers" },
        { value: "4K UHD", label: "Drone Walkthrough" },
        { value: "On-Camera", label: "Er. J. Vairavel Review" },
        { value: "Direct", label: "Zero Broker Bias" },
      ],
    },
    {
      image: "/images/luxury-interior.jpg",
      tag: "REAL ESTATE CRM ARCHITECTURE",
      tagColor: "cyan",
      title: "Structured Sales Pipelines • Zero Lead Leakage",
      subtitle:
        language === "ta"
          ? "ஸ்ப்ரெட்ஷீட் குழப்பங்களை முடிவுக்கு கொண்டு வாருங்கள். உங்கள் திட்டத்திற்கு ஏற்ப கட்டமைக்கப்பட்ட ரியல் எஸ்டேட் CRM மற்றும் தானியங்கி லீட் மேலாண்மை."
          : "Eliminate spreadsheet chaos with tailored real estate CRMs featuring automated lead attribution, stage-wise pipeline visibility, and agent performance tracking.",
      primaryCta: {
        label: language === "ta" ? "CRM கட்டமைப்பு" : "CRM Solutions",
        href: "#solutions-overview",
      },
      secondaryCta: {
        label: language === "ta" ? "டெமோ கோரிக்கை" : "Request Demo",
        href: `https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent(
          "Hello Er. J. Vairavel, I need a custom CRM pipeline setup for my real estate firm."
        )}`,
      },
      metrics: [
        { value: "Multi-Channel", label: "Lead Ingestion" },
        { value: "Instant Alerts", label: "WhatsApp & SMS" },
        { value: "SOPs", label: "Sales Team Training" },
        { value: "Full Stack", label: "Done-For-You Delivery" },
      ],
    },
    {
      image: "/images/hero-villa.jpg",
      tag: "24/7 WHATSAPP CONCIERGE & AI",
      tagColor: "gold",
      title: "Automated Brochure Dispatch • Instant Buyer Qualification",
      subtitle:
        language === "ta"
          ? "இரவு பகல் எந்த நேரமும் வாங்குபவர்களின் கேள்விகளுக்கு உடனடி பதில் அளித்து, அப்ரூவ்டு மனை வரைபடங்களை வாட்ஸ்அப்பில் அனுப்பும் நவீன தீர்வு."
          : "Deploy intelligent conversational workflows on official WhatsApp Business API to qualify buyers, share layout maps, and book site visits automatically.",
      primaryCta: {
        label: language === "ta" ? "வாட்ஸ்அப் ஆட்டோமேஷன்" : "WhatsApp Automation",
        href: "#solutions-overview",
      },
      secondaryCta: {
        label: language === "ta" ? "டெமோவை சோதிக்க" : "Test Live Flow",
        href: `https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent(
          "Hello Er. J. Vairavel, I want to see a demo of WhatsApp Real Estate Automation."
        )}`,
      },
      metrics: [
        { value: "Meta Cloud", label: "Official WhatsApp API" },
        { value: "Instant PDF", label: "Brochures & Layouts" },
        { value: "24/7 Active", label: "Buyer Qualification" },
        { value: "Calendar Sync", label: "Site Visit Booking" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F2F2F2] pb-20 relative overflow-hidden blueprint-grid-bg">
      <ParallaxFloatingAccents variant="gold" />

      {/* 1. Hero Carousel with Built-in Parallax */}
      <HeroSlider slides={businessSlides} />

      {/* Visual Preview Notice Banner */}
      <div className="bg-white border-b border-[#B78D42]/30 text-[#202020] py-3 px-4 text-xs sm:text-sm font-semibold shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="bg-[#202020] text-[#F9DB5C] text-xs uppercase font-black px-2.5 py-1 rounded">
              UI/UX Preview
            </span>
            <span>
              {language === "ta"
                ? "வணிக தீர்வுகள் காட்சி முன்னோட்டம் • ஆலோசனை மற்றும் சேவை ஒப்பந்த மாதிரியாக மட்டுமே வழங்கப்படுகிறது."
                : "Business Solutions Visual Preview • Solutions are delivered as managed consulting services, not multi-tenant SaaS products."}
            </span>
          </div>
          <span className="hidden md:inline text-[#B78D42] text-xs font-bold">
            Custom Quotation Model
          </span>
        </div>
      </div>

      {/* Solutions Tabs & Detailed Breakdown */}
      <section id="solutions-overview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Solution Category Selector */}
        <ScrollReveal direction="up">
          <div className="flex items-center justify-center gap-2.5 mb-8 overflow-x-auto pb-2 touch-scroll">
            {solutions.map((sol) => {
              const Icon = sol.icon;
              const isActive = activeTab === sol.id;
              return (
                <button
                  key={sol.id}
                  onClick={() => setActiveTab(sol.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl text-xs sm:text-[13px] font-bold transition border whitespace-nowrap ${
                    isActive
                      ? "bg-[#202020] text-[#F9DB5C] border-[#B78D42] shadow-gold"
                      : "bg-white text-slate-700 border-slate-200 hover:border-[#B78D42]/40"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#F9DB5C]" : "text-[#B78D42]"}`} />
                  <span>{sol.title.split("&")[0]}</span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Selected Solution Detail Card */}
        {solutions
          .filter((s) => s.id === activeTab)
          .map((item) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.id} direction="up" delayMs={50}>
                <div
                  className="bg-white rounded-3xl overflow-hidden border border-[#B78D42]/35 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-0 card-hover-lift"
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
                  <div className="absolute top-4 left-4 bg-[#202020]/95 text-[#F9DB5C] text-xs font-black px-3 py-1 rounded-xl border border-[#B78D42]/50 backdrop-blur-md shadow-md">
                    {item.eyebrow}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-xs uppercase font-bold text-[#F9DB5C]">Deliverable Spec</div>
                    <div className="font-extrabold text-sm">{item.deliverable}</div>
                  </div>
                </div>

                {/* Right Content */}
                <div className="p-6 sm:p-10 lg:col-span-7 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2F2F2] text-[#202020] border border-[#B78D42]/40 text-[11px] font-black uppercase">
                      <Icon className="w-3.5 h-3.5 text-[#B78D42]" />
                      <span>{item.tagline}</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black text-[#202020]">
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
                            className="flex items-start gap-2 p-2.5 rounded-xl bg-[#F2F2F2] border border-[#B78D42]/20 text-xs font-semibold text-slate-800"
                          >
                            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Consultation CTA */}
                  <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-slate-500 font-medium text-center sm:text-left">
                      Custom Quotation tailored to project scale & timeline.
                    </div>

                    <a
                      href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent(
                        `Hello Er. J. Vairavel, I would like to request a custom quotation for ${item.title}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#F6E785] via-[#F9DB5C] to-[#B78D42] hover:brightness-105 text-[#202020] font-black text-xs uppercase tracking-wider shadow-gold border border-[#B78D42]/50 transition"
                    >
                      <span>Request Custom Scope</span>
                      <ArrowRight className="w-4 h-4 text-[#202020]" />
                    </a>
                  </div>
                </div>
              </div>
              </ScrollReveal>
            );
          })}
      </section>

      {/* Why Choose VVMS for B2B Growth */}
      <ScrollReveal direction="up">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <h3 className="text-xl sm:text-2xl font-black text-[#202020]">
              Why Tamil Nadu Real Estate Firms Partner With VVMS
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              A combination of verified engineering credibility, high-intent audience, and practical digital automation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#B78D42]/30 shadow-sm space-y-3 card-hover-lift">
              <div className="w-10 h-10 rounded-xl bg-[#F2F2F2] text-[#B78D42] border border-[#B78D42]/30 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Civil Engineering Authority</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Every project promoted is verified by registered chartered engineers, giving buyers 100% confidence in road widths, approvals, and legal authenticity.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#B78D42]/30 shadow-sm space-y-3 card-hover-lift">
              <div className="w-10 h-10 rounded-xl bg-[#C20E10]/10 text-[#C20E10] border border-[#C20E10]/30 flex items-center justify-center">
                <Youtube className="w-5 h-5 fill-[#C20E10]" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">125K+ Active NRI Audience</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Reach affluent Tamil families in Chennai, Bengaluru, Singapore, Malaysia, and the Middle East actively searching for verified land parcels.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#B78D42]/30 shadow-sm space-y-3 card-hover-lift">
              <div className="w-10 h-10 rounded-xl bg-[#22CDE1]/10 text-[#0891B2] border border-[#22CDE1]/30 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">End-to-End Operational Fit</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                We do not sell fragile generic software. We configure operational workflows that fit the day-to-day realities of Indian property developers.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
