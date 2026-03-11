"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { readBookingConsent, writeBookingConsent } from "@/lib/consent";

type VendorConsentContextValue = {
  hasBookingConsent: boolean;
  grantBookingConsent: () => void;
};

const VendorConsentContext = createContext<VendorConsentContextValue | null>(null);

export function VendorConsentProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [hasBookingConsent, setHasBookingConsent] = useState(readBookingConsent);

  const value = useMemo(
    () => ({
      hasBookingConsent,
      grantBookingConsent: () => {
        writeBookingConsent();
        setHasBookingConsent(true);
      },
    }),
    [hasBookingConsent],
  );

  return (
    <VendorConsentContext.Provider value={value}>
      {children}
    </VendorConsentContext.Provider>
  );
}

export function useVendorConsent() {
  const context = useContext(VendorConsentContext);

  if (!context) {
    throw new Error("useVendorConsent must be used inside VendorConsentProvider");
  }

  return context;
}
