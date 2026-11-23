export interface ServiceDetail {
  slug: string;
  aliases?: string[];
  title: string;
  titleTa: string;
  category: "Advisory" | "Legal" | "Valuation" | "Engineering" | "Finance" | "Business";
  badge: string;
  headline: string;
  price: string;
  priceTag: string;
  desc: string;
  targetAudience: string[];
  commonProblems: string[];
  whatWeHelpWith: string[];
  process?: string[];
  deliverables: string;
  deliverablesList?: string[];
  coverImage: string;
}

export const ALL_SERVICES: ServiceDetail[] = [
  {
    slug: "buyer-nri-advisory",
    aliases: ["real-estate-advisory"],
    title: "Buyer and NRI Advisory",
    titleTa: "வாங்குபவர் மற்றும் NRI பிரத்தியேக ஆலோசனை",
    category: "Advisory",
    badge: "Independent Buyer Representation",
    headline: "Make Confident Property Decisions With Civil Engineering Clarity.",
    price: "Custom Quotation",
    priceTag: "Custom Quotation / Consultation",
    desc: "Bespoke property consultation for home buyers, families, and Non-Resident Indians (NRIs in Singapore, Malaysia, Gulf, USA) acquiring land or houses in Tamil Nadu. We evaluate property suitability, fair market valuation, future livability, groundwater, and structural safety with zero broker conflicts.",
    targetAudience: [
      "First-time land and home buyers looking for safe, legally verified transactions",
      "NRIs acquiring property remotely requiring verified on-ground engineering eyes",
      "Families planning retirement dream homes or generational wealth assets",
    ],
    commonProblems: [
      "Aggressive broker pressure pushing disputed, low-lying, or illiquid land parcels",
      "Uncertainty about whether the quoted developer price reflects true market worth",
      "Confusion over Panchayat vs DTCP vs CMDA vs RERA approvals",
      "Lack of objective location growth data and physical infrastructure timeline",
    ],
    whatWeHelpWith: [
      "Comprehensive Property Suitability & Livability Evaluation",
      "Independent Fair Value Assessment and strategic negotiation roadmap",
      "Groundwater Table, TNEB Grid & Flood Risk Verification",
      "Step-by-step guidance from site shortlisting to sub-registrar deed execution",
    ],
    process: [
      "Requirement Intake & Shortlist Review",
      "Civil & Legal Pre-Screening",
      "On-Ground Engineering Inspection",
      "Advisory Dossier & Consultation with Er. J. Vairavel",
    ],
    deliverables: "Comprehensive 6-Page Buyer Advisory Dossier with Fair Value Range & Risk Matrix",
    deliverablesList: [
      "Written unbiased evaluation of shortlisted properties",
      "Groundwater depth, potability, and soil suitability findings",
      "Guidance on building bylaws, setback rules, and FSI utilization",
      "Direct strategic meeting with Er. J. Vairavel",
    ],
    coverImage: "/images/hero-villa.jpg",
  },
  {
    slug: "property-valuation",
    title: "Property Valuation",
    titleTa: "சுயாதீன சொத்து மற்றும் நில மதிப்பீடு",
    category: "Valuation",
    badge: "Real Comps • No Broker Bias",
    headline: "Understand Fair Market Worth Before You Make an Offer.",
    price: "Custom Quotation",
    priceTag: "Custom Quotation / By Scope",
    desc: "Independent, data-led property valuation comparing recent registered Sub-Registrar Office (SRO) transaction deeds, actual guideline values, replacement costs, and localized micro-market supply-demand trends across Tiruchirappalli and Central Tamil Nadu.",
    targetAudience: [
      "Buyers evaluating property quotes from private developers or layout promoters",
      "Sellers looking for an unbiased market baseline to list fairly without middleman commissions",
      "Families planning property division, partition, or investment portfolio audits",
    ],
    commonProblems: [
      "Overpaying by 20% to 40% due to inflated broker pitches and artificial hype",
      "Misunderstanding the massive spread between SRO guideline value and real transaction price",
      "Relying on outdated locality word-of-mouth rather than registered transaction deeds",
    ],
    whatWeHelpWith: [
      "Analysis of recently registered sub-registrar deeds in the exact revenue survey ward",
      "Physical location adjustments: road width (20ft vs 30ft vs 40ft), frontage ratio, groundwater yield",
      "Calculation of effective on-road acquisition cost including 9% stamp duty and registration fees",
      "Comparative market matrix against adjacent layouts and historical 3-year appreciation curves",
    ],
    process: [
      "Document & Location Intake",
      "SRO Registered Deeds & Guideline Value Extraction",
      "Physical Micro-Market Field Verification",
      "Comprehensive Valuation Dossier Delivery",
    ],
    deliverables: "Institutional Property Valuation Benchmark Dossier with 3-Year Appreciation Projection",
    deliverablesList: [
      "Actual SRO registered deed comps in the micro-market",
      "Guideline value vs real market value spread index",
      "Realistic negotiation price range to save lakhs during deal closing",
      "Rental yield and 5-year capital appreciation forecast",
    ],
    coverImage: "/images/consulting.jpg",
  },
  {
    slug: "legal-scrutiny-coordination",
    aliases: ["online-legal-opinion"],
    title: "Legal Scrutiny Coordination",
    titleTa: "சட்ட ஆய்வு மற்றும் வழக்கறிஞர் ஆவண சரிபார்ப்பு",
    category: "Legal",
    badge: "100% Legal Due Diligence",
    headline: "Verify 30-Year Title Chain, Patta & Encumbrances Before Paying Any Advance.",
    price: "Custom Quotation",
    priceTag: "Custom Quotation / By Docket",
    desc: "Rigorous 30-year civil title investigation coordinated by practicing High Court & District Court advocates. We scrutinize original parent documents, Patta/Chitta transfers, encumbrance certificates (EC), legal heirship, revenue court disputes, and Section 47A stamp duty liabilities.",
    targetAudience: [
      "Property buyers evaluating land or independent houses in Trichy & Tamil Nadu",
      "NRIs purchasing land remotely requiring verified written title opinions",
      "Families seeking legal clarity before executing partition or sale agreements",
    ],
    commonProblems: [
      "Fake or forged parent documents created without lawful power of attorney",
      "Kootu Patta (joint revenue patta) where co-owners refuse to sign sale deed",
      "Undischarged mortgage charges, bank liens, or pending civil partition suits",
      "Section 47A undervaluation proceedings resulting in revenue attachment orders",
    ],
    whatWeHelpWith: [
      "30-Year Encumbrance Certificate (EC) scrutiny from 1975 to current date",
      "Patta, Chitta, Adangal, and 'A' Register online verification on eservices.tn.gov.in",
      "Field Measurement Book (FMB) survey sketch boundary match and subdivision check",
      "Direct consultation with Er. J. Vairavel and our senior civil legal counsel",
    ],
    process: [
      "Original Document Docket Intake",
      "30-Year Sub-Registrar EC & Revenue Forensics",
      "Advocate Legal Scrutiny & Title Flow Mapping",
      "Clear Title Certificate & Signed Legal Docket Delivery",
    ],
    deliverables: "Comprehensive Signed 8-Page Legal Due Diligence Docket & Clear Title Certificate",
    deliverablesList: [
      "30-Year Title Flow Chart from origin to current vendor",
      "Online Patta/Chitta verification printout with QR authenticity code",
      "Identification of any joint owners, minor rights, or pending litigations",
      "Recommended protective clauses to insert into your Sale Agreement",
    ],
    coverImage: "/images/consulting.jpg",
  },
  {
    slug: "loan-assistance",
    aliases: ["loan-arrangement"],
    title: "Loan Assistance",
    titleTa: "வங்கி வீட்டுக் கடன் வழிகாட்டுதல் மற்றும் அனுமதி",
    category: "Finance",
    badge: "Nationalized Bank Panel Coordination",
    headline: "Hassle-Free Home & Plot Loan Sanction at Competitive Interest Rates.",
    price: "Custom Quotation",
    priceTag: "Custom Quotation / Consultation",
    desc: "End-to-end bank home loan and plot purchase loan coordination. We partner with nationalized and premier banks (SBI, HDFC, Canara Bank, Indian Bank) to secure fast loan approvals, minimum paperwork, and zero hidden processing penalties.",
    targetAudience: [
      "Salaried and self-employed buyers seeking 80% to 85% property funding",
      "First-time buyers needing PMAY subsidy and low-EMI schemes",
      "Borrowers seeking balance transfer to lower interest rate regimes",
    ],
    commonProblems: [
      "Loan rejection due to technical document deficiencies in layout approval",
      "High hidden processing fees charged by unverified private NBFC lenders",
      "Months of delays waiting for bank legal panel scrutiny",
    ],
    whatWeHelpWith: [
      "Pre-scrutiny of title deeds against SBI / HDFC legal panel standards",
      "Maximum loan eligibility calculation based on income and ITR documentation",
      "Coordination with bank valuation engineers and legal advocates",
      "Doorstep document collection and fast-track sanction coordination",
    ],
    process: [
      "Eligibility Assessment & Document Checklist",
      "Bank Panel Selection & Pre-Screening",
      "Technical & Legal Verification Coordination",
      "Sanction Letter Issuance & Disbursal Guidance",
    ],
    deliverables: "Bank Loan Eligibility Analysis & Sanction Assistance Docket",
    deliverablesList: [
      "Comparative interest rate matrix across top public and private banks",
      "Complete checklist of required KYC, income, and property documents",
      "Dedicated loan coordinator assigned from our K.K. Nagar HQ",
      "Transparent fee structure with zero hidden broker margins",
    ],
    coverImage: "/images/villa-interior.jpg",
  },
  {
    slug: "construction-consulting",
    aliases: ["construction-services"],
    title: "Construction Consulting and Project Management",
    titleTa: "கட்டுமான ஆலோசனை மற்றும் திட்ட மேலாண்மை",
    category: "Engineering",
    badge: "Engineering Authority • Er. J. Vairavel",
    headline: "End-to-End Civil Engineering Management for Flawless Home Construction.",
    price: "Custom Quotation",
    priceTag: "Custom Quotation / By Project",
    desc: "Professional civil engineering consulting, BOQ estimation, architectural plan design, contractor bidding, and quality supervision. Eliminate contractor cheating, material pilferage, and budget escalations through transparent stage-wise milestones.",
    targetAudience: [
      "Plot owners who already own land and want to build without contractor headaches",
      "NRIs and working professionals who cannot be present on-site daily to check quality",
      "Commercial building promoters seeking structural assurance and budget discipline",
    ],
    commonProblems: [
      "Contractors quoting cheap rates upfront and escalating costs midway by 40%",
      "Using substandard 43 grade cement, rusted scrap steel, or unwashed sea sand",
      "Structural defects: foundation settling, roof slab leaks, hollow plastering",
      "Project delayed for months due to poor contractor cash flow management",
    ],
    whatWeHelpWith: [
      "Complete 2D Architectural, 3D Elevation, Structural & Electrical drawings",
      "Scientific item-wise Bill of Quantities (BOQ) with market material rates",
      "Contractor quotation scrutiny, competitive bidding, and legally binding contract drafting",
      "Stage-wise on-site quality testing: concrete cube compression test, steel grade audit",
    ],
    process: [
      "Architectural Concept & Soil Study",
      "Structural Engineering & Itemized BOQ",
      "Contractor Vetting & Contract Finalization",
      "Stage-Wise Quality Signoffs through Key Handover",
    ],
    deliverables: "Full Civil Engineering Management Protocol with Weekly Reports & Quality Signoff",
    deliverablesList: [
      "Phase 1: Planning, Design, Estimation & Foundation Quality",
      "Phase 2: Plinth & Structural Frame up to Roof Slab Concrete",
      "Phase 3: Masonry, MEP, Plastering & Major Finishing Checks",
      "Phase 4: Final Snagging Inspection & Turnkey Handover Certificate",
    ],
    coverImage: "/images/turnkey-home.jpg",
  },
  {
    slug: "engineering-services",
    aliases: ["onsite-infrastructure-valuation"],
    title: "Engineering Services",
    titleTa: "பொறியியல் சேவைகள் — மண், நிலத்தடி நீர் & கட்டமைப்பு ஆய்வு",
    category: "Engineering",
    badge: "On-Ground Technical Ground Truth",
    headline: "Know the Soil, Water, and Grid Reality Before Pouring Concrete.",
    price: "Custom Quotation",
    priceTag: "Custom Quotation / By Site",
    desc: "Physical on-ground technical inspection carried out by qualified civil engineering specialists. We evaluate groundwater aquifer depth, soil bearing capability, approach road width, electric grid/utility access, and flood vulnerability.",
    targetAudience: [
      "Plot purchasers verifying groundwater and soil before concluding property purchase",
      "Homebuilders preparing structural foundation drawings and borehole drilling",
      "Layout developers seeking technical feasibility certifications",
    ],
    commonProblems: [
      "Buying a plot only to discover saline water or zero groundwater at 600 feet",
      "Clay or marshy soil requiring expensive deep pile foundation exceeding budget",
      "Lack of legal 30ft road width preventing building plan approval",
      "Plot gets waterlogged during monsoon rains due to low-lying elevation",
    ],
    whatWeHelpWith: [
      "Physical inspection of survey stones, approach road width, and layout contours",
      "Groundwater aquifer depth and potable water verification with local bore data",
      "Utility connection feasibility: TNEB power transformer, stormwater, and drainage",
      "Signed 5-page Technical Infrastructure Audit Dossier by Er. J. Vairavel",
    ],
    process: [
      "Site Visit Scheduling & Satellite Mapping",
      "On-Ground Boundary Demarcation & Soil/Water Sampling",
      "Laboratory Testing & Drainage Contour Analysis",
      "Engineering Feasibility Dossier Handover",
    ],
    deliverables: "Signed Technical Infrastructure Audit Dossier with Elevation & Water Report",
    deliverablesList: [
      "Survey stone boundary demarcation & physical road width verification",
      "Groundwater table assessment with potable TDS rating report",
      "Soil bearing capacity recommendation (Isolated footing vs Raft foundation)",
      "High-definition site inspection video and contour evaluation",
    ],
    coverImage: "/images/consulting.jpg",
  },
  {
    slug: "property-intelligence",
    aliases: ["investment-advisory"],
    title: "Property Intelligence and Market Reports",
    titleTa: "நில வழிகாட்டி நுண்ணறிவு மற்றும் சந்தை அறிக்கைகள்",
    category: "Valuation",
    badge: "Data-Driven Corridor Growth",
    headline: "Micro-Market Guideline Value Benchmarking & Infrastructure Impact Reports.",
    price: "Custom Quotation",
    priceTag: "Custom Quotation / By Report",
    desc: "Data-driven research reports analyzing government guideline values, registered Sub-Registrar Office deeds, infrastructure triggers (Panjappur Bus Terminus, Semi-Ring Road, TIDEL Park), and 3-year capital appreciation trajectories across Central Tamil Nadu corridors.",
    targetAudience: [
      "High-net-worth investors and families allocating capital to land parcels",
      "Developers planning new layout subdivisions and price positioning",
      "Corporates evaluating commercial warehousing and highway-facing land",
    ],
    commonProblems: [
      "Buying blindly in speculative remote layouts without economic drivers",
      "Illiquidity traps where land cannot be resold even after years",
      "Lack of objective infrastructure milestone tracking",
    ],
    whatWeHelpWith: [
      "Corridor Growth Analysis (Trichy Semi-Ring Road, Panjappur TIDEL, Airport corridor)",
      "Guideline value trajectory modeling against registered transactions",
      "Risk-adjusted holding horizon and exit liquidity forecasts",
      "Demographic and commercial growth mapping across key transit hubs",
    ],
    process: [
      "Corridor Scope Definition",
      "Sub-Registrar Registered Deed & Guideline Data Aggregation",
      "Infrastructure Catalyst Timeline Modeling",
      "Executive Property Intelligence Report Delivery",
    ],
    deliverables: "Comprehensive Property Intelligence & Micro-Market Dossier",
    deliverablesList: [
      "10-Year Macro & Micro Economic Catalyst Timeline",
      "Exit liquidity index (Time required to liquidate parcel at fair market rate)",
      "Comparative corridor returns (Panjappur vs Vayalur vs Olaiyur vs No.1 Tollgate)",
      "Periodic satellite & drone perimeter overview",
    ],
    coverImage: "/images/dtcp-plots.jpg",
  },
  {
    slug: "academy-training",
    title: "Academy and Training",
    titleTa: "ரியல் எஸ்டேட் அகாடமி மற்றும் வாங்குபவர் பயிற்சி",
    category: "Advisory",
    badge: "Real Estate Education",
    headline: "Master Due Diligence, Legal Forensics & Architectural Principles.",
    price: "Custom Quotation",
    priceTag: "Custom Quotation / Consultation",
    desc: "Educational workshops, practical buyer seminars, and corporate training conducted by Er. J. Vairavel. We educate property buyers, young civil engineers, and real estate professionals on 30-year deed forensics, RERA compliance, and turnkey quality control.",
    targetAudience: [
      "Property buyers seeking structured education before making life's biggest investment",
      "Young civil engineers looking to master real-world field due diligence and estimation",
      "Real estate professionals aiming to build high-trust, legally verified practices",
    ],
    commonProblems: [
      "Falling prey to common legal traps due to lack of property documentation knowledge",
      "Inability to read technical drawings, FMB sketches, or understand setback bylaws",
      "Reliance on deceptive marketing pitches from unregulated intermediaries",
    ],
    whatWeHelpWith: [
      "30-Year Land Due Diligence Framework masterclasses",
      "Practical decoding of Patta, Chitta, TSLR, and FMB sketches",
      "Turnkey construction BOQ budgeting and contractor contract management",
      "Live case studies of solved title disputes and structural rectifications",
    ],
    process: [
      "Curriculum & Learning Objective Alignment",
      "Interactive Seminar / Digital Workshop Delivery",
      "Practical Case Study & Document Forensic Exercises",
      "Knowledge Assessment & Resource Handbook Handover",
    ],
    deliverables: "Comprehensive Training Modules & Due Diligence Handbooks",
    deliverablesList: [
      "Printed & digital copy of Tamil Nadu Land Due Diligence Master Guide",
      "Step-by-step checklist for online revenue e-services verification",
      "Construction estimation template and sample BOQ spreadsheets",
      "Direct Q&A session with Er. J. Vairavel",
    ],
    coverImage: "/images/youtube-production.jpg",
  },
  {
    slug: "real-estate-digital-marketing",
    title: "Real Estate Digital Marketing",
    titleTa: "ரியல் எஸ்டேட் டிஜிட்டல் மார்க்கெட்டிங் தீர்வுகள்",
    category: "Business",
    badge: "125K+ Audience Network",
    headline: "High-Impact Video Walkthroughs, Drone Production & Targeted Buyer Campaigns.",
    price: "Custom Quotation",
    priceTag: "Custom Quotation / Campaign Scope",
    desc: "Specialized B2B media and digital marketing solutions for layout promoters, builders, and property owners. Leverage our established 125K+ subscriber YouTube audience, professional 4K drone cinematography, and hyper-targeted NRI marketing campaigns.",
    targetAudience: [
      "Approved layout developers looking to sell plots quickly to genuine buyers",
      "Turnkey home builders and luxury villa promoters seeking qualified enquiries",
      "Individual property owners selling high-value residential or commercial parcels",
    ],
    commonProblems: [
      "Spending lakhs on generic paper ads and hoardings with zero measurable leads",
      "Low video production quality that fails to showcase project infrastructure",
      "Inability to reach wealthy NRI buyers in Singapore, Malaysia, and the Gulf",
    ],
    whatWeHelpWith: [
      "Er. J. Vairavel on-camera project walkthrough and engineering endorsement",
      "4K cinematic drone footage highlighting approach roads, groundwater, and neighborhood",
      "Targeted YouTube, Meta, and Google Ads campaigns reaching serious buyers",
      "Qualified lead delivery directly to developer sales teams with zero middleman friction",
    ],
    process: [
      "Project Legality & Infrastructure Verification",
      "On-Site Drone & Video Production Shoot",
      "Editorial Post-Production & Video Publication",
      "Audience Distribution & Direct Lead Routing",
    ],
    deliverables: "Full Video Production, Channel Broadcast & Campaign Analytics Docket",
    deliverablesList: [
      "Dedicated 10-15 minute YouTube property walkthrough video on @Veeduveettumanaisandhai",
      "Short-form Instagram Reels & YouTube Shorts for viral social reach",
      "Direct buyer inquiry routing to developer WhatsApp & phone",
      "Campaign reach, engagement, and conversion analytics report",
    ],
    coverImage: "/images/youtube-production.jpg",
  },
  {
    slug: "crm-implementation",
    title: "CRM Implementation",
    titleTa: "ரியல் எஸ்டேட் CRM கட்டமைப்பு தீர்வுகள்",
    category: "Business",
    badge: "B2B Business Solutions",
    headline: "Structured Lead Management, Site Visit Pipelines & Automated Follow-Ups.",
    price: "Custom Quotation",
    priceTag: "Custom Quotation / Solution Scope",
    desc: "Customized CRM implementation and workflow consulting for real estate developers and agencies. Transform chaotic spreadsheet inquiries into streamlined pipelines, automated lead attribution, and structured site-visit booking workflows.",
    targetAudience: [
      "Real estate developers managing multiple residential and commercial projects",
      "Independent real estate agencies handling high enquiry volumes",
      "Property sales teams struggling with lost leads and missed follow-ups",
    ],
    commonProblems: [
      "Up to 50% of incoming buyer leads lost due to delayed manual follow-ups",
      "Lack of lead attribution across YouTube, Facebook, referrals, and website",
      "No visibility into sales executive site-visit conversion ratios",
    ],
    whatWeHelpWith: [
      "End-to-end CRM architecture design tailored to Indian real estate workflows",
      "Instant lead capture from website, WhatsApp, YouTube, and portal inquiries",
      "Automated SMS and email notifications for prompt sales rep dispatch",
      "Executive dashboard tracking pipeline stages, site visits, and booking velocity",
    ],
    process: [
      "Sales Workflow & Lead Journey Audit",
      "CRM Architecture & Pipeline Stage Configuration",
      "Channel Integration (Website, Meta, WhatsApp)",
      "Team Onboarding & Executive Dashboard Handover",
    ],
    deliverables: "Operational CRM Setup, Workflow Automations & Training Documentation",
    deliverablesList: [
      "Configured real estate CRM pipeline with customized deal stages",
      "Automated lead capture webhooks from digital advertising channels",
      "Role-based access permissions for sales reps and managers",
      "Staff training session and operational SOP documentation",
    ],
    coverImage: "/images/villa-interior.jpg",
  },
  {
    slug: "whatsapp-automation-ai",
    title: "WhatsApp Automation and AI Workforce",
    titleTa: "வாட்ஸ்அப் தானியங்கி & AI பணிப்பாய்வு தீர்வுகள்",
    category: "Business",
    badge: "Next-Gen Conversational Automation",
    headline: "24/7 Instant Buyer Engagement, Document Dispatch & Site-Visit Scheduling.",
    price: "Custom Quotation",
    priceTag: "Custom Quotation / Solution Scope",
    desc: "Intelligent WhatsApp automation and conversational AI workflows built specifically for property developers and marketing firms. Automatically answer buyer questions, dispatch layout maps, verify buyer requirements, and book site visits 24/7.",
    targetAudience: [
      "Developers receiving hundreds of after-hours and weekend WhatsApp messages",
      "Marketing teams needing instant response to digital advertising leads",
      "Property firms wanting automated layout PDF and price quote delivery",
    ],
    commonProblems: [
      "Delayed responses causing hot prospects to contact competitor layouts",
      "Manual repetitive sending of layout maps, brochures, and price sheets",
      "Sales reps spending hours answering basic questions instead of closing deals",
    ],
    whatWeHelpWith: [
      "Verified WhatsApp Business API integration with automated greeting and menus",
      "Instant automated brochure, layout map, and location pin delivery",
      "Smart buyer requirement qualification survey before routing to sales staff",
      "Automated site-visit calendar scheduling and reminder broadcasts",
    ],
    process: [
      "Conversational Flow Design & FAQ Mapping",
      "WhatsApp Business API Setup & Template Approvals",
      "Workflow Logic & CRM Integration",
      "Live Testing & Deployment",
    ],
    deliverables: "Configured WhatsApp Business Automation & AI Response Flow",
    deliverablesList: [
      "Interactive WhatsApp chatbot flow for property discovery and brochure downloads",
      "Automated site-visit booking confirmation and Google Calendar invite",
      "Pre-approved Meta template messages for transactional follow-ups",
      "Staff handover manual and conversational analytics setup",
    ],
    coverImage: "/images/hero-villa.jpg",
  },
];

