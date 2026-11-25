"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "ta";

export interface Translations {
  nav: {
    home: string;
    properties: string;
    services: string;
    construction: string;
    intelligence: string;
    academy: string;
    businessSolutions: string;
    resources: string;
    about: string;
    offices: string;
    contact: string;
    promote: string;
    admin: string;
    whatsappUs: string;
    callNow: string;
    exploreCta: string;
  };
  divisions: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    d1Title: string;
    d1Desc: string;
    d1Cta: string;
    d2Title: string;
    d2Desc: string;
    d2Cta: string;
    d3Title: string;
    d3Desc: string;
    d3Cta: string;
    d4Title: string;
    d4Desc: string;
    d4Cta: string;
    d5Title: string;
    d5Desc: string;
    d5Cta: string;
    d6Title: string;
    d6Desc: string;
    d6Cta: string;
  };
  demoBadge: string;
  hero: {
    badge: string;
    eyebrow: string;
    headline: string;
    supportingDesc: string;
    primaryCta: string;
    secondaryCta: string;
    closingMicrocopy: string;
    searchHeading: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    tabBuy: string;
    tabBuild: string;
    ownPlotLabel: string;
    ownPlotYes: string;
    ownPlotNo: string;
    areaLabel: string;
    floorsLabel: string;
    estimateBtn: string;
    searchBtn: string;
    allLocalities: string;
    allPropertyTypes: string;
    anyBudget: string;
    budgetUnder25: string;
    budget25to50: string;
    budget50to1cr: string;
    budgetAbove1cr: string;
    quickStatsYoutube: string;
    quickStatsWalkthroughs: string;
    quickStatsApproval: string;
    quickStatsGoogle: string;
  };
  properties: {
    heading: string;
    subheading: string;
    viewAll: string;
    viewDetails: string;
    bookSiteVisit: string;
    sqft: string;
    bedrooms: string;
    bathrooms: string;
    facing: string;
    approved: string;
    bankLoan: string;
    downpaymentOffer: string;
    watchWalkthrough: string;
    soldOut: string;
    filters: string;
    resetFilters: string;
    sortNewest: string;
    sortPriceAsc: string;
    sortPriceDesc: string;
  };
  estimator: {
    badge: string;
    title: string;
    subtitle: string;
    areaSlider: string;
    floors: string;
    groundFloor: string;
    gPlus1: string;
    gPlus2: string;
    selectPackage: string;
    estTotalCost: string;
    stageBreakdown: string;
    foundation: string;
    structure: string;
    roofSlab: string;
    brickwork: string;
    finishing: string;
    handover: string;
    ctaButton: string;
    modalTitle: string;
    modalSubtitle: string;
  };
  survey: {
    title: string;
    subtitle: string;
    step1Title: string;
    step2Title: string;
    step3Title: string;
    buyProperty: string;
    turnkeyBuild: string;
    submitRequirement: string;
    successMessage: string;
  };
  promote: {
    title: string;
    subtitle: string;
    featureTitle: string;
    ctaButton: string;
  };
  offices: {
    title: string;
    subtitle: string;
    headquarters: string;
    branch: string;
    workingHours: string;
    getDirections: string;
  };
  footer: {
    rights: string;
    founderDisclaimer: string;
    registeredRera: string;
    quickLinks: string;
    popularLocalities: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: "Home",
      properties: "Properties",
      services: "Services",
      construction: "Construction",
      intelligence: "Intelligence",
      academy: "Academy",
      businessSolutions: "Business Solutions",
      resources: "Resources",
      about: "About",
      offices: "Offices",
      contact: "Contact",
      promote: "List Property",
      admin: "Staff Portal",
      whatsappUs: "WhatsApp Us",
      callNow: "Call +91 73052 00754",
      exploreCta: "Explore Properties",
    },
    demoBadge: "Sample Demonstration Content • Visual Preview",
    divisions: {
      eyebrow: "CORE BUSINESS DIVISIONS",
      headline: "Integrated Real Estate, Engineering & Intelligence Platform",
      subheadline:
        "VVMS operates across six specialized divisions to deliver end-to-end transparency, technical certainty, and commercial velocity.",
      d1Title: "Property Marketplace",
      d1Desc: "DTCP and RERA approved residential plots, individual homes, and luxury villas verified by civil engineers.",
      d1Cta: "Explore Listings",
      d2Title: "Property Services",
      d2Desc: "30-year legal scrutiny, unbiased SRO valuations, bank loan coordination, and buyer advisory on a custom quotation basis.",
      d2Cta: "View Services",
      d3Title: "Construction & Engineering",
      d3Desc: "Architectural design, soil and groundwater testing, BOQ estimation, and turnkey home construction by Er. J. Vairavel.",
      d3Cta: "Plan Construction",
      d4Title: "Property Intelligence",
      d4Desc: "SRO guideline benchmarking, corridor growth projections, and infrastructure impact analytics across Central Tamil Nadu.",
      d4Cta: "Access Intelligence",
      d5Title: "Due Diligence Academy",
      d5Desc: "Buyer education, due diligence handbooks, avoiding unapproved layout traps, EC checking, and Patta verification.",
      d5Cta: "Access Academy",
      d6Title: "Business Solutions",
      d6Desc: "Promoter mandates, 4K aerial walkthroughs, bilingual AI lead qualification, and 100+ active broker distribution.",
      d6Cta: "Explore Solutions",
    },
    hero: {
      badge: "Trichy's #1 Real Estate & Construction Authority",
      eyebrow: "REAL ESTATE • ENGINEERING • INTELLIGENCE",
      headline: "Smarter Property Decisions. Better Homes.",
      supportingDesc:
        "Discover properties, understand land value, verify important details and build your dream home with engineering-led guidance from Veedu Veettumanai Sandhai.",
      primaryCta: "Explore Properties",
      secondaryCta: "Plan Your Home Construction",
      closingMicrocopy: "Explore. Evaluate. Decide with Confidence.",
      searchHeading: "What are you looking for?",
      titleLine1: "Trichy's Most Trusted Real Estate &",
      titleLine2: "Turnkey Home Construction Partner",
      description:
        "Led by Er. J. Vairavel (Civil Engineer). Explore 100% legally scrutinized DTCP/RERA plots, luxury villas, and architect-built turnkey construction across Tiruchirappalli with 1,900+ YouTube walkthroughs.",
      tabBuy: "Buy Property",
      tabBuild: "Build a Home",
      ownPlotLabel: "Do you own a plot?",
      ownPlotYes: "Yes, I have a plot",
      ownPlotNo: "No, looking for plot + build",
      areaLabel: "Preferred Construction Area (sq.ft)",
      floorsLabel: "Number of Floors",
      estimateBtn: "Estimate Construction Cost",
      searchBtn: "Search Properties",
      allLocalities: "All Localities (Trichy)",
      allPropertyTypes: "All Property Types",
      anyBudget: "Any Budget",
      budgetUnder25: "Under ₹25 Lakhs",
      budget25to50: "₹25L – ₹50 Lakhs",
      budget50to1cr: "₹50L – ₹1 Crore",
      budgetAbove1cr: "Above ₹1 Crore",
      quickStatsYoutube: "125K+ YouTube Community",
      quickStatsWalkthroughs: "1,900+ Video Walkthroughs",
      quickStatsApproval: "DTCP & RERA Approved",
      quickStatsGoogle: "4.8★ Google Verified Rating",
    },
    properties: {
      heading: "Featured Trichy Properties",
      subheading:
        "Hand-picked and personally inspected by Er. J. Vairavel with video proof, clear parent documents, and pre-approved bank loans.",
      viewAll: "Explore All Properties",
      viewDetails: "View Details",
      bookSiteVisit: "Book Site Visit",
      sqft: "sq.ft",
      bedrooms: "Beds",
      bathrooms: "Baths",
      facing: "Facing",
      approved: "Approved",
      bankLoan: "Bank Loan Eligible",
      downpaymentOffer: "Special Deal",
      watchWalkthrough: "Watch Video",
      soldOut: "Sold Out",
      filters: "Filter Properties",
      resetFilters: "Clear All",
      sortNewest: "Newest First",
      sortPriceAsc: "Price: Low to High",
      sortPriceDesc: "Price: High to Low",
    },
    estimator: {
      badge: "Transparent Turnkey Pricing by Er. J. Vairavel",
      title: "Build Your Dream Home on Your Plot or Ours",
      subtitle:
        "Get instant, unvarnished turnkey estimates tailored to Trichy soil conditions, standard architectural specs, and stage-wise progress payments.",
      areaSlider: "Total Built-Up Area (sq.ft)",
      floors: "Floors Planned",
      groundFloor: "Ground Only",
      gPlus1: "G + 1 Floor",
      gPlus2: "G + 2 Floors",
      selectPackage: "Select Construction Package",
      estTotalCost: "Estimated Total Construction Cost",
      stageBreakdown: "Stage-Wise Payment Schedule",
      foundation: "Substructure & Foundation (15%)",
      structure: "Columns, Lintels & Beams (25%)",
      roofSlab: "Roof Concrete Slab (20%)",
      brickwork: "Brickwork & Internal Plastering (20%)",
      finishing: "Flooring, Electrical & Painting (15%)",
      handover: "Sanitary Fittings & Key Handover (5%)",
      ctaButton: "Get Detailed BOQ & Free Site Inspection",
      modalTitle: "Request Free Site Inspection & Detailed BOQ",
      modalSubtitle:
        "Er. J. Vairavel's civil engineering team will visit your plot, conduct structural assessment, and deliver complete bill of quantities.",
    },
    survey: {
      title: "Tell Us What You're Looking For",
      subtitle:
        "Skip lengthy phone calls. Answer 4 quick questions and our senior Trichy consultant will send matching verified properties to your WhatsApp.",
      step1Title: "What is your main objective?",
      step2Title: "What is your planned budget range?",
      step3Title: "Which Trichy locality do you prefer?",
      buyProperty: "I want to Buy / Invest in Property",
      turnkeyBuild: "I want to Build a Home (Turnkey)",
      submitRequirement: "Send My Requirement via WhatsApp",
      successMessage:
        "Thank you! Your requirement has been registered. Connecting you on WhatsApp...",
    },
    promote: {
      title: "Promote Your Layout or House on our 125K+ YouTube Channel",
      subtitle:
        "Reach genuine NRI and local Tamil buyers with high-impact drone walkthroughs presented directly by Er. J. Vairavel.",
      featureTitle: "Direct Inquiries to Your Phone • Zero Broker Hassles",
      ctaButton: "Book a Video Shoot Today",
    },
    offices: {
      title: "Visit Our Trichy Head Office",
      subtitle:
        "Meet Er. J. Vairavel and our engineering team in person for transparent deed reviews, layout maps, and construction discussions.",
      headquarters: "Corporate Headquarters (Olaiyur Ring Road)",
      branch: "Head Office (Olaiyur Ring Road)",
      workingHours: "Working Hours: Mon – Sun: 10:00 AM – 7:30 PM",
      getDirections: "Get Directions on Google Maps",
    },
    footer: {
      rights: "All rights reserved. Veedu Veettumanai Santhai Pvt Ltd.",
      founderDisclaimer:
        "Founded & Headed by Er. J. Vairavel (Civil Engineer). Providing ethical, transparent real estate consultancy and superior turnkey construction.",
      registeredRera: "Registered Real Estate & Turnkey Construction Entity",
      quickLinks: "Quick Navigation",
      popularLocalities: "Popular Trichy Localities",
    },
  },
  ta: {
    nav: {
      home: "முகப்பு",
      properties: "சொத்துகள்",
      services: "சேவைகள்",
      construction: "கட்டுமானம்",
      intelligence: "நில வழிகாட்டி",
      academy: "அகாடமி",
      businessSolutions: "வணிக தீர்வுகள்",
      resources: "வளங்கள்",
      about: "எங்களைப் பற்றி",
      offices: "அலுவலகங்கள்",
      contact: "தொடர்புக்கு",
      promote: "விளம்பரம் செய்ய",
      admin: "ஊழியர் தளம்",
      whatsappUs: "வாட்ஸ்அப் செய்யவும்",
      callNow: "அழைக்க: +91 73052 00754",
      exploreCta: "சொத்துகளைக் காண்க",
    },
    demoBadge: "மாதிரி முன்னோட்டத் தகவல் • Visual Preview",
    divisions: {
      eyebrow: "முதன்மை வணிகப் பிரிவுகள்",
      headline: "ஒருங்கிணைந்த ரியல் எஸ்டேட், பொறியியல் மற்றும் நில வழிகாட்டி தளம்",
      subheadline:
        "முழுமையான வெளிப்படைத்தன்மை, தொழில்நுட்ப உத்தரவாதம் மற்றும் வர்த்தக வளர்ச்சிக்காக வீடு வீட்டுமனை சந்தையின் ஆறு பிரதான பிரிவுகள்.",
      d1Title: "சொத்து சந்தை (Marketplace)",
      d1Desc: "சிவில் இன்ஜினியரால் சரிபார்க்கப்பட்ட DTCP மற்றும் RERA அங்கீகரிக்கப்பட்ட வீட்டுமனைகள், தனி வீடுகள் மற்றும் வில்லாக்கள்.",
      d1Cta: "மனைகளைக் காண்க",
      d2Title: "சொத்து சேவைகள் (Services)",
      d2Desc: "30 ஆண்டு சட்ட ஆய்வு, பாரபட்சமற்ற நில மதிப்பீடு, வங்கிக் கடன் வழிகாட்டுதல் மற்றும் வாங்குபவர் ஆலோசனை.",
      d2Cta: "சேவைகளைக் காண்க",
      d3Title: "கட்டுமானம் & பொறியியல் (Engineering)",
      d3Desc: "வரைபட வடிவமைப்பு, மண் & நிலத்தடி நீர் சோதனை, விரிவான மதிப்பீடு மற்றும் Er. J. வைரவேலின் தரமான கட்டுமானப் பணிகள்.",
      d3Cta: "வீடு கட்ட திட்டமிடுங்கள்",
      d4Title: "நில வழிகாட்டி & நுண்ணறிவு (Intelligence)",
      d4Desc: "பதிவுத்துறை வழிகாட்டி மதிப்பு, வளர்ச்சிப் பகுதிகள் மற்றும் மத்திய தமிழ்நாட்டின் கட்டமைப்பு மாற்றங்கள் குறித்த ஆய்வுகள்.",
      d4Cta: "மதிப்பீட்டைக் காண்க",
      d5Title: "ரியல் எஸ்டேட் அகாடமி (Academy)",
      d5Desc: "வாங்குபவர் விழிப்புணர்வு வழிகாட்டிகள், பட்டா/சிட்டா சரிபார்ப்பு, மற்றும் மோசடி லே-அவுட்களை தவிர்க்கும் முறைகள்.",
      d5Cta: "அகாடமிக்குச் செல்க",
      d6Title: "வணிக தீர்வுகள் (Business Solutions)",
      d6Desc: "புரோமோட்டர் விற்பனை பிரதிநிதித்துவம், ட்ரோன் வீடியோ விளம்பரம், AI வாடிக்கையாளர் வடிகட்டுதல் மற்றும் புரோக்கர் நெட்வொர்க்.",
      d6Cta: "தீர்வுகளைக் காண்க",
    },
    hero: {
      badge: "திருச்சியின் நம்பகமான ரியல் எஸ்டேட் & கட்டுமான நிறுவனம்",
      eyebrow: "ரியல் எஸ்டேட் • பொறியியல் • நில வழிகாட்டி",
      headline: "புத்திசாலித்தனமான சொத்து முடிவுகள். தரமான இல்லங்கள்.",
      supportingDesc:
        "வீடு வீட்டுமனை சந்தையின் பொறியியல் வழிகாட்டுதலுடன் வீட்டுமனைகளைக் கண்டறியுங்கள், நிலத்தின் மதிப்பை உணருங்கள், சட்டப்பூர்வமாகச் சரிபார்த்து உங்கள் கனவு இல்லத்தை உருவாக்குங்கள்.",
      primaryCta: "சொத்துகளைக் காண்க",
      secondaryCta: "வீடு கட்ட திட்டமிடுங்கள்",
      closingMicrocopy: "கண்டறியுங்கள். மதிப்பிடுங்கள். நம்பிக்கையுடன் முடிவெடுங்கள்.",
      searchHeading: "நீங்கள் எதைத் தேடுகிறீர்கள்?",
      titleLine1: "திருச்சியின் முதன்மை ரியல் எஸ்டேட் &",
      titleLine2: "தரமான வீடுகட்டும் நம்பகமான வழிகாட்டி",
      description:
        "Er. J. வைரவேல் (Civil Engineer) தலைமையில் 100% சட்டப்பூர்வமான DTCP & RERA அப்ரூவ்டு வீட்டுமனைகள், தனி வீடுகள் மற்றும் தரமான கன்ஸ்ட்ரக்ஷன் பணிகள். 1,900+ யூடியூப் வீடியோக்கள் மூலம் கண்டு மகிழுங்கள்.",
      tabBuy: "சொத்து வாங்க",
      tabBuild: "வீடு கட்ட",
      ownPlotLabel: "உங்களிடம் வீட்டுமனை உள்ளதா?",
      ownPlotYes: "ஆம், மனை உள்ளது",
      ownPlotNo: "இல்லை, மனை + வீடு தேவை",
      areaLabel: "கட்டடப் பரப்பு (சதுர அடி)",
      floorsLabel: "தளங்களின் எண்ணிக்கை",
      estimateBtn: "கட்டுமானச் செலவை கணக்கிடுங்கள்",
      searchBtn: "சொத்துகளைத் தேடுங்கள்",
      allLocalities: "அனைத்து பகுதிகள் (திருச்சி)",
      allPropertyTypes: "அனைத்து வகை சொத்துகள்",
      anyBudget: "எல்லா பட்ஜெட்டும்",
      budgetUnder25: "₹25 லட்சத்திற்குள்",
      budget25to50: "₹25L – ₹50 லட்சம்",
      budget50to1cr: "₹50L – ₹1 கோடி",
      budgetAbove1cr: "₹1 கோடிக்கு மேல்",
      quickStatsYoutube: "125K+ யூடியூப் குடும்பம்",
      quickStatsWalkthroughs: "1,900+ வீடியோ பதிவுகள்",
      quickStatsApproval: "DTCP & RERA அப்ரூவ்டு",
      quickStatsGoogle: "4.8★ கூகுள் நன்மதிப்பீடு",
    },
    properties: {
      heading: "திருச்சியின் சிறப்பு வீட்டுமனைகள் & வீடுகள்",
      subheading:
        "Er. J. வைரவேல் அவர்களால் நேரில் ஆய்வு செய்யப்பட்டு, வீடியோ ஆதாரம், தெளிவான மூலப்பத்திரங்கள் மற்றும் வங்கி கடன் வசதியுடன்.",
      viewAll: "அனைத்து சொத்துகளையும் பார்க்க",
      viewDetails: "முழு விபரம்",
      bookSiteVisit: "நேரடி பார்வைக்கு புக் செய்ய",
      sqft: "சதுர அடி",
      bedrooms: "படுக்கையறைகள்",
      bathrooms: "குளியலறைகள்",
      facing: "திசை",
      approved: "அங்கீகரிக்கப்பட்டது",
      bankLoan: "வங்கி கடன் சாத்தியம்",
      downpaymentOffer: "சிறப்பு ஆஃபர்",
      watchWalkthrough: "வீடியோ பார்க்க",
      soldOut: "விற்கப்பட்டது",
      filters: "தேர்வு செய்ய",
      resetFilters: "அனைத்தையும் நீக்கு",
      sortNewest: "புதியவை முதலில்",
      sortPriceAsc: "விலை: குறைவு முதல் அதிகம்",
      sortPriceDesc: "விலை: அதிகம் முதல் குறைவு",
    },
    estimator: {
      badge: "Er. J. வைரவேல் வழங்கும் வெளிப்படையான விலை பட்டியல்",
      title: "உங்கள் நிலத்திலோ அல்லது எங்கள் இடத்திலோ கனவு இல்லம் கட்டுங்கள்",
      subtitle:
        "திருச்சியின் மண் தன்மைக்கு ஏற்ப உயர்தர பிராண்டட் பொருட்களுடன் நிலைவாரியான கட்டண முறையில் வீடு கட்டுவதற்கான உடனடி மதிப்பீடு.",
      areaSlider: "கட்டுமான பரப்பளவு (சதுர அடி)",
      floors: "தளங்களின் எண்ணிக்கை",
      groundFloor: "தரை தளம் மட்டும்",
      gPlus1: "தரை + 1 தளம்",
      gPlus2: "தரை + 2 தளங்கள்",
      selectPackage: "கட்டுமான திட்டத்தை தேர்வு செய்க",
      estTotalCost: "மதிப்பிடப்பட்ட மொத்த கட்டுமான செலவு",
      stageBreakdown: "படிநிலையான கட்டண விபரம்",
      foundation: "அஸ்திவாரம் & பேஸ்மென்ட் (15%)",
      structure: "தூண்கள், லிண்டல் & பீம் (25%)",
      roofSlab: "மேல்தள கான்கிரீட் கூரை (20%)",
      brickwork: "செங்கல் பூச்சு & உள் பூச்சு (20%)",
      finishing: "டைல்ஸ், எலக்ட்ரிக்கல் & பெயிண்டிங் (15%)",
      handover: "சானிட்டரி & சாவி ஒப்படைப்பு (5%)",
      ctaButton: "முழு மதிப்பீடு & இலவச இட ஆய்வு பெறுக",
      modalTitle: "இலவச இட ஆய்வு மற்றும் விரிவான திட்ட அறிக்கை",
      modalSubtitle:
        "Er. J. வைரவேல் அவர்களின் பொறியாளர் குழு உங்கள் இடத்தை நேரில் பார்வையிட்டு முழு மதிப்பீட்டு அறிக்கையை வழங்கும்.",
    },
    survey: {
      title: "உங்கள் தேவை என்னவென்று எங்களுக்கு தெரிவியுங்கள்",
      subtitle:
        "நீண்ட தொலைபேசி அழைப்புகள் தேவையில்லை. 4 எளிய கேள்விகளுக்கு பதிலளித்து பொருத்தமான சொத்து விபரங்களை வாட்ஸ்அப்பில் பெறுங்கள்.",
      step1Title: "உங்கள் முதன்மை நோக்கம் என்ன?",
      step2Title: "உங்கள் பட்ஜெட் என்ன?",
      step3Title: "திருச்சியில் நீங்கள் விரும்பும் பகுதி எது?",
      buyProperty: "வீடு அல்லது மனை வாங்க விரும்புகிறேன்",
      turnkeyBuild: "வீடு கட்ட விரும்புகிறேன் (Turnkey)",
      submitRequirement: "என் தேவையை வாட்ஸ்அப்பில் அனுப்புக",
      successMessage:
        "நன்றி! உங்கள் தேவை பதிவு செய்யப்பட்டது. வாட்ஸ்அப் மூலம் தொடர்புகொள்கிறோம்...",
    },
    promote: {
      title: "உங்கள் லே-அவுட் அல்லது வீட்டை 125K+ யூடியூப் சேனலில் விளம்பரம் செய்ய",
      subtitle:
        "Er. J. வைரவேல் அவர்களின் நேரடி ஆன்-கேமரா விளக்கம் மற்றும் ட்ரோன் வீடியோ மூலம் தமிழ்நாட்டு வாடிக்கையாளர்களிடம் நேரடியாக கொண்டு சேர்க்கவும்.",
      featureTitle: "நேரடி அழைப்புகள் உங்கள் போனுக்கு • புரோக்கர் தொல்லை இல்லை",
      ctaButton: "வீடியோ பதிவு செய்ய முன்பதிவு செய்க",
    },
    offices: {
      title: "எங்கள் திருச்சி தலைமை அலுவலகத்திற்கு வருகை தாருங்கள்",
      subtitle:
        "Er. J. வைரவேல் மற்றும் எங்கள் பொறியாளர் குழுவை நேரில் சந்தித்து பத்திரங்கள், லே-அவுட் பிளான் மற்றும் கட்டுமான ஆலோசனை பெறலாம்.",
      headquarters: "தலைமை அலுவலகம் (ஒலையூர் ரிங் ரோடு)",
      branch: "தலைமை அலுவலகம் (ஒலையூர் ரிங் ரோடு)",
      workingHours: "பணி நேரம்: திங்கள் – ஞாயிறு: காலை 10:00 – இரவு 7:30",
      getDirections: "கூகுள் மேப்பில் வழியை காண",
    },
    footer: {
      rights: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை. வீடு வீட்டுமனை சந்தை பிரைவேட் லிமிடெட்.",
      founderDisclaimer:
        "Er. J. வைரவேல் (Civil Engineer) அவர்களின் வழிகாட்டுதலில் செயல்படும் வெளிப்படையான ரியல் எஸ்டேட் மற்றும் பொறியியல் கட்டுமான நிறுவனம்.",
      registeredRera: "அங்கீகரிக்கப்பட்ட ரியல் எஸ்டேட் & கன்ஸ்ட்ரக்ஷன் நிறுவனம்",
      quickLinks: "முக்கிய இணைப்புகள்",
      popularLocalities: "திருச்சியின் பிரபல பகுதிகள்",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("vvms_lang") as Language;
    if (saved === "en" || saved === "ta") {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("vvms_lang", lang);
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === "en" ? "ta" : "en";
    setLanguage(nextLang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
