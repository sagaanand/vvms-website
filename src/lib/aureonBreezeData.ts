export interface BrochurePlotRow {
  phase: "AUREON BREEZE" | "AUREON BREEZE EXTENSION";
  plotNumber: string;
  areaSqFt: number;
  category?: "Luxury" | "Premium" | "Clasic";
  roadWidthFt?: number;
  availability?: "ENQUIRE" | "AVAILABLE" | "RESERVED" | "SOLD";
}

function expandRange(
  phase: "AUREON BREEZE" | "AUREON BREEZE EXTENSION",
  start: number,
  end: number,
  areaSqFt: number,
  category?: "Luxury" | "Premium" | "Clasic"
): BrochurePlotRow[] {
  const rows: BrochurePlotRow[] = [];
  for (let n = start; n <= end; n++) {
    rows.push({
      phase,
      plotNumber: String(n),
      areaSqFt,
      category,
    });
  }
  return rows;
}

// Exact Plot Schedule transcribed from Page 5 of AUREON Breeze E-COPY.pdf
export const AUREON_BREEZE_PLOTS: BrochurePlotRow[] = [
  // Row 1
  { phase: "AUREON BREEZE", plotNumber: "1", areaSqFt: 371.5 },
  { phase: "AUREON BREEZE", plotNumber: "25", areaSqFt: 1098.0 },
  { phase: "AUREON BREEZE", plotNumber: "26", areaSqFt: 1157.0 },
  ...expandRange("AUREON BREEZE", 55, 56, 1271.25),
  { phase: "AUREON BREEZE", plotNumber: "68", areaSqFt: 1485.0 },
  { phase: "AUREON BREEZE", plotNumber: "69", areaSqFt: 1657.5 },
  ...expandRange("AUREON BREEZE", 81, 82, 1271.25),
  ...expandRange("AUREON BREEZE", 105, 106, 1271.25),
  { phase: "AUREON BREEZE", plotNumber: "118", areaSqFt: 1943.0 },
  { phase: "AUREON BREEZE", plotNumber: "119", areaSqFt: 2120.5 },
  ...expandRange("AUREON BREEZE", 131, 132, 1271.25),
  { phase: "AUREON BREEZE", plotNumber: "169", areaSqFt: 1157.0 },

  // Row 2 (Plots 2-13)
  { phase: "AUREON BREEZE", plotNumber: "2", areaSqFt: 402.5 },
  { phase: "AUREON BREEZE", plotNumber: "3", areaSqFt: 408.0 },
  { phase: "AUREON BREEZE", plotNumber: "4", areaSqFt: 415.0 },
  { phase: "AUREON BREEZE", plotNumber: "5", areaSqFt: 421.0 },
  { phase: "AUREON BREEZE", plotNumber: "6", areaSqFt: 427.5 },
  { phase: "AUREON BREEZE", plotNumber: "7", areaSqFt: 433.5 },
  { phase: "AUREON BREEZE", plotNumber: "8", areaSqFt: 439.5 },
  { phase: "AUREON BREEZE", plotNumber: "9", areaSqFt: 446.0 },
  { phase: "AUREON BREEZE", plotNumber: "10", areaSqFt: 452.0 },
  { phase: "AUREON BREEZE", plotNumber: "11", areaSqFt: 458.5 },
  { phase: "AUREON BREEZE", plotNumber: "12", areaSqFt: 464.5 },
  { phase: "AUREON BREEZE", plotNumber: "13", areaSqFt: 471.0 },

  // Row 3 (Plots 14-24, 27)
  { phase: "AUREON BREEZE", plotNumber: "14", areaSqFt: 477.0 },
  { phase: "AUREON BREEZE", plotNumber: "15", areaSqFt: 483.5 },
  { phase: "AUREON BREEZE", plotNumber: "16", areaSqFt: 489.5 },
  { phase: "AUREON BREEZE", plotNumber: "17", areaSqFt: 496.0 },
  { phase: "AUREON BREEZE", plotNumber: "18", areaSqFt: 502.0 },
  { phase: "AUREON BREEZE", plotNumber: "19", areaSqFt: 508.5 },
  { phase: "AUREON BREEZE", plotNumber: "20", areaSqFt: 514.5 },
  { phase: "AUREON BREEZE", plotNumber: "21", areaSqFt: 521.0 },
  { phase: "AUREON BREEZE", plotNumber: "22", areaSqFt: 527.0 },
  { phase: "AUREON BREEZE", plotNumber: "23", areaSqFt: 533.0 },
  { phase: "AUREON BREEZE", plotNumber: "24", areaSqFt: 539.5 },
  { phase: "AUREON BREEZE", plotNumber: "27", areaSqFt: 588.0 },

  // Row 4 (Plots 28-39)
  { phase: "AUREON BREEZE", plotNumber: "28", areaSqFt: 594.0 },
  { phase: "AUREON BREEZE", plotNumber: "29", areaSqFt: 600.5 },
  { phase: "AUREON BREEZE", plotNumber: "30", areaSqFt: 606.0 },
  { phase: "AUREON BREEZE", plotNumber: "31", areaSqFt: 613.0 },
  { phase: "AUREON BREEZE", plotNumber: "32", areaSqFt: 617.5 },
  { phase: "AUREON BREEZE", plotNumber: "33", areaSqFt: 614.5 },
  { phase: "AUREON BREEZE", plotNumber: "34", areaSqFt: 611.0 },
  { phase: "AUREON BREEZE", plotNumber: "35", areaSqFt: 607.5 },
  { phase: "AUREON BREEZE", plotNumber: "36", areaSqFt: 604.0 },
  { phase: "AUREON BREEZE", plotNumber: "37", areaSqFt: 600.0 },
  { phase: "AUREON BREEZE", plotNumber: "38", areaSqFt: 596.5 },
  { phase: "AUREON BREEZE", plotNumber: "39", areaSqFt: 593.0 },

  // Row 5
  { phase: "AUREON BREEZE", plotNumber: "40", areaSqFt: 589.5 },
  { phase: "AUREON BREEZE", plotNumber: "41", areaSqFt: 687.0 },
  { phase: "AUREON BREEZE", plotNumber: "42", areaSqFt: 686.5 },
  { phase: "AUREON BREEZE", plotNumber: "43", areaSqFt: 753.5 },
  { phase: "AUREON BREEZE", plotNumber: "44", areaSqFt: 1008.5 },
  { phase: "AUREON BREEZE", plotNumber: "45", areaSqFt: 945.0 },
  ...expandRange("AUREON BREEZE", 46, 54, 1271.25),
  ...expandRange("AUREON BREEZE", 57, 67, 1271.25),
  ...expandRange("AUREON BREEZE", 70, 80, 1271.25),
  ...expandRange("AUREON BREEZE", 83, 91, 1271.25),
  { phase: "AUREON BREEZE", plotNumber: "92", areaSqFt: 945.0 },
  { phase: "AUREON BREEZE", plotNumber: "93", areaSqFt: 1008.5 },
  { phase: "AUREON BREEZE", plotNumber: "94", areaSqFt: 1462.5 },

  // Row 6
  ...expandRange("AUREON BREEZE", 95, 104, 1271.25),
  ...expandRange("AUREON BREEZE", 107, 117, 1271.25),
  ...expandRange("AUREON BREEZE", 120, 130, 1271.25),
  ...expandRange("AUREON BREEZE", 133, 142, 1271.25),
  { phase: "AUREON BREEZE", plotNumber: "143", areaSqFt: 1462.5 },
  { phase: "AUREON BREEZE", plotNumber: "144", areaSqFt: 1462.5 },
  ...expandRange("AUREON BREEZE", 145, 168, 1271.25),
];

