"use client";

import { useState } from "react";
import { BookingConsentModal } from "@/components/booking/booking-consent-modal";
import { CalModal } from "@/components/booking/calendly-modal";
import { Button } from "@/components/ui/button";
import { useVendorConsent } from "@/components/booking/vendor-consent-store";

type BookingCtaProps = {
  label: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function BookingCta({
  label,
  variant = "primary",
  className,
}: BookingCtaProps) {
  const { hasBookingConsent, grantBookingConsent } = useVendorConsent();
  const [consentOpen, setConsentOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  const openFlow = () => {
    if (hasBookingConsent) {
      setBookingOpen(true);
      return;
    }

    setConsentOpen(true);
  };

  return (
    <>
      <Button onClick={openFlow} variant={variant} className={className}>
        {label}
      </Button>
      <BookingConsentModal
        open={consentOpen}
        onClose={() => setConsentOpen(false)}
        onAccept={() => {
          grantBookingConsent();
          setConsentOpen(false);
          setBookingOpen(true);
        }}
      />
      <CalModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
