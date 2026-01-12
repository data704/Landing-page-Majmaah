import {
  BenefitItem,
  ProblemAndSolutionFeatureItem,
  Service,
  ServicesDetailsProps,
} from "./types";

export const navbar = [
  { id: 1, title: "About Us", href: "about-us" },
  { id: 2, title: "Contact", href: "contact-us" },
  { id: 3, title: "Services", href: "services" },
  { id: 4, title: "Problems & Solutions", href: "problem-and-solution" },
  { id: 5, title: "See Forest", href: "see-forest" },
];

export const partnersLogo = [
  "/images/partners/KACST.svg",
  "/images/partners/King Abdulaziz University.svg",
  "/images/partners/king-khalid-university.svg",
  "/images/partners/Majmaah University.svg",
  "/images/partners/mewa-logo.svg",
  "/images/partners/NCVC-Logo-Color-AR.svg",
  "/images/partners/prince-sattam-bin-abdullaziz-university.svg",
  "/images/partners/Saudi_Ministry_of_National_Guard_Logo.svg",
  "/images/partners/wareef.svg",
];

export const services: Service[] = [
  {
    title: "CSR Tree Planting System",
    description:
      "Satellite-verified tree planting certificates for corporate social responsibility initiatives. One-time or ongoing monitoring.",
    features: [
      "Verification certificates",
      "GPS-verified tree counts",
      "Shareable impact reports",
    ],
    icon: "/icons/tree-bg-icon.svg",
    bg: "#2D5F3F",
  },
  {
    title: "ESG Carbon Management",
    description:
      "Complete carbon management platform combining Scope 1 & 2 emissions tracking with satellite-verified tree planting offsets.",
    features: [
      "Emissions tracking dashboard",
      "Carbon offset integration",
      "ESG reporting automation",
    ],
    icon: "/icons/csg-carbon-icon.svg",
    bg: "#00B8A9",
  },
  {
    title: "Carbon Credit MRV",
    description:
      "Quarterly or annual monitoring, reporting, and verification for carbon credit projects. Meets international standards.",
    features: [
      "Quarterly/annual reports",
      "Carbon sequestration metrics",
      "Compliance documentation",
    ],
    icon: "/icons/tick-icon.svg",
    bg: "#4A90E2",
  },
  {
    title: "Agricultural Monitoring",
    description:
      "Precision agriculture monitoring with crop health analysis, NDVI mapping, and real-time alerts for irrigation.",
    features: ["Crop health heatmaps", "NDVI analysis", "Yield optimization"],
    icon: "/icons/agriculture-icon.svg",
    bg: "#E8D5B7",
  },
];
export const manualProcessFeatures: ProblemAndSolutionFeatureItem[] = [
  {
    title: "Manual Field Visits",
    description:
      "Requires teams to physically visit sites, consuming time and resources",
    icon: "/icons/manual-field.svg",
  },
  {
    title: "Delayed Reporting",
    description:
      "Data collection and analysis takes weeks or months to complete",
    icon: "/icons/delayed-reported.svg",
  },
  {
    title: "Limited Coverage",
    description: "Difficult to monitor large or remote areas comprehensively",
    icon: "/icons/limited-coverage.svg",
  },
  {
    title: "High Costs",
    description: "Travel, personnel, and equipment expenses add up quickly",
    icon: "/icons/high-cost.svg",
  },
];
export const benefits: BenefitItem[] = [
  {
    title: "Real-Time Data",
    description:
      "Continuous satellite monitoring provides up-to-date insights daily",
    icon: "/icons/real-time.svg",
  },
  {
    title: "Full Coverage",
    description:
      "Monitor any location globally, regardless of size or accessibility",
    icon: "/icons/full-coverage.svg",
  },
  {
    title: "Cost-Effective",
    description:
      "Eliminate travel costs and reduce personnel requirements significantly",
    icon: "/icons/cost-effective.svg",
  },
  {
    title: "Transparent Reporting",
    description:
      "Automated reports and dashboards keep all stakeholders informed",
    icon: "/icons/transparent.svg",
  },
];

export const servicesDetails: ServicesDetailsProps[] = [
  {
    id: 1,
    tag: "CSR Tree Planting System",
    title: "Satellite-Verified Tree Planting Certificates",
    desc: "Perfect for corporate social responsibility initiatives and sustainability commitments.",
    sub_desc:
      "Reports are structured to meet Verra VCS, Gold Standard, and other carbon credit certification requirements.",
    features: [
      "Verification certificates",
      "Satellite imagery proof",
      "GPS-verified tree counts",
      "Shareable impact reports",
      "Shareable impact reports",
      "Biodiversity assessment",
    ],
    bg: "#2D5F3F",
  },
  {
    id: 2,
    tag: "ESG Carbon Management",
    title: "Complete Carbon Management Platform",
    desc: "Combine Scope 1 & 2 emissions tracking with satellite-verified tree planting offsets.",
    sub_desc:
      "Automate ESG reporting for regulatory compliance and stakeholder transparency.",
    features: [
      "Emissions tracking",
      "AI-powered insights",
      "Carbon offset integration",
      "ESG reporting automation",
      "Regulatory compliance",
      "Stakeholder dashboards",
    ],
    bg: "#00B8A9",
  },
  {
    id: 3,
    tag: "CARBON CREDIT MRV",
    title: "Quarterly/Annual Monitoring, Reporting & Verification",
    desc: "Comprehensive monitoring for carbon credit projects.",
    sub_desc:
      "Reports are automatically structured to meet international standards including Verra VCS, Gold Standard, and Plan Vivo.",
    features: [
      "Quarterly/annual reports",
      "Carbon sequestration metrics",
      "Compliance documentation",
      "Baseline assessments",
      "Additionality verification",
      "Third-party audit support",
    ],
    bg: "#4A90E2",
  },
  {
    id: 4,
    tag: "AGRICULTURAL MONITORING",
    title: "Precision Agriculture From Space",
    desc: "",
    sub_desc:
      "Monitor crop health, optimize irrigation, detect pests early, and maximize yields with weekly satellite monitoring and AI powered insights.",
    features: [
      "Crop health heatmaps",
      "NDVI analysis",
      "Irrigation alerts",
      "Yield optimization",
      "Pest detection",
      "Historical performance",
    ],
    bg: "#E8D5B7",
  },
];

export function getIsDesktop() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  return !/Android|iPhone|iPad/i.test(ua);
}