export interface MicroMarketComps {
  locality: string;
  localityTa: string;
  guidelineValuePerSqFt: number;
  actualMarketRatePerSqFt: number;
  threeYearAppreciation: string;
  corridorType: "Prime Residential" | "Fast Growth Corridor" | "Industrial / Commercial";
  infrastructureDriver: string;
  groundwaterDepth: string;
  potableWaterRating: "Sweet Potable (TDS < 300)" | "Good Potable" | "Moderate";
}

export const TRICHY_CORRIDORS: MicroMarketComps[] = [
  {
    locality: "K.K. Nagar & Crawford",
    localityTa: "கே.கே. நகர் & கிராஃபோர்டு",
    guidelineValuePerSqFt: 1450,
    actualMarketRatePerSqFt: 3800,
    threeYearAppreciation: "+34%",
    corridorType: "Prime Residential",
    infrastructureDriver: "Central city connectivity, elite schools, Valli Tower junction",
    groundwaterDepth: "40 - 60 Feet",
    potableWaterRating: "Sweet Potable (TDS < 300)",
  },
  {
    locality: "Olaiyur Ring Road Junction",
    localityTa: "ஒலையூர் ரிங் ரோடு சந்திப்பு",
    guidelineValuePerSqFt: 850,
    actualMarketRatePerSqFt: 2100,
    threeYearAppreciation: "+48%",
    corridorType: "Fast Growth Corridor",
    infrastructureDriver: "Trichy Semi-Ring Road arterial link, SBI HQ, new residential layouts",
    groundwaterDepth: "50 - 70 Feet",
    potableWaterRating: "Sweet Potable (TDS < 300)",
  },
  {
    locality: "Panjappur Integrated Bus Terminus",
    localityTa: "பஞ்சப்பூர் ஒருங்கிணைந்த பேருந்து முனையம்",
    guidelineValuePerSqFt: 1100,
    actualMarketRatePerSqFt: 3200,
    threeYearAppreciation: "+65%",
    corridorType: "Fast Growth Corridor",
    infrastructureDriver: "Mega Integrated Bus Terminus, TIDEL Park Trichy, multi-modal logistic hub",
    groundwaterDepth: "60 - 80 Feet",
    potableWaterRating: "Good Potable",
  },
  {
    locality: "Vayalur Road & Somarasampettai",
    localityTa: "வயலூர் ரோடு & சோமரசம்பேட்டை",
    guidelineValuePerSqFt: 950,
    actualMarketRatePerSqFt: 2600,
    threeYearAppreciation: "+28%",
    corridorType: "Prime Residential",
    infrastructureDriver: "Bishop Heber College proximity, Kaveri drinking water line, serene greenery",
    groundwaterDepth: "30 - 45 Feet",
    potableWaterRating: "Sweet Potable (TDS < 300)",
  },
  {
    locality: "Karumandapam RMS Colony",
    localityTa: "கரு மண்டபம் RMS காலனி",
    guidelineValuePerSqFt: 1600,
    actualMarketRatePerSqFt: 4200,
    threeYearAppreciation: "+25%",
    corridorType: "Prime Residential",
    infrastructureDriver: "Dindigul National Highway, Central Railway Station proximity (10 mins)",
    groundwaterDepth: "35 - 50 Feet",
    potableWaterRating: "Sweet Potable (TDS < 300)",
  },
  {
    locality: "No.1 Tollgate & Samayapuram",
    localityTa: "எண்.1 டோல்கேட் & சமயபுரம்",
    guidelineValuePerSqFt: 650,
    actualMarketRatePerSqFt: 1650,
    threeYearAppreciation: "+42%",
    corridorType: "Fast Growth Corridor",
    infrastructureDriver: "Chennai-Trichy NH-45 Highway, SRV/Sowdambika CBSE school hub",
    groundwaterDepth: "70 - 90 Feet",
    potableWaterRating: "Good Potable",
  },
  {
    locality: "Thuvakudi & Tanjore Highway",
    localityTa: "துவாக்குடி & தஞ்சை தேசிய நெடுஞ்சாலை",
    guidelineValuePerSqFt: 800,
    actualMarketRatePerSqFt: 2200,
    threeYearAppreciation: "+32%",
    corridorType: "Industrial / Commercial",
    infrastructureDriver: "NIT Trichy, BHEL Township, industrial logistics and rental apartments",
    groundwaterDepth: "50 - 70 Feet",
    potableWaterRating: "Good Potable",
  },
  {
    locality: "Thillai Nagar & Cantonment",
    localityTa: "தில்லை நகர் & கண்டோன்மென்ட்",
    guidelineValuePerSqFt: 3800,
    actualMarketRatePerSqFt: 9500,
    threeYearAppreciation: "+20%",
    corridorType: "Prime Residential",
    infrastructureDriver: "Trichy's premium CBD, commercial complexes, high-value redevelopment",
    groundwaterDepth: "40 - 55 Feet",
    potableWaterRating: "Sweet Potable (TDS < 300)",
  },
];

