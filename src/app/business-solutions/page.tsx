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
  Briefcase,
  Video,
  Bot,
  Car,
  Users,
  HardHat,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Building2,
  Send,
  MessageCircle,
  Phone,
  Layers,
  Check,
  Landmark,
  FileCheck,
  Compass,
  TrendingUp,
  MapPin,
  Clock,
  Sparkles,
  Award,
} from "lucide-react";
import { Youtube } from "@/components/icons/YoutubeIcon";

export interface BusinessServiceItem {
  id: string;
  number: string;
  title: string;
  titleTa: string;
  eyebrow: string;
  tagline: string;
  taglineTa: string;
  desc: string;
  descTa: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  deliverable: string;
  deliverableTa: string;
  pillars: Array<{
    title: string;
    titleTa: string;
    desc: string;
    descTa: string;
  }>;
}

export default function BusinessSolutionsPage() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("representation");
  const [submitted, setSubmitted] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    promoterName: "",
    phone: "",
    projectName: "",
    locality: "Trichy Outer Ring Road",
    unitsPlots: "25-50 Units",
    serviceNeeded: "Full Channel Partner Representation",
  });

  const SIX_END_TO_END_SERVICES: BusinessServiceItem[] = [
    {
      id: "representation",
      number: "01",
      title: "Real Estate Channel Partner Representation",
      titleTa: "ரியல் எஸ்டேட் சேனல் பார்ட்னர் நேரடி பிரதிநிதித்துவம்",
      eyebrow: "Sole / Co-Exclusive Sales Mandates",
      tagline: "Active Closing Responsibility • Zero Passive Consulting",
      taglineTa: "செயல்பாட்டு விற்பனை வேகம் • நேரடி பத்திரப் பதிவு வரை",
      desc: "VVMS partners with layout promoters under formal representation mandates, taking active responsibility for sales velocity, buyer vetting, and closing transactions rather than acting as passive consultants.",
      descTa: "வீடு வீட்டுமனை சந்தை (VVMS) மனைப் பிரிவாளர்களுடன் முறையான பிரதிநிதித்துவ ஒப்பந்தத்தின் கீழ் இணைந்து, விற்பனை வேகம், வாங்குபவர் தகுதி மற்றும் பத்திரப்பதிவு இறுதிவரை முழுப் பொறுப்பேற்று செயல்படுகிறது.",
      icon: Briefcase,
      image: "/images/hero-villa.jpg",
      deliverable: "Sole/Co-Exclusive Mandate + Dedicated On-Ground Sales Team",
      deliverableTa: "பிரத்யேக விற்பனை ஒப்பந்தம் + நேரடி கள விற்பனை குழு",
      pillars: [
        {
          title: "Project Onboarding & Auditing",
          titleTa: "திட்ட ஆவணங்கள் & DTCP ஆய்வு",
          desc: "Comprehensive project onboarding and rigorous DTCP/RERA document auditing before market release.",
          descTa: "விற்பனைக்கு முன் முழுமையான DTCP, RERA மற்றும் அசல் ஆவணங்களின் சட்டப்பூர்வ ஆய்வு.",
        },
        {
          title: "Lead & Buyer Management",
          titleTa: "வாங்குபவர் திரட்டல் & பட்ஜெட் தகுதி",
          desc: "Targeted buyer enquiry generation and stringent budget qualification across Trichy and NRI corridors.",
          descTa: "திருச்சி மற்றும் வெளிநாடு வாழ் தமிழர்களிடம் நேரடி வாங்குபவர் விசாரணை உருவாக்கம்.",
        },
        {
          title: "Sales Execution",
          titleTa: "நேரடி விற்பனை & ஆட்சேபனை தீர்வு",
          desc: "Structured follow-up protocols, transparent pricing negotiations, and active buyer objection handling.",
          descTa: "ஒழுங்குபடுத்தப்பட்ட பின்தொடர்தல் நெறிமுறைகள் மற்றும் நேரடி விற்பனை தீர்வுகள்.",
        },
        {
          title: "Closing Support",
          titleTa: "கிரயப் பத்திர வரைவு & சார்-பதிவாளர் உதவி",
          desc: "Draft sale deed facilitation, legal documentation, and on-ground Sub-Registrar coordination.",
          descTa: "கிரயப் பத்திர வரைவு தயாரிப்பு மற்றும் சார்-பதிவாளர் அலுவலக நேரடி பதிவு ஒருங்கிணைப்பு.",
        },
      ],
    },
    {
      id: "digital-marketing",
      number: "02",
      title: "Targeted Real Estate Digital Marketing",
      titleTa: "இலக்கு நோக்கிய ரியல் எஸ்டேட் டிஜிட்டல் மார்க்கெட்டிங்",
      eyebrow: "High-Intent Buyer Profiling",
      tagline: "Homebuilders, Tech Executives & NRI Diaspora",
      taglineTa: "வீடு கட்டுவோர் & சிங்கப்பூர், வளைகுடா முதலீட்டாளர்கள்",
      desc: "Hyper-targeted campaigns designed around buyer intent—specifically profiling homebuilders, engineering executives, and Gulf/Singapore Tamil diaspora investors rather than generating generic clicks.",
      descTa: "வீண் கிளிக்குகளைத் தவிர்த்து, உண்மையாக வீடு கட்டுவோர், அரசு/தனியார் பொறியாளர்கள் மற்றும் வளைகுடா, சிங்கப்பூர் வாழ் தமிழர்களை இலக்காகக் கொண்டு நடத்தப்படும் நவீன டிஜிட்டல் விளம்பரங்கள்.",
      icon: Video,
      image: "/images/youtube-production.jpg",
      deliverable: "4K Aerial Drone Walkthrough + Landing Page + Meta/Google Ad Suite",
      deliverableTa: "4K சினிமாட்டிக் ட்ரோன் வீடியோ + தனி லேண்டிங் பேஜ் + விளம்பர கட்டமைப்பு",
      pillars: [
        {
          title: "Paid Media Campaigns",
          titleTa: "மெட்டா & கூகுள் தேடல் விளம்பரங்கள்",
          desc: "Meta and Google search campaign design with continuous daily bid optimization and high-intent keyword targeting.",
          descTa: "கூகுள் மற்றும் மெட்டாவில் தீவிரமாக மனை தேடுவோருக்கான தினசரி ஏல விளம்பர உத்திகள்.",
        },
        {
          title: "High-Speed Web Assets",
          titleTa: "பிரத்யேக மொபைல் லேண்டிங் பேஜ்",
          desc: "Dedicated, ultra-fast mobile project landing pages with interactive layout maps and WhatsApp booking.",
          descTa: "வேகமாக திறக்கும் மொபைல் வலைப்பக்கம் மற்றும் நேரடி வாட்ஸ்அப் வரைபட இணைப்பு.",
        },
        {
          title: "Visual Production",
          titleTa: "4K ட்ரோன் காட்சிகள் & எல்லைக் குறிகள்",
          desc: "High-definition aerial drone walkthroughs, master plan demarcations, and Er. J. Vairavel technical video presentation.",
          descTa: "உயர்தர 4K ட்ரோன் காட்சிகள் மற்றும் யூடியூப் வீடியோ கள விளக்கங்கள்.",
        },
        {
          title: "Analytics & CRM Sync",
          titleTa: "செலவு-மதிப்பு அறிக்கை & CRM இணைப்பு",
          desc: "Cost-per-qualified-lead reporting integrated with direct CRM synchronization and transparent attribution.",
          descTa: "ஒவ்வொரு லீடுக்குமான செலவு மற்றும் CRM நேரடி ஒருங்கிணைப்பு அறிக்கைகள்.",
        },
      ],
    },
    {
      id: "ai-automation",
      number: "03",
      title: "AI Lead Qualification & Sales Automation",
      titleTa: "AI லீட் தகுதி & விற்பனை தானியங்கி தீர்வுகள்",
      eyebrow: "Sub-Second Inbound Response",
      tagline: "Bilingual Tamil & English Conversational Intelligence",
      taglineTa: "தமிழ் & ஆங்கில இருமொழி வாட்ஸ்அப் நுண்ணறிவு",
      desc: "A bilingual (English and Tamil) conversational intelligence system that responds to inbound enquiries within seconds to pre-qualify serious buyers before routing them to human advisors.",
      descTa: "வாட்ஸ்அப் மற்றும் இணையதளத்தில் வரும் விசாரணைகளுக்கு வினாடிகளில் தமிழ் மற்றும் ஆங்கிலத்தில் பதிலளித்து, பட்ஜெட் மற்றும் விருப்பங்களை உறுதி செய்யும் தானியங்கி நுண்ணறிவு தளம்.",
      icon: Bot,
      image: "/images/blueprint-audit.jpg",
      deliverable: "Official WhatsApp Cloud API + Bilingual Qualification Engine + CRM Routing",
      deliverableTa: "அதிகாரப்பூர்வ வாட்ஸ்அப் API + தானியங்கி தகுதி அமைப்பு + CRM இணைப்பு",
      pillars: [
        {
          title: "Instant Response",
          titleTa: "உடனடி வாட்ஸ்அப் & வலைத்தள பதில்",
          desc: "Automated WhatsApp and Web enquiry responses within 5 seconds, active 24/7/365 without staff fatigue.",
          descTa: "இரவு அல்லது விடுமுறை நாட்களிலும் 5 வினாடிகளுக்குள் உடனடி வாட்ஸ்அப் தகவல் அனுப்புதல்.",
        },
        {
          title: "Automated Qualification",
          titleTa: "பட்ஜெட், ரோடு & திசை தேர்வு தகுதி",
          desc: "Filters buyers by budget comfort, road width (30/40 ft), facing preferences (East/North), and building timelines.",
          descTa: "வாங்குபவரின் பட்ஜெட், சாலை அகலம், மனை திசை மற்றும் கட்டுமான திட்டத்தை முன்கூட்டியே பிரித்தறிதல்.",
        },
        {
          title: "Automated Scheduling",
          titleTa: "சைட் விசிட் முன்பதிவு & நினைவூட்டல்",
          desc: "Interactive site-visit slot calendar reminders, automatic confirmations, and Google Maps transit pins.",
          descTa: "நேரடி சைட் விசிட் தேதி முன்பதிவு மற்றும் வாடிக்கையாளருக்கான தானியங்கி நினைவூட்டல்.",
        },
        {
          title: "Advisor Handoff",
          titleTa: "விற்பனை ஆலோசகர்களிடம் நேரடி ஒப்படைப்பு",
          desc: "Smooth transition of high-intent qualified leads directly to human field advisors with full chat context.",
          descTa: "முழு விவரங்களுடன் தகுதியான வாடிக்கையாளர்களை நேரடி விற்பனை மேலாளர்களிடம் ஒப்படைத்தல்.",
        },
      ],
    },
    {
      id: "site-visits",
      number: "04",
      title: "Accompanied Site-Visit & Field Coordination",
      titleTa: "நேரடி கள சைட் விசிட் & வாகன ஒருங்கிணைப்பு",
      eyebrow: "100% On-Ground Transparency",
      tagline: "Free Transit & Civil Engineer Demonstration",
      taglineTa: "இலவச வாகன வசதி & நேரடி மனை வரைபட விளக்கம்",
      desc: "Trained on-ground site coordinators in Trichy escort prospective buyers for physical inspections with complete technical and documentation transparency.",
      descTa: "திருச்சியில் பயிற்சி பெற்ற எங்கள் கள ஒருங்கிணைப்பாளர்கள், வாங்குபவர்களை நேரில் அழைத்துச் சென்று மனை எல்லைக்கற்கள், ரோடு மற்றும் ஆவணங்களை முழு வெளிப்படைத்தன்மையுடன் விளக்குகிறார்கள்.",
      icon: Car,
      image: "/images/dtcp-plots.jpg",
      deliverable: "Transit Cab Coordination + Survey Peg Demo + DTCP Copy Review",
      deliverableTa: "கள வாகன வசதி + எல்லைக்கல் கள விளக்கம் + அசல் ஆவண சரிபார்ப்பு",
      pillars: [
        {
          title: "Transport Coordination",
          titleTa: "திருச்சி மத்திய பகுதியிலிருந்து இலவச வாகனம்",
          desc: "Free cab pickup and transit coordination from central Trichy railway station, bus stands, or airport.",
          descTa: "திருச்சி ஜங்ஷன், பேருந்து நிலையம் அல்லது விமான நிலையத்திலிருந்து வாடிக்கையாளர்களுக்கு இலவச வாகன உதவி.",
        },
        {
          title: "On-Site Walkthroughs",
          titleTa: "எல்லைக்கற்கள், ரோடு & நிலத்தடி நீர் விளக்கம்",
          desc: "Demonstration of physical survey stones, corner pegs, 30–40 ft blacktop roads, water levels, and school distances.",
          descTa: "மனை எல்லைக் கற்கள், 30-40 அடி தார் சாலைகள், நிலத்தடி நீர் மட்டம் மற்றும் பள்ளிகள் தொலைவை நேரில் காட்டுதல்.",
        },
        {
          title: "Document Transparency",
          titleTa: "அசல் DTCP அப்ரூவல் & தானப்பத்திர பார்வை",
          desc: "On-site presentation of original DTCP layout approvals, local body orders, and road gift deed copies.",
          descTa: "DTCP அப்ரூவல் நகல்கள் மற்றும் பஞ்சாயத்து/கார்ப்பரேஷன் ரோடு தானப்பத்திரங்களை நேரில் பார்வையிடல்.",
        },
        {
          title: "Transparent Quoting",
          titleTa: "உடனடி ஆட்சேபனை தீர்வு & வெளிப்படையான விலை",
          desc: "Immediate on-field objection logging, clean breakdown of all charges, and official promoter price quoting.",
          descTa: "மறைமுகக் கட்டணங்கள் இல்லாத அதிகாரப்பூர்வ விலைப்பட்டியல் மற்றும் உடனடி சந்தேக விளக்கம்.",
        },
      ],
    },
    {
      id: "broker-network",
      number: "05",
      title: "Broker & Channel Partner Distribution Network",
      titleTa: "புரோக்கர் & சேனல் பார்ட்னர் விநியோக கட்டமைப்பு",
      eyebrow: "100+ Active Trichy Network",
      tagline: "Zero Duplicate Conflicts & Escrow Protected Commissions",
      taglineTa: "முரண்பாடற்ற லீட் உரிமை & விரைவான கமிஷன் பட்டுவாடா",
      desc: "Access to a curated network of 100+ active real estate brokers across Tiruchirappalli, giving promoters wide distribution without duplicate client conflicts or commission disputes.",
      descTa: "திருச்சியின் 100-க்கும் மேற்பட்ட முன்னணி ரியல் எஸ்டேட் புரோக்கர்களின் ஒருங்கிணைந்த கட்டமைப்பு மூலம் உங்கள் மனைப் பிரிவிற்கு விரிவான விற்பனை ஆதரவு.",
      icon: Users,
      image: "/images/villa-interior.jpg",
      deliverable: "100+ Trichy Broker Network + Timestamped Lead Governance + Escrow Settlements",
      deliverableTa: "100+ புரோக்கர் கட்டமைப்பு + லீட் உரிமை பாதுகாப்பு + கமிஷன் ஒப்பந்தம்",
      pillars: [
        {
          title: "Timestamped Lead Protection",
          titleTa: "நேர முத்திரையிட்ட லீட் உரிமை பாதுகாப்பு",
          desc: "Timestamped, first-to-register lead ownership protection eliminating cross-agent disputes and commission leaks.",
          descTa: "முதலில் பதிவு செய்தவருக்கே வாடிக்கையாளர் உரிமை உறுதி செய்யப்பட்டு இரட்டை சர்ச்சை தவிர்க்கப்படுகிறது.",
        },
        {
          title: "Verified Project Inventory",
          titleTa: "சரிபார்க்கப்பட்ட மனை இருப்பு பட்டியல்",
          desc: "Live access to verified layout inventory, reserved plots, and updated availability spreadsheets.",
          descTa: "விற்பனையான மற்றும் இருப்பு உள்ள மனைகளின் நேரலை கணினிப் பட்டியல் அணுகல்.",
        },
        {
          title: "Commission Governance",
          titleTa: "வெளிப்படையான கமிஷன் ஒப்பந்தம் & விரைவு பட்டுவாடா",
          desc: "Transparent written commission policies with fast escrow settlements and milestone-based agent payouts.",
          descTa: "எழுத்துப்பூர்வ கமிஷன் விதிமுறைகள் மற்றும் பத்திரப்பதிவு முடிந்தவுடன் விரைவான கமிஷன் பட்டுவாடா.",
        },
        {
          title: "Dedicated Field Backing",
          titleTa: "புரோக்கர்களுக்கான நேரடி கள விற்பனை உதவி",
          desc: "Joint site-visit coordination with dedicated VVMS on-ground relationship managers to support closings.",
          descTa: "புரோக்கர்களின் வாடிக்கையாளர்களுக்கு VVMS மேலாளர்கள் வழங்கும் நேரடி கள உதவி.",
        },
      ],
    },
    {
      id: "construction-loans",
      number: "06",
      title: "Guided Home Construction & Bank Loan Advisory",
      titleTa: "வழிகாட்டப்பட்ட வீட்டுக் கட்டுமானம் & வங்கி கடன் ஆலோசனை",
      eyebrow: "Consultative Turnkey Journey",
      tagline: "80% Bank Loans (SBI, HDFC, LIC) & 30-Yr Legal Scrutiny",
      taglineTa: "80% எஸ்பிஐ, எச்டிஎப்சி வீட்டுக் கடன் & 30 வருட சட்ட ஆய்வு",
      desc: "A consultative buying process that matches families to verified residential plots tailored to their budget and building plans, avoiding unmoderated classifieds.",
      descTa: "குடும்பங்களின் பட்ஜெட் மற்றும் கனவு இல்லத் திட்டத்திற்கு ஏற்ப சரிபார்க்கப்பட்ட மனைகளை இணைத்து, 80% வங்கி கடன் மற்றும் சிவில் இன்ஜினியரிங் கட்டுமானத்தை ஒருங்கிணைக்கும் முழுமையான தீர்வு.",
      icon: HardHat,
      image: "/images/luxury-interior.jpg",
      deliverable: "Turnkey BOQ Estimation + SBI/HDFC/LIC Loan Sanction + 30-Yr Legal Clearance",
      deliverableTa: "துல்லியமான கட்டுமான மதிப்பீடு + 80% வீட்டுக் கடன் அனுமதி + 30 வருட சட்ட ஆய்வு",
      pillars: [
        {
          title: "Requirement Profiling",
          titleTa: "தேவை மதிப்பீடு & குடும்ப பட்ஜெட் ஆய்வு",
          desc: "Objective needs assessment via AI and local advisors to establish exact room count, facing, and budget parameters.",
          descTa: "குடும்பத்தின் பட்ஜெட் மற்றும் எதிர்காலத் தேவையை கணிக்கும் விரிவான ஆலோசனை.",
        },
        {
          title: "Curated Layout Matching",
          titleTa: "அப்ரூவ்டு மனைப் பிரிவுகளுடன் நேரடி இணைப்பு",
          desc: "Exclusively matches buyers with 100% DTCP-approved layout inventory free of legal, road, or boundary disputes.",
          descTa: "சட்டச் சிக்கல்கள் இல்லாத 100% DTCP அங்கீகாரம் பெற்ற மனைகளுடன் மட்டுமே இணைப்பு.",
        },
        {
          title: "80% Bank Loan Financing",
          titleTa: "SBI, HDFC, LIC மூலம் 80% வரை வீட்டுக் கடன்",
          desc: "End-to-end documentation assistance for pre-approved bank plot and home construction loans through SBI, HDFC, and LIC.",
          descTa: "பாரத ஸ்டேட் வங்கி (SBI), HDFC மற்றும் LIC மூலம் மனை மற்றும் வீட்டுக் கடன்களுக்கான ஆவண உதவி.",
        },
        {
          title: "30-Year Legal Due Diligence",
          titleTa: "30 வருட வில்லங்க ஆய்வு & கட்டுமான வரைபடம்",
          desc: "Independent advocate title scrutiny covering 30+ years, alongside architectural planning and building approval support.",
          descTa: "உயர்நீதிமன்ற வழக்கறிஞர்களின் 30 வருட வில்லங்க ஆய்வு மற்றும் இன்ஜினியரிங் வரைபட அனுமதி.",
        },
      ],
    },
  ];

  const businessSlides: HeroSlide[] = [
    {
      image: "/images/hero-villa.jpg",
      tag: "REAL ESTATE CHANNEL PARTNER MANDATES",
      tagColor: "gold",
      title: "Six End-to-End Sales, Marketing & Advisory Services • Tiruchirappalli",
      subtitle:
        language === "ta"
          ? "மனைப் பிரிவாளர்களுக்கான முழுமையான சேனல் பார்ட்னர் பிரதிநிதித்துவம், 4K ட்ரோன் மார்க்கெட்டிங், AI லீட் தகுதி, கள சைட் விசிட் மற்றும் 100+ புரோக்கர் விநியோகம்."
          : "VVMS delivers active closing responsibility for layout promoters across Trichy: from sole sales mandates and targeted diaspora marketing to AI qualification, accompanied site visits, and bank loan approvals.",
      primaryCta: {
        label: language === "ta" ? "6 சேவைகளை காண்க" : "Explore 6 Services",
        href: "#six-services-grid",
      },
      secondaryCta: {
        label: language === "ta" ? "ஒப்பந்த ஆலோசனை" : "Partner Consultation",
        href: "#partner-inquiry",
      },
      metrics: [
        { value: "6 Services", label: "End-to-End Pipeline" },
        { value: "100+ Brokers", label: "Trichy Distribution" },
        { value: "125K+ Audience", label: "YouTube Investors" },
        { value: "80% Loans", label: "SBI / HDFC / LIC" },
      ],
    },
    {
      image: "/images/youtube-production.jpg",
      tag: "TARGETED REAL ESTATE DIGITAL MARKETING",
      tagColor: "cyan",
      title: "4K Drone Walkthroughs • High-Intent Tamil Diaspora Reach",
      subtitle:
        language === "ta"
          ? "வீடு கட்டுவோர், திருச்சி பொறியாளர்கள் மற்றும் சிங்கப்பூர், வளைகுடா முதலீட்டாளர்களை நேரடியாக கவரும் உயர்தர டிஜிட்டல் விளம்பர உத்திகள்."
          : "Hyper-targeted paid search and social campaigns profiling genuine homebuilders and overseas Tamil families with integrated cost-per-qualified-lead analytics.",
      primaryCta: {
        label: language === "ta" ? "டிஜிட்டல் மார்க்கெட்டிங்" : "Digital Marketing",
        href: "#solutions-overview",
      },
      secondaryCta: {
        label: language === "ta" ? "வாட்ஸ்அப் பேச" : "WhatsApp Desk",
        href: `https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent(
          "Hello VVMS B2B Desk, I would like to discuss targeted digital marketing for our layout in Trichy."
        )}`,
      },
      metrics: [
        { value: "4K Drone", label: "Aerial Cinematography" },
        { value: "Daily Bids", label: "Meta & Google Ads" },
        { value: "Sub-Second", label: "Fast Mobile Pages" },
        { value: "100% Attributed", label: "Verified Buyer Leads" },
      ],
    },
    {
      image: "/images/turnkey-home.jpg",
      tag: "FIELD ESCORT & BANK LOAN ADVISORY",
      tagColor: "emerald",
      title: "Accompanied Field Inspections • Turnkey Construction Backing",
      subtitle:
        language === "ta"
          ? "மத்திய திருச்சியிலிருந்து இலவச கார் பிக்கப், மனை எல்லைக்கல் விளக்கம், DTCP அசல் ஆவண பார்வை மற்றும் 80% எஸ்பிஐ வீட்டுக் கடன் உதவி."
          : "Trained on-ground coordinators escort buyers with transit from central Trichy, demonstrating physical survey pegs and assisting with 80% pre-approved bank loans.",
      metrics: [
        { value: "Free Transit", label: "Central Trichy Pickup" },
        { value: "DTCP Verified", label: "Original Gift Deeds" },
        { value: "SBI & HDFC", label: "80% Pre-Approved" },
        { value: "Chartered Eng.", label: "Turnkey BOQ Caps" },
      ],
    },
  ];

  const activeService =
    SIX_END_TO_END_SERVICES.find((s) => s.id === activeTab) || SIX_END_TO_END_SERVICES[0];
  const ActiveIcon = activeService.icon;

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryForm.promoterName || !inquiryForm.phone) return;
    setSubmitted(true);

    const waMsg = encodeURIComponent(
      `Hello VVMS Management, I am interested in partner services for my real estate layout in Tiruchirappalli:\n\n• Promoter/Firm: ${inquiryForm.promoterName}\n• Phone: ${inquiryForm.phone}\n• Layout/Project: ${inquiryForm.projectName || "New Layout"}\n• Locality: ${inquiryForm.locality}\n• Scale: ${inquiryForm.unitsPlots}\n• Required Service: ${inquiryForm.serviceNeeded}\n\nPlease schedule an in-person mandate review at your Olaiyur Ring Road Head Office.`
    );
    const waUrl = getWhatsAppUrl(COMPANY_INFO.whatsappRaw, waMsg);

    setTimeout(() => {
      window.open(waUrl, "_blank");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2] pb-20 relative overflow-hidden blueprint-grid-bg">
      <ParallaxFloatingAccents variant="gold" />

      {/* 1. Hero Carousel with Built-in Parallax */}
      <HeroSlider slides={businessSlides} />

      {/* Notice & Scope Banner */}
      <div className="bg-white border-b border-[#B78D42]/30 text-[#202020] py-3 px-4 text-xs sm:text-sm font-semibold shadow-sm relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <span className="bg-[#202020] text-[#F9DB5C] text-xs uppercase font-black px-2.5 py-1 rounded">
              B2B & Promoter Services
            </span>
            <span>
              {language === "ta"
                ? "திருச்சியில் மனைப் பிரிவாளர்களுக்கான 6 முழுமையான விற்பனை, மார்க்கெட்டிங் & ஆலோசனை சேவைகள்."
                : "Six end-to-end real estate sales, marketing, and advisory services in Tiruchirappalli (Trichy)."}
            </span>
          </div>
          <span className="text-[#B78D42] text-xs font-black uppercase tracking-wider">
            Mandate & Consulting Model
          </span>
        </div>
      </div>

      {/* 2. Interactive Spotlight Tabs: The 6 Services */}
      <section id="solutions-overview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        <ScrollReveal direction="down">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#202020] border-2 border-[#B78D42] text-[#F9DB5C] text-xs font-black uppercase tracking-wider shadow-gold">
              <Layers className="w-4 h-4 text-[#22CDE1]" />
              <span>Full-Stack Real Estate Acceleration</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#202020] tracking-tight leading-snug">
              {language === "ta"
                ? "திருச்சி மனைப் பிரிவாளர்களுக்கான 6 முழுமையான சேவைகள்"
                : "Six End-to-End Real Estate Sales, Marketing & Advisory Services"}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {language === "ta"
                ? "மனைப் பிரிவை உருவாக்குவது முதல் வாடிக்கையாளர்களை நேரில் அழைத்துச் சென்று பத்திரப்பதிவு முடித்து, வங்கிக் கடன் வரை VVMS முழு பொறுப்பேற்கிறது."
                : "From legal project onboarding and hyper-targeted digital media to AI qualification, accompanied field walkthroughs, broker networks, and bank loan approvals."}
            </p>
          </div>
        </ScrollReveal>

        {/* 6 Tab Buttons */}
        <ScrollReveal direction="up">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-8">
            {SIX_END_TO_END_SERVICES.map((svc) => {
              const TabIcon = svc.icon;
              const isActive = activeTab === svc.id;
              return (
                <button
                  key={svc.id}
                  onClick={() => setActiveTab(svc.id)}
                  className={`p-3 sm:p-4 rounded-2xl flex flex-col items-center text-center gap-2 transition-all border card-hover-lift ${
                    isActive
                      ? "bg-[#202020] text-[#F9DB5C] border-[#B78D42] shadow-gold scale-[1.02]"
                      : "bg-white text-slate-700 border-slate-200 hover:border-[#B78D42]/50 hover:bg-slate-50"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isActive ? "bg-[#F9DB5C]/20 text-[#F9DB5C]" : "bg-slate-100 text-[#B78D42]"
                    }`}
                  >
                    <TabIcon className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-black leading-tight">
                    {svc.number}. {svc.title.split("&")[0].split(" ")[0]} {svc.title.split("&")[0].split(" ")[1] || ""}
                  </span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Active Tab Spotlight Showcase */}
        <ScrollReveal direction="up" delayMs={50}>
          <div className="bg-white rounded-3xl overflow-hidden border-2 border-[#B78D42]/40 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-0 card-hover-lift">
            {/* Left Media Column */}
            <div className="relative aspect-[16/10] lg:aspect-auto lg:col-span-5 bg-slate-900 overflow-hidden">
              <Image
                src={activeService.image}
                alt={activeService.title}
                fill
                className="object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
              <div className="absolute top-4 left-4 bg-[#202020]/95 text-[#F9DB5C] text-xs font-black px-3 py-1 rounded-xl border border-[#B78D42]/50 backdrop-blur-md shadow-md flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#F9DB5C] text-[#202020] flex items-center justify-center text-[10px] font-black">
                  {activeService.number}
                </span>
                <span>{activeService.eyebrow}</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <div className="text-[11px] uppercase font-bold text-[#F9DB5C] tracking-wider">
                  Deliverable Scope
                </div>
                <div className="font-extrabold text-xs sm:text-sm leading-snug">
                  {language === "ta" ? activeService.deliverableTa : activeService.deliverable}
                </div>
              </div>
            </div>

            {/* Right Pillars & Deliverables Column */}
            <div className="p-6 sm:p-9 lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F2F2F2] text-[#202020] border border-[#B78D42]/40 text-xs font-black uppercase">
                  <ActiveIcon className="w-3.5 h-3.5 text-[#B78D42]" />
                  <span>{language === "ta" ? activeService.taglineTa : activeService.tagline}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-[#202020] leading-snug">
                  {activeService.number}. {language === "ta" ? activeService.titleTa : activeService.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {language === "ta" ? activeService.descTa : activeService.desc}
                </p>

                {/* 4 Execution Pillars Grid */}
                <div className="pt-2 space-y-2.5">
                  <div className="text-xs font-black uppercase text-slate-900 tracking-wider">
                    Core Operational Pillars & Execution:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeService.pillars.map((pillar, pIdx) => (
                      <div
                        key={pIdx}
                        className="p-3.5 rounded-2xl bg-[#F2F2F2] border border-[#B78D42]/25 space-y-1 hover:border-[#B78D42] transition"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <h4 className="text-xs font-black text-[#202020]">
                            {language === "ta" ? pillar.titleTa : pillar.title}
                          </h4>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed pl-6">
                          {language === "ta" ? pillar.descTa : pillar.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Consultation Callout */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500 font-medium text-center sm:text-left">
                  Tailored mandate models for plotted layouts, gated communities & villas.
                </div>

                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent(
                    `Hello VVMS Management, I would like to discuss representation and execution for "${activeService.title}" in Trichy.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#F6E785] via-[#F9DB5C] to-[#B78D42] hover:brightness-105 text-[#202020] font-black text-xs uppercase tracking-wider shadow-gold border border-[#B78D42]/50 transition card-hover-lift"
                >
                  <span>Request Mandate Scope</span>
                  <ArrowRight className="w-4 h-4 text-[#202020]" />
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. Comprehensive 6-Card Grid: The Complete Trichy Services Architecture */}
      <section id="six-services-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-[11px] font-black uppercase tracking-widest text-[#B78D42] block">
              Complete Scope of Work
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#202020]">
              The Six Pillar Real Estate Architecture in Trichy
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              Every phase from land onboarding to sale deed registration and bank loan clearance is actively managed under transparent protocols.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SIX_END_TO_END_SERVICES.map((service, sIndex) => {
            const SvcIcon = service.icon;
            return (
              <ScrollReveal key={service.id} direction="up" delayMs={(sIndex % 3) * 80}>
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#B78D42]/30 hover:border-[#B78D42] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between card-hover-lift group h-full">
                  <div className="space-y-4">
                    {/* Header Pill & Icon */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-[#202020] text-[#F9DB5C] border border-[#B78D42]/60 flex items-center justify-center shadow-md group-hover:scale-105 transition">
                        <SvcIcon className="w-5 h-5 text-[#F9DB5C]" />
                      </div>
                      <span className="text-xs font-black text-[#202020] bg-[#F2F2F2] border border-[#B78D42]/40 px-3 py-1 rounded-xl">
                        Service {service.number}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] font-black text-[#22CDE1] uppercase tracking-wider block">
                        {service.eyebrow}
                      </span>
                      <h4 className="text-lg font-black text-[#202020] group-hover:text-[#B78D42] transition leading-snug mt-1">
                        {service.number}. {language === "ta" ? service.titleTa : service.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal mt-2">
                        {language === "ta" ? service.descTa : service.desc}
                      </p>
                    </div>

                    {/* 4 Pillars Breakdown */}
                    <div className="space-y-2 pt-3 border-t border-slate-100">
                      {service.pillars.map((pillar, pIdx) => (
                        <div key={pIdx} className="text-xs">
                          <div className="font-bold text-slate-800 flex items-start gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#B78D42] mt-1.5 flex-shrink-0" />
                            <span>{language === "ta" ? pillar.titleTa : pillar.title}:</span>
                          </div>
                          <p className="text-[11px] text-slate-500 pl-3 leading-relaxed">
                            {language === "ta" ? pillar.descTa : pillar.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      onClick={() => {
                        setActiveTab(service.id);
                        const el = document.getElementById("solutions-overview");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-xs font-black text-[#202020] hover:text-[#B78D42] transition flex items-center gap-1"
                    >
                      <span>{language === "ta" ? "விவரங்களை காண்க" : "View Full Scope"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent(
                        `Hello VVMS Management, I need information on "${service.title}" for our layout project.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-300 transition"
                      title="WhatsApp Inquiry"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* 4. Why Tamil Nadu Promoters Partner with VVMS */}
      <ScrollReveal direction="up">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 relative z-10">
          <div className="bg-[#202020] rounded-3xl p-8 sm:p-12 border-2 border-[#B78D42]/40 shadow-2xl text-white space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[11px] font-black uppercase tracking-widest text-[#22CDE1] block">
                The VVMS Promoter Advantage
              </span>
              <h3 className="text-xl sm:text-3xl font-black text-[#F9DB5C]">
                Why Tamil Nadu Real Estate Firms Partner With VVMS
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                A powerful trifecta of registered civil engineering authority, active 125,000+ subscriber Tamil diaspora reach, and structured broker distribution.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-3 card-hover-lift hover:border-[#F9DB5C]/50 transition">
                <div className="w-10 h-10 rounded-xl bg-[#F9DB5C]/20 text-[#F9DB5C] border border-[#F9DB5C]/40 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-base">Civil Engineering Authority</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Every layout under our mandate is vetted for exact FMB boundary alignment, 30-40 ft blacktop roads, DTCP/RERA approvals, and groundwater table potability before release.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-3 card-hover-lift hover:border-[#C20E10]/50 transition">
                <div className="w-10 h-10 rounded-xl bg-[#C20E10]/20 text-red-400 border border-red-500/40 flex items-center justify-center">
                  <Youtube className="w-5 h-5 fill-[#C20E10]" />
                </div>
                <h4 className="font-bold text-white text-base">125K+ Active Diaspora Investors</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Our on-camera walkthroughs reach high-net-worth Tamil families in Singapore, Malaysia, Dubai, Chennai, and Bengaluru looking for genuine, vetted investment opportunities.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-3 card-hover-lift hover:border-[#22CDE1]/50 transition">
                <div className="w-10 h-10 rounded-xl bg-[#22CDE1]/20 text-[#22CDE1] border border-[#22CDE1]/40 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-base">100+ Curated Broker Channel</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Timestamped lead registration policies and escrow-backed commission payouts mobilize the entire Trichy broker network without duplicate client conflicts.
                </p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 5. Promoter Representation Mandate Inquiry Form */}
      <section id="partner-inquiry" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 relative z-10">
        <ScrollReveal direction="up">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-[#B78D42]/40 shadow-xl space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-[11px] font-black uppercase tracking-widest text-[#B78D42] block">
                Direct Promoter Mandate Desk
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#202020]">
                Schedule an In-Person Mandate Review
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-normal">
                Visit our Olaiyur Ring Road headquarters in Tiruchirappalli to review representation scopes, commission structures, and digital marketing timelines.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <div className="text-base font-black text-emerald-950">
                  Mandate Inquiry Dispatched via WhatsApp
                </div>
                <p className="text-xs text-emerald-800">
                  Our management team will connect with you to review project layout plans and DTCP approvals.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Promoter / Firm Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={inquiryForm.promoterName}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, promoterName: e.target.value })}
                      placeholder="e.g. Sri Balaji Promoters"
                      className="w-full bg-[#F2F2F2] border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#B78D42] font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Contact Phone (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={inquiryForm.phone}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                      placeholder="e.g. 98424 XXXXX"
                      className="w-full bg-[#F2F2F2] border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#B78D42] font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Project / Layout Name
                    </label>
                    <input
                      type="text"
                      value={inquiryForm.projectName}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, projectName: e.target.value })}
                      placeholder="e.g. Green Valley City"
                      className="w-full bg-[#F2F2F2] border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#B78D42] font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Trichy Locality
                    </label>
                    <select
                      value={inquiryForm.locality}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, locality: e.target.value })}
                      className="w-full bg-[#F2F2F2] border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#B78D42] font-semibold"
                    >
                      <option value="Trichy Outer Ring Road">Trichy Outer Ring Road</option>
                      <option value="Panjappur Bus Terminus Hub">Panjappur Bus Terminus Hub</option>
                      <option value="K.K. Nagar & Airport Zone">K.K. Nagar & Airport Zone</option>
                      <option value="Vayalur Road Corridor">Vayalur Road Corridor</option>
                      <option value="Samayapuram Highway">Samayapuram Highway</option>
                      <option value="Thanjavur Highway (NIT/BHEL)">Thanjavur Highway (NIT/BHEL)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Layout Scale
                    </label>
                    <select
                      value={inquiryForm.unitsPlots}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, unitsPlots: e.target.value })}
                      className="w-full bg-[#F2F2F2] border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#B78D42] font-semibold"
                    >
                      <option value="Under 25 Plots">Under 25 Plots</option>
                      <option value="25-50 Units">25-50 Units</option>
                      <option value="50-100 Units">50-100 Units</option>
                      <option value="100+ Gated Township">100+ Gated Township</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Primary Service Needed
                  </label>
                  <select
                    value={inquiryForm.serviceNeeded}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, serviceNeeded: e.target.value })}
                    className="w-full bg-[#F2F2F2] border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#B78D42] font-semibold"
                  >
                    <option value="1. Full Channel Partner Representation">1. Full Channel Partner Representation</option>
                    <option value="2. Targeted Real Estate Digital Marketing">2. Targeted Real Estate Digital Marketing</option>
                    <option value="3. AI Lead Qualification & Sales Automation">3. AI Lead Qualification & Sales Automation</option>
                    <option value="4. Accompanied Site-Visit & Field Coordination">4. Accompanied Site-Visit & Field Coordination</option>
                    <option value="5. Broker & Channel Partner Distribution Network">5. Broker & Channel Partner Distribution Network</option>
                    <option value="6. Guided Home Construction & Bank Loan Advisory">6. Guided Home Construction & Bank Loan Advisory</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#F6E785] via-[#F9DB5C] to-[#B78D42] hover:brightness-105 text-[#202020] font-black text-xs uppercase tracking-wider shadow-gold border border-[#B78D42]/50 transition flex items-center justify-center gap-2 card-hover-lift"
                >
                  <Send className="w-4 h-4 text-[#202020]" />
                  <span>Submit Mandate Inquiry via WhatsApp</span>
                </button>
              </form>
            )}
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
