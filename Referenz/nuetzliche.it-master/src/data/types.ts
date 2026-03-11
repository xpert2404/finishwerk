export type Locale = "de" | "en";

export type AccentTheme = "theme-a" | "theme-b";
export type HeroVariant = "A" | "B";
export type HomeDensityMode = "medium-focused" | "full";
export type AccentStrategy = "logo-orange-micro" | "navy-micro";

export interface BookingUiConfig {
  modalDesktopMaxWidth: string;
  modalDesktopHeight: string;
  modalMobileFullscreen: boolean;
  iframeMinHeightDesktop: number;
  iframeMinHeightMobile: number;
  consentModalMaxWidth: string;
  consentModalPadding: string;
  transitionDurationMs: number;
}

export interface BookingConfig {
  provider: "calcom";
  publicUrl: string;
  embedUrl: string;
  requiresConsent: boolean;
  ui: BookingUiConfig;
}

export interface EmbedConsentConfig {
  maps: boolean;
  booking: boolean;
  storageMode: "session";
}

export interface LocationMapConfig {
  embedUrl: string;
  mapsLinkUrl: string;
  label: string;
  addressLine: string;
  requiresConsent?: boolean;
}

export interface BeforeAfterStep {
  id: string;
  title: string;
  before: string;
  after: string;
  impact?: string;
}

export interface ImpactCalculatorInput {
  volumePerWeek: number;
  minutesBefore: number;
  minutesAfter: number;
}

export interface ImpactAssumptionProfile {
  defaultVolumePerWeek: number;
  minutesBefore: number;
  minutesAfter: number;
}

export interface ImpactSubcategoryProfile {
  id: string;
  assumptions: ImpactAssumptionProfile;
}

export interface ImpactCategoryProfile {
  id: string;
  defaultSubcategoryId: string;
  subcategories: ImpactSubcategoryProfile[];
}

export interface ImpactSubcategory {
  id: string;
  title: string;
  summary: string;
  outcomes: string[];
  assumptions: ImpactAssumptionProfile;
}

export interface ImpactCategory {
  id: string;
  title: string;
  description: string;
  note: string;
  steps: BeforeAfterStep[];
  subcategories: ImpactSubcategory[];
  defaultSubcategoryId: string;
}

export interface ImpactCalculatorResult {
  weeklyHoursSaved: number;
  monthlyHoursSaved: number;
  annualHoursSaved: number;
}

export interface SiteConfig {
  siteName: string;
  siteUrl: string;
  primaryInk: string;
  defaultTheme: AccentTheme;
  homeDensityMode: HomeDensityMode;
  accentStrategy: AccentStrategy;
  booking: BookingConfig;
  embedConsent: EmbedConsentConfig;
  anydeskUrl: string;
  experienceYears: number;
  heroVariant: HeroVariant;
  localeDetectionMode: "cookie-browser-fallback";
  supportedLocales: Locale[];
  defaultLocale: Locale;
  locationMap: LocationMapConfig;
  impactCalculator: {
    minVolumePerWeek: number;
    maxVolumePerWeek: number;
    categories: ImpactCategoryProfile[];
  };
}

export type LocalizedAliasTarget = Record<Locale, string>;

export interface PathAlias {
  path: string;
  target: LocalizedAliasTarget;
}

export interface ServiceItem {
  id: string;
  pillar: "software" | "ai";
  title: string;
  summary: string;
  benefits: string[];
  deliverables: string[];
  process: string[];
  integrations: string[];
  qualityStandard: string;
  icon: "code" | "database" | "refresh" | "cpu" | "workflow" | "shield";
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "prozess" | "technik" | "ki" | "compliance";
}

export interface TeamMember {
  name: string;
  role: string;
  focusAreas: string[];
  order: number;
}

export interface CaseStudy {
  id: string;
  title: string;
  problem: string;
  solution: string;
  result: string;
  tags: string[];
  status: "published" | "preparing";
}

export interface NavItem {
  labelKey: string;
  href: "/" | "/services" | "/ai-data-control" | "/projects" | "/about" | "/contact" | "/legal-notice" | "/privacy-policy" | "/faq";
  external?: boolean;
  highlight?: boolean;
}

export interface UseCaseItem {
  id: string;
  title: string;
  summary: string;
  outcome: string;
}

export interface OutcomeBlock {
  id: string;
  title: string;
  description: string;
}

export interface ProofItem {
  id: string;
  label: string;
  value: string;
  detail: string;
}

export interface ScenarioStep {
  id: string;
  title: string;
  description: string;
}

export type StoryboardVariant = "architecture" | "ai-control" | "workflow";

export interface StoryboardStep {
  id: string;
  title: string;
  description: string;
}

export interface StoryboardNote {
  id: string;
  label: string;
  text?: string;
}

export interface ExplainerStep {
  id: string;
  title: string;
  description: string;
}

export interface ExplainerNote {
  id: string;
  label: string;
  text?: string;
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
}

export interface TrustSignal {
  id: string;
  label: string;
  detail: string;
}

export type MotionPreset = "fade-up" | "scale-in" | "soft-parallax";