export interface AcademyGuide {
  slug: string;
  title: string;
  titleTa: string;
  readTime: string;
  category: "Legal" | "Due Diligence" | "Approvals" | "Valuation";
  summary: string;
  keyTakeaways: string[];
}

export const ACADEMY_GUIDES: AcademyGuide[] = [
  {
    slug: "tamil-nadu-land-buying-due-diligence-checklist",
    title: "The 30-Year Land Due Diligence Framework in Tamil Nadu",
    titleTa: "தமிழ்நாட்டில் நிலம் வாங்குவதற்கான 30 வருட சட்ட ஆய்வு கையேடு",
    readTime: "7 Mins Read",
    category: "Due Diligence",
    summary: "A step-by-step master checklist for land buyers in Tamil Nadu to avoid fake pattas, joint ownership traps, undisclosed mortgages, and Section 47A revenue liens.",
    keyTakeaways: [
      "Always obtain a continuous 30-year Encumbrance Certificate (EC) from 1975 to current date from the Sub-Registrar Office.",
      "Check online Patta/Chitta on eservices.tn.gov.in and verify whether the Patta is 'Thani Patta' (individual) or 'Kootu Patta' (joint).",
      "Verify Field Measurement Book (FMB) survey sketch to ensure the physical plot shape matches registered boundaries.",
      "Never pay more than a nominal token advance before advocate written title scrutiny is completed.",
    ],
  },
  {
    slug: "dtcp-vs-cmda-vs-panchayat-approvals-explained",
    title: "DTCP vs CMDA vs Panchayat Layout Approvals: What Every Buyer Must Know",
    titleTa: "DTCP, CMDA மற்றும் பஞ்சாயத்து அப்ரூவல்: என்ன வேறுபாடு?",
    readTime: "6 Mins Read",
    category: "Approvals",
    summary: "Clear legal breakdown of why unapproved Panchayat layouts cannot be registered or financed by nationalized banks, and how DTCP and RERA protect your capital.",
    keyTakeaways: [
      "Panchayats have no legal authority to approve residential layout subdivisions after the 2016 High Court ruling.",
      "DTCP approval ensures 33ft/30ft tar roads, OSR (Open Space Reservation) park land gift deed to government, and EB transformer space.",
      "TN RERA registration is mandatory for layouts over 500 sq.meters, guaranteeing developer compliance.",
      "Nationalized banks (SBI, HDFC) sanction loans exclusively for DTCP / LPA / CMDA approved plots.",
    ],
  },
  {
    slug: "patta-chitta-tslr-fmb-forensics-guide",
    title: "How to Read Patta, Chitta, TSLR, and FMB Sketches Online",
    titleTa: "பட்டா, சிட்டா, TSLR மற்றும் FMB ஸ்கெட்ச் பார்ப்பது எப்படி?",
    readTime: "8 Mins Read",
    category: "Legal",
    summary: "Comprehensive visual guide to navigating Tamil Nadu Revenue e-Services, downloading authentic QR-coded Patta copies, and decoding survey subdivision numbers.",
    keyTakeaways: [
      "Patta is government proof of ownership; Chitta shows the land classification (Nanjai / Punjai / Natham).",
      "In municipal corporation limits like Trichy City, TSLR (Town Survey Land Register) replaces rural Patta.",
      "Always verify if the survey number was subdivided legally with an approved sub-division order.",
      "Learn to spot Section 47A stamp duty undervaluation notices which can block future registrations.",
    ],
  },
];
