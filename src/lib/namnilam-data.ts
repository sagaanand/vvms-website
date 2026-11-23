export interface ServiceDetail {
  slug: string;
  title: string;
  titleTa: string;
  category: "Advisory" | "Legal" | "Valuation" | "Engineering" | "Finance";
  badge: string;
  headline: string;
  price: string;
  priceTag: string;
  desc: string;
  targetAudience: string[];
  commonProblems: string[];
  whatWeHelpWith: string[];
  deliverables: string;
  deliverablesList?: string[];
  coverImage: string;
}

export const ALL_SERVICES: ServiceDetail[] = [
  {
    slug: "online-legal-opinion",
    title: "Online Legal Scrutiny & Advocate Opinion",
    titleTa: "ஆன்லைன் சட்ட ஆய்வு மற்றும் வழக்கறிஞர் கருத்து",
    category: "Legal",
    badge: "100% Legal Due Diligence",
    headline: "Verify 30-Year Title Chain, Patta & Encumbrances Before Paying Any Advance.",
    price: "₹4,999",
    priceTag: "Signed Legal Docket",
    desc: "Rigorous 30-year civil title investigation by practicing High Court & District Court advocates. We scrutinize original parent documents, Patta/Chitta transfers, encumbrance certificates (EC), legal heirship, revenue court disputes, and Section 47A stamp duty liabilities.",
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
    slug: "property-valuation",
    title: "Independent Property & Land Valuation",
    titleTa: "சுயாதீன சொத்து மற்றும் நில மதிப்பீடு",
    category: "Valuation",
    badge: "Real Comps • No Broker Bias",
    headline: "Understand Fair Market Worth Before You Make an Offer.",
    price: "Custom Scope",
    priceTag: "On Request / Custom Scope",
    desc: "Independent, data-led property valuation comparing recent registered Sub-Registrar Office (SRO) transaction deeds, actual guideline values, replacement costs, and localized micro-market supply-demand trends across Tiruchirappalli and Tamil Nadu.",
    targetAudience: [
      "Buyers evaluating property quotes from private developers or layout promoters",
      "Sellers looking for an unbiased market baseline to list fairly without middleman commissions",
      "Families planning property division, partition, or investment portfolio audits",
    ],
    commonProblems: [
      "Overpaying by 20% to 40% due to inflated broker pitches and hype",
      "Misunderstanding the massive spread between SRO guideline value and real transaction price",
      "Relying on outdated locality word-of-mouth rather than registered transaction deeds",
    ],
    whatWeHelpWith: [
      "Analysis of recently registered sub-registrar deeds in the exact revenue survey ward",
      "Physical location adjustments: road width (20ft vs 30ft vs 40ft), frontage ratio, groundwater yield",
      "Calculation of effective on-road acquisition cost including 9% stamp duty and registration fees",
      "Comparative market matrix against adjacent layouts and historical 3-year appreciation curves",
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
    slug: "real-estate-advisory",
    title: "Independent Buyer & NRI Advisory",
    titleTa: "சுயாதீன வாங்குபவர் மற்றும் NRI ஆலோசனை",
    category: "Advisory",
    badge: "Zero Broker Conflicts",
    headline: "Make Property & Investment Decisions With Scientific Clarity, Not Doubt.",
    price: "Consultation",
    priceTag: "Advisory Consultation",
    desc: "Bespoke property consultation for home buyers, families, and long-term land investors. We evaluate property suitability, fair market valuation, future livability, water availability, and structural risk profiles with zero seller conflicts.",
    targetAudience: [
      "First-time land and home plot buyers looking for safe transactions",
      "Non-Resident Indians (NRIs in Singapore, Malaysia, Gulf, USA) acquiring land in Tamil Nadu",
      "Families planning retirement dream homes with serene surroundings",
    ],
    commonProblems: [
      "Uncertainty about whether the quoted price reflects actual market worth",
      "Confusion over Panchayat vs DTCP vs CMDA vs RERA approvals",
      "Aggressive broker sales pitches pushing disputed, low-lying, or illiquid land parcels",
      "Lack of objective location growth data and physical infrastructure timeline",
    ],
    whatWeHelpWith: [
      "Comprehensive Property Suitability & Livability Evaluation",
      "Independent Price Negotiation & Fair Value Assessment without broker pressure",
      "Groundwater Table, TNEB Grid & Flood Risk Verification",
      "Step-by-step guidance from site shortlisting to registry deed execution",
    ],
    deliverables: "Comprehensive 6-Page Advisory Dossier with Fair Value Range & Risk Matrix",
    deliverablesList: [
      "Written unbiased evaluation of 3 shortlisted properties",
      "Groundwater depth and potable quality test findings",
      "Guidance on building bylaws, setback rules, and FSI utilization",
      "Direct strategic meeting with Er. J. Vairavel",
    ],
    coverImage: "/images/hero-villa.jpg",
  },
  {
    slug: "investment-advisory",
    title: "Strategic Land Investment Advisory",
    titleTa: "மூலோபாய நில முதலீட்டு வழிகாட்டுதல்",
    category: "Advisory",
    badge: "High-Conviction Corridors",
    headline: "Structured Land Portfolios Grounded in Real Economics & Infrastructure Drivers.",
    price: "Custom",
    priceTag: "Portfolio Strategy",
    desc: "Strategic land allocation for HNIs, syndicates, and wealth builders. We focus on high-conviction growth corridors driven by industrial SEZs, expressways, ring roads, and institutional expansion across Tiruchirappalli, Madurai, and Central Tamil Nadu.",
    targetAudience: [
      "HNIs and business owners seeking wealth preservation through tangible real estate",
      "NRIs seeking high-appreciation asset parking in rapidly growing Tamil Nadu cities",
      "Families planning 5 to 10 year generational land holdings for children",
    ],
    commonProblems: [
      "Speculative buying in remote desert layouts with zero economic growth drivers",
      "Illiquidity traps where land cannot be resold even after 7 years",
      "Buying agricultural land with restrictive conversion or tenancy hurdles",
    ],
    whatWeHelpWith: [
      "Corridor Growth Analysis (Trichy Semi-Ring Road, Panjappur TIDEL, Airport corridor)",
      "Risk-adjusted holding horizon and exit liquidity strategy",
      "Land banking due diligence and parcel aggregation guidance",
      "Guideline value trajectory modeling against historical CPI inflation",
    ],
    deliverables: "Bespoke Land Portfolio Strategy Blueprint with Scenario Modeling & Exit Liquidity Plan",
    deliverablesList: [
      "10-Year Macro & Micro Economic Catalyst Report",
      "Exit liquidity index (Time required to liquidate parcel at market rate)",
      "Comparative corridor returns (Panjappur vs Vayalur vs Olaiyur vs No.1 Tollgate)",
      "Periodic on-ground satellite & drone perimeter inspections",
    ],
    coverImage: "/images/dtcp-plots.jpg",
  },
  {
    slug: "construction-services",
    title: "Construction Consulting & Project Management",
    titleTa: "கட்டுமான ஆலோசனை மற்றும் திட்ட மேலாண்மை",
    category: "Engineering",
    badge: "9% Transparent Management Fee",
    headline: "End-to-End Civil Engineering Management by Er. J. Vairavel.",
    price: "9% Fee",
    priceTag: "9% of Project Budget",
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
    deliverables: "Full 9-Stage Civil Engineering Management with Weekly Video Reports & Quality Signoff",
    deliverablesList: [
      "Milestone 1: Planning, Design, Estimation & Foundation (25% fee allocation)",
      "Milestone 2: Plinth & Structural Frame up to Roof Slab (30% fee allocation)",
      "Milestone 3: Masonry, MEP, Plastering & Major Finishing (30% fee allocation)",
      "Milestone 4: Final Finishing, Inspection, Snagging & Key Handover (15% fee allocation)",
    ],
    coverImage: "/images/turnkey-home.jpg",
  },
  {
    slug: "onsite-infrastructure-valuation",
    title: "On-site Technical Infrastructure & Soil/Water Audit",
    titleTa: "நேரடி இட ஆய்வு, மண் மற்றும் நிலத்தடி நீர் சோதனை",
    category: "Engineering",
    badge: "Physical Ground Truth",
    headline: "Know the Soil, Water, and Grid Reality Before Pouring Concrete.",
    price: "₹3,999",
    priceTag: "₹3,999 On-Site Audit",
    desc: "Physical on-ground technical inspection carried out by qualified civil engineering specialists. We evaluate groundwater aquifer depth, soil bearing capability, road approach width, electric grid/utility access, and flood vulnerability.",
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
    deliverables: "Signed 5-Page Technical Infrastructure Audit Dossier with Elevation & Water Report",
    deliverablesList: [
      "Survey stone boundary demarcation & physical road width verification",
      "Groundwater table assessment with potable TDS rating report",
      "Soil bearing capacity recommendation (Isolated footing vs Raft foundation)",
      "High-definition site inspection video and contour evaluation",
    ],
    coverImage: "/images/consulting.jpg",
  },
  {
    slug: "loan-arrangement",
    title: "Bank Loan Guidance & Mortgage Advisory",
    titleTa: "வங்கி கடன் வழிகாட்டுதல் மற்றும் அனுமதி",
    category: "Finance",
    badge: "SBI & HDFC Up to 85%",
    headline: "Hassle-Free Home & Plot Loan Sanction at Lowest Market Interest Rates.",
    price: "Zero Upfront",
    priceTag: "Success-Based Facilitation",
    desc: "End-to-end bank home loan and plot purchase loan facilitation. We partner with nationalized banks (SBI, HDFC, Canara Bank, Indian Bank) to secure fast loan approvals, minimum paperwork, and zero hidden processing penalties.",
    targetAudience: [
      "Salaried and self-employed buyers seeking 80% to 85% property funding",
      "First-time buyers needing PMAY subsidy and low-EMI schemes",
      "Borrowers seeking balance transfer to lower interest rate regimes",
    ],
    commonProblems: [
      "Loan rejection due to technical document deficiencies in layout approval",
      "High hidden processing fees charged by private NBFC lenders",
      "Months of delays waiting for bank legal panel scrutiny",
    ],
    whatWeHelpWith: [
      "Pre-scrutiny of title deeds against SBI / HDFC legal panel standards",
      "Maximum loan eligibility calculation based on income and ITR documentation",
      "Coordination with bank valuation engineers and legal advocates",
      "Doorstep document collection and fast-track sanction within 10 business days",
    ],
    deliverables: "Bank Loan Pre-Approval Letter & Lowest Interest Rate Sanction Order",
    deliverablesList: [
      "Comparative interest rate matrix across top 5 public and private banks",
      "Complete checklist of required KYC, income, and property documents",
      "Dedicated loan officer assigned from our K.K. Nagar HQ",
      "Zero upfront brokerage or hidden service fees",
    ],
    coverImage: "/images/villa-interior.jpg",
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