export const AUREON_BREEZE_EXTENSION_PLOTS: BrochurePlotRow[] = [
  // Luxury (Green in brochure)
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "1", areaSqFt: 1399.0, category: "Luxury", availability: "SOLD" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "12", areaSqFt: 2238.0, category: "Luxury" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "14", areaSqFt: 1435.0, category: "Luxury" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "22", areaSqFt: 613.5, category: "Luxury" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "23", areaSqFt: 644.5, category: "Luxury" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "28", areaSqFt: 723.0, category: "Luxury" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "37", areaSqFt: 1754.0, category: "Luxury" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "38", areaSqFt: 2000.0, category: "Luxury" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "49", areaSqFt: 1723.5, category: "Luxury", availability: "SOLD" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "50", areaSqFt: 1851.0, category: "Luxury" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "61", areaSqFt: 2000.0, category: "Luxury" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "62", areaSqFt: 1754.0, category: "Luxury" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "77", areaSqFt: 2090.5, category: "Luxury" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "78", areaSqFt: 1885.0, category: "Luxury" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "89", areaSqFt: 2371.5, category: "Luxury" },

  // Premium (White in brochure)
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "2", areaSqFt: 1322.0, category: "Premium" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "3", areaSqFt: 1347.0, category: "Premium" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "4", areaSqFt: 1372.0, category: "Premium" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "5", areaSqFt: 1397.0, category: "Premium" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "6", areaSqFt: 1422.0, category: "Premium" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "7", areaSqFt: 1447.0, category: "Premium" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "8", areaSqFt: 1472.0, category: "Premium" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "9", areaSqFt: 1497.5, category: "Premium" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "10", areaSqFt: 1522.5, category: "Premium" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "11", areaSqFt: 1547.5, category: "Premium" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "13", areaSqFt: 1365.0, category: "Premium" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "15", areaSqFt: 1794.0, category: "Premium" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "16", areaSqFt: 1514.0, category: "Premium" },
  ...expandRange("AUREON BREEZE EXTENSION", 39, 48, 1412.5, "Premium"),
  ...expandRange("AUREON BREEZE EXTENSION", 51, 60, 1412.5, "Premium"),
  ...expandRange("AUREON BREEZE EXTENSION", 63, 66, 1695.0, "Premium"),
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "69", areaSqFt: 1246.5, category: "Premium" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "70", areaSqFt: 1257.0, category: "Premium" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "71", areaSqFt: 1244.5, category: "Premium" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "72", areaSqFt: 1230.0, category: "Premium" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "73", areaSqFt: 1215.5, category: "Premium" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "74", areaSqFt: 1201.0, category: "Premium" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "75", areaSqFt: 1207.5, category: "Premium" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "76", areaSqFt: 1232.0, category: "Premium" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "79", areaSqFt: 1367.5, category: "Premium" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "80", areaSqFt: 1392.0, category: "Premium" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "81", areaSqFt: 1416.8, category: "Premium" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "82", areaSqFt: 1441.5, category: "Premium" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "83", areaSqFt: 1466.0, category: "Premium" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "84", areaSqFt: 1491.0, category: "Premium" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "85", areaSqFt: 1515.5, category: "Premium" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "86", areaSqFt: 1540.0, category: "Premium" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "87", areaSqFt: 1565.0, category: "Premium" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "88", areaSqFt: 1589.5, category: "Premium" },

  // Clasic (Amber/Peach in brochure)
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "17", areaSqFt: 577.0, category: "Clasic" },
  ...expandRange("AUREON BREEZE EXTENSION", 18, 20, 576.0, "Clasic"),
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "21", areaSqFt: 574.5, category: "Clasic" },
  ...expandRange("AUREON BREEZE EXTENSION", 24, 27, 656.5, "Clasic"),
  ...expandRange("AUREON BREEZE EXTENSION", 29, 36, 563.0, "Clasic"),
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "67", areaSqFt: 651.0, category: "Clasic" },
  { phase: "AUREON BREEZE EXTENSION", plotNumber: "68", areaSqFt: 656.0, category: "Clasic", availability: "SOLD" },
];

