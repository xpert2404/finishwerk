import type { NavItem } from "@/data/types";

export const mainNavigation: NavItem[] = [
  { labelKey: "home", href: "/" },
  { labelKey: "services", href: "/services" },
  { labelKey: "aiDataControl", href: "/ai-data-control" },
  { labelKey: "projects", href: "/projects" },
  { labelKey: "about", href: "/about" },
  { labelKey: "contact", href: "/contact", highlight: true }
];

export const legalNavigation: NavItem[] = [
  { labelKey: "legalNotice", href: "/legal-notice" },
  { labelKey: "privacy", href: "/privacy-policy" }
];