export const AUREON_BREEZE_SEED = {
  slug: "aureon-breeze",
  name: "AUREON BREEZE",
  tagline: "Crafting Future Communities • Your Dream Home, A Luxury Lifestyle",
  promoterName: "VVMS Showcase Project",
  category: "Premium Gated Community Residential Villa Plots",
  location: "Fathima Nagar, Trichy–Madurai NH Road",
  city: "Tiruchirappalli",
  approvals: "DTCP & RERA Approved (Brochure-listed: DTCP - 76/2026, 96/2026)",
  isFlagship: true,
  isVisible: true,
  heroImage: "/images/projects/aureon-breeze/hero.jpg",
  masterLayoutImage: "/images/projects/aureon-breeze/master-layout.jpg",
  brochureUrl: "/docs/aureon-breeze-brochure.pdf",
  galleryImages: JSON.stringify([
    "/images/projects/aureon-breeze/hero.jpg",
    "/images/projects/aureon-breeze/amenities.jpg",
    "/images/projects/aureon-breeze/location-advantages.jpg",
    "/images/projects/aureon-breeze/master-layout.jpg",
    "/images/projects/aureon-breeze/growth-corridor.jpg",
    "/images/projects/aureon-breeze/route-map.jpg",
  ]),
  youtubeUrls: JSON.stringify([]),
  overview:
    "AUREON BREEZE is a flagship gated community residential villa plot development at Fathima Nagar on the Trichy–Madurai NH Road corridor, showcased on Veedu Veettumanai Santhai (VVMS). Designed around 3 landscaped parks, 40', 33', and 30' wide blacktop roads, and 600–2500 sq.ft Vaastu-compliant plots (per project brochure), the project serves both families planning immediate home construction and long-term corridor investors.",
  highlights: JSON.stringify([
    "DTCP & RERA Approved Gated Community (Brochure Ref: DTCP - 76/2026, 96/2026)",
    "Prime Frontage on Trichy–Madurai NH Road at Fathima Nagar",
    "Two Distinct Phases: Aureon Breeze (Plots 1–169) & Aureon Breeze Extension (Plots 1–89)",
    "3 Landscaped Parks Inside the Project (Park I, Park II & Park III)",
    "40', 33', 30' Wide Internal Roads & 24' Wide Extension Road",
    "Ready-to-Build Clear Title Villa Plots (371.5 to 2371.5 sq.ft across phases)",
    "End-to-End Assistance: Patta Transfer, Bank Loan, Registration & Home Construction Support",
  ]),
  amenities: JSON.stringify([
    { title: "Grand Entrance Gateway", desc: "Architectural gated entry arch with security cabin" },
    { title: "Professional 24x7 Security", desc: "Round-the-clock gated community surveillance" },
    { title: "40', 33', 30' Wide Roads", desc: "Well-laid wide internal blacktop road network" },
    { title: "3 Parks Inside Project", desc: "Park I, Park II & Park III with activity zones" },
    { title: "Avenue Plantation & Street Lights", desc: "Tree-lined avenues with illuminated pathways" },
    { title: "All-Round Compound Wall", desc: "Secured perimeter boundary wall around the layout" },
    { title: "Vaastu Compliant Plots", desc: "Thoughtfully oriented residential villa plots" },
    { title: "Waterline Connections", desc: "Provisioned drinking waterline & overhead tank" },
    { title: "600–2500 Sqft Villa Plots", desc: "Flexible plot sizes for compact & luxury villas" },
    { title: "Water Harvesting Pits", desc: "Rainwater harvesting infrastructure across layout" },
    { title: "Overhead Tank", desc: "Dedicated community overhead water storage" },
    { title: "3 Years Maintenance by Promoters*", desc: "Promoter-managed maintenance (*subject to brochure terms)" },
  ]),
  nearbyLocations: JSON.stringify({
    schools: [
      { name: "St. Patrick's Academy", time: "3 Mins" },
      { name: "SFS Public School (CBSE)", time: "5 Mins" },
      { name: "Govt School, Kunnathur", time: "5 Mins" },
      { name: "Chellammal Matriculation Hr. Sec. School", time: "6 Mins" },
      { name: "Crea Children's Academy", time: "8 Mins" },
      { name: "St. Thomas Higher Sec School", time: "10 Mins" },
    ],
    colleges: [
      { name: "Govt Polytechnic College", time: "1 Min" },
      { name: "Nalanda School Of Business", time: "1 Min" },
      { name: "IIIT Trichy", time: "2 Mins" },
      { name: "Govt Engineering College", time: "3 Mins" },
      { name: "Rane Polytechnic College", time: "5 Mins" },
      { name: "Indra Ganesan College", time: "8 Mins" },
      { name: "Saranathan College of Engineering", time: "10 Mins" },
    ],
    hospitals: [
      { name: "Child Jesus Health Center", time: "3 Mins" },
      { name: "Harsamithra Hospital", time: "5 Mins" },
      { name: "Nagamangalam Health Center", time: "6 Mins" },
      { name: "Government Hospital, Viralimalai", time: "15 Mins" },
    ],
    transports: [
      { name: "Panjappur Integrated Bus Terminus", time: "10 Mins" },
      { name: "Periyar Wholesale Vegetable & Fruit Market", time: "10 Mins" },
      { name: "Central Bus Stand, Trichy", time: "15 Mins" },
      { name: "Trichy Railway Junction", time: "15 Mins" },
      { name: "D-Mart", time: "25 Mins" },
      { name: "Trichy International Airport", time: "25 Mins" },
    ],
    temples: [
      { name: "Vazhi Vidu Murugan Temple", time: "2 Mins" },
      { name: "Divine Mercy Church", time: "5 Mins" },
      { name: "Masjith", time: "6 Mins" },
      { name: "Viralimalai Murugan Temple", time: "14 Mins" },
    ],
    industries: [
      { name: "Rane Brake Lining Limited", time: "3 Mins" },
      { name: "Senvion Wind Technology Pvt Ltd", time: "3 Mins" },
      { name: "SRF Ltd - Belting Fabrics Factory", time: "7 Mins" },
      { name: "ITC ICML Trichy Factory (Proposed)", time: "8 Mins" },
      { name: "Trichy TIDEL Park (Proposed)", time: "10 Mins" },
    ],
  }),
  extensionInfo: JSON.stringify({
    name: "AUREON BREEZE EXTENSION",
    plotCount: 89,
    park: "PARK - III",
    roads: ["40' Wide Road", "30' Wide Road", "24' Wide Road"],
    categories: [
      { label: "Luxury Plots", count: 15, range: "613.5 – 2371.5 sq.ft", color: "emerald" },
      { label: "Premium Plots", count: 54, range: "1201.0 – 1794.0 sq.ft", color: "slate" },
      { label: "Clasic Plots", count: 20, range: "563.0 – 656.5 sq.ft", color: "amber" },
    ],
    note: "AUREON BREEZE EXTENSION is tracked separately from AUREON BREEZE (Plots 1–169) in the master layout and plot schedule.",
  }),
  approvedBanks: JSON.stringify([
    "HDFC Bank",
    "ICICI Bank",
    "Punjab National Bank (PNB)",
    "Tata Capital",
    "LIC HFL",
  ]),
  faqs: JSON.stringify([
    {
      question: "What is VVMS's role for AUREON BREEZE?",
      answer: "Veedu Veettumanai Santhai (VVMS) serves as the real estate discovery, buyer advisory, and marketing platform showcasing AUREON BREEZE with accompanied site visits and document verification.",
    },
    {
      question: "Where is AUREON BREEZE located and how far is it from Panjappur Bus Stand?",
      answer: "The project is located at Fathima Nagar on the Trichy–Madurai NH Road corridor. According to the project brochure, Panjappur Integrated Bus Terminus and the proposed Trichy TIDEL Park are approximately 10 minutes away.",
    },
    {
      question: "What approvals and bank loans are mentioned in the AUREON BREEZE brochure?",
      answer: "The brochure states DTCP & RERA approval (DTCP - 76/2026, 96/2026) and lists HDFC Bank, ICICI Bank, Punjab National Bank (PNB), Tata Capital, and LIC HFL as approving banks. Independent title and approval verification is facilitated during site visits.",
    },
    {
      question: "What is the difference between AUREON BREEZE and AUREON BREEZE EXTENSION?",
      answer: "AUREON BREEZE comprises Plots 1 to 169 with Park I and Park II, whereas AUREON BREEZE EXTENSION comprises Plots 1 to 89 (categorized in the brochure into Luxury, Premium, and Clasic plots) adjacent to Park III.",
    },
    {
      question: "How can I check current plot availability and pricing?",
      answer: "Live plot availability is updated by authorized administrators and can be confirmed immediately via the plot enquiry form, WhatsApp (+91 73052 00754), or an accompanied site visit.",
    },
  ]),
  seoTitle: "AUREON BREEZE – Premium Gated Community Villa Plots in Trichy | VVMS",
  seoDescription:
    "Explore AUREON BREEZE at Fathima Nagar, Trichy–Madurai NH Road. Brochure-listed DTCP & RERA gated villa plots with 3 parks, wide roads, and bank loan support on VVMS.",
  canonicalUrl: "https://veeduveettumanaisanthai.in/projects/aureon-breeze",
};
